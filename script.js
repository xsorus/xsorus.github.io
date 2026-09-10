let words = [];
let remainingWords = [];
let currentWord;
let score = 0;


// Wczytanie pliku JSON
fetch("dane.json")
    .then(response => response.json())
    .then(data => {
        words = data;

        // Tworzymy kopię wszystkich słów
        remainingWords = [...words];

        // Losujemy pierwsze słowo
        showRandomWord();
    })
    .catch(error => {
        console.error("Błąd podczas wczytywania pliku JSON:", error);
    });


// Losowanie słowa
function showRandomWord() {

    // Sprawdzamy, czy zostały jeszcze jakieś słowa
    if (remainingWords.length === 0) {

        document.getElementById("word").textContent = "Koniec";
        document.getElementById("result").textContent =
            "Twój wynik: " + score + " / " + words.length;

        document.getElementById("answer").disabled = true;
        document.getElementById("checkButton").disabled = true;

        return;
    }


    // Losujemy pozycję w tablicy
    const randomIndex = Math.floor(Math.random() * remainingWords.length);

    // Pobieramy wylosowane słowo
    currentWord = remainingWords[randomIndex];

    // Usuwamy je z tablicy dostępnych słów
    remainingWords.splice(randomIndex, 1);


    // Wyświetlamy słowo
    document.getElementById("word").textContent = currentWord.english;

    // Czyścimy pole odpowiedzi
    document.getElementById("answer").value = "";

    // Czyścimy komunikat
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

        // Dodajemy 1 punkt
        score++;

        document.getElementById("score").textContent = score;

        document.getElementById("result").textContent = "✓ Dobrze!";

    } else {

        document.getElementById("result").textContent =
            "Źle, poprawne słowo to: " + currentWord.polish;
    }


    // Czyścimy pole
    document.getElementById("answer").value = "";


    // Po 1,5 sekundy pokazujemy następne słowo
    setTimeout(showRandomWord, 1500);
});
```
