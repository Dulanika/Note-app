export class User {
  constructor(username, password) {
    this.username = username;
    this.password = password; // (Not secure: hashed storage can be added later)
  }
}
