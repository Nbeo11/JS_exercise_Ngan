const fileItems = document.querySelector('.items')

const text = document.querySelector('.upload');

function fileUpload(files) {
    if (files.length > 0) {
        text.style.display = "none"
    }
    Array.from(files).forEach(item => {
        const box = document.createElement('div');
        box.className = 'file-box';
        box.setAttribute('draggable', true);
        box.ondragstart = (e) => drag(e, item);

        const img = document.createElement('img');
        const exit = document.createElement('button')

        if (item.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
            }; 
            reader.readAsDataURL(item);
        } else {
            img.style.background = "gray"
        }
      
        
        exit.innerText = "X"
        const fileName = document.createElement('p');
        fileName.innerText = item.name
        
        img.style.width = '150px';
        img.style.height = '150px';
        box.appendChild(img);
        box.appendChild(exit);
        box.appendChild(fileName)
        

        fileItems.appendChild(box);

        exit.addEventListener("click", () => {
            fileItems.removeChild(box)
        })
    });
    console.log("files", files);
}

document.getElementById('fileInput').addEventListener('change', function (event) {
    const files = event.target.files;
    fileUpload(files)
})

function allowDrop(event) {
    event.preventDefault();
}

function drag(event, fileName) {
    event.dataTransfer.setData("text/plain", fileName);
}

function drop(event) {
    event.preventDefault();
    let files = event.dataTransfer.files;
    fileUpload(files);
}