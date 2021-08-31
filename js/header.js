var utilisateurId = sessionStorage.getItem('utilisateur');
const token = sessionStorage.getItem('x-access-token')

const REQUEST_HEADERS = {
    "Content-Type": "application/json",
    "x-access-token": token
};

axios({
        method: 'get',
        url: 'https://api-simarone-fusecrum.herokuapp.com/utilisateurs/' + utilisateurId,
        headers: REQUEST_HEADERS,
        responseType: 'json'
    })
    .then((reponse) => {
        let imgUtilisateur = document.querySelector('.img-utilisateur')
        let nomUtilisateur = document.querySelector('.nom-utilisateur')
        let posteUtilisateur = document.querySelector('.poste-utilisateur')
        let entrepriseUtilisateur = document.querySelector('.entreprise-utilisateur')

        console.log(reponse.data)
        imgUtilisateur.src = '.' + reponse.data.utilisateur.imgUrl
        nomUtilisateur.innerHTML = reponse.data.utilisateur.prenom + ' ' + reponse.data.utilisateur.nom
        posteUtilisateur.innerHTML = reponse.data.utilisateur.poste

        axios({
                method: 'get',
                url: 'http://localhost:3000/entreprises/' + reponse.data.utilisateur.entreprise_id,
                headers: REQUEST_HEADERS,
                responseType: 'json'
            })
            .then((reponse) => {
                entrepriseUtilisateur.innerHTML = reponse.data.entreprises.nom
            }).catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));