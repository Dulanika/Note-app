// Get existing users from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Save users
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Register user
function register(username, password) {
  const users = getUsers();
  // Check if user already exists
  if (users.find(u => u.username === username)) {
    alert("Username already exists!");
    return false;
  }

  users.push({ username, password });
  saveUsers(users);
  alert("Registration successful! Please login.");
  return true;
}

// Login user
function login(username, password) {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem("loggedInUser", username);
    return true;
  }
  return false;
}

// Logout user
function logout() {
  localStorage.removeItem("loggedInUser");
}

// Check if user is logged in
function isLoggedIn() {
  return !!localStorage.getItem("loggedInUser");
}

// Get current logged in user
function getLoggedInUser() {
  return localStorage.getItem("loggedInUser");
}
