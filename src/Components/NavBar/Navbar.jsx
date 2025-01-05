import "./Navbar.css";
import { IoIosMenu } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { IoIosMic } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";
import { Auth } from "../../UseContext/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const { Sidebar, setSidebar } = useContext(Auth);
  const Navigate = useNavigate();
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <div className="menu-icon" onClick={() => setSidebar(!Sidebar)}>
          <IoIosMenu />
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/YouTube_2024.svg/2880px-YouTube_2024.svg.png"
          alt="youtube"
          className="logo"
          onClick={() => Navigate("/", { replace: true })}
        />
      </div>
      <div className="nav-middle flex-div">
        <div className="search-box">
          <input type="text" placeholder="Search" className="search" />
          <div className="search-icon">
            <LuSearch />
          </div>
        </div>
        <div className="mic">
          <IoIosMic />
        </div>
      </div>
      <div className="nav-right flex-div">
        <div className="create">
          <BsPlusLg /> <p>Create</p>
        </div>
        <div className="notification">
          <IoIosNotifications />
        </div>
        <div className="profile">
          <img
            src="https://plus.unsplash.com/premium_vector-1733477278069-40e5216c45d0?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="icon"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
