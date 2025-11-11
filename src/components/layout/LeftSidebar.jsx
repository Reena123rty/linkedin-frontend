import { getUser } from "../../services/auth";

export default function LeftSidebar() {
  const user = getUser();

  return (
    <div style={{
      width: "250px",
      background: "white",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "15px",
      textAlign: "center"
    }}>
      <img
        src={`http://localhost:5000${user?.profileImage}`}
        alt="profile"
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "10px"
        }}
      />

      <h4>{user?.name}</h4>
      <p style={{ fontSize: "13px", color: "gray" }}>{user?.email}</p>

      <hr />

      <p style={{ fontSize: "14px", color: "#0a66c2" }}>
        🏆 Your connections are growing!
      </p>
    </div>
  );
}
