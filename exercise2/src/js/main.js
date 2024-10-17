const questions = [
    {
        content: "Câu hỏi 1: Đông Lào là nước nào ?",
        answers: [
            "A.Việt Nam",
            "B.Lào",
            "C.Philipine",
            "D.Indonesia"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 2: Tây Lào là nước nào",
        answers: [
            "A.Miến Điện",
            "B.Ấn Độ",
            "C.Nepal",
            "D.Thái Lan"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 3: Nam Lào là nước nào",
        answers: [
            "A.Campuchia",
            "B.Malaysia",
            "C.Singapore",
            "D.Việt Nam"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 4: Bắc Lào là nước nào",
        answers: [
            "A.Trung Quốc",
            "B.Hàn Quốc",
            "C.Nhật Bản",
            "D.Hoa Kỳ"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 5: Lào có bao nhiêu tỉnh thành",
        answers: [
            "A.14",
            "B.15",
            "C.16",
            "D.17"
        ],
        correctAnswer: 1
    },
    {
        content: "Câu hỏi 6: Đâu là thủ đô của Lào",
        answers: [
            "A.Hà Nội",
            "B.Bangkok",
            "C.Vientiane",
            "D.Phnom Penh"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 7: Lào có biển không",
        answers: [
            "A.Có",
            "B.Không",
            "C.Có và không",
            "D.Không và có"
        ],
        correctAnswer: 1
    },
    {
        content: "Câu hỏi 8: Lào có sân bay quốc tế không",
        answers: [
            "A.Có",
            "B.Không",
            "C.Có và không",
            "D.Không và có"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 9: Lào có biên giới với Việt Nam không",
        answers: [
            "A.Có",
            "B.Không",
            "C.Có và không",
            "D.Không và có"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 10: Thủ đô của Brueni là gì",
        answers: [
            "A.Bangkok",
            "B.Bandar Seri Begawan",
            "C.Vientiane",
            "D.Phnom Penh"
        ],
        correctAnswer: 1
    }
];


let score = 0;
let currentQuestionindex = 0;
let message = document.querySelector('.message')
let result = document.querySelector('.result')

function checkAnswer(selectedAnswer) {
    const answerIndex = questions[currentQuestionindex].correctAnswer;
    message.style.color = selectedAnswer == answerIndex ? "green" : "red";
    message.style.fontSize = "25px"
    if (selectedAnswer == answerIndex) {
        score += 10;
        message.innerText = "Câu trả lời đúng!";
    } else {
        message.innerText = "Câu trả lời chưa chính xác! Đáp án đúng là " + questions[currentQuestionindex].answers[answerIndex];
    }

    document.getElementById('score').innerText = score;
    currentQuestionindex++;
    console.log(currentQuestionindex);
    
    setTimeout(() => {
        loadQuestion();
        message.innerText = ""; 
    }, 2000); 
    console.log(selectedAnswer);
}



function loadQuestion() {
    if (currentQuestionindex >= questions.length) {
        result.innerText = "Kết thúc bài thi. Điểm của bạn là: " + score
        result.style.fontSize = "30px"

        return; 
    }
    
    const currentQuestion = questions[currentQuestionindex];
    document.getElementById('question-text').innerText = currentQuestion.content;

    const answerContainer = document.getElementById('answer-container');
    answerContainer.innerHTML = ''; 

    currentQuestion.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = "w-[330px] border-2 border-gray-400 border-dotted rounded-md p-1 flex items-center justify-center h-14 hover:cursor-pointer hover:bg-slate-300";
        answerDiv.innerText = answer;
        answerDiv.onclick = () => checkAnswer(index); 
        answerContainer.appendChild(answerDiv);
    });
}

window.onload = loadQuestion;