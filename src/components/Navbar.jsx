import { getUser, clearAuth } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div style={{
      width: "100%",
      background: "#fff",
      borderBottom: "1px solid #ddd",
      padding: "10px 0",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        
        {/* ---- Left Logo + Search ---- */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          
          {/* LinkedIn Logo */}
          <h2 style={{ color: "#0A66C2", fontWeight: "700", margin: "0 10px" }}>in</h2>

          {/* Search Bar */}
          <div style={{
            background: "#eef3f8",
            padding: "8px 12px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            width: "250px"
          }}>
            <FiSearch color="#555" size={18} />
            <input
              type="text"
              placeholder="Search"
              style={{
                border: "none",
                background: "transparent",
                outline: "none",
                marginLeft: "8px",
                width: "100%"
              }}
            />
          </div>
        </div>

        {/* ---- Right Menu ---- */}
        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          
          <Link to="/feed" style={{ textAlign:"center", fontSize:"14px" }}>
            <FaHome size={20} /><br />Home
          </Link>

          <Link to="/profile" style={{ textAlign:"center", fontSize:"14px" }}>
            <FaUserAlt size={20} /><br />Profile
          </Link>

          {/* Profile Pic */}
          <img
            src={`http://localhost:5000${user?.profileImage}`}
            alt="dp"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #0A66C2"
            }}
          />

          <button
            onClick={logout}
            style={{
              background: "#0A66C2",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
