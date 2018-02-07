$(document).ready(function () {
    RatingData = function (type, name, id, rate) {
        this.type = type
        this.name = name;
        this.id = id;
        this.rate = rate;
    };
    // #region - Register form
    User = function (name, phone, email, selectedComicId, selectedCharacterId) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.selectedComicId = selectedComicId;
        this.selectedCharacterId = selectedCharacterId;
    }
    isLogin();
    var userName = localStorage.getItem('currentUser');
    var ratingData = JSON.parse(localStorage.getItem('ratingData'));
    if (ratingData == null)
        ratingData = [];
    var $section = $('#section');
    isNewUser(userName, $section);
    var userList = JSON.parse(localStorage.getItem('userList'));
    if (userList == null)
        userList = [];

    var catalog = [];
    /**
     * Contains selected item id and characters|comics
     */
    var requestData = localStorage.getItem('selectedFilm').split(',');
    if (requestData[1] === 'characters')
        catalog = JSON.parse(localStorage.getItem('characters'));
    else
        catalog = JSON.parse(localStorage.getItem('comics'));

    var $film = $(this).prev().attr('id');
    var $film = $(this).attr('id');

    var $movieDetails = $('#movieDetails');
    var tmpFilm;
    var url;
    catalog.find(o => {
        if (o.id === parseInt(requestData[0])) {
            tmpFilm = o;
        }
    });
    // $('body').css('background-image', `url(${url}`);
    // $('body').css('background-repeat', 'no-repeat');
    // $('body').css('background-attachment', 'fixed');
    $('.jumbotron').css('opacity', '0.9')
    $movieDetails.children().remove();
    $movieDetails.append($('<div class="film">'));
    if (requestData[1] === 'characters')
        $('.title').text(tmpFilm.name);
    else
        $('.title').text(tmpFilm.title);

    $movieDetails.children('div').append(
        $(`<img src="${tmpFilm.thumbnail.path}.${tmpFilm.thumbnail.extension}" alt="${tmpFilm.name}" id="${tmpFilm.id}"/>`));
    $('.sinopsis').text(tmpFilm.description);

    var $form = $('#register');
    $form.submit(function () {
        $userData = $form.find('input');
        userName = $userData[0].value;
        let user = new User($userData[0].value, $userData[1].value, $userData[2].value, '');
        userList.push(user);
        localStorage.setItem('userList', JSON.stringify(userList));
        localStorage.setItem('currentUser', $userData[0].value);
        isLogin();
        $section.children().remove();
        isNewUser(userName, $section);
        location.reload();
    });
    // #endregion

    /**
     * 
     */
    $('#logout').click(function () {
        localStorage.removeItem('currentUser');
        location.reload();
    });

    /**
     * 
     */
    $('#vote').click(function () {
        if (userList.find(o => {
            if (requestData[1] === 'characters') {
                if (o.selectedCharacterId === "")
                    return true;
            } else {
                if (o.selectedComicId === "")
                return true;
            }
        })) {
            let filmClickId = parseInt($('img').attr('id'));
            let rate;
            catalog.find(o => {
                if (o.id === filmClickId) {
                    if (!ratingData.find(e => {
                        if (e.id === filmClickId) {
                            e.rate++;
                            return true;
                        }
                    })) {
                        rate = new RatingData(requestData[1], o.name, o.id, 1);
                        ratingData.push(rate);
                    }

                }
            });
            userList.find(o => {
                if (o.name === userName) {
                    if (requestData[1] === 'characters')
                        o.selectedCharacterId = filmClickId;
                    else
                        o.selectedComicId = filmClickId;
                }
            });
            localStorage.setItem('ratingData', JSON.stringify(ratingData));
            localStorage.setItem('userList', JSON.stringify(userList));
            alert('Gracias por participar. Se autoredigirirá en 3 segundos.');
            setTimeout(function () {
                window.location.href = "../pages/results.html";
            }, 3000);

        } else {
            if (requestData[1] === 'characters')
                alert('You cannot vote for two characters. Have you already vote the best comic?');
            else
                alert('You cannot vote for two comics. Have you already vote the best character?');
        }
    });
});

/**
 * 
 * @param {*} userName 
 * @param {*}  
 */
function isNewUser(userName, $section) {
    if (userName != null) {
        $section.children().remove();
        $section.append($('<div class="col-md-1 mx-auto">'));
        $section.children('div').append($(`<input type="button"
        value="Votar" id="vote" aria-label="Al hacer click realizará su voto y se redigirirá automáticamente a los resultados. Solo se puede votar una vez" class="btn btn-success rate" autofocus/>`));
    }
}