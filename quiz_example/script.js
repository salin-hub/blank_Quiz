let currentQuiz = 0;
let score = 0;
let data_quiz = [];
const quizContainer = document.getElementById('quiz');
const subQuiz = document.getElementById('submit');
const resultQuiz = document.getElementById('result');
const message = document.getElementById('message')
async function fethData() {
    const response = await fetch('Datas.json');
    const data = await response.json();
    data_quiz = data.quizDatas;
    
    shuffleQuestion(data_quiz);
    loadIng();
}
//random question
const shuffleQuestion = (arr) =>{
    for(let i= arr.length - 1;i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [arr[i],arr[j] ] = [arr[j],arr[i]];
    }
}

function loadIng() {
    const currentQuizData = data_quiz[currentQuiz];
    const quizElement = `<h2>${currentQuizData.question} </h2>`;
    const optionElement = currentQuizData.options.map(option =>
        `<label><input type="radio" name="answer" value="${option}"> ${option}</label><br>`
    ).join('');
    quizContainer.innerHTML = quizElement + optionElement;
}

const getSelected = () => {
    const options = document.getElementsByName('answer');
    let selectedOption;
    options.forEach(option => {
        if (option.checked) {
            selectedOption = option.value;
        }
    });
    
    return selectedOption;
    
}
const showResult = () => {
    quizContainer.style.display = 'none';
    subQuiz.style.display = 'none';
    resultQuiz.innerHTML = `<h2> Your Score is : ${score} / ${data_quiz.length}</h2>`
    const percentage = (score / data_quiz.length) * 100;
    let messages;
    if (percentage < 50) {
        messages = '<p>Unfortunately, your score is below 50%. Keep trying to improve!</p>'
    }
    else {
        messages = '<p>Great job! You scored 50% or more!</p>';
    }
    message.innerHTML = messages;
}
subQuiz.addEventListener('click', () => {

    const selectedOption = getSelected();
    if(!selectedOption){
        currentQuiz;
        message.innerHTML = '<p>please select answer !!</p>'
    }
    else{
        if (selectedOption === data_quiz[currentQuiz]?.correct) {
            score++;
        }
        currentQuiz++;
        message.innerHTML = '';
    }
    if (currentQuiz < data_quiz.length) {
        loadIng();  
    } else {
        showResult();  
    }
});

fethData();
