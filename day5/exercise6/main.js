let noteArr = []
let isAppear = false;
const content = document.querySelector(".content")
const container = document.querySelector("html")
const form = document.querySelector("form")

form.style.display = "none"


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

const nodeList = document.querySelector(".nodeList")

document.querySelector('.formNote').addEventListener('submit', function (event) {
    event.preventDefault()
    const title = document.createElement('div');
    const titleContent = document.createElement('div')
    const deleteButton = document.createElement('button')
    const editButton = document.createElement('button')
    const nodeItem = document.createElement('div')
    title.innerText = document.querySelector("input").value
    titleContent.innerText = document.querySelector("textarea").value
    deleteButton.innerText = "delete"
    editButton.innerText = "edit"

    const titleText = document.querySelector("input").value;
    const contentText = document.querySelector("textarea").value;

    if (titleText != "" || contentText != "") {
        nodeList.append(nodeItem);
        nodeItem.appendChild(title)
        nodeItem.appendChild(titleContent)
        nodeItem.appendChild(deleteButton)
        nodeItem.appendChild(editButton)
        noteArr.push({ title: titleText, content: contentText });
        console.log(noteArr)
    }
    deleteButton.addEventListener('click', () => {
        nodeList.removeChild(nodeItem)
    })
    console.log(title.innerText)
    isAppear = false
    formPopup(isAppear)
})
