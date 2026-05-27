import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import InputData from "./pages/InputData";
import Hasil from "./pages/Hasil";

import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/input" element={<InputData />} />
          <Route path="/hasil" element={<Hasil />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;