function getResult(method) {
    let number1 = parseFloat(document.getElementById("num-1").value)
    let number2 = parseFloat(document.getElementById("num-2").value)
    let result;
    switch (method) {
        case 'plus':
            result = number1 + number2;
            break;
        case 'sub':
            result = number1 - number2;
            break;
        case 'multiple':
            result = number1 * number2;
            break;
        case 'divide':
            if (number2 == 0) {
                result = "Không chia được!"
            } else {
                result = number1/number2
            }
            break;
        default: 
            result = "Phép toán không hợp lệ";
            break
            console.log(method)
    }

    let result1 = document.getElementById("result")
    result1.innerHTML = result

    console.log(result)
}