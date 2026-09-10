let words = [];
let currentWord;
let score = 0;


// Wczytanie pliku JSON
fetch("dane.json")
    .then(response => response.json())
    .then(data => {
        words = data;

        // Losujemy pierwsze słowo
        showRandomWord();
    })
    .catch(error => {
        console.error("Błąd podczas wczytywania pliku JSON:", error);
    });


// Losowanie słowa
function showRandomWord() {

    const randomIndex = Math.floor(Math.random() * words.length);

    currentWord = words[randomIndex];

    document.getElementById("word").textContent = currentWord.english;

    document.getElementById("answer").value = "";

    document.getElementById("result").textContent = "";
}


// Sprawdzanie odpowiedzi
document.getElementById("checkButton").addEventListener("click", function() {

    const userAnswer = document
        .getElementById("answer")
        .value
        .trim()
        .toLowerCase();

    const correctAnswer = currentWord.polish.toLowerCase();


    if (userAnswer === correctAnswer) {

        // Dodanie punktu
        score++;

        document.getElementById("score").textContent = score;

        document.getElementById("result").textContent = "✓ Dobrze!";

    } 
    else {

        document.getElementById("result").textContent =
            "Źle, poprawne słowo to: " + currentWord.polish;
    }


    // Czyszczenie pola
    document.getElementById("answer").value = "";


    // Po chwili pokazujemy następne słowo
    setTimeout(showRandomWord, 1500);
});


