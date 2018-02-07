$(document).ready(function () {
    var filters = [];
    var $modeSelected = $('.nav').find('a');
    
    /**
     * Search by title hidden by default
     */
    $title = $('.title');
    $name = $('.name');
    $title.hide();
    // $name.hide();
    $('body').css("background-image", "url(img/bg1.jpg");
    isLogin();

    var comicsCatalog = JSON.parse(localStorage.getItem('comics'));
    var charactersCatalog = JSON.parse(localStorage.getItem('characters'));
    if (comicsCatalog === null || charactersCatalog === null)
        transferData();
    printCards();
    var $selectors = $('.nav').find('a');

    var $rate = $('.card');

    $rate.click(function () {
        openDetails($(this).find('img').attr('id'));
    });
    $rate.keyup(function (e) {
        if ($(".rate:focus") && e.keyCode == 13) {
            openDetails($(this).attr('id'));
        }
    });

    function openDetails(id) {
        let mode = $('.nav').find('a.show').attr('href').substr(1)
        localStorage.setItem('selectedFilm', `${id},${mode}`);
        window.location.href = "pages/movieDetails.html";
    }

    function transferData() {
        var limit = 100;
        var filterQuery = '';
        for (let i = 0; i < filters.length; i++) {
            filterQuery += `&${filters[i][0]}=${filters[i][1]}`;
        }

        var url = [
            {
                type: 'comic',
                url: `https://gateway.marvel.com:443/v1/public/comics?limit=${limit}${filterQuery}&apikey=57876ec0fa211534ddf9d600d581e35f`
            }, {
                type: 'character',
                url: `https://gateway.marvel.com:443/v1/public/characters?limit=${limit}${filterQuery}&apikey=57876ec0fa211534ddf9d600d581e35f`
            }
        ];
        url.forEach(e => {
            $.ajax({
                url: e.url,
                type: 'GET',
                dataType: 'json',
                beforeSend: function () {
                    $('#loader').show();
                },
                success: function (json) {
                    if (e.type === 'comic') {
                        comicsCatalog = json.data.results;
                        noDescription(comicsCatalog);
                        localStorage.setItem('comics', JSON.stringify(comicsCatalog));
                    } else {
                        charactersCatalog = json.data.results;
                        noDescription(charactersCatalog);
                        localStorage.setItem('characters', JSON.stringify(charactersCatalog));
                    }
                },
                error: function (jqXHR, status, error) { //función error
                    console.log('Disculpe, existió un problema');
                },
                // función a ejecutar sin importar si la petición falló o no
                complete: function (jqXHR, status) {
                    printCards();
                    $('#loader').hide();
                    console.log('Petición realizada');
                }
            });
        });

    }

    $('#logout')
        .click(function () {
            localStorage.removeItem('currentUser');
            location.reload();
        });
    
    $modeSelected.each(e => {
        $modeSelected.eq(e).click(function () {
            if ($modeSelected[e].href.split('#')[1] === 'characters') {
                $title.hide();
                $name.show();
            } else {
                $name.hide();
                $title.show();
            }
        });
    });

    function printCards() {
        var $divCharacters = $('.charactersCatalog');
        var $divComics = $('.comicsCatalog');
        $divCharacters
            .children()
            .remove();
        $divComics
            .children()
            .remove();

        if (charactersCatalog.length !== 0) {
            for (let i = 0; i < charactersCatalog.length; i++) {
                $divCharacters.append($('<div class="card border-primary mb-3">'));
                $divCharacters
                    .children('.card')
                    .eq(i)
                    .append($(`<div class="card-header">${charactersCatalog[i].name}</div>`), $('<div class="card-body">'));
                $divCharacters
                    .children()
                    .find('.card-body')
                    .eq(i)
                    .append($(`<img src="${charactersCatalog[i].thumbnail.path}.${charactersCatalog[i].thumbnail.extension}" 
                            id="${charactersCatalog[i].id}" alt="${charactersCatalog[i].name}" 
                            title="${charactersCatalog[i].name}" class="rate" tabindex="0" />`));
            }
        } else {
            $divCharacters.append($('<p>No hay resultados</p>'));
        }

        if (comicsCatalog.length !== 0) {
            for (let i = 0; i < comicsCatalog.length; i++) {
                $divComics.append($('<div class="card border-primary mb-3">'));
                $divComics
                    .children('.card')
                    .eq(i)
                    .append($(`<div class="card-header">${comicsCatalog[i].title}</div>`), $('<div class="card-body">'));
                $divComics
                    .children()
                    .find('.card-body')
                    .eq(i)
                    .append($(`<img src="${comicsCatalog[i].thumbnail.path}.${comicsCatalog[i].thumbnail.extension}" 
                            id="${comicsCatalog[i].id}" alt="${comicsCatalog[i].name}" 
                            title="${comicsCatalog[i].name}" class="rate" tabindex="0" />`), $(`<span class="card-text more">${comicsCatalog[i].description}</span>`));
            }
        } else {
            $divComics.append($('<p>No results found</p>'));
        }
        paginate({
            itemSelector: ".charactersCatalog .card"
            , paginationSelector: "#pagination-1"
            , itemsPerPage: 10
        });
        paginate({
            itemSelector: ".comicsCatalog .card"
            , paginationSelector: "#pagination-2"
            , itemsPerPage: 10
        });
    }

    $('#filter').click(filter);
    function filter() {
        filters = [];
        let searchName = $('#pref-search-name').val();
        let searchTitle = $('#pref-search-title').val();
        let orderby = $('#pref-orderby').val();
        if (searchName.length !== 0) {
            filters.push(['name', search]);
        }
        if (searchTitle.length !== 0) {
            filters.push(['title', search]);
        }
        switch (orderby) {
            case 'title':
                charactersCatalog.sort(function (a, b) {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                });
                comicsCatalog.sort(function (a, b) {
                    return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
                });
                break;
            case '-title':
                charactersCatalog.sort(function (a, b) {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
                });
                comicsCatalog.sort(function (a, b) {
                    return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
                });
                break;
            default:
                break;
        }
        if (searchName.length !== 0 || searchTitle.length !== 0) {
            transferData();
        }
        else {
            printCards();
        }
    }

    function noDescription(list) {
        list.forEach(e => {
            if(e.description === "" || e.description === null)
            e.description = 'No description available.';
        })
    }

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

    var showChar = 20;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Show more";
    var lesstext = "Show less";


    $('.more').each(function () {
        var content = $(this).html();

        if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
            $(this).html(html);
        }

    });

    $(".morelink").click(function () {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
});
