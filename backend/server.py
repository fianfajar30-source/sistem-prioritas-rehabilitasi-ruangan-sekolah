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

KondisiType = Literal[
    "Rusak Berat",
    "Rusak Sedang",
    "Rusak Ringan"
]

KeamananType = Literal[
    "Aman",
    "Rawan",
    "Berbahaya"
]

RiwayatBantuanType = Literal[
    "Belum Pernah",
    "Pernah > 3 Tahun",
    "Pernah < 3 Tahun"
]


class SekolahCreate(BaseModel):
    nama: str
    alamat: str
    jumlah_siswa: int = Field(ge=0)
    kondisi_fasilitas: KondisiType
    jumlah_ruang_rusak: int = Field(ge=0)
    jarak_ke_kota: float = Field(ge=0)
    keamanan_bangunan: KeamananType
    riwayat_bantuan: RiwayatBantuanType

class Sekolah(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))

    nama: str
    alamat: str
    jumlah_siswa: int
    kondisi_fasilitas: KondisiType
    jumlah_ruang_rusak: int
    jarak_ke_kota: float
    keamanan_bangunan: KeamananType
    riwayat_bantuan: RiwayatBantuanType

    skor_urgensi: float


KONDISI_BOBOT = {
    "Rusak Berat": 100,
    "Rusak Sedang": 60,
    "Rusak Ringan": 30,
}

KEAMANAN_BOBOT = {
    "Berbahaya": 100,
    "Rawan": 70,
    "Aman": 20,
}

RIWAYAT_BANTUAN_BOBOT = {
    "Belum Pernah": 100,
    "Pernah > 3 Tahun": 60,
    "Pernah < 3 Tahun": 20,
}


def hitung_skor(data: SekolahCreate):

    skor_kondisi = KONDISI_BOBOT[data.kondisi_fasilitas]

    skor_ruang = min(
        data.jumlah_ruang_rusak * 8,
        80
    )

    skor_jarak = min(
        data.jarak_ke_kota * 1.2,
        60
    )

    skor_siswa = min(
        data.jumlah_siswa / 20,
        50
    )

    skor_keamanan = KEAMANAN_BOBOT[data.keamanan_bangunan]

    skor_riwayat = RIWAYAT_BANTUAN_BOBOT[data.riwayat_bantuan]

    total = (
        skor_kondisi * 0.30
        + skor_ruang * 0.20
        + skor_siswa * 0.15
        + skor_jarak * 0.10
        + skor_keamanan * 0.15
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