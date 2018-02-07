function isLogin() {
    var userName = localStorage.getItem('currentUser');
    if (userName != null) {
        $('.user').append($(`<button class="btn btn-info my-2 my-sm-0" id="user" 
    type="button">${userName}</button>`));
        $('.user').append($(`<button class="btn btn-warning my-2 
        my-sm-0" id="logout" type="button">Cerrar sesión</button>`));
    }
}