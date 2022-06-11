// Variables:
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

var questionIndex = 0;
// Timer variable
var timer = 60;
// High scores variable (array of objects). Used with local storage
// Time reduction variable to set amount of time reduced on incorrect answer
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


// _________
// Functions
// _________
// Reset Styles
function resetStyles(){
    textContent.setAttribute("style", "order: 1;");
    buttons.setAttribute("style", "flex-direction: row;");
    var listElems = document.querySelectorAll("li");
    for (var i=0; i<listElems.length; i++){
        listElems[i].setAttribute("style", "flex: 1 0 100px; margin-bottom: 0; width: 100%;");
    }
}

// Render landing page
function renderLandingPage(){
    resetStyles();
    questionIndex = 0;
    currentScore = 0;
    timer = 60;
    primText.innerHTML = "Coding Quiz Challenge";
    textContent.innerHTML = "Welcome to the javascript coding quiz!<br>You will be given 60 seconds to answer as many javascript questions as you can.<br>For each incorrect question, 5 seconds will be subtracted from the timer.<br>Good Luck!";
    buttons.innerHTML = "<li><button id='start-quiz'>Start Quiz</button></li>";
    document.getElementById("start-quiz").addEventListener("click", renderNextQuestion);
}
// END

// Render questions
    // 1. Update the question text
    // 2. Move the text to the bottom and display the result of the previous answer
    // 3. Set up the answer buttons and render to the page
    // 4. Make the answer buttons stack vertically
    // 5. Change the styling of the list elements to reduce vertical gaps
function renderNextQuestion(){
    event.stopPropagation();
    primText.innerHTML = "Q" + (questionIndex + 1) + ". " + questions[questionIndex].question;
    textContent.setAttribute("style", "order: 3;");
    if (!questionIndex){
        textContent.innerHTML = ""
    } else {
        textContent.innerHTML = "Result of previous answer"
    }
    var answerButtons = "";
    for (var i=0; i < questions[questionIndex].answers.length; i++){
        answerButtons = answerButtons.concat("<li><button class='answerBtn'>" + questions[questionIndex].answers[i] + "</button></li>");
    }
    buttons.innerHTML = answerButtons;
    buttons.setAttribute("style", "flex-direction: column;");
    var listElems = document.querySelectorAll("li");
    for (var i=0; i<listElems.length; i++){
        listElems[i].setAttribute("style", "flex: 0 0 20px; margin-bottom: 5%; width: 50%;");
    }
    buttons.addEventListener("click", evaluate);
}
//END

// Check answer
function evaluate(event){
    var answer = event.target;
    if (answer.textContent == questions[questionIndex].correctAnswer){
        currentScore ++;
    } else {
        timer = timer - 5;
    }
    questionIndex ++;
    if (questionIndex < questions.length){
        renderNextQuestion();
    } else {
        buttons.removeEventListener("click", evaluate);
        renderComplete();
    }
}
// Timer

// View high scores
function renderHighScores(event){
    event.preventDefault();
    resetStyles();
    primText.innerHTML = "High Scores";
    textContent.innerHTML = "This is the high scores page";
    buttons.innerHTML = "<li><button id='back-button'>Go Back</button></li><li><button id='clear-scores'>Clear High Scores</button></li>";
    // Add click event listener to the go back button
    document.getElementById("back-button").addEventListener("click", renderLandingPage);
}
// Save score
function renderComplete(){
    primText.innerHTML = "Test Completed";
    buttons.innerHTML = "<li>You scored: " + currentScore + " out of a possible 5</li><li>Form</li>";
}
// Clear high scores

// __________
// Pseudocode
// __________
// 1. Render the landing page content
renderLandingPage();
// 2. When the user clicks the start button:
//      2a. Render the first question

//      2b. Start the timer
// 3. When the user selects an answer:
//      3a. Check if the answer is correct
//      3b. If correct, update the score
//      3c. If wrong, reduce time
//      3d. Display result
//      3e. Render next question
// 4. When the timer runs out, or all questions are answered:
//      4a. Render the completed quiz page
//      4b. Display the final score
//      4c. Get initials from player
//      4d. Save initials and score to local storage
//      4e. On submission, render high scores page
// 5. If the high scores link is pressed, render the high scores page
highScores.addEventListener("click", renderHighScores);
// 6. On high scores, if go back is selected, render the landing page
// 7. On high scores, if clear high scores is selected, clear local storage and re-render the high scores page
