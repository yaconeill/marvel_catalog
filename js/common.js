/**
 * If the user is logged it shows his name and a button to logout
 */
function isLogin() {
    var userName = localStorage.getItem('currentUser');
    var userList = JSON.parse(localStorage.getItem('userList'));
    if (userName != null)
        userList.find(o => {
            logger = $(`<span class="btn btn-info" id="user">${o.name}</span>
            <button class="btn btn-warning my-2 my-sm-0" id="logout" type="button">Cerrar sesión</button>`);
            if (o.name === userName)
                $('.user').append(logger);

        });
}