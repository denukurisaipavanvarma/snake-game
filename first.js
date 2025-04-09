let gameResult = document.getElementById("gameResult");
let userInput = document.getElementById("userInput");
let randomNumber = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
    const userGuess = parseInt(userInput.value);
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        gameResult.textContent = "Please enter a valid number between 1 and 100";
        gameResult.className = "result-container wrong";
        return;
    }

    if (userGuess === randomNumber) {
        gameResult.innerHTML = `
            <h3>🎉 Correct! 🎉</h3>
            <p>You guessed the right number!</p>
        `;
        gameResult.className = "result-container correct";
        userInput.disabled = true;
    } else if (userGuess < randomNumber) {
        gameResult.textContent = "Too low! Try a higher number.";
        gameResult.className = "result-container wrong";
    } else {
        gameResult.textContent = "Too high! Try a lower number.";
        gameResult.className = "result-container wrong";
    }
    
    userInput.value = "";
    userInput.focus();
}