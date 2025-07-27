import { Storage } from './storage/Storage.js';
import { NoteController } from './controllers/NoteController.js';

const username = Storage.getCurrentUser();
if (!username) {
  window.location.href = 'auth.html';
}

document.getElementById("currentUser").textContent = username;
const logoutBtn = document.getElementById("logoutBtn");
const titleInput = document.getElementById("noteTitle");
const contentInput = document.getElementById("noteContent");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const notesList = document.getElementById("notesList");

const noteCtrl = new NoteController(username);
let editingId = null;

logoutBtn.addEventListener("click", () => {
  Storage.clearCurrentUser();
  window.location.href = 'auth.html';
});

saveNoteBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title || !content) return alert("Both fields required");

  if (editingId) {
    noteCtrl.updateNote(editingId, title, content);
    editingId = null;
    saveNoteBtn.textContent = "Save Note";
  } else {
    noteCtrl.addNote(title, content);
  }

  titleInput.value = "";
  contentInput.value = "";
  renderNotes();
});

function renderNotes() {
  notesList.innerHTML = "";
  const notes = noteCtrl.getAllNotes();
  notes.forEach(note => {
    const li = document.createElement("li");
    li.className = "border p-2 rounded bg-gray-50";

    li.innerHTML = `
      <strong>${note.title}</strong>
      <p>${note.content}</p>
      <div class="flex gap-2 mt-2">
        <button class="text-blue-500" onclick="editNote(${note.id})">Edit</button>
        <button class="text-red-500" onclick="deleteNote(${note.id})">Delete</button>
      </div>
    `;

    notesList.appendChild(li);
  });
}

// Global so we can call from inline
window.editNote = (id) => {
  const note = noteCtrl.getAllNotes().find(n => n.id === id);
  if (!note) return;

  editingId = id;
  titleInput.value = note.title;
  contentInput.value = note.content;
  saveNoteBtn.textContent = "Update Note";
};

window.deleteNote = (id) => {
  noteCtrl.deleteNote(id);
  renderNotes();
};

renderNotes();
