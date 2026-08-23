// =====================================================
// ERIJANAS ABSCHIEDSFEIER
// JAVASCRIPT
// =====================================================



// =====================================================
// 1. GRUNDLAGEN & ELEMENTE
// =====================================================

// -----------------------------------------------------
// HAUPTELEMENTE
// -----------------------------------------------------

const invitation =
    document.getElementById("invitation");

const invitationCard =
    document.getElementById("invitationCard");

const languageScreen =
    document.getElementById("languageScreen");

const website =
    document.getElementById("website");


// -----------------------------------------------------
// SPRACHAUSWAHL
// -----------------------------------------------------

const languageButtons =
    document.querySelectorAll(".language-button");


// -----------------------------------------------------
// VIDEO-ELEMENTE
// -----------------------------------------------------

const invitationVideo =
    document.getElementById("invitationVideo");

const videoOpening =
    document.getElementById("videoOpening");



// =====================================================
// 2. SPRACHE & SPEICHERUNG
// =====================================================

// -----------------------------------------------------
// AUSGEWÄHLTE SPRACHE
// -----------------------------------------------------

let selectedLanguage = null;


// -----------------------------------------------------
// GESPEICHERTE SPRACHE AUS LOCALSTORAGE LADEN
// -----------------------------------------------------

const savedLanguage =
    localStorage.getItem("selectedLanguage");


if (
    savedLanguage === "de" ||
    savedLanguage === "sq"
) {

    selectedLanguage =
        savedLanguage;

}


 // =====================================================
// 3. VIDEO-EINLADUNG
// =====================================================

// -----------------------------------------------------
// ERSTEN VIDEOfRAME AUF MOBILE SICHTBAR MACHEN
// -----------------------------------------------------

if (invitationVideo) {

    invitationVideo.addEventListener(
        "loadedmetadata",
        function () {

            invitationVideo.currentTime = 0;

        }
    );


    invitationVideo.addEventListener(
        "canplay",
        function () {

            invitationVideo.muted = true;

            invitationVideo.play()
                .then(function () {

                    setTimeout(
                        function () {

                            invitationVideo.pause();

                            invitationVideo.currentTime = 0;

                        },
                        80
                    );

                })
                .catch(function (error) {

                    console.log(
                        "Vorschau konnte nicht gestartet werden:",
                        error
                    );

                });

        },
        { once: true }
    );

}


// -----------------------------------------------------
// VIDEO STARTEN
// -----------------------------------------------------

function startInvitationVideo() {

    if (
        !invitationVideo ||
        !invitationCard
    ) {

        return;

    }


    invitationCard.classList.add(
        "playing"
    );


    invitationVideo.muted = true;


    const playPromise =
        invitationVideo.play();


    if (
        playPromise !== undefined
    ) {

        playPromise.catch(
            function (error) {

                console.log(
                    "Video konnte nicht gestartet werden:",
                    error
                );

            }
        );

    }

}


// -----------------------------------------------------
// KLICK AUF DIE EINLADUNG
// -----------------------------------------------------

if (invitationCard) {

    invitationCard.addEventListener(
        "click",
        function () {

            if (
                invitationVideo &&
                !invitationVideo.paused
            ) {

                return;

            }


            startInvitationVideo();

        }
    );


    // -------------------------------------------------
    // TASTATURSTEUERUNG
    // -------------------------------------------------

    invitationCard.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();


                if (
                    invitationVideo &&
                    invitationVideo.paused
                ) {

                    startInvitationVideo();

                }

            }

        }
    );

}


// -----------------------------------------------------
// VIDEO IST FERTIG
// -----------------------------------------------------

if (invitationVideo) {

    invitationVideo.addEventListener(
        "ended",
        function () {

            if (invitation) {

                invitation.style.display =
                    "none";

            }


            if (languageScreen) {

                languageScreen.style.display =
                    "grid";

            }


            window.scrollTo(
                0,
                0
            );

        }
    );

}



// =====================================================
// 4. SPRACHAUSWAHL
// =====================================================

// -----------------------------------------------------
// SPRACHE AUSWÄHLEN
// -----------------------------------------------------

languageButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {


                // Gewählte Sprache speichern

                selectedLanguage =
                    button.dataset.lang;


                localStorage.setItem(
                    "selectedLanguage",
                    selectedLanguage
                );


                // Alle Buttons zurücksetzen

                languageButtons.forEach(
                    function (otherButton) {

                        otherButton.classList.remove(
                            "selected"
                        );

                    }
                );


                // Gewählten Button markieren

                button.classList.add(
                    "selected"
                );


                // Kurz warten und Website öffnen

                setTimeout(
                    showWebsite,
                    250
                );

            }
        );

    }
);



// =====================================================
// 5. HAUPTWEBSITE ÖFFNEN
// =====================================================

function showWebsite() {

    if (!selectedLanguage) {

        return;

    }


    // -------------------------------------------------
    // SPRACHAUSWAHL AUSBLENDEN
    // -------------------------------------------------

    if (languageScreen) {

        languageScreen.style.display =
            "none";

    }


    // -------------------------------------------------
    // HAUPTWEBSITE EINBLENDEN
    // -------------------------------------------------

    if (website) {

        website.style.display =
            "block";

    }


    // -------------------------------------------------
    // HTML-SPRACHE SETZEN
    // -------------------------------------------------

    document.documentElement.lang =
        selectedLanguage;


    // -------------------------------------------------
    // SPRACHE AUF DER WEBSITE SETZEN
    // -------------------------------------------------

    setLanguage(
        selectedLanguage
    );


    // -------------------------------------------------
    // OHNE HASH GANZ OBEN STARTEN
    // -------------------------------------------------

    if (!window.location.hash) {

        window.scrollTo(
            0,
            0
        );

    }

}



// =====================================================
// 6. SPRACHUMSCHALTUNG
// =====================================================

function setLanguage(language) {

    // -------------------------------------------------
    // DEUTSCHE ELEMENTE
    // -------------------------------------------------

    const germanElements =
        document.querySelectorAll(
            ".language-de"
        );


    // -------------------------------------------------
    // ALBANISCHE ELEMENTE
    // -------------------------------------------------

    const albanianElements =
        document.querySelectorAll(
            ".language-sq"
        );


    // =================================================
    // DEUTSCH AKTIVIEREN
    // =================================================

    if (language === "de") {

        germanElements.forEach(
            function (element) {

                element.style.display =
                    getCorrectDisplayValue(element);

            }
        );


        albanianElements.forEach(
            function (element) {

                element.style.display =
                    "none";

            }
        );

    }


    // =================================================
    // ALBANISCH AKTIVIEREN
    // =================================================

    if (language === "sq") {

        germanElements.forEach(
            function (element) {

                element.style.display =
                    "none";

            }
        );


        albanianElements.forEach(
            function (element) {

                element.style.display =
                    getCorrectDisplayValue(element);

            }
        );

    }


    // -------------------------------------------------
    // EINLADUNGSBILD ANPASSEN
    // -------------------------------------------------

    setInvitationImage(
        language
    );

}



// =====================================================
// 7. RICHTIGEN DISPLAY-WERT BESTIMMEN
// =====================================================

function getCorrectDisplayValue(element) {

    const tag =
        element.tagName.toLowerCase();


    // -------------------------------------------------
    // INLINE-ELEMENTE
    // -------------------------------------------------

    if (
        tag === "span" ||
        tag === "small"
    ) {

        return "inline";

    }


    // -------------------------------------------------
    // INLINE-BLOCK-ELEMENTE
    // -------------------------------------------------

    if (
        tag === "a" ||
        tag === "button"
    ) {

        return "inline-block";

    }


    // -------------------------------------------------
    // ALLE ANDEREN ELEMENTE
    // -------------------------------------------------

    return "block";

}



// =====================================================
// 8. EINLADUNGSBILD
// =====================================================

// -----------------------------------------------------
// PASSENDES EINLADUNGSBILD JE NACH SPRACHE
// -----------------------------------------------------

function setInvitationImage(language) {

    const invitationSection =
        document.getElementById(
            "invitationSection"
        );


    if (!invitationSection) {

        return;

    }


    // -------------------------------------------------
    // DEUTSCH
    // -------------------------------------------------

    if (language === "de") {

        invitationSection.style.backgroundImage =
            'url("images/1_Einladungskarte_Erijana_DE.jpg")';

    }


    // -------------------------------------------------
    // ALBANISCH
    // -------------------------------------------------

    if (language === "sq") {

        invitationSection.style.backgroundImage =
            'url("images/1_Einladungskarte_Erijana_SQ.jpg")';

    }

}



// =====================================================
// 9. COUNTDOWN
// =====================================================

// -----------------------------------------------------
// ZIELDATUM
// -----------------------------------------------------

const countdownTarget =
    new Date(
        "2027-08-01T19:00:00+02:00"
    ).getTime();



// =====================================================
// 10. COUNTDOWN AKTUALISIEREN
// =====================================================

function updateCountdown() {

    // -------------------------------------------------
    // AKTUELLE ZEIT
    // -------------------------------------------------

    const now =
        Date.now();


    // -------------------------------------------------
    // VERBLEIBENDE ZEIT
    // -------------------------------------------------

    const distance =
        countdownTarget - now;


    // -------------------------------------------------
    // COUNTDOWN-ELEMENTE
    // -------------------------------------------------

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


    // -------------------------------------------------
    // PRÜFEN, OB ALLE ELEMENTE EXISTIEREN
    // -------------------------------------------------

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    // -------------------------------------------------
    // WENN COUNTDOWN ABGELAUFEN IST
    // -------------------------------------------------

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

// Sofort einmal aktualisieren.

updateCountdown();


// Danach jede Sekunde aktualisieren.

setInterval(
    updateCountdown,
    1000
);



// =====================================================
// 12. GÄSTE-BEREICH
// =====================================================

// -----------------------------------------------------
// ZURÜCK ZUM GÄSTE-BEREICH SCROLLEN
// -----------------------------------------------------

function scrollToGuestSection() {

    const guestsSection =
        document.getElementById(
            "guests"
        );


    if (!guestsSection) {

        return;

    }


    // Kleiner zeitlicher Abstand,
    // damit die Seite zuerst vollständig angezeigt wird.

    setTimeout(
        function () {

            guestsSection.scrollIntoView({
                behavior: "auto",
                block: "start"
            });

        },
        150
    );

}



// =====================================================
// ENDE JAVASCRIPT
// =====================================================