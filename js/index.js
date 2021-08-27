const validerConnexion = document.querySelector('.btn-outline-success')

validerConnexion.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('clique connect')
    const email = document.getElementById('email')
    const mp = document.getElementById('mp')

    if (email.value == "" || mp.value === "") {
        console.log('il sont vides')
        email.parentNode.classList.add('is-invalid')
    }
})