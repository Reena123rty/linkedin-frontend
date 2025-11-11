import { useState } from "react";
import api from "../services/api";

export default function CommentBox({ postId, onSuccess }) {
  const [text, setText] = useState("");

  const submitComment = async () => {
    if (!text.trim()) return;
    try {
      const token = localStorage.getItem("token");

      await api.post(`/posts/${postId}/comment`, { text }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setText("");
      onSuccess?.();
    } catch (err) {
      console.log("Comment error:", err);
    }
  };

  return (
    <div style={{ marginTop: 8 }}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "75%",
          padding: 8,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
        onKeyDown={(e) => e.key === "Enter" && submitComment()}
      />

      <button
        onClick={submitComment}
        style={{
          background: "#0A66C2",
          color: "white",
          padding: "8px 12px",
          marginLeft: 6,
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
        }}
      >
        Comment
      </button>
    </div>
  );
}
