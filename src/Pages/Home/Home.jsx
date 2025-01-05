import "./Home.css";
import Sidebar from "./../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import { Auth } from "../../UseContext/AuthContext";
import { useContext } from "react";
function Home() {
  const { Sidebar: sidebar, setSidebar } = useContext(Auth);
  return (
    <>
      <Sidebar />
      <div className={`container ${sidebar ? "large-container" : ""}`}>
        <Feed />
      </div>
    </>
  );
}

export default Home;
