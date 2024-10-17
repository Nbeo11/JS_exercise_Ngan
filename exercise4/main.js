let answerArray = []

document.addEventListener("DOMContentLoaded", function () {
    const contentElement = document.querySelector(".content");
    if (contentElement) {
        let text = contentElement.innerHTML;
        const matches = text.match(/\{\{.*?\}\}/g);
        if (matches) {
            matches.forEach((match, index) => {
                const inputHTML = ` <span>${index + 1}</span> <input type="text"/>`;
                text = text.replace(match, inputHTML);
                answerArray.push(match.replace(/\{\{|\}\}/g, "").trim());
            });
        }
        contentElement.innerHTML = text;
    }
    console.log(answerArray)
});

function answerCheck() {
    const inputArr = document.querySelectorAll('input')
    const spanArr = document.querySelectorAll('span');

    for (let i = 0; i <answerArray.length; i++) {
        if (inputArr[i].value == answerArray[i]) {
            inputArr[i].style.color = 'green';
            spanArr[i].style.backgroundColor = 'green';
        } else {
            inputArr[i].style.color = 'red';
            spanArr[i].style.backgroundColor = 'red';
        }
        inputArr[i].disabled = true;
    }
}


function resetQuiz() {
    const inputArr = document.querySelectorAll('input');
    const spanArr = document.querySelectorAll('span');
        for (let i = 0; i < inputArr.length; i++) {
        inputArr[i].value = '';
        inputArr[i].disabled = false; 
        inputArr[i].style.color = '';
        spanArr[i].style.backgroundColor = '';
    }
}