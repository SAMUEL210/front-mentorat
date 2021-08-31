if (sessionStorage.getItem('utilisateur') && sessionStorage.getItem('x-access-token')) {
    window.location.replace('./accueil/index.html')
} else {
    let afficherEntreprises = () => {
        axios({
                method: 'get',
                url: 'https://api-simarone-fusecrum.herokuapp.com/entreprises',
                responseType: 'json'
            })
            .then(function(reponse) {
                select = document.getElementById('entreprises');
                select.appendChild(document.createElement('option'))
                donnee = reponse.data.entreprises
                for (var entr in donnee) {
                    var opt = document.createElement('option');
                    opt.value = donnee[entr]._id;
                    opt.innerHTML = donnee[entr].nom;
                    select.appendChild(opt);
                }
            });
    }

    afficherEntreprises()
}