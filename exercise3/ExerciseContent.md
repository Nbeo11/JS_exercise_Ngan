Cho một mảng như sau

```
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
]```


Hãy viết một chương trình đuổi hình bắt chữ, hiển thị câu hỏi và hình ảnh tương ứng, người chơi phải trả lời đúng câu hỏi, 
nếu trả lời đúng thì chuyển sang câu hỏi tiếp theo, nếu trả lời sai thì thông báo kết thúc trò chơi và hiển thị câu trả lời đúng.
key maxShowingCharacter là số ký tự tối đa được hiển thị của câu trả lời

Xem video ví dụ về chương trình