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



const radioPresent = document.getElementById('present');
const radioPasPresent = document.getElementById('pas_present');
const selectNombrePersonnes = document.getElementById('Number_peoples');

// Fonction pour gérer l'état du champ "Nombre de personnes"
function toggleNombrePersonnes() {
    if (radioPasPresent.checked) {
        selectNombrePersonnes.disabled = true; // Désactive le champ
        selectNombrePersonnes.value = "0"; // Réinitialise la sélection
    } else {
        selectNombrePersonnes.disabled = false; // Active le champ
    }
}

// Ajouter des écouteurs d'événements pour les radios
radioPresent.addEventListener('change', toggleNombrePersonnes);
radioPasPresent.addEventListener('change', toggleNombrePersonnes);

// Appeler la fonction une fois pour s'assurer que l'état initial est correct
toggleNombrePersonnes();




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


const form = document.getElementById('Formulaire_invitations');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const formData = new FormData(form);

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyB1Rp9EOu31qXU7X2jHQFiSa4JPqsUU7dKjwmwmVGiKd6LrjMx5RFq7Mhj676IRPU3/exec', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Formulaire soumis avec succès !');
            form.reset(); // Réinitialise le formulaire après soumission
            window.location.href = 'merci.html'; // Redirige vers la page "merci.html"
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
    } catch (error) {
        alert('Une erreur est survenue lors de l\'envoi du formulaire.');
    }
});
