from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

import os
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Literal
import uuid

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")


mongo_url = os.environ["MONGO_URL"]

client = AsyncIOMotorClient(mongo_url)

db = client[os.environ["DB_NAME"]]


app = FastAPI(title="Max Heap API")

api_router = APIRouter(prefix="/api")

RiwayatBantuanType = Literal[
    "Belum Pernah",
    "Pernah > 3 Tahun",
    "Pernah < 3 Tahun"
]

KondisiBangunanType = Literal[
    "Tidak Ada Kerusakan",
    "Rusak Ringan",
    "Rusak Sedang",
    "Rusak Berat"
]


class SekolahCreate(BaseModel):
    nama: str
    alamat: str
    jumlah_siswa: int = Field(ge=0)

    nama_bangunan: str
    tahun_pembangunan: int = Field(ge=0)
    luas_bangunan: float = Field(ge=0)
    jumlah_lantai: int = Field(ge=0)
    jumlah_ruang: int = Field(ge=0)
    kondisi_bangunan: KondisiBangunanType

    jenis_prasarana: str
    nama_ruang: str
    panjang_ruang: float = Field(ge=0)
    lebar_ruang: float = Field(ge=0)
    luas_ruang: float = Field(ge=0)
    kapasitas_ruang: int = Field(ge=0)

    judul_buku_pustaka: str
    mata_pelajaran: str
    judul_buku: str
    jumlah_buku: int = Field(ge=0)

    riwayat_bantuan: RiwayatBantuanType


class Sekolah(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))

    nama: str
    alamat: str
    jumlah_siswa: int

    nama_bangunan: str
    tahun_pembangunan: int
    luas_bangunan: float
    jumlah_lantai: int
    jumlah_ruang: int
    kondisi_bangunan: KondisiBangunanType

    jenis_prasarana: str
    nama_ruang: str
    panjang_ruang: float
    lebar_ruang: float
    luas_ruang: float
    kapasitas_ruang: int

    judul_buku_pustaka: str
    mata_pelajaran: str
    judul_buku: str
    jumlah_buku: int

    riwayat_bantuan: RiwayatBantuanType
    skor_urgensi: float


KONDISI_BANGUNAN_BOBOT = {
    "Tidak Ada Kerusakan": 10,
    "Rusak Ringan": 40,
    "Rusak Sedang": 70,
    "Rusak Berat": 100,
}

RIWAYAT_BANTUAN_BOBOT = {
    "Belum Pernah": 100,
    "Pernah > 3 Tahun": 70,
    "Pernah < 3 Tahun": 30,
}


def hitung_skor(data: SekolahCreate):
    skor_siswa = min(data.jumlah_siswa / 5, 100)
    skor_kondisi = KONDISI_BANGUNAN_BOBOT[data.kondisi_bangunan]
    skor_ruang = min(data.jumlah_ruang * 8, 100)
    skor_luas = min(data.luas_ruang, 100)
    skor_kapasitas = min(data.kapasitas_ruang * 3, 100)
    skor_buku = min(data.jumlah_buku * 2, 100)
    skor_riwayat = RIWAYAT_BANTUAN_BOBOT[data.riwayat_bantuan]

    total = (
        skor_siswa * 0.15
        + skor_kondisi * 0.30
        + skor_ruang * 0.15
        + skor_luas * 0.10
        + skor_kapasitas * 0.10
        + skor_buku * 0.10
        + skor_riwayat * 0.10
    )

    return round(total, 2)

class MaxHeap:

    def __init__(self):
        self.heap = []

    def parent(self, i):
        return (i - 1) // 2

    def left(self, i):
        return 2 * i + 1

    def right(self, i):
        return 2 * i + 2

    def insert(self, item):

        self.heap.append(item)

        self.heapify_up(
            len(self.heap) - 1
        )

    def heapify_up(self, i):

        while (
            i > 0 and
            self.heap[self.parent(i)]["skor_urgensi"]
            <
            self.heap[i]["skor_urgensi"]
        ):

            p = self.parent(i)

            self.heap[i], self.heap[p] = (
                self.heap[p],
                self.heap[i]
            )

            i = p

    def extract_max(self):

        if not self.heap:
            return None

        root = self.heap[0]

        last = self.heap.pop()

        if self.heap:

            self.heap[0] = last

            self.heapify_down(0)

        return root

    def heapify_down(self, i):

        n = len(self.heap)

        while True:

            l = self.left(i)

            r = self.right(i)

            largest = i

            if (
                l < n and
                self.heap[l]["skor_urgensi"]
                >
                self.heap[largest]["skor_urgensi"]
            ):
                largest = l

            if (
                r < n and
                self.heap[r]["skor_urgensi"]
                >
                self.heap[largest]["skor_urgensi"]
            ):
                largest = r

            if largest == i:
                break

            self.heap[i], self.heap[largest] = (
                self.heap[largest],
                self.heap[i]
            )

            i = largest

    def sorted_desc(self):

        clone = MaxHeap()

        clone.heap = list(self.heap)

        result = []

        while clone.heap:
            result.append(
                clone.extract_max()
            )

        return result


@api_router.get("/")
async def root():

    return {
        "message": "Max Heap API Running"
    }


sekolah_list = []

@api_router.post("/sekolah")
async def create_sekolah(payload: SekolahCreate):

    skor = hitung_skor(payload)

    sekolah = Sekolah(
        **payload.model_dump(),
        skor_urgensi=skor
    )

    sekolah_dict = sekolah.model_dump()

    sekolah_list.append(sekolah_dict)

    return sekolah_dict


@api_router.get("/sekolah")
async def list_sekolah():

    heap = MaxHeap()

    for data in sekolah_list:
        heap.insert(data)

    return heap.sorted_desc()


@api_router.delete("/sekolah")
async def reset_sekolah():

    total = len(sekolah_list)

    sekolah_list.clear()

    return {
        "deleted": total
    }

app.include_router(api_router)

FRONTEND_BUILD_DIR = ROOT_DIR.parent / "frontend" / "build"

print("FRONTEND BUILD:", FRONTEND_BUILD_DIR)
print("INDEX EXISTS:", (FRONTEND_BUILD_DIR / "index.html").exists())

app.mount(
    "/static",
    StaticFiles(directory=FRONTEND_BUILD_DIR / "static"),
    name="static"
)

@app.get("/")
async def serve_home():
    return FileResponse(FRONTEND_BUILD_DIR / "index.html")

@app.get("/{full_path:path}")
async def serve_react(full_path: str):
    return FileResponse(FRONTEND_BUILD_DIR / "index.html")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
