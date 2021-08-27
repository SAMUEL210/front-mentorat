let afficherEntreprises = () => {
    axios({
            method: 'get',
            url: 'http://localhost:3000/entreprises',
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