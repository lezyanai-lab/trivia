// script.js
const questionBank = [
    { q: "מהי בירת ישראל?", a: ["תל אביב", "ירושלים", "חיפה", "אילת"], correct: 1 },
    { q: "כמה צלעות יש למשולש?", a: ["4", "5", "3", "6"], correct: 2 },
    { q: "איזה כוכב לכת הכי קרוב לשמש?", a: ["נוגה", "מאדים", "כדור הארץ", "חמה"], correct: 3 },
    { q: "מי צייר את המונה ליזה?", a: ["וינסנט ואן גוך", "לאונרדו דה וינצ'י", "פאבלו פיקאסו", "מיכלאנג'לו"], correct: 1 },
    { q: "מהו החומר הקשה ביותר בטבע?", a: ["ברזל", "יהלום", "זהב", "טיטניום"], correct: 1 },
    { q: "כמה רגליים יש לעכביש?", a: ["6", "8", "10", "4"], correct: 1 },
    { q: "באיזו יבשת נמצאת ברזיל?", a: ["אפריקה", "דרום אמריקה", "צפון אמריקה", "אירופה"], correct: 1 },
    { q: "מהו האוקיינוס הגדול ביותר?", a: ["האוקיינוס השקט", "האוקיינוס האטלנטי", "האוקיינוס ההודי", "אוקיינוס הקרח הצפוני"], correct: 0 },
    { q: "איזו חיה היא המהירה ביותר על היבשה?", a: ["אריה", "צבי", "ברדלס (צ'יטה)", "סוס"], correct: 2 },
    { q: "כמה שעות יש ביממה?", a: ["12", "24", "48", "60"], correct: 1 }
    // אפשר להוסיף כאן את שאר השאלות
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let canClick = true;

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const scoreDisplay = document.getElementById('score-display');
const progressDisplay = document.getElementById('progress-display');
const feedbackDisplay = document.getElementById('feedback-display');
const finalScoreDisplay = document.getElementById('final-score');

function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function startGame() {
    const shuffledBank = shuffleArray(questionBank);
    currentQuestions = shuffledBank.slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    canClick = true;
    updateScore();
    startScreen.style.display = 'none';
    endScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    canClick = true;
    feedbackDisplay.textContent = "";
    feedbackDisplay.style.color = "";
    
    const currentQ = currentQuestions[currentQuestionIndex];
    questionText.textContent = currentQ.q;
    progressDisplay.textContent = `שאלה ${currentQuestionIndex + 1} מתוך ${currentQuestions.length}`;
    
    answersContainer.innerHTML = '';
    currentQ.a.forEach((answerText, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn answer-btn';
        btn.textContent = answerText;
        btn.onclick = () => checkAnswer(index, btn);
        answersContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    if (!canClick) return;
    canClick = false;
    
    const currentQ = currentQuestions[currentQuestionIndex];
    const buttons = answersContainer.querySelectorAll('.answer-btn');
    
    if (selectedIndex === currentQ.correct) {
        btnElement.classList.add('correct');
        feedbackDisplay.textContent = "✓ כל הכבוד! תשובה נכונה";
        feedbackDisplay.style.color = "var(--correct)";
        score++;
        updateScore();
    } else {
        btnElement.classList.add('wrong');
        buttons[currentQ.correct].classList.add('correct');
        feedbackDisplay.textContent = "✗ טעות!";
        feedbackDisplay.style.color = "var(--wrong)";
    }
    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            loadQuestion();
        } else {
            endGame();
        }
    }, 1500);
}

function updateScore() {
    scoreDisplay.textContent = `ניקוד: ${score}`;
}

function endGame() {
    gameScreen.style.display = 'none';
    endScreen.style.display = 'block';
    finalScoreDisplay.textContent = `${score} / ${currentQuestions.length}`;
}
