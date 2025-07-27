import { User } from '../models/User.js';
import { Storage } from '../storage/Storage.js';

export class AuthController {
  static register(username, password) {
    const users = Storage.getUsers();
    const exists = users.some(u => u.username === username);
    if (exists) return { success: false, message: "Username already exists" };

    const newUser = new User(username, password);
    Storage.saveUser(newUser);
    return { success: true, message: "User registered" };
  }

  static login(username, password) {
    const users = Storage.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return { success: false, message: "Invalid credentials" };

    Storage.setCurrentUser(username);
    return { success: true, message: "Login successful" };
  }

  static logout() {
    Storage.clearCurrentUser();
  }
}
