import { AuthController } from './controllers/AuthController.js';

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

document.getElementById("registerBtn").addEventListener("click", () => {
  const res = AuthController.register(usernameInput.value.trim(), passwordInput.value.trim());
  alert(res.message);
});

document.getElementById("loginBtn").addEventListener("click", () => {
  const res = AuthController.login(usernameInput.value.trim(), passwordInput.value.trim());
  if (res.success) {
    window.location.href = 'dashboard.html';
  } else {
    alert(res.message);
  }
});
