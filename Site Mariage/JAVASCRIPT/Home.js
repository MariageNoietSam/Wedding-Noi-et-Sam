// Jouer l'audio lorsque la page est chargée
window.onload = function () {
    const audio = document.getElementById('backgroundAudio');
    const savedTime = localStorage.getItem('audioTime');

    if (savedTime) {
        audio.currentTime = parseFloat(savedTime); // Reprend à la position sauvegardée
    }

    audio.play().catch(function (error) {
        console.log("Erreur lors de la lecture de l'audio : ", error);
    });
};

// Sauvegarder la position audio avant de quitter la page
window.addEventListener('beforeunload', function () {
    const audio = document.getElementById('backgroundAudio');
    if (!audio.paused) {
        localStorage.setItem('audioTime', audio.currentTime); // Sauvegarde la position
    }
});

// Bouton pour contrôler le son
const btnSons = document.getElementById('btn-sons');
const audio = document.getElementById('backgroundAudio');
const icon = document.getElementById('son-icon');

// Ajouter un événement de clic au bouton
btnSons.addEventListener('click', function () {
    if (audio.paused) {
        audio.play().catch(function (error) {
            console.log("Erreur lors de la lecture de l'audio : ", error);
        });
        icon.textContent = 'volume_up'; // Changer l'icône en volume_up
    } else {
        audio.pause();
        icon.textContent = 'volume_off'; // Changer l'icône en volume_off
    }
});


document.getElementById('btn-invitation').addEventListener('click', function() {
    const selectedFlag = localStorage.getItem('selectedFlag');
    
    if (selectedFlag === 'il') {
        // Si la langue sélectionnée est l'hébreu
        window.location.href = 'Invitation Hebrew.html';
    } else {
        // Sinon, c'est la version française
        window.location.href = 'Invitation.html';
    }
});


// Remplacez 'YYYY-MM-DDTHH:MM:SS' par votre date et heure cibles
const targetDate = new Date('2025-08-18T00:00:00').getTime(); // Exemple : 31 décembre 2023 à 00h00

const countdownFunction = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Calculer les jours, heures, minutes et secondes
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Mettre à jour les valeurs dans le HTML
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = String(hours).padStart(2, '0'); // Format 2 chiffres
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0'); // Format 2 chiffres
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0'); // Format 2 chiffres

    // Si le compte à rebours est proche de la date cible, afficher 00:00:00:00
    if (distance <= 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
    }
}, 1000);


// Quand un drapeau est sélectionné
document.querySelector('.flag-fr').addEventListener('click', function() {
    // Sauvegarder la sélection du drapeau français dans localStorage
    localStorage.setItem('selectedFlag', 'fr');

    // Vérifier si l'utilisateur est sur la page en hébreu
    if (window.location.pathname.includes('Hebrew')) {
        // Si l'utilisateur est sur la page en hébreu, rediriger vers la page en français
        window.location.href = '/Home.html'; // Remplacez par l'URL de votre page en français
    } else {
        // Sinon, rester sur la page française
        updateFlagSelection();
    }
});

document.querySelector('.flag-il').addEventListener('click', function() {
    // Sauvegarder la sélection du drapeau israélien dans localStorage
    localStorage.setItem('selectedFlag', 'il');

    // Vérifier si l'utilisateur est sur la page en français
    if (window.location.pathname.includes('Home')) {
        // Si l'utilisateur est sur la page en français, rediriger vers la page en hébreu
        window.location.href = '/Home Hebrew.html'; // Remplacez par l'URL de votre page en hébreu
    } else {
        // Sinon, rester sur la page hébraïque
        updateFlagSelection();
    }
});

// Fonction pour mettre à jour l'apparence en fonction de la sélection
function updateFlagSelection() {
    const selectedFlag = localStorage.getItem('selectedFlag');

    // Si le drapeau français est sélectionné
    if (selectedFlag === 'fr') {
        document.querySelector('.flag-fr').style.boxShadow = '0 0 0 3px #a48f9f'; // Contour du drapeau français
        document.querySelector('.flag-il').style.boxShadow = 'none'; // Enlever le contour du drapeau israélien
    } 
    // Si le drapeau israélien est sélectionné
    else if (selectedFlag === 'il') {
        document.querySelector('.flag-il').style.boxShadow = '0 0 0 3px #a48f9f'; // Contour du drapeau israélien
        document.querySelector('.flag-fr').style.boxShadow = 'none'; // Enlever le contour du drapeau français
    }
}

// Appeler la fonction pour mettre à jour l'état du drapeau sélectionné au chargement de la page
window.onload = updateFlagSelection;
