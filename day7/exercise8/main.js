class Song {
    constructor(name, path, image) {
        this.name = name;
        this.path = path;
        this.image = image;
    }
}

class MusicPlayer {
    constructor(containerId) {
        this.musicContainer = document.getElementById(containerId);
        this.playBtn = document.getElementById("play");
        this.prevBtn = document.getElementById("prev");
        this.nextBtn = document.getElementById("next");
        this.audio = document.getElementById("audio");
        this.progress = document.getElementById("progress");
        this.progressContainer = document.getElementById("progressContainer");
        this.title = document.getElementById("title");
        this.cover = document.getElementById("cover");
        this.songListContainer = document.getElementById("songList");
        this.progressHandle = document.getElementById("progressHandle");

        this.musicList = [];
        this.songIndex = 0;
        this.isDragging = false;

        this.init();
    }

    init() {
        this.loadInitialSongs();
        this.addEventListeners();
        this.loadSong();
        this.updateSongSelection();
    }

    loadInitialSongs() {
        const initialSongs = [
            new Song("Một Phút", './music/mot_phut.mp3', './images/mot_phut.jpg'),
            new Song("Hẹn Yêu", './music/hen_yeu.mp3', './images/hen_yeu.jpg'),
            new Song("Rời Xa", './music/roi_xa.mp3', './images/roi_xa.jpg'),
            new Song('Sài Gòn Hôm Nay Mưa', './music/song1.mp3', './images/song1.jpg'),
            new Song('Forget Me Now', './music/song2.mp3', './images/song2.jpg'),
            new Song('Anh Sẽ Đón Em', './music/song3.mp3', './images/song3.jpg'),
            new Song('Thích Em Hơi Nhiều', './music/song4.mp3', './images/song4.jpg'),
            new Song('Tell Ur Mom II', './music/song5.mp3', './images/song5.jpg'),
        ];
        this.musicList.push(...initialSongs);
        this.renderSongList();
    }

    renderSongList() {
        this.musicList.forEach((song, index) => {
            const songItem = document.createElement("div");
            songItem.classList.add("songItem");
            songItem.innerText = song.name;
            songItem.addEventListener("click", () => {
                this.songIndex = index;
                this.updateSongSelection();
                this.loadSong();
                this.playSong();
            });
            this.songListContainer.appendChild(songItem);
        });
    }

    loadSong() {
        const currentSong = this.musicList[this.songIndex];
        this.title.innerText = currentSong.name;
        this.audio.src = currentSong.path;
        this.cover.src = currentSong.image;
    }

    playSong() {
        this.musicContainer.classList.add("play");
        this.playBtn.querySelector("i.fas").classList.replace("fa-play", "fa-pause");
        this.audio.play();
    }

    pauseSong() {
        this.musicContainer.classList.remove("play");
        this.playBtn.querySelector("i.fas").classList.replace("fa-pause", "fa-play");
        this.audio.pause();
    }

    prevSong() {
        this.songIndex = (this.songIndex > 0) ? this.songIndex - 1 : this.musicList.length - 1;
        this.updateSongSelection();
        this.loadSong();
        this.playSong();
    }

    nextSong() {
        this.songIndex = (this.songIndex < this.musicList.length - 1) ? this.songIndex + 1 : 0;
        this.updateSongSelection();
        this.loadSong();
        this.playSong();
    }

    updateSongSelection() {
        const songItems = document.querySelectorAll('.songItem');
        songItems.forEach((item, idx) => {
            item.classList.toggle('selected', idx === this.songIndex);
        });
    }

    updateProgress(e) {
        if (!this.isDragging) {
            const { duration, currentTime } = e.srcElement;
            const progressPercent = (currentTime / duration) * 100;
            this.progress.style.width = `${progressPercent}%`;
            this.progressHandle.style.left = `${progressPercent}%`;
        }
    }

    setProgress(e) {
        const width = this.progressContainer.clientWidth;
        const offsetX = e.offsetX || e.clientX - this.progressContainer.getBoundingClientRect().left;

        if (!isNaN(this.audio.duration) && this.audio.duration > 0) {
            this.audio.currentTime = (offsetX / width) * this.audio.duration;
        }
        setTimeout(() => this.updateProgressFromCurrentTime(), 10);
    }

    updateProgressFromCurrentTime() {
        const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
        this.progress.style.width = `${progressPercent}%`;
        this.progressHandle.style.left = `${progressPercent}%`;
    }

    addEventListeners() {
        this.playBtn.addEventListener("click", () => {
            const isPlaying = this.musicContainer.classList.contains("play");
            isPlaying ? this.pauseSong() : this.playSong();
        });

        this.prevBtn.addEventListener("click", () => this.prevSong());
        this.nextBtn.addEventListener("click", () => this.nextSong());

        this.audio.addEventListener("timeupdate", (e) => this.updateProgress(e));
        this.progressContainer.addEventListener("click", (e) => this.setProgress(e));
        this.audio.addEventListener("ended", () => this.nextSong());

        this.progressHandle.addEventListener("mousedown", () => {
            this.isDragging = true;
            document.addEventListener("mousemove", (e) => this.onDrag(e));
            document.addEventListener("mouseup", () => this.stopDrag());
        });
    }

    onDrag(e) {
        if (this.isDragging) {
            const progressContainerRect = this.progressContainer.getBoundingClientRect();
            const offsetX = e.clientX - progressContainerRect.left;
            let progressPercent = (offsetX / progressContainerRect.width) * 100;

            progressPercent = Math.max(0, Math.min(progressPercent, 100));
            this.progress.style.width = `${progressPercent}%`;
            this.progressHandle.style.left = `${progressPercent}%`;

            this.audio.currentTime = (progressPercent / 100) * this.audio.duration;
        }
    }

    stopDrag() {
        this.isDragging = false;
        document.removeEventListener("mousemove", (e) => this.onDrag(e));
        document.removeEventListener("mouseup", () => this.stopDrag());
    }
}

// Form handling class
class FormHandler {
    constructor() {
        this.musicInput = document.getElementById("musicInput");
        this.imageInput = document.getElementById("imageInput");
        this.musicFileName = document.getElementById("musicFileName");
        this.imageFileName = document.getElementById("imageFileName");
        this.form = document.querySelector("form");
        this.content = document.querySelector(".content");
        this.isAppear = false;
        console.log("hello", this.isAppear)
        this.formPopup();
        this.addEventListeners();
    }

    addEventListeners() {
        document.getElementById('iconUpload').addEventListener('click', () => {
            this.isAppear = true;
            this.formPopup();
        });

        document.getElementById('closeForm').addEventListener('click', (event) => {
            event.preventDefault();
            this.isAppear = false;
            this.formPopup();
            console.log("hello", this.isAppear)

        });

        this.form.addEventListener('submit', (event) => this.handleFormSubmit(event));
        this.musicInput.addEventListener('change', (event) => this.updateFileName(event, this.musicFileName));
        this.imageInput.addEventListener('change', (event) => this.updateFileName(event, this.imageFileName));
    }

    formPopup() {
        if (!this.isAppear) {
            this.form.style.display = "none";
            this.content.style.pointerEvents = "auto";
            this.content.style.opacity = 1;
        } else {
            this.form.style.display = "flex";
            this.content.style.opacity = 0.3;
            this.content.style.pointerEvents = "none";
            this.form.style.opacity = 1;
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const songTitle = document.getElementById('songTitle').value;
        const musicFile = this.musicInput.files[0];
        const imageFile = this.imageInput.files[0];

        if (!musicFile || !imageFile) {
            alert("Vui lòng chọn cả file nhạc và ảnh bìa.");
            return;
        }

        const musicPath = URL.createObjectURL(musicFile);
        const imagePath = URL.createObjectURL(imageFile);

        const newSong = new Song(songTitle, musicPath, imagePath);
        musicPlayer.musicList.push(newSong);

        const songItem = document.createElement("div");
        songItem.classList.add("songItem");
        songItem.innerText = newSong.name;

        songItem.addEventListener("click", () => {
            musicPlayer.songIndex = musicPlayer.musicList.length - 1;
            musicPlayer.updateSongSelection();
            musicPlayer.loadSong();
            musicPlayer.playSong();
        });

        musicPlayer.songListContainer.appendChild(songItem); 

        this.isAppear = false;
        this.formPopup();

        this.form.reset();
        this.musicFileName.innerText = "";
        this.imageFileName.innerText = "";
    }

    updateFileName(event, fileNameElement) {
        fileNameElement.innerText = event.target.files[0].name;
    }
    

}
const formHandler = new FormHandler();
const musicPlayer = new MusicPlayer("musicContainer");

