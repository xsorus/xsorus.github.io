let slowa = [];
let pozostaleSlowa = [];

let aktualneSlowo = null;
let liczbaPoprawnych = 0;
let liczbaPytan = 0;

const slowoHTML = document.getElementById("slowo");
const odpowiedzHTML = document.getElementById("odpowiedz");
const przyciskHTML = document.getElementById("przycisk");
const komunikatHTML = document.getElementById("komunikat");
const postepHTML = document.getElementById("postep");
const wynikHTML = document.getElementById("wynik");

// Pobieramy słówka z pliku JSON
fetch("/menu/dane.json")
    .then(odpowiedz => {
        if (!odpowiedz.ok) {
            throw new Error("Nie udało się wczytać pliku JSON.");
        }

        return odpowiedz.json();
    })
    .then(dane => {
        slowa = dane;

        if (slowa.length === 0) {
            throw new Error("Baza słówek jest pusta.");
        }

        // Kopia listy wszystkich słów
        pozostaleSlowa = [...slowa];

        losujSlowo();
    })
    .catch(blad => {
        slowoHTML.textContent = "Błąd wczytywania";
        komunikatHTML.textContent = blad.message;
        przyciskHTML.disabled = true;
    });


// Losowanie słowa
function losujSlowo() {
    if (pozostaleSlowa.length === 0) {
        zakonczQuiz();
        return;
    }

    // Losujemy indeks dostępnego słowa
    let indeks = Math.floor(
        Math.random() * pozostaleSlowa.length
    );

    // Pobieramy słowo i usuwamy je z puli
    aktualneSlowo = pozostaleSlowa.splice(indeks, 1)[0];

    slowoHTML.textContent = aktualneSlowo.english;

    liczbaPytan++;

    postepHTML.textContent =
        `Słowo ${liczbaPytan} z ${slowa.length}`;

    odpowiedzHTML.value = "";
    odpowiedzHTML.disabled = false;
    odpowiedzHTML.focus();

    komunikatHTML.textContent = "";
    wynikHTML.textContent = "";

    przyciskHTML.textContent = "Sprawdź";
}


// Sprawdzanie odpowiedzi
function sprawdzOdpowiedz() {
    // Jeżeli przycisk pokazuje "Następne słowo",
    // przechodzimy do kolejnego pytania.
    if (przyciskHTML.textContent === "Następne słowo") {
        losujSlowo();
        return;
    }

    let odpowiedzUzytkownika =
        odpowiedzHTML.value.trim().toLowerCase();

    if (odpowiedzUzytkownika === "") {
        komunikatHTML.textContent =
            "Wpisz tłumaczenie słowa!";
        return;
    }

    let poprawneTlumaczenie =
        aktualneSlowo.polish.toLowerCase();

    if (odpowiedzUzytkownika === poprawneTlumaczenie) {
        liczbaPoprawnych++;

        komunikatHTML.textContent = "Dobrze! Poprawna odpowiedź.";
        komunikatHTML.style.color = "green";
    } else {
        komunikatHTML.textContent =
            `Źle! Poprawne tłumaczenie to: ${aktualneSlowo.polish}`;

        komunikatHTML.style.color = "red";
    }

    odpowiedzHTML.disabled = true;
    przyciskHTML.textContent = "Następne słowo";

    // Po ostatnim pytaniu przycisk kończy quiz
    if (pozostaleSlowa.length === 0) {
        przyciskHTML.textContent = "Zobacz wynik";
    }
}


// Zakończenie quizu
function zakonczQuiz() {
    slowoHTML.textContent = "Koniec quizu!";
    postepHTML.textContent = "Wszystkie słowa zostały wykorzystane.";

    odpowiedzHTML.style.display = "none";
    przyciskHTML.style.display = "none";
    komunikatHTML.textContent = "";

    wynikHTML.textContent =
        `Twój wynik: ${liczbaPoprawnych}/${slowa.length} poprawnych odpowiedzi.`;
}


// Obsługa przycisku
przyciskHTML.addEventListener("click", function () {
    if (przyciskHTML.textContent === "Zobacz wynik") {
        zakonczQuiz();
    } else {
        sprawdzOdpowiedz();
    }
});

// Można również zatwierdzić odpowiedź klawiszem Enter
odpowiedzHTML.addEventListener("keydown", function (event) {
    if (
        event.key === "Enter" &&
        !odpowiedzHTML.disabled &&
        przyciskHTML.textContent === "Sprawdź"
    ) {
        sprawdzOdpowiedz();
    }
});
