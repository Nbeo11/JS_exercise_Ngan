Cho một mảng như sau

```const questions = [
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
```

Hãy viết một chương trình để hiển thị các câu hỏi và lựa chọn câu trả lời cho người dùng.
Khi người dùng chọn câu trả lời, hãy kiểm tra xem câu trả lời đó có đúng không.
Nếu đúng, hãy thông báo cho người dùng biết.
Nếu sai, hãy thông báo cho người dùng biết và hiển thị đáp án đúng bằng cách đổi màu nền background đáp án sang màu xanh.
Cuối cùng, hãy thông báo cho người dùng biết số câu trả lời đúng và số câu trả lời sai.

Xem ảnh ví dụ giao diện trong folder