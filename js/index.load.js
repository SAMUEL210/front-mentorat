let afficherEntreprises = () => {
    axios({
            method: 'get',
            url: 'http://localhost:3000/entreprise',
            responseType: 'json'
        })
        .then(function(response) {
            select = document.getElementById('entreprises');
            donnee = response.data.entreprises
            for (var entr in donnee) {
                var opt = document.createElement('option');
                opt.value = donnee[entr]._id;
                opt.innerHTML = donnee[entr].nom;
                select.appendChild(opt);
            }
        });
}

afficherEntreprises()