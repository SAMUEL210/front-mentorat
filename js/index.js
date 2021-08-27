const validerConnexion = document.querySelector('.se-connecter')
const validerCreerCompte = document.querySelector('.creer-compte')

// Conenxion
const email = document.getElementById('email')
const mp = document.getElementById('mp')
const champsvides = document.querySelector('.champs-vides')
const identifiantsIncorrectes = document.querySelector('.identifiant-incorrectes')
var checkbox = document.getElementById("afficher-mp");

// Creer compte
const nom = document.getElementById('nom')
const prenom = document.getElementById('prenom')
const crEmail = document.getElementById('cr-email')
const crMp = document.getElementById('cr-mp')
const confMp = document.getElementById('conf-fr-mp')
const poste = document.getElementById('poste')
const entreprise = document.getElementById('entreprises')
const crChampsVides = document.querySelector('.cr-champs-vides')
const donneesIncorrectes = document.querySelector('.donnees-incorrectes')
var checkbox2 = document.getElementById("cr-afficher-mp");


validerConnexion.addEventListener('click', (e) => {
    e.preventDefault();

    if (email.value == "" || mp.value === "") {
        champsvides.classList.remove('masque')
        champsvides.classList.add('affiche')
        if (email.value == "")
            email.classList.add('is-invalid')
        else email.classList.remove('is-invalid')
        if (mp.value == "")
            mp.classList.add('is-invalid')
        else mp.classList.remove('is-invalid')
    } else if (email.value != "" && mp.value != "") {
        champsvides.classList.remove('affiche')
        champsvides.classList.add('masque')
        mp.classList.remove('is-invalid')
        email.classList.remove('is-invalid')

        axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                data: {
                    email: email.value,
                    mp: mp.value
                },
                responseType: 'json'
            })
            .then(function(reponse) {
                if (reponse.data.error) {
                    identifiantsIncorrectes.innerHTML = reponse.data.error
                    identifiantsIncorrectes.classList.remove('masque')
                    identifiantsIncorrectes.classList.add('affiche')

                    if (reponse.data.cause == 'Email')
                        email.classList.add('is-invalid')
                } else {
                    identifiantsIncorrectes.classList.remove('affiche')
                    identifiantsIncorrectes.classList.add('masque')
                        //load page d'accueil
                }
            });
    }

})

validerCreerCompte.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Clcik creer-compte')
    if (nom.value == "" || prenom.value == "" || crEmail.value == "" || crMp.value === "" || confMp.value == "" || poste.value == "" || entreprises == "") {
        champsvides.classList.remove('masque')
        champsvides.classList.add('affiche')

        if (email.value == "")
            email.classList.add('is-invalid')
        else email.classList.remove('is-invalid')
        if (mp.value == "")
            mp.classList.add('is-invalid')
        else mp.classList.remove('is-invalid')
    } else if (email.value != "" && mp.value != "") {
        champsvides.classList.remove('affiche')
        champsvides.classList.add('masque')
        mp.classList.remove('is-invalid')
        email.classList.remove('is-invalid')

        // axios({
        //         method: 'post',
        //         url: 'http://localhost:3000/login',
        //         data: {
        //             email: email.value,
        //             mp: mp.value
        //         },
        //         responseType: 'json'
        //     })
        //     .then(function(reponse) {
        //         if (reponse.data.error) {
        //             identifiantsIncorrectes.innerHTML = reponse.data.error
        //             identifiantsIncorrectes.classList.remove('masque')
        //             identifiantsIncorrectes.classList.add('affiche')

        //             if (reponse.data.cause == 'Email')
        //                 email.classList.add('is-invalid')
        //         } else {
        //             identifiantsIncorrectes.classList.remove('affiche')
        //             identifiantsIncorrectes.classList.add('masque')
        //                 //load page d'accueil
        //         }
        //     });
    }

})

checkbox.addEventListener('change', function() {
    if (this.checked) {
        mp.type = 'text'
    } else {
        mp.type = 'password'
    }
});
checkbox2.addEventListener('change', function() {
    if (this.checked) {
        crMp.type = 'text'
        confMp.type = 'text'
    } else {
        crMp.type = 'password'
        confMp.type = 'password'
    }
});