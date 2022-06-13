// Variable for questions and answers
var questions = [
    {
        question: "What operator do you use to evaluate equivalence in both value and type",
        answers: ["==", "!=", "===", "><"],
        correctAnswer: "==="
    },
    {
        question: "How many times will the following function run: for (var i=0; i<5; i++) {console.log(i);}",
        answers: ["4", "5", "6", "Infinite loop"],
        correctAnswer: "5"
    },
    {
        question: "What is NOT a javascript data type",
        answers: ["Boolean", "Number", "Thread", "String"],
        correctAnswer: "Thread"
    },
    {
        question: "How do you create comments in javascript code",
        answers: ["!!", "{{}}", "// for single line, /* */ for multi line", "!--"],
        correctAnswer: "// for single line, /* */ for multi line"
    },
    {
        question: "For a variable called myVariable and containing 'My String', which of the following will evaluate to FALSE",
        answers: ["if(myVariable)", "if(myVariable == 'My String')", "if(typeof(myVariable) === 'string'", "if(!myVariable)"],
        correctAnswer: "if(!myVariable)"
    },
];

// Variable for tracking position in questions array
var questionIndex = 0;
// Timer variable
var timer = 60;
// Quiz timer required in global scope so that multiple functions can clear the interval set up later
var quizTimer;
// Current score variable
var currentScore = 0;
// High score link element
var highScores = document.getElementById("high-scores");
// h1 element 
var primText = document.getElementById("prim-text");
// Text element
var textContent = document.getElementById("text");
// Buttons element
var buttons = document.getElementById("buttons");
// Timer element
var currentTime = document.getElementById("timer");
// Answer flag
var lastAnswerCorrect;

// _______________________________________
//               Functions
// _______________________________________
// Set Styles for landing page and high score
function landingAndHighScoreStyles(){
    textContent.setAttribute("style", "order: 1;");
    buttons.setAttribute("style", "flex-direction: row;");
    var listElems = document.querySelectorAll("li");
    for (var i=0; i<listElems.length; i++){
        listElems[i].setAttribute("style", "flex: 1 0 100px; margin-bottom: 0; width: 100%;");
    }
}

//Set styles for questions and quiz completed
function qsAndCompletedStyles(){
    textContent.setAttribute("style", "order: 3; border-top: 2px solid var(--primary);");
    buttons.setAttribute("style", "flex-direction: column;");
    var listElems = document.querySelectorAll("li");
    for (var i=0; i<listElems.length; i++){
        listElems[i].setAttribute("style", "flex: 0 0 20px; margin-bottom: 5%; width: 50%;");
    }
}

// Render landing page
function renderLandingPage(){
    questionIndex = 0;
    currentScore = 0;
    timer = 60;
    currentTime.innerHTML = "Time Remaining: " + timer;
    primText.innerHTML = "Coding Quiz Challenge";
    textContent.innerHTML = "Welcome to the javascript coding quiz!<br>You will be given 60 seconds to answer as many javascript questions as you can.<br>For each incorrect question, 5 seconds will be subtracted from the timer.<br>Good Luck!";
    buttons.innerHTML = "<li><button id='start-quiz'>Start Quiz</button></li>";
    document.getElementById("start-quiz").addEventListener("click", renderNextQuestion);
    document.getElementById("start-quiz").addEventListener("click", timeQuiz);
    landingAndHighScoreStyles();
}

// Render questions
function renderNextQuestion(){
    event.stopPropagation();
    primText.innerHTML = "Q" + (questionIndex + 1) + ". " + questions[questionIndex].question;
    if (!questionIndex){
        textContent.innerHTML = "Previous Result"
    } else if (lastAnswerCorrect){
        textContent.innerHTML = "Correct!"
    } else {
        textContent.innerHTML = "Wrong!"
    }
    var answerButtons = "";
    for (var i=0; i < questions[questionIndex].answers.length; i++){
        answerButtons = answerButtons.concat("<li><button class='answerBtn'>" + questions[questionIndex].answers[i] + "</button></li>");
    }
    buttons.innerHTML = answerButtons;
    buttons.addEventListener("click", evaluate);
    qsAndCompletedStyles();
}

// Check answer
function evaluate(event){
    var answer = event.target;
    if (answer.type == "submit"){
        if (answer.textContent == questions[questionIndex].correctAnswer){
            currentScore ++;
            lastAnswerCorrect = true;
        } else {
            timer = timer - 5;
            lastAnswerCorrect = false;
        }
        questionIndex ++;
        if (questionIndex < questions.length){
            renderNextQuestion();
        } else {
            buttons.removeEventListener("click", evaluate);
            clearInterval(quizTimer);
            renderComplete();
        }
    }
}

// Timer
function timeQuiz(){
    quizTimer = setInterval(function(){
        timer--;
        currentTime.innerHTML = "Time Remaining: " + timer;
        if (timer == 0){
            clearInterval(quizTimer);
            renderComplete();
        }
    }, 1000)
}

// View high scores
function renderHighScores(event){
    event.preventDefault();
    var savedHighScores = [];
    var htmlContent = "<ul>";
    if (JSON.parse(localStorage.getItem("highScores"))[0]){
        savedHighScores = savedHighScores.concat(JSON.parse(localStorage.getItem("highScores")));
        for (var i = 0; i<savedHighScores.length; i++){
            htmlContent = htmlContent.concat("<li>" + savedHighScores[i].player + "  -  " + savedHighScores[i].score + "</li>");
        }
    } else {
        htmlContent = htmlContent.concat("<li>No Scores currently saved</li>");
    }
    htmlContent = htmlContent.concat("</ul>");
    primText.innerHTML = "High Scores";
    textContent.innerHTML = htmlContent;
    buttons.innerHTML = "<li><button id='back-button'>Go Back</button></li><li><button id='clear-scores'>Clear High Scores</button></li>";
    // Add click event listener to the go back button
    document.getElementById("back-button").addEventListener("click", renderLandingPage);
    document.getElementById("clear-scores").addEventListener("click", clearScores);
    landingAndHighScoreStyles();
}

// Render the quiz completed page
function renderComplete(){
    primText.innerHTML = "Test Completed";
    buttons.innerHTML = "<li>You scored: " + currentScore + " out of a possible 5</li><li><form><label for='initials'>Please enter your initials:</label><input type='text' id='initials'><input id='save-score' type='submit' value='Save Score'></form></li>";
    var save = document.getElementById("save-score");
    save.addEventListener("click", saveScore);
    qsAndCompletedStyles();
}

// Save the score to local storage
function saveScore(event){
    event.preventDefault();
    var savedHighScores = [];
    var player = document.getElementById("initials").value;
    var playerAndScore = {
        "player": player,
        "score": currentScore
    }
    if (JSON.parse(localStorage.getItem("highScores"))[0]){
        savedHighScores = savedHighScores.concat(JSON.parse(localStorage.getItem("highScores")));
        for (var i = 0; i<savedHighScores.length; i++){
            if (currentScore > savedHighScores[i].score){
                savedHighScores.splice(i, 0, playerAndScore);
                break;
            } else if (i == (savedHighScores.length - 1)){
                savedHighScores.push(playerAndScore);
                break;
            }
        }
    } else {
        savedHighScores.push(playerAndScore);
    }
    localStorage.setItem("highScores", JSON.stringify(savedHighScores));
    renderHighScores(event);
}

// Clear high scores
function clearScores(event){
    var emptyArray = [];
    localStorage.setItem("highScores", JSON.stringify(emptyArray));
    renderHighScores(event);
}

// Render the landing page and add an event listener to the high scores element
highScores.addEventListener("click", renderHighScores);
renderLandingPage();