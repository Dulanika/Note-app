import { Note } from '../models/Note.js';
import { Storage } from '../storage/Storage.js';

export class NoteController {
  constructor(username) {
    this.username = username;
    this.notes = Storage.getNotes(this.username);
  }

  addNote(title, content) {
    const note = new Note(title, content);
    this.notes.push(note);
    Storage.saveNotes(this.username, this.notes);
  }

  updateNote(id, title, content) {
    const note = this.notes.find(n => n.id === id);
    if (note) {
      note.title = title;
      note.content = content;
      Storage.saveNotes(this.username, this.notes);
    }
  }

  deleteNote(id) {
    this.notes = this.notes.filter(n => n.id !== id);
    Storage.saveNotes(this.username, this.notes);
  }

  getAllNotes() {
    return this.notes;
  }
}
