import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
function App() {
  return (
    <div>
      <Navbar />
      <Routes path="/">
        <Route index element={<Home />} />
        <Route path="video/:category/:id" element={<Video />} />
      </Routes>
    </div>
  );
}

export default App;
