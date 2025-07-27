export class Storage {
  static getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  static saveUser(user) {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  static getNotes(username) {
    return JSON.parse(localStorage.getItem(`notes_${username}`) || '[]');
  }

  static saveNotes(username, notes) {
    localStorage.setItem(`notes_${username}`, JSON.stringify(notes));
  }

  static getCurrentUser() {
    return localStorage.getItem('currentUser');
  }

  static setCurrentUser(username) {
    localStorage.setItem('currentUser', username);
  }

  static clearCurrentUser() {
    localStorage.removeItem('currentUser');
  }
}
