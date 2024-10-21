const musicContainer = document.getElementById("musicContainer");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const songListContainer = document.getElementById("songList");
const progressHandle = document.getElementById("progressHandle");

let isDragging = false;

const musicList = [
    {
        name: "Một Phút",
        path: './music/mot_phut.mp3',
        image: './images/mot_phut.jpg',
    },
    {
        name: "Hẹn Yêu",
        path: './music/hen_yeu.mp3',
        image: './images/hen_yeu.jpg',
    },
    {
        name: "Rời Xa",
        path: './music/roi_xa.mp3',
        image: './images/roi_xa.jpg',
    },
    {
        name: 'Sài Gòn Hôm Nay Mưa',
        path: './music/song1.mp3',
        image: './images/song1.jpg'
    },
    {
        name: 'Forget Me Now',
        path: './music/song2.mp3',
        image: './images/song2.jpg'
    },
    {
        name: 'Anh Sẽ Đón Em',
        path: './music/song3.mp3',
        image: './images/song3.jpg'
    },
    {
        name: 'Thích Em Hơi Nhiều',
        path: './music/song4.mp3',
        image: './images/song4.jpg'
    },
    {
        name: 'Tell Ur Mom II',
        path: './music/song5.mp3',
        image: './images/song5.jpg'
    },
];

let songIndex = 0;

function updateSongSelection() {
    const songItems = document.querySelectorAll('.songItem');
    songItems.forEach((item, idx) => {
        item.classList.toggle('selected', idx === songIndex);
    });
}

musicList.forEach((song, index) => {
    const songItem = document.createElement("div");
    songItem.classList.add("songItem");
    songItem.innerText = song.name;

    songItem.addEventListener("click", () => {
        songIndex = index;
        updateSongSelection();
        loadSong();
        playSong();
    });

    songListContainer.appendChild(songItem);
});

function loadSong() {
    title.innerText = musicList[songIndex].name;
    audio.src = musicList[songIndex].path;
    cover.src = musicList[songIndex].image;
}

function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.replace("fa-play", "fa-pause");
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.replace("fa-pause", "fa-play");
    audio.pause();
}

function prevSong() {
    songIndex = (songIndex > 0) ? songIndex - 1 : musicList.length - 1;
    updateSongSelection();
    loadSong();
    playSong();
}

function nextSong() {
    songIndex = (songIndex < musicList.length - 1) ? songIndex + 1 : 0;
    updateSongSelection();
    loadSong();
    playSong();
}

playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");
    isPlaying ? pauseSong() : playSong();
});


// Cập nhật thanh tiến trình
function updateProgress(e) {
    if (!isDragging) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        progressHandle.style.left = `${progressPercent}%`;
    }
}

// Thiết lập thanh tiến trình
function setProgress(e) {
    const width = progressContainer.clientWidth;
    const offsetX = e.offsetX || e.clientX - progressContainer.getBoundingClientRect().left; // Lấy tọa độ X của chuột
    console.log('Offset X:', offsetX); // Kiểm tra giá trị của clickX (ở đây là offsetX)

    if (!isNaN(audio.duration) && audio.duration > 0) {
        audio.currentTime = (offsetX / width) * audio.duration;
        console.log('Current time set to:', audio.currentTime);
    }
    setTimeout(updateProgressFromCurrentTime, 10);
}
// Cập nhật thanh tiến trình từ thời gian hiện tại
function updateProgressFromCurrentTime() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    console.log('ok', audio.currentTime);
    
    progress.style.width = `${progressPercent}%`;
    progressHandle.style.left = `${progressPercent}%`;
}

progressHandle.addEventListener("mousedown", () => {
    isDragging = true;
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
});



function onDrag(e) {
    if (isDragging) {
        const progressContainerRect = progressContainer.getBoundingClientRect();
        const offsetX = e.clientX - progressContainerRect.left;
        let progressPercent = (offsetX / progressContainerRect.width) * 100;

        // Giới hạn vị trí trong khoảng 0 - 100%
        progressPercent = Math.max(0, Math.min(progressPercent, 100));
        

        // Cập nhật vị trí của progress và handle
        progress.style.width = `${progressPercent}%`;
        progressHandle.style.left = `${progressPercent}%`;
        

        // Cập nhật thời gian hiện tại của audio
        audio.currentTime = (progressPercent / 100) * audio.duration;
        console.log("Updated Current Time:", audio.currentTime);
        // Cập nhật thanh tiến trình
    }
}


function stopDrag() {
    isDragging = false;
    
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
    
}

// Lắng nghe sự kiện khi next và prev bài hát
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Cập nhật thời gian/bài hát
audio.addEventListener("timeupdate", updateProgress);

// Nhấp chuột vào thanh tiến trình
progressContainer.addEventListener("click", setProgress);

// Lắng nghe sự kiện khi kết thúc bài hát
audio.addEventListener("ended", nextSong);

// Tải bài hát đầu tiên
loadSong();
updateSongSelection();



////////////Form
const musicInput = document.getElementById("musicInput");
const imageInput = document.getElementById("imageInput");
const musicFileName = document.getElementById("musicFileName");
const imageFileName = document.getElementById("imageFileName");
const form = document.querySelector("form")
form.style.display = "none"
const content = document.querySelector(".content")

let isAppear = false;

function formPopup(isAppear) {
    if (!isAppear) {
        form.style.display = "none";
        content.style.pointerEvents = "auto";
        content.style.opacity = 1
    } else {
        form.style.display = "flex";
        content.style.opacity = 0.3;
        content.style.pointerEvents = "none";
        form.style.opacity = 1;
    }

}

document.getElementById('iconUpload').addEventListener('click', () => {
    isAppear = true
    formPopup(isAppear)
})
document.getElementById('closeForm').addEventListener('click', (event) => {
    event.preventDefault(); 
    isAppear = false; 
    formPopup(isAppear);
});


form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const songTitle = document.getElementById('songTitle').value;
    const musicFile = musicInput.files[0];
    const imageFile = imageInput.files[0];

    if (!musicFile || !imageFile) {
        alert("Vui lòng chọn cả file nhạc và ảnh bìa.");
        return;
    }

    const musicPath = URL.createObjectURL(musicFile);
    const imagePath = URL.createObjectURL(imageFile);

    const newSong = {
        name: songTitle,
        path: musicPath,
        image: imagePath
    };

    musicList.push(newSong);

    const songItem = document.createElement("div");
    songItem.classList.add("songItem");
    songItem.innerText = newSong.name;

    songItem.addEventListener("click", () => {
        songIndex = musicList.length - 1; 
        updateSongSelection();
        loadSong();
        playSong();
    });

    songListContainer.appendChild(songItem); // Thêm bài hát vào danh sách

    isAppear = false;
    formPopup(isAppear);

    form.reset();
    musicFileName.innerText = "";
    imageFileName.innerText = "";
});


musicInput.addEventListener('change', (event) => {
    musicFileName.innerText = event.target.files[0].name;
});

imageInput.addEventListener('change', (event) => {
    imageFileName.innerText = event.target.files[0].name;
});
const musicUploadText = document.querySelector('.music .upload')

function fileUpload(file) {
    if (file) {
        musicUploadText.style.display = none
    }
}