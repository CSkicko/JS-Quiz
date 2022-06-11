// Variables:
// Variable for questions and answers (array of objects)
// Timer variable
// High scores variable (array of objects). Used with local storage
// Time reduction variable to set amount of time reduced on incorrect answer
//  Current score variable

// _________
// Functions
// _________
// Render content
// Start quiz
// Check answer
// Timer
// View high scores
// Save score

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
// 6. On high scores, if go back is selected, render the landing page
// 7. On high scores, if clear high scores is selected, clear local storage and re-render the high scores page
