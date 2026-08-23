// =====================================================
// ERIJANAS ABSCHIEDSFEIER
// =====================================================


// =====================================================
// 1. ELEMENTE AUS DEM HTML HOLEN
// =====================================================

const invitation =
    document.getElementById("invitation");

const invitationCard =
    document.getElementById("invitationCard");

const languageScreen =
    document.getElementById("languageScreen");

const website =
    document.getElementById("website");

const languageButtons =
    document.querySelectorAll(".language-button");


// =====================================================
// 2. GEWÄHLTE SPRACHE
// =====================================================

let selectedLanguage = null;

const savedLanguage =
    localStorage.getItem("selectedLanguage");

if (savedLanguage) {
    selectedLanguage = savedLanguage;
}


// =====================================================
// 3. VIDEO-EINLADUNG
// =====================================================

const invitationVideo =
    document.getElementById("invitationVideo");

const videoOpening =
    document.getElementById("videoOpening");

// =====================================================
// ERSTES VIDEO-BILD ALS VORSCHAU LADEN
// =====================================================

if (invitationVideo) {

    invitationVideo.addEventListener(
        "loadeddata",
        function () {

            invitationVideo.currentTime = 0;

        }
    );

}

// =====================================================
// VIDEO STARTEN
// =====================================================

function startInvitationVideo() {

    if (!invitationVideo) {
        return;
    }


    // Öffnen-Text ausblenden

    invitationCard.classList.add(
        "playing"
    );


    // Video starten

    const playPromise =
        invitationVideo.play();


    if (playPromise !== undefined) {

        playPromise.catch(
            function(error) {

                console.log(
                    "Video konnte nicht gestartet werden:",
                    error
                );

            }
        );

    }

}

// =====================================================
// KLICK AUF DIE EINLADUNG
// =====================================================

invitationCard.addEventListener(
    "click",
    function() {

        /*
         * Wenn das Video bereits läuft,
         * nichts mehr machen.
         */

        if (
            !invitationVideo.paused
        ) {
            return;
        }


        startInvitationVideo();

    }
);


// =====================================================
// TASTATUR
// =====================================================

invitationCard.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();


            if (
                invitationVideo.paused
            ) {

                startInvitationVideo();

            }

        }

    }
);


// =====================================================
// VIDEO IST FERTIG
// =====================================================

invitationVideo.addEventListener(
    "ended",
    function() {

        /*
         * Erste Seite ausblenden
         */

        invitation.style.display =
            "none";


        /*
         * Sprachwahl anzeigen
         */

        languageScreen.style.display =
            "grid";


        /*
         * Ganz nach oben
         */

        window.scrollTo(
            0,
            0
        );

    }
);

// =====================================================
// 4. SPRACHE AUSWÄHLEN
// =====================================================

languageButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

selectedLanguage =
    button.dataset.lang;

localStorage.setItem(
    "selectedLanguage",
    selectedLanguage
);


                languageButtons.forEach(
                    function(otherButton) {

                        otherButton.classList.remove(
                            "selected"
                        );

                    }
                );


                button.classList.add(
                    "selected"
                );


                setTimeout(
                    showWebsite,
                    250
                );

            }
        );

    }
);


// =====================================================
// 5. HAUPTWEBSITE ANZEIGEN
// =====================================================

function showWebsite() {

    if (!selectedLanguage) {
        return;
    }


    languageScreen.style.display =
        "none";

    website.style.display =
        "block";


    document.documentElement.lang =
        selectedLanguage;


    setLanguage(
        selectedLanguage
    );


    /*
       Normalerweise beim ersten Öffnen
       ganz oben starten.

       Falls jedoch ein Hash vorhanden ist,
       z.B. #guests, wird dieser Bereich
       anschließend geöffnet.
    */

    if (!window.location.hash) {

        window.scrollTo(
            0,
            0
        );

    }

}


// =====================================================
// 6. SPRACHE UMSCHALTEN
// =====================================================

function setLanguage(language) {

    const germanElements =
        document.querySelectorAll(
            ".language-de"
        );

    const albanianElements =
        document.querySelectorAll(
            ".language-sq"
        );


    // =================================================
    // DEUTSCH
    // =================================================

    if (language === "de") {

        germanElements.forEach(
            function(element) {

                element.style.display =
                    getCorrectDisplayValue(element);

            }
        );


        albanianElements.forEach(
            function(element) {

                element.style.display =
                    "none";

            }
        );

    }


    // =================================================
    // ALBANISCH
    // =================================================

    if (language === "sq") {

        germanElements.forEach(
            function(element) {

                element.style.display =
                    "none";

            }
        );


        albanianElements.forEach(
            function(element) {

                element.style.display =
                    getCorrectDisplayValue(element);

            }
        );

    }


    // Einladung entsprechend der Sprache

    setInvitationImage(language);

}


// =====================================================
// 7. RICHTIGEN DISPLAY-WERT BESTIMMEN
// =====================================================

function getCorrectDisplayValue(element) {

    const tag =
        element.tagName.toLowerCase();


    if (tag === "span") {
        return "inline";
    }


    if (tag === "small") {
        return "inline";
    }


    if (tag === "a") {
        return "inline-block";
    }


    if (tag === "button") {
        return "inline-block";
    }


    return "block";

}


// =====================================================
// 8. EINLADUNGSBILD SETZEN
// =====================================================

function setInvitationImage(language) {

    const invitationSection =
        document.getElementById(
            "invitationSection"
        );


    if (!invitationSection) {
        return;
    }


    if (language === "de") {

        invitationSection.style.backgroundImage =
            'url("images/1_Einladungskarte_Erijana_DE.jpg")';

    }


    if (language === "sq") {

        invitationSection.style.backgroundImage =
            'url("images/1_Einladungskarte_Erijana_SQ.jpg")';

    }

}


// =====================================================
// 9. COUNTDOWN – ZIELDATUM
// =====================================================

const countdownTarget =
    new Date(
        "2027-08-01T19:00:00+02:00"
    ).getTime();


// =====================================================
// 10. COUNTDOWN AKTUALISIEREN
// =====================================================

function updateCountdown() {

    const now =
        new Date().getTime();


    const distance =
        countdownTarget - now;


    const daysElement =
        document.getElementById(
            "countdownDays"
        );


    const hoursElement =
        document.getElementById(
            "countdownHours"
        );


    const minutesElement =
        document.getElementById(
            "countdownMinutes"
        );


    const secondsElement =
        document.getElementById(
            "countdownSeconds"
        );


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    if (distance <= 0) {

        daysElement.textContent =
            "000";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";

        return;

    }


    // =================================================
    // ZEIT BERECHNEN
    // =================================================

    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    // =================================================
    // ZAHLEN ANZEIGEN
    // =================================================

    daysElement.textContent =
        String(days).padStart(
            3,
            "0"
        );


    hoursElement.textContent =
        String(hours).padStart(
            2,
            "0"
        );


    minutesElement.textContent =
        String(minutes).padStart(
            2,
            "0"
        );


    secondsElement.textContent =
        String(seconds).padStart(
            2,
            "0"
        );

}


// =====================================================
// 11. COUNTDOWN STARTEN
// =====================================================

updateCountdown();


setInterval(
    updateCountdown,
    1000
);


// =====================================================
// 12. ZURÜCK ZUM GÄSTE-BEREICH
// =====================================================

function scrollToGuestSection() {

    const guestsSection =
        document.getElementById("guests");


    if (!guestsSection) {
        return;
    }


    setTimeout(
        function() {

            guestsSection.scrollIntoView({
                behavior: "instant",
                block: "start"
            });

        },
        150
    );

}

