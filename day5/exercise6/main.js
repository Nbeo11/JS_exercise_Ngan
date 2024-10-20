let noteArr = JSON.parse(localStorage.getItem("array")) || [];
let isAppear = false;
const content = document.querySelector(".content")
const container = document.querySelector("html")
const form = document.querySelector("form")
const nodeList = document.querySelector(".nodeList")
form.style.display = "none"
function loadNotes() {
    nodeList.innerHTML = '';
    noteArr.forEach((note) => {
        const noteHTML = `
            <div class = "nodeItem">
                <div class="noteContainer">
                    <h3 class="noteTitle">${note.title}</h3>
                    <p class="noteContent">${note.content}</p>
                </div>
                <div class="buttonContainer">
                    <button class="editButton" onclick="editNote('${note.title}')">Edit</button>
                    <button class="deleteButton" onclick="deleteNote('${note.title}')">Delete</button>
                </div>
            </div>           
        `;
        nodeList.innerHTML += noteHTML;
    });
}

loadNotes();
function formPopup(isAppear) {
    if (!isAppear) {
        form.style.display = "none";
        content.style.opacity = 1
        container.style.backgroundColor = "#FFFFFF"

    } else {
        form.style.display = "flex";
        content.style.opacity = 0.5
        container.style.backgroundColor = "#CCCCCC"
        form.style.opacity = 1
    }

}

document.querySelector(".addNew").addEventListener('click', () => {
    isAppear = true
    formPopup(isAppear)
})


document.querySelector('.formNote').addEventListener('submit', function (event) {
    event.preventDefault();

    const titleText = document.querySelector("input").value;
    const contentText = document.querySelector("textarea").value;

    if (titleText || contentText) {
        if (currentEditingNote) {
            currentEditingNote.title = titleText;
            currentEditingNote.content = contentText;
        } else {
            const newNote = { title: titleText, content: contentText };
            noteArr.push(newNote);
        }
        localStorage.setItem("array", JSON.stringify(noteArr));

        loadNotes();

        document.querySelector("input").value = '';
        document.querySelector("textarea").value = '';

        currentEditingNote = null;

        isAppear = false;
        formPopup(isAppear);
    }
});

function deleteNote(title) {
    noteArr = noteArr.filter(note => note.title !== title);
    localStorage.setItem("array", JSON.stringify(noteArr));
    loadNotes();
}

let currentEditingNote = null;

function editNote(title) {
    currentEditingNote = noteArr.find(note => note.title === title);

    document.querySelector("input").value = currentEditingNote.title;
    document.querySelector("textarea").value = currentEditingNote.content;

    isAppear = true;
    formPopup(isAppear);
}

function cancelNote() {
    document.querySelector("input").value = '';
    document.querySelector("textarea").value = '';

    currentEditingNote = null;

    isAppear = false;
    formPopup(isAppear);
}
