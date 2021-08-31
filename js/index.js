const validerConnexion = document.querySelector('.se-connecter')
const validerCreerCompte = document.getElementById('creer-compte')

// Conenxion
const email = document.getElementById('email')
const mp = document.getElementById('mp')
const champsvides = document.querySelector('.champs-vides')
const identifiantsIncorrectes = document.querySelector('.identifiant-incorrectes')
var checkbox = document.getElementById("afficher-mp");

// Creer compte
const nom = document.getElementById('nom')
const prenom = document.getElementById('prenom')
const description = document.getElementById('description')
const crEmail = document.getElementById('cr-email')
const crMp = document.getElementById('cr-mp')
const confMp = document.getElementById('conf-cr-mp')
const poste = document.getElementById('poste')
const entreprise = document.getElementById('entreprises')
const crChampsVides = document.querySelector('.cr-champs-vides')
const emailIncorrectes = document.querySelector('.email-incorrectes')
const succes = document.querySelector('.cr-succes')
const mpDifferent = document.querySelector('.mp-different')
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
                url: 'https://api-simarone-fusecrum.herokuapp.com/login',
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

                    sessionStorage.setItem(
                        "x-access-token",
                        reponse.headers.authorization
                    );
                    sessionStorage.setItem("utilisateur", reponse.data.id);
                    window.location.replace("./accueil/index.html");

                }
            });
    }

})

validerCreerCompte.addEventListener('click', (e) => {
    e.preventDefault();

    if (nom.value == "" || prenom.value == "" || description.value == '' || crEmail.value == "" || crMp.value === "" || confMp.value == "" || poste.value == "" || entreprises == "") {
        crChampsVides.classList.remove('masque')
        crChampsVides.classList.add('affiche')

        if (nom.value == "")
            nom.classList.add('is-invalid')
        else {
            nom.classList.remove('is-invalid')
            nom.classList.add('is-valid')
        }

        if (prenom.value == "")
            prenom.classList.add('is-invalid')
        else {
            prenom.classList.remove('is-invalid')
            prenom.classList.add('is-valid')
        }
        if (description.value == "")
            description.classList.add('is-invalid')
        else {
            description.classList.remove('is-invalid')
            description.classList.add('is-valid')
        }

        if (crEmail.value == "")
            crEmail.classList.add('is-invalid')
        else {
            crEmail.classList.remove('is-invalid')
            crEmail.classList.add('is-valid')
        }

        if (crMp.value == "")
            crMp.classList.add('is-invalid')
        else {
            crMp.classList.remove('is-invalid')
            crMp.classList.add('is-valid')
        }

        if (confMp.value == "")
            confMp.classList.add('is-invalid')
        else {
            confMp.classList.remove('is-invalid')
            confMp.classList.add('is-valid')
        }

        if (poste.value == "")
            poste.classList.add('is-invalid')
        else {
            poste.classList.remove('is-invalid')
            poste.classList.add('is-valid')
        }

        if (entreprises.value == "")
            entreprises.classList.add('is-invalid')
        else {
            entreprises.classList.remove('is-invalid')
            entreprises.classList.add('is-valid')
        }

    } else if (nom.value != "" && prenom.value != "" && description.value != "" && crEmail.value != "" && crMp.value != "" && confMp.value != "" && poste.value != "" && entreprises.value != "") {
        crChampsVides.classList.remove('affiche')
        crChampsVides.classList.add('masque')

        nom.classList.remove('is-invalid')
        prenom.classList.remove('is-invalid')
        description.classList.remove('is-invalid')
        poste.classList.remove('is-invalid')
        entreprises.classList.remove('is-invalid')

        nom.classList.add('is-valid')
        prenom.classList.add('is-valid')
        description.classList.add('is-valid')
        poste.classList.add('is-valid')
        entreprises.classList.add('is-valid')

        if (crMp.value != confMp.value) {
            crMp.classList.add('is-invalid')
            confMp.classList.add('is-invalid')
            mpDifferent.classList.remove('masque')
            mpDifferent.classList.add('affiche')
        } else {
            crMp.classList.remove('is-invalid')
            crMp.classList.add('is-valid')
            confMp.classList.remove('is-invalid')
            confMp.classList.add('is-valid')
            mpDifferent.classList.remove('affiche')
            mpDifferent.classList.add('masque')

            axios({
                    method: 'post',
                    url: 'https://api-simarone-fusecrum.herokuapp.com/utilisateurs',
                    data: {
                        nom: nom.value,
                        prenom: prenom.value,
                        description: description.value,
                        email: crEmail.value,
                        mp: crMp.value,
                        poste: poste.value,
                        entreprise_id: entreprises.value
                    },
                    responseType: 'json'
                })
                .then(function(reponse) {
                    if (reponse.data.error) {
                        emailIncorrectes.innerHTML = reponse.data.error
                        emailIncorrectes.classList.remove('masque')
                        emailIncorrectes.classList.add('affiche')

                        if (reponse.data.cause == 'Email')
                            crEmail.classList.add('is-invalid')
                    } else {
                        nom.classList.remove('is-valid')
                        prenom.classList.remove('is-valid')
                        description.classList.remove('is-valid')
                        crEmail.classList.remove('is-invalid')
                        crMp.classList.remove('is-valid')
                        confMp.classList.remove('is-valid')
                        poste.classList.remove('is-valid')
                        entreprises.classList.remove('is-valid')

                        emailIncorrectes.classList.remove('affiche')
                        emailIncorrectes.classList.add('masque')

                        nom.value = ''
                        prenom.value = ''
                        description.value = ''
                        crEmail.value = ''
                        crMp.value = ''
                        confMp.value = ''
                        poste.value = ''

                        succes.classList.remove('masque')
                        succes.classList.add('affiche')
                    }
                });
        }
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