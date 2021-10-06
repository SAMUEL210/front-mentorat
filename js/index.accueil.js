if (!(sessionStorage.getItem('utilisateur') && sessionStorage.getItem('x-access-token'))) {
    window.location.replace('../index.html')
}