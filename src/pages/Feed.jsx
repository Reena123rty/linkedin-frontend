// ✅ LinkedIn Feed Page with Left + Center + Right Layout

import { useState, useEffect } from "react";
import api from "../services/api";
import { getUser } from "../services/auth";
import Navbar from "../components/Navbar";

import LeftSidebar from "../components/layout/LeftSidebar";
import RightSidebar from "../components/layout/RightSidebar";
import FeedLayout from "../components/layout/FeedLayout";
import CommentBox from "../components/CommentBox";

export default function Feed() {
  const user = getUser();
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const loadPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.get("/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(data);
    } catch {
      setMsg("❌ Error loading posts");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const submitPost = async () => {
    if (!text.trim() && !image) return;

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("text", text);
      if (image) formData.append("image", image);

      await api.post("/posts/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setText("");
      setImage(null);
      setMsg("✅ Post Uploaded!");
      loadPosts();
      setTimeout(() => setMsg(""), 1500);
    } catch {
      setMsg("❌ Failed to post");
    }
  };

  const likePost = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.post(`/posts/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadPosts();
    } catch {
      setMsg("❌ Error liking post");
    }
  };

  // ✅ DELETE POST
  const deletePost = async (id) => {
    if (!window.confirm("⚠️ Delete this post?")) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMsg("🗑️ Post Deleted");
      loadPosts();
      setTimeout(() => setMsg(""), 1500);
    } catch {
      setMsg("❌ Error deleting post");
    }
  };

  return (
    <>
      <Navbar />

      <FeedLayout
        left={<LeftSidebar />}
        center={
          <div style={{ padding: 20 }}>

            {/* ✅ Create Post Box */}
            <div style={{
              background: "#fff",
              padding: 15,
              borderRadius: 8,
              border: "1px solid #ddd",
              marginBottom: 20
            }}>
              <textarea
                placeholder="Start a post..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                  width: "100%",
                  padding: 14,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  marginBottom: 10,
                }}
              />

              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ marginBottom: 10 }}
              />

              <button
                onClick={submitPost}
                style={{
                  width: "100%",
                  background: "#0A66C2",
                  color: "#fff",
                  padding: 12,
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Post
              </button>

              {msg && <p style={{ textAlign: "center", marginTop: 10 }}>{msg}</p>}
            </div>

            {/* ✅ POST LIST */}
            <h3>📝 Recent Posts</h3>

            {posts.length === 0 ? (
              <p>👇 Posts will appear here soon!</p>
            ) : (
              posts.map((p) => (
                <div
                  key={p._id}
                  style={{
                    background: "#fff",
                    padding: 12,
                    marginTop: 12,
                    borderRadius: 8,
                    border: "1px solid #ddd",
                  }}
                >
                  <b>{p.user?.name}</b>
                  <p>{p.content || p.text}</p>

                  {p.image && (
                    <img
                      src={`http://localhost:5000${p.image}`}
                      alt="post"
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        marginTop: 8,
                      }}
                    />
                  )}

                  {/* ✅ ACTION ROW (Like + Delete) */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 12,
                    paddingTop: 10,
                    borderTop: "1px solid #ddd"
                  }}>

                    <button
                      onClick={() => likePost(p._id)}
                      style={{
                        flex: 1,
                        padding: "10px",
                        background: "transparent",
                        color: "#0A66C2",
                        border: "1px solid #0A66C2",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      👍 Like ({p.likes?.length || 0})
                    </button>

                    {p?.user?._id === user?._id && (
                      <button
                        onClick={() => deletePost(p._id)}
                        style={{
                          width: "40px",
                          height: "40px",
                          background: "#fff",
                          border: "1px solid #FF4D4D",
                          color: "#FF4D4D",
                          borderRadius: "50%",
                          cursor: "pointer",
                          fontSize: "18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "10px",
                        }}
                        title="Delete Post"
                      >
                        🗑️
                      </button>
                    )}
                  </div>

                  {/* ✅ Comments */}
                  <div style={{ marginTop: 10 }}>
                    <h4>💬 Comments</h4>

                    {p.comments?.map((c, i) => (
                      <div
                        key={i}
                        style={{
                          background: "#f5f5f5",
                          padding: 8,
                          borderRadius: 6,
                          marginBottom: 6,
                        }}
                      >
                        <b>{c.user?.name}: </b> {c.text}
                      </div>
                    ))}

                    <CommentBox postId={p._id} onSuccess={loadPosts} />
                  </div>

                  <small style={{ color: "gray" }}>
                    {new Date(p.createdAt).toLocaleString()}
                  </small>
                </div>
              ))
            )}
          </div>
        }
        right={<RightSidebar />}
      />
    </>
  );
}
