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
            // Cập nhật ghi chú hiện có
            currentEditingNote.title = titleText;
            currentEditingNote.content = contentText;
        } else {
            // Tạo một ghi chú mới
            const newNote = { title: titleText, content: contentText };
            noteArr.push(newNote);
        }
        // Lưu mảng đã cập nhật vào localStorage
        localStorage.setItem("array", JSON.stringify(noteArr));
        
        // Hiển thị lại danh sách ghi chú đã cập nhật
        loadNotes();
        
        // Xóa các trường nhập sau khi gửi
        document.querySelector("input").value = '';
        document.querySelector("textarea").value = '';

        // Đặt lại ghi chú đang chỉnh sửa
        currentEditingNote = null;
        
        // Đóng popup form
        isAppear = false;
        formPopup(isAppear);
    }
});

function deleteNote(title) {
    noteArr = noteArr.filter(note => note.title !== title);
    localStorage.setItem("array", JSON.stringify(noteArr));
    loadNotes();
}

let currentEditingNote = null; // Biến để theo dõi ghi chú đang được chỉnh sửa

function editNote(title) {
    // Tìm ghi chú cần chỉnh sửa
    currentEditingNote = noteArr.find(note => note.title === title);
    
    // Điền form với thông tin của ghi chú hiện tại
    document.querySelector("input").value = currentEditingNote.title;
    document.querySelector("textarea").value = currentEditingNote.content;

    // Hiện form
    isAppear = true; // Cập nhật biến này dựa trên logic hiển thị
    formPopup(isAppear);
}

function cancelNote() {
    // Đặt lại các trường nhập liệu
    document.querySelector("input").value = '';
    document.querySelector("textarea").value = '';

    // Đặt lại ghi chú đang chỉnh sửa
    currentEditingNote = null;

    // Đóng popup form
    isAppear = false;
    formPopup(isAppear);
}
