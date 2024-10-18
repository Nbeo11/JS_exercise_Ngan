const questions = [
    {
        content: 'Sông nào chảy qua Hà Nội',
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/MatnuocSongHong-06112008333.JPG',
        correctAnswer: 'Sông Hồng',
        maxShowingCharacter: 2
    },
    {
        content: 'Ai là người phát minh ra bóng đèn sợi đốt',
        image: 'https://st.quantrimang.com/photos/image/2016/10/25/thomsa-edison-4.jpg',
        correctAnswer: 'Edison',
        maxShowingCharacter: 3
    },
    {
        content: 'Nguời giàu nhất thế giới ',
        image: 'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5bb22ae84bbe6f67d2e82e05%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D560%26cropX2%3D1783%26cropY1%3D231%26cropY2%3D1455',
        correctAnswer: 'Jezz Bezos',
        maxShowingCharacter: 2
    },
    {
        content: 'Thủ đô của Belarus',
        image: '',
        correctAnswer: 'Minsk',
        maxShowingCharacter: 3
    }
]


let currentQuestionindex = 0;
let message = document.querySelector('.message')
let notification = document.querySelector('.notification')
let canInteract = true; 

document.getElementById('checkAnswer').addEventListener('submit', function (event) {
    event.preventDefault();

    if (!canInteract) return;

    const result = document.querySelector('input');
    const answers = document.querySelector('.answer');
    const box = answers.childNodes;
    const text = document.createElement('div');
    const isCorrect = questions[currentQuestionindex].correctAnswer == result.value;

    const userAnswer = document.querySelector('.user-answer');
    if (isCorrect) {
        text.innerText = "Bạn đã trả lời đúng";
    } else {
        box.forEach((item) => {
            item.innerText = item.getAttribute('keyword');
            item.style.pointerEvents = 'none';
            item.style.background = 'orange';
            item.style.textAlign = 'center';
            item.style.alignContent = 'center';
            item.style.fontSize = '30px';
        });
        text.innerText = "Bạn đã trả lời sai";
    }
    
    userAnswer.appendChild(text);
    canInteract = false;
    currentQuestionindex++;

    setTimeout(() => {
        loadQuestion();
        result.value = "";
        text.innerText = "";
        canInteract = true;
    }, 2000); 
});

function checkAnswer() {

    const result = document.querySelector('input');
    const answers = document.querySelector('.answer')
    const box = answers.childNodes;
    const text = document.createElement('div');
    const isCorrect = questions[currentQuestionindex].correctAnswer == result.value;
    console.log(isCorrect)
    if (isCorrect) {
        const userAnswer = document.querySelector('.user-answer')

        text.innerText = "Bạn đã trả lời đúng";
        userAnswer.appendChild(text)
    } else {
        box.forEach((item) => {
            item.innerText = item.getAttribute('keyword');
            item.style.pointerEvents = 'none';
            item.style.background = 'orange';
            item.style.textAlign = 'center';
            item.style.alignContent = 'center';
            item.style.fontSize = '30px'
        });

    }
    currentQuestionindex++;
    setTimeout(() => {
        loadQuestion();
        result.value = "";
        text.innerText = ""
    }, 20000);
}



function loadQuestion() {
    let countClick = questions[currentQuestionindex].maxShowingCharacter;
    if (currentQuestionindex >= questions.length) {
        result.innerText = "Kết thúc bài thi. Điểm của bạn là: " + score
        result.style.fontSize = "30px"

        return;
    }

    notification.innerText = "Bạn có thể lật nhiều nhất " + questions[currentQuestionindex].maxShowingCharacter + " thẻ"

    const questionContent = document.querySelector('.question');
    questionContent.innerHTML = '';

    const content = document.createElement('div')
    const image = document.createElement('img')
    content.innerText = questions[currentQuestionindex].content;
    image.src = questions[currentQuestionindex].image;
    questionContent.appendChild(content);
    questionContent.appendChild(image);

    const answer = document.querySelector('.answer');
    answer.innerHTML = ""
    let correctAnswer = questions[currentQuestionindex].correctAnswer

    for (let i = 0; i < correctAnswer.length; i++) {
        const box = document.createElement('div');
        value = correctAnswer[i];
        box.setAttribute('keyword', value)
        box.addEventListener('click', function () {
            if (countClick > 0) {
                console.log(box.getAttribute('keyword'));
                box.innerText = box.getAttribute('keyword')
                countClick--;
                console.log(countClick);
                box.style.pointerEvents = 'none';
                box.style.background = 'orange';
                box.style.textAlign = 'center';
                box.style.alignContent = 'center';
                box.style.fontSize = '30px'
                box.classList.add('clicked');
                if (countClick === 0) {
                    answer.querySelectorAll('div').forEach(item => {
                        item.style.pointerEvents = 'none';
                    });
                }
            }
        })

        answer.appendChild(box);
    }


}



window.onload = loadQuestion;