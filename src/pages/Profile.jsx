import { useState } from "react";
import api from "../services/api";
import { getUser } from "../services/auth";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState(getUser());
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const uploadProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const fd = new FormData();
      fd.append("profile", image);

      const res = await api.post("/users/upload-profile", fd, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = { ...user, profileImage: res.data.profileImage };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setMsg("✅ Profile Updated!");
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      setMsg("❌ Error uploading photo");
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
        <h2>👤 My Profile</h2>

        <div style={{
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          border: "1px solid #ddd",
        }}>
          <div style={{ textAlign: "center" }}>
            <img
              src={
                user?.profileImage
                  ? `http://localhost:5000${user.profileImage}`
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #0A66C2",
                marginBottom: 10,
              }}
            />

            <h3>{user?.name}</h3>
            <p>Email: {user?.email}</p>
            <p>Joined: {user?.createdAt?.split("T")[0]}</p>
            <p>Posts: {user?.postsCount || 0}</p>
          </div>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ marginTop: 10 }}
          />

          <button
            onClick={uploadProfile}
            style={{
              marginTop: 10,
              background: "#0A66C2",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              width: "100%"
            }}
          >
            Upload Photo
          </button>

          {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
        </div>
      </div>
    </div>
  );
}
