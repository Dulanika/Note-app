let notes = []; // to start from scrach
let currentEditId = null;

// Variables

const titleInput = document.getElementById("noteTitle");
const contentInput = document.getElementById("noteContent");
const notesList = document.getElementById("notesList");
const noteForm = document.getElementById("noteForm");

// Load notes from storage

function getNotes() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
  } else {
    notes = [];
  }
}

// Save notes to storage

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Display notes

function renderNotes() {
  notesList.innerHTML = ""; // Clear old notes

  notes.forEach(note => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add(
      "bg-white", "p-4", "rounded", "shadow", "flex", "flex-col", "gap-2"
    );

    noteDiv.innerHTML = `
      <div class="font-semibold text-lg">${note.title}</div>
      <div class="text-gray-700">${note.content}</div>
      <div class="flex gap-2 mt-2">
        <button data-id="${note.id}" class="delete-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
        <button data-id="${note.id}" class="edit-btn bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Edit</button>
      </div>
    `;

    // Add event listeners
    noteDiv.querySelector(".delete-btn").addEventListener("click", () => {
      deleteNote(note.id);
    });

    noteDiv.querySelector(".edit-btn").addEventListener("click", () => {
      editNote(note.id);
    });

    notesList.appendChild(noteDiv);
  });
}

// Add new note

function addNote() {
  const newNote = {
    id: Date.now(),
    title: titleInput.value,
    content: contentInput.value
  };
  notes.push(newNote);
  saveNotes();
  renderNotes();
  clearForm();
}

// Edit note 

function editNote(id) {
  const note = notes.find(n => n.id === id);
  if (note) {
    titleInput.value = note.title;
    contentInput.value = note.content;
    currentEditId = id;
  }
}

// Update existing note

function updateNote() {
  const noteIndex = notes.findIndex(n => n.id === currentEditId);
  if (noteIndex !== -1) {
    notes[noteIndex].title = titleInput.value;
    notes[noteIndex].content = contentInput.value;
    saveNotes();
    renderNotes();
    clearForm();
    currentEditId = null;
  }
}

// Delete note

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  renderNotes();
}

// Clear form

function clearForm() {
  titleInput.value = "";
  contentInput.value = "";
}

// Form submit handler

noteForm.addEventListener("submit", function(e) {
  e.preventDefault();
  if (currentEditId) {
    updateNote();
  } else {
    addNote();
  }
});

// Initialize on load

getNotes();
renderNotes(); 