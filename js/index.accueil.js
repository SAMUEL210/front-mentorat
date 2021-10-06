if (!(sessionStorage.getItem('utilisateur') && sessionStorage.getItem('x-access-token'))) {
    window.location.replace('../index.html')
} else {



    const titre = document.querySelector('.titre')
    const collegues = document.querySelector('.collegues')
    const contrats = document.querySelector('.contrats')

    axios({
            method: 'get',
            url: 'https://api-simarone-fusecrum.herokuapp.com/utilisateurs/' + sessionStorage.getItem('utilisateur'),
            headers: {
                'x-access-token': sessionStorage.getItem('x-access-token')
            },
            responseType: 'json'
        })
        .then(function(reponse) {
            axios({
                    method: 'get',
                    url: 'https://api-simarone-fusecrum.herokuapp.com/entreprises/' + reponse.data.utilisateur.entreprise_id,
                    headers: {
                        'x-access-token': sessionStorage.getItem('x-access-token')
                    },
                    responseType: 'json'
                })
                .then(function(response) {
                    for (utilisateur of response.data.entreprises.employes) {
                        if (utilisateur != sessionStorage.getItem('utilisateur')) {
                            axios({
                                method: 'get',
                                url: 'https://api-simarone-fusecrum.herokuapp.com/utilisateurs/' + utilisateur,
                                headers: {
                                    'x-access-token': sessionStorage.getItem('x-access-token')
                                },
                                responseType: 'json'
                            }).then(function(donneeUtilisateur) {
                                var ut = donneeUtilisateur.data.utilisateur
                                let div = document.createElement('div')
                                let p = document.createElement('p')
                                let form = document.createElement('form')
                                let input = document.createElement('input')
                                let button = document.createElement('input')

                                p.innerHTML = "" + ut.prenom + ' ' + ut.nom + ', ' + ut.poste + ' à ' + response.data.entreprises.nom
                                p.className = 'p-collegues'
                                div.appendChild(p)

                                input.style.display = 'none'
                                input.type = 'text'
                                input.value = ut.entreprise_id
                                form.appendChild(input)

                                button.value = 'Voir plus'
                                button.type = 'submit'
                                button.className = 'btn btn-outline-danger btn-sm'
                                form.appendChild(button)
                                div.appendChild(form)
                                collegues.appendChild(div)

                                div.style.display = 'flex'
                                div.style.justifyContent = 'space-between'
                                div.className = 'div-collegues breadcrumb'
                            })
                        }
                    }
                });
        });

    axios({
            method: 'get',
            url: 'https://api-simarone-fusecrum.herokuapp.com/contrats/',
            headers: {
                'x-access-token': sessionStorage.getItem('x-access-token')
            },
            responseType: 'json'
        })
        .then(function(reponse) {
            for (contrat of reponse.data.contrats) {
                if (contrat.mentorId != sessionStorage.getItem('utilisateur')) {}
            }
        })

}