import Models from "./pages/Models";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddModel from "./pages/AddModel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/addModel" element={<AddModel />} />
        <Route path="/" element={<Models/>} />
        <Route path="/updateModel/:id" element={<AddModel />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
