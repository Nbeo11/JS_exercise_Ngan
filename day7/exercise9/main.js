const gameArea = document.querySelector(".content");
const gameAreaWidth = gameArea.offsetWidth;
const gameAreaHeight = gameArea.offsetHeight;

const imgBasket = document.querySelector(".basket");
const scoreDisplay = document.getElementById("score");
const finish = document.getElementById("eggLeft")

const pauseButton = document.querySelector(".title button i");
const background = document.querySelector(".content img")

let eggSpeed = 2;
let count = 0;
let eggYPosition;
let totalEgg = 10;
let isPaused = false;

function game() {
    if (totalEgg > 0) {
        createEgg();  
        background.style.opacity = 1
        imgBasket.style.opacity = 1
    } else if (totalEgg == 0) {
        complete();
        imgBasket.style.opacity = 0.3
        background.style.opacity = 0.3
        
    }
}

function createEgg() {
    let eggYPosition = 0;
    const egg = document.createElement("div");
    egg.className = "egg";
    egg.style.top = `${eggYPosition}px`;

    gameArea.appendChild(egg);

    const letter = eggRandomLetter(egg); 
    eggRandomPosition(egg); 
    eggFalling(egg, letter);
}

// Hàm để gán chữ cái ngẫu nhiên cho trứng
function eggRandomLetter(egg) {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const randomIndex = Math.floor(Math.random() * letters.length);
    const randomLetter = letters[randomIndex];

    egg.innerText = randomLetter;
    return randomLetter;
}

function eggRandomPosition(egg) {
    const randomX = Math.random() * (gameAreaWidth - egg.offsetWidth);
    egg.style.left = `${randomX}px`;
}

let activeEggs = [];  

function eggFalling(egg, letter) {
    const basketHeight = imgBasket.offsetHeight;
    const eggFall = gameAreaHeight - basketHeight - 50;

    eggYPosition = parseInt(egg.style.top) || 0;  

    function fall() {
        if (!isPaused) {
            eggYPosition += eggSpeed;
            egg.style.top = `${eggYPosition}px`;
        }

        if (eggYPosition < eggFall) {
            if (!isPaused) {
                requestAnimationFrame(fall); 
            }
        } else {
            if (Math.abs(egg.offsetLeft - imgBasket.offsetLeft) <= 50) {
                count += 10;
                scoreDisplay.innerHTML = `${count}`;
            } else {
                console.log("Trứng rơi rồi nè");  
            }

            if (egg.parentNode) {
                gameArea.removeChild(egg);
                activeEggs = activeEggs.filter(e => e !== egg); 
            }

            totalEgg -= 1;
            finish.innerHTML = `${totalEgg}`;
            eggSpeed += 0.2;
            if (!isPaused && totalEgg >= 0) {
                setTimeout(game, 500);  
            }
        }
    }

    activeEggs.push(egg);
    requestAnimationFrame(fall);

    function checkLetter(event, letter) {
        return event.key.toLowerCase() === letter;
    }

    document.addEventListener('keydown', function (event) {
        if (checkLetter(event, letter)) {
            const eggX = egg.offsetLeft;
            imgBasket.style.left = eggX - 35 + 'px';
            console.log(imgBasket.offsetLeft);
            console.log(eggX);
        }
    });
}

function togglePause() {
    isPaused = !isPaused;

    if (isPaused) {
        pauseButton.classList.remove('fa-circle-stop');
        pauseButton.classList.add('fa-play');
        console.log("Game paused");
    } else {
        pauseButton.classList.remove('fa-play');
        pauseButton.classList.add('fa-circle-stop');
        console.log("Game resumed");

        activeEggs.forEach(egg => {
            const letter = egg.innerText;
            eggFalling(egg, letter); 
        });
    }
}

function complete() {
    const existingPopup = document.querySelector(".popup");
    if (existingPopup) {
        existingPopup.remove();
    }

    const popup = document.createElement("div");
    popup.className = "popup";

    const scoreMessage = document.createElement("div");
    scoreMessage.className = "score";
    scoreMessage.innerHTML = `Điểm số của bạn: ${count}`;
    popup.appendChild(scoreMessage);
    
    const retryButton = document.createElement("button");
    retryButton.innerHTML = "Chơi lại";
    retryButton.addEventListener("click", function() {
        resetGame();
        popup.style.display = "none";  
    });
    popup.appendChild(retryButton);

    gameArea.appendChild(popup);
    popup.style.display = "block"; 
}

function resetGame() {
    count = 0;
    totalEgg = 10;
    scoreDisplay.innerHTML = `${count}`;
    finish.innerHTML = `${totalEgg}`;
    game();  // Bắt đầu lại trò chơi
}

pauseButton.addEventListener('click', togglePause);
game();
