/**
 * Object to save the voting data that will be printed in chart
 * @param  {String} type - comics|characters
 * @param  {String} name - comic|character name
 * @param  {Int} id - id from the item
 * @param  {Int} rate - amount of votes
 */
$(document).ready(function () {
    RatingData = function (type, name, id, rate) {
        this.type = type
        this.name = name;
        this.id = id;
        this.rate = rate;
    };
    // #region - Register form
    /**
     * Object to save user data
     * @param  {String} name
     * @param  {String} phone
     * @param  {String} email
     * @param  {Integer} selectedComicId
     * @param  {Integer} selectedCharacterId
     */
    User = function (name, phone, email, selectedComicId, selectedCharacterId) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.selectedComicId = selectedComicId;
        this.selectedCharacterId = selectedCharacterId;
    }

    /**
     * Variables declaration
     */
    var comicsCatalog = [], charactersCatalog = [];
    var filters = [];
    var requestedFilter = [];
    var $typeSwitch = $('#type');
    var $divCharacters = $('.charactersCatalog');
    var $divComics = $('.comicsCatalog');
    var mode = 'characters';
    var showChar = 20;  // How many characters are shown by default
    var ellipsesText = "...";
    var moreText = "Show more";
    var lessText = "Show less";
    var userList = JSON.parse(localStorage.getItem('userList'));
    if (userList == null)
        userList = [];
    var ratingData = JSON.parse(localStorage.getItem('ratingData'));
    if (ratingData == null)
        ratingData = [];
    var userName = localStorage.getItem('currentUser');
    var youVoted = $('.vote-form');
    var $modeSelected = $('.nav').find('a');
    $search = $('.search');
    $('body').css("background-image", "url(img/bg1.jpg");

    /**
     * In selections tabs click load the primary data in case the user search something that is not in it,
     * so the data is reset.
     */
    $modeSelected.each(e => {
        $modeSelected.eq(e).click(function () {
            loadData();
        });
    });


    /**
     * Checks if the user is logged.
     */
    isLogin();

    /**
     * Load the data stored in localstorage and if it is empty, calls the ajax function
     */
    var comicsCatalog = JSON.parse(localStorage.getItem('comics'));
    var charactersCatalog = JSON.parse(localStorage.getItem('characters'));
    if (comicsCatalog === null || charactersCatalog === null)
        transferData();
    else
        loadData();

    /**
     * It makes the request to the Marvel api
     * @param  {Integer} limit - set a request of 100 items
     */
    function transferData() {
        let count = 0;
        var limit = 100;
        var filterTitle = '';
        var filterName = '';
        /**
         * Adds the filters in case there is any
         */
        if (filters.length !== 0)
            for (let i = 0; i < filters.length; i++) {
                if (mode === 'comics')
                    filterTitle += `&${filters[i][0]}=${filters[i][1]}`;
                else
                    filterName += `&${filters[i][0]}=${filters[i][1]}`;
            }

        var url = [
            {
                type: 'comic',
                url: `https://gateway.marvel.com:443/v1/public/comics?limit=${limit}${filterTitle}&apikey=57876ec0fa211534ddf9d600d581e35f`
            }, {
                type: 'character',
                url: `https://gateway.marvel.com:443/v1/public/characters?limit=${limit}${filterName}&apikey=57876ec0fa211534ddf9d600d581e35f`
            }
        ];

        /**
         * It makes 2 request to the api, one for each url.
         */
        url.forEach(e => {
            $.ajax({
                url: e.url,
                type: 'GET',
                dataType: 'json',
                timeout: 3000,
                beforeSend: function () {
                    $('#loader').show();
                },
                success: function (json) {
                    count++;
                    /**
                     * Send the data to be stored
                     */
                    if (json.data.results[0].characters !== undefined)
                        saveData(e, json.data.results, filterTitle);
                    else
                        saveData(e, json.data.results, filterName);
                },
                error: function (jqXHR, status, error) { //función error
                    console.error('Error: ' + status);
                    ajaxError();
                },
                complete: function (jqXHR, status) {
                    /**
                     * In case of error shows a text to le the user know there is a problem
                     */
                    if (jqXHR.status === 409) {
                        ajaxError();
                    }
                    else {
                        if (count > 1) {
                            printCards(comicsCatalog, 'comics');
                            printCards(charactersCatalog, 'characters');
                            /**
                             * if the is a filter the data is stored in a new array
                             */
                            if (filterTitle !== '')
                                printCards(requestedFilter, 'comics');
                            if (filterName !== '')
                                printCards(requestedFilter, 'characters');

                            $('#loader').hide();
                            console.log('Done');
                        }
                    }
                }
            });
        });
    }

    function ajaxError() {
        $('#loader').hide();
        $divCharacters.children().remove();
        $divCharacters.append($('<span>There has been a problem with the server. Please try again later.</span>'));
        $divComics.children().remove();
        $divComics.append($('<span>There has been a problem with the server. Please try again later.</span>'));
    }
    /**
     * @param  {Object} e - it contains the type of selection
     * @param  {Object} data - it contains the data received from the api
     * @param  {String} filter - name of the filter
     */
    function saveData(e, data, filter) {
        switch (e.type) {
            case 'comic':
                if (filter === '') {
                    comicsCatalog = data;
                    noDescription(comicsCatalog);
                    localStorage.setItem('comics', JSON.stringify(comicsCatalog));
                }
                else {
                    requestedFilter = data;
                    noDescription(requestedFilter);
                }
                break;
            case 'character':
                if (filter === '') {
                    charactersCatalog = data;
                    noDescription(charactersCatalog);
                    localStorage.setItem('characters', JSON.stringify(charactersCatalog));
                }
                else {
                    requestedFilter = data;
                    noDescription(requestedFilter);
                }
                break;
        }
    }

    /**
     * Remove the currentUser from localstorage when logout
     */
    $('#logout')
        .click(function () {
            localStorage.removeItem('currentUser');
            location.reload();
        });

    /**
     * Toggle to change the type of search, it also change the text from the search label
     */
    $typeSwitch.change(function () {
        if ($(this).prop('checked')) {
            $search.children('label').text('By Name');
            mode = 'characters'
        } else {
            $search.children('label').text('By Title');
            mode = 'comics'
        }
    });

    /**
     * Function to print the cards, that contains the information from the item, on the container
     * @param  {Array} list - Object array with the items
     * @param  {String} mode - type of selection
     */
    function printCards(list, mode) {
        let $div;
        if (mode === 'comics')
            $div = $divComics;
        else
            $div = $divCharacters;

        /**
         * Remove the container to prevent duplications
         */
        $div.children().remove();

        if (list.length !== 0) {
            for (let i = 0; i < list.length; i++) {
                // $div.append($('<div class="card border-primary mb-3">'));
                $div.append($('<div class="card">'));
                if (mode === 'comics') {
                    $divComics.children('.card').eq(i).append($(`<img src="${list[i].thumbnail.path}/portrait_incredible.${list[i].thumbnail.extension}" 
                                        id="${list[i].id}" alt="${list[i].name}" 
                                        title="${list[i].name}" class="rate card-img-top"/>
                                        <div class="card-block">`));
                    $divComics.children().find('.card-block').eq(i).append($(`<h4 class="card-header">${list[i].title}</h4>
                    <p class="card-text more">${list[i].description}</p>
                    <button type="button" class="btn btn-primary" data-toggle="modal" 
                    data-target="#details" data-card="com-${list[i].id}" data-img="${list[i].thumbnail.path}/portrait_incredible.${list[i].thumbnail.extension}" data-name="${list[i].title}" data-desc="${list[i].description}">More info</button>`));
                }
                else {
                    $div.children('.card').eq(i).append($(`<img src="${list[i].thumbnail.path}/portrait_incredible.${list[i].thumbnail.extension}" 
                            id="${list[i].id}" alt="${list[i].name}" 
                            title="${list[i].name}" class="rate card-img-top"/>`), $('<div class="card-block">'));
                    $div.children().find('.card-block').eq(i).append($(`<h4 class="card-header">${list[i].name}</h4>
                    <button type="button" class="btn btn-primary" data-toggle="modal" 
                    data-target="#details" data-card="char-${list[i].id}" data-img="${list[i].thumbnail.path}/portrait_incredible.${list[i].thumbnail.extension}" data-name="${list[i].name}" data-desc="${list[i].description}"">More info</button>`));
                }
            }
        } else {
            $div.append($('<p>No results found</p>'));
        }

        /**
         * Make the pagination, and set a maximum of 9 cards
         */
        paginate({
            itemSelector: ".charactersCatalog .card"
            , paginationSelector: ".pagination-1"
            , itemsPerPage: 9
        });
        paginate({
            itemSelector: ".comicsCatalog .card"
            , paginationSelector: ".pagination-2"
            , itemsPerPage: 9
        });

        /**
         * It make the item description shorter, showing tags to show more and less
         */
        $('.moreModal').each(function () {
            var content = $(this).html();
            if (content.length > showCharModal) {
                var c = content.substr(0, showCharModal);
                var h = content.substr(showCharModal, content.length - showCharModal);
                var html = c + '<span class="moreellipses">' + ellipsesText +
                    '&nbsp;</span><span class="morecontent"><span>' + h +
                    '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moreText + '</a></span>';
                $(this).html(html);
            }
        });
        $('.more').each(function () {
            var content = $(this).html();
            if (content.length > showChar) {
                var c = content.substr(0, showChar);
                var h = content.substr(showChar, content.length - showChar);
                var html = c + '<span class="moreellipses">' + ellipsesText +
                    '&nbsp;</span><span class="morecontent"><span>' + h +
                    '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moreText + '</a></span>';
                $(this).html(html);
            }

        });

        $(".morelink").click(function () {
            if ($(this).hasClass("less")) {
                $(this).removeClass("less");
                $(this).html(moreText);
            } else {
                $(this).addClass("less");
                $(this).html(lessText);
            }
            $(this).parent().prev().toggle();
            $(this).prev().toggle();
            return false;
        });
    }

    /**
     * On navbar search button click set the filters and call the ajax function
     */
    $('#filter').click(filter);
    function filter() {
        filters = [];
        if (mode === 'comics')
            $('.tabs').find('a').eq(1).trigger("click");
        else
            $('.tabs').find('a').eq(0).trigger("click");


        let search = $('#pref-search').val();
        let orderby = $('#pref-orderby').val();
        if (search.length !== 0) {
            if (mode === 'comics')
                filters.push(['title', search]);
            else
                filters.push(['name', search]);
        }
        if (orderby !== '0')
            filters.push(['orderBy', orderby]);
        /**
         * Commented as an optional method to order by the local data instead of calling the api 
         * for new data
         */
        // switch (orderby) {
        //     case 'title':
        //         charactersCatalog.sort(function (a, b) {
        //             return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        //         });
        //         comicsCatalog.sort(function (a, b) {
        //             return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        //         });
        //         break;
        //     case '-title':
        //         charactersCatalog.sort(function (a, b) {
        //             return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        //         });
        //         comicsCatalog.sort(function (a, b) {
        //             return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
        //         });
        //         break;
        //     default:
        //         break;
        // }
        /**
         * In case there is no filter it load the local data
         */
        if (search.length !== 0)
            transferData();
        else if (orderby === '0')
            transferData();
        else
            loadData();
    }

    /** 
     * It loads the data from localstorage and print the cards
    */
    function loadData() {
        comicsCatalog = JSON.parse(localStorage.getItem('comics'));
        charactersCatalog = JSON.parse(localStorage.getItem('characters'));
        printCards(comicsCatalog, 'comics');
        printCards(charactersCatalog, 'characters');
    }

    /**
     * In the cases that the items have no description, this function adds an informative text
     * @param {Array} list - Items object array 
     */
    function noDescription(list) {
        list.forEach(e => {
            if (e.description === "" || e.description === null)
                e.description = 'No description available.';
        })
    }

    /**
     * Function to create the pagination
     * @param  {Object} options - preferences to paginate
     */
    function paginate(options) {
        var items = $(options.itemSelector);
        var numItems = items.length;
        var perPage = options.itemsPerPage;
        items.slice(perPage).hide();
        $(options.paginationSelector).pagination({
            items: numItems,
            itemsOnPage: perPage,
            cssStyle: "light-theme",
            onPageClick: function (pageNumber) {
                var showFrom = perPage * (pageNumber - 1);
                var showTo = showFrom + perPage;
                items.hide().slice(showFrom, showTo).show();
                return false;
            }
        });
    }

    /**
     * On windows scroll shows a button to scroll back to the top
     */
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function () {      // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0                       // Scroll to top of body
        }, 500);
    });

    /**
     * It reads the data from the item, and these is shown in the modal
     */
    $('#details').on('show.bs.modal', function (event) {
        youVoted.show().next().hide();
        let btnVote = $('#vote');
        var button = $(event.relatedTarget); // Button that triggered the modal
        var dataId = button.data('card').split('-'); // Extract info from data-card attributes
        var dataImg = button.data('img');
        var dataDesc = button.data('desc');
        var dataName = button.data('name');
        let list;
        if (dataId[0] == 'char')
            list = charactersCatalog;
        else
            list = comicsCatalog;
        let modal = $(this);

        modal.find('img').attr('src', dataImg).attr('id', dataId);
        if (dataId[0] == 'char')
            modal.find('.modal-title').text(dataName);
        else
            modal.find('.modal-title').text(dataName);
        modal.find('.card-body').text(dataDesc);

        /** 
         * In case the user has already vote for any, it will show a text and block the button to vote
        */
        let voted = didYouVoted(userName);
        if (userName !== '' && userName !== null)
            if (voted) {
                youVoted.hide().next().show();
                btnVote.addClass('disabled');
            } else {
                youVoted.hide().next().hide();
                btnVote.removeClass('disabled');
            }

        if (youVoted.is(':hidden'))
            $('#vote').click(function () {
                vote();
            });
    });

    /** 
     * It read the form and save the user data in case is a new user
    */
    var $form = $('#register');

    $form.submit(function () {
        $userData = $form.find('input');
        if (userName !== '') {
            let user = new User($userData[0].value, $userData[2].value, $userData[1].value, '', '');
            userName = $userData[0].value;
            userList.push(user);
            localStorage.setItem('userList', JSON.stringify(userList));
            localStorage.setItem('currentUser', userName);
            isLogin();
        } else
            userName = localStorage.getItem('currentUser');
        vote();
    });

    function vote() {
        type = $('.nav').find('a.show').attr('href').substr(1);
        let catalog;
        if (type === 'characters')
            catalog = charactersCatalog;
        else
            catalog = comicsCatalog;
        let filmClickId = parseInt($('#register').find('img').attr('id').split(',')[1]);
        let rate;
        catalog.find(o => {
            if (o.id === filmClickId) {
                if (!ratingData.find(e => {
                    if (e.id === filmClickId) {
                        e.rate++;
                        return true;
                    }
                })) {
                    if (type === 'characters')
                        rate = new RatingData(type, o.name, o.id, 1);
                    else
                        rate = new RatingData(type, o.title, o.id, 1);
                    ratingData.push(rate);
                }
            }
        });
        userList.find(o => {
            if (o.name === userName) {
                if (type === 'characters')
                    o.selectedCharacterId = filmClickId;
                else
                    o.selectedComicId = filmClickId;
            }
        });
        localStorage.setItem('ratingData', JSON.stringify(ratingData));
        localStorage.setItem('userList', JSON.stringify(userList));
        alert('Thanks for participate. You will be redirect in a few.');
        setTimeout(function () {
            window.location.href = "../pages/results.html";
        }, 3000);
    }

    /**
     * 
     * @param {String} userName - name from user
     */
    function didYouVoted(userName) {
        type = $('.nav').find('a.show').attr('href').substr(1);
        let voted = false;
        userList.find(o => {
            if (o.name === userName) {
                if (type === 'characters') {
                    if (o.selectedCharacterId !== "")
                        voted = true;

                } else if (type === 'comics')
                    if (o.selectedComicId !== "")
                        voted = true;
            }
        });
        return voted;
    }
});
