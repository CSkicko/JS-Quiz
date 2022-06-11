// Variables:
// Variable for questions and answers (array of objects)
// Timer variable
// High scores variable (array of objects). Used with local storage
// Time reduction variable to set amount of time reduced on incorrect answer
// Current score variable
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
// Render landing page
function renderLandingPage(){
    primText.innerHTML = "Coding Quiz Challenge";
    textContent.innerHTML = "Welcome to the javascript coding quiz!<br>You will be given 60 seconds to answer as many javascript questions as you can.<br>For each incorrect question, 5 seconds will be subtracted from the timer.<br>Good Luck!";
    buttons.innerHTML = "<li><button id='back-button'>Start Quiz</button></li>";
}
// Render questions
// Start quiz
// Check answer
// Timer
// View high scores
function renderHighScores(event){
    event.preventDefault();
    primText.innerHTML = "High Scores";
    textContent.innerHTML = "This is the high scores page";
    buttons.innerHTML = "<li><button id='back-button'>Go Back</button></li>";
    // Add click event listener to the go back button
    document.getElementById("back-button").addEventListener("click", renderLandingPage);
}
// Save score
// Clear high scores

// __________
// Pseudocode
// __________
// 1. Render the landing page content
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
