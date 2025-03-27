document.addEventListener('DOMContentLoaded', () => {
    // Elemente auswählen
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');
    const bestScoreDisplay = document.getElementById('bestScore');
    const rangeDisplay = document.getElementById('range');
    
    // Spielvariablen
    let secretNumber = generateRandomNumber(1, 100);
    let attempts = 0;
    let bestScore = localStorage.getItem('bestScore') || null;
    let minRange = 1;
    let maxRange = 100;
    
    // Besten Score anzeigen
    if (bestScore) {
        bestScoreDisplay.textContent = bestScore;
    }
    
    // Event Listener für den Rat-Button
    guessButton.addEventListener('click', checkGuess);
    
    // Event Listener für Enter-Taste
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });
    
    // Funktion zur Überprüfung des Tipps
    function checkGuess() {
        const userGuess = parseInt(guessInput.value);
        
        // Validierung
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            showMessage('Bitte gib eine Zahl zwischen 1 und 100 ein!', 'error');
            return;
        }
        
        // Versuch zählen
        attempts++;
        attemptsDisplay.textContent = attempts;
        
        // Überprüfen ob richtig geraten
        if (userGuess === secretNumber) {
            showMessage(`Glückwunsch! Du hast die Zahl ${secretNumber} in ${attempts} Versuchen erraten!`, 'success');
            
            // Besten Score aktualisieren
            if (!bestScore || attempts < bestScore) {
                bestScore = attempts;
                bestScoreDisplay.textContent = bestScore;
                localStorage.setItem('bestScore', bestScore);
            }
            
            // Neues Spiel vorbereiten
            setTimeout(resetGame, 3000);
            return;
        }
        
        // Hinweis geben
        if (userGuess < secretNumber) {
            minRange = userGuess + 1;
            showMessage(`Die gesuchte Zahl ist größer als ${userGuess}.`, 'info');
        } else {
            maxRange = userGuess - 1;
            showMessage(`Die gesuchte Zahl ist kleiner als ${userGuess}.`, 'info');
        }
        
        // Bereichsanzeige aktualisieren
        rangeDisplay.textContent = `${minRange}-${maxRange}`;
        
        // Eingabefeld leeren und fokus setzen
        guessInput.value = '';
        guessInput.focus();
    }
    
    // Funktion zur Anzeige von Nachrichten
    function showMessage(msg, type) {
        message.textContent = msg;
        message.className = 'message ' + type;
    }
    
    // Funktion zum Zurücksetzen des Spiels
    function resetGame() {
        secretNumber = generateRandomNumber(1, 100);
        attempts = 0;
        minRange = 1;
        maxRange = 100;
        
        attemptsDisplay.textContent = '0';
        rangeDisplay.textContent = '1-100';
        message.className = 'message';
        message.textContent = '';
        guessInput.value = '';
        guessInput.focus();
    }
    
    // Funktion zur Generierung einer Zufallszahl
    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});