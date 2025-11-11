// ✅ Save token + user
export function setAuth(token, user, remember = true) {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("token", token);
  storage.setItem("user", JSON.stringify(user));
}

// ✅ Get logged-in user
export function getUser() {
  try {
    const data = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (!data || data === "undefined") return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

// ✅ Logout function (renamed so Navbar works)
export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
}

// ✅ Update user in localStorage when DP changes
export function updateUser(newUser) {
  localStorage.setItem("user", JSON.stringify(newUser));
}
