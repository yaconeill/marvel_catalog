$(document).ready(function () {
    $('body').css("background-image", "url(../img/bg1.jpg");
    isLogin();
    var ratingData = JSON.parse(localStorage.getItem('ratingData'));
    var comicsCatalog = JSON.parse(localStorage.getItem('comics'));
    var catalog = JSON.parse(localStorage.getItem('characters'));
    var dataGraphic;
    var type = 'characters';
    var $typeSwitch = $('#type');
    $typeSwitch.change(function () {
        if ($typeSwitch.prop('checked'))
            type = 'characters';
        else
            type = 'comics';
        loadData();
        drawChartDonut();
        drawChart();        
        drawChartPie();    
    });
    loadData();

    // #region - gráfico donut
    $('#donut').change(function () {
        drawChartDonut();
    });
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChartDonut);
    function drawChartDonut() {
        var data = google.visualization.arrayToDataTable(dataGraphic);
        var options = {
            title: 'Películas mejor valoradas',
            pieHole: 0.4,
        };
        var chart = new google.visualization.PieChart(document.getElementById('graphic'));
        chart.draw(data, options);
    }
    // #endregion

    // #region - diagrama de chart
    $('#chart').change(function () {
        drawChart();
    });
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(dataGraphic);
        var options = {
            title: 'Películas mejor valoradas',
            curveType: 'function',
            legend: { position: 'bottom' }
        };
        var chart = new google.visualization.LineChart(document.getElementById('graphic'));
        chart.draw(data, options);
    };
    // #endregion

    // #region - diagrama de tarta
    $('#pie').change(function () {
        drawChartPie();
    });
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChartPie);
    function drawChartPie() {
        var data = google.visualization.arrayToDataTable(dataGraphic);
        var options = {
            title: 'Películas mejor valoradas',
            is3D: true,
        };
        var chart = new google.visualization.PieChart(document.getElementById('graphic'));
        chart.draw(data, options);
    }
    // #endregion

    $('#logout').click(function () {
        localStorage.removeItem('currentUser');
        location.reload();
    });
    function loadData() {
        dataGraphic = [['Rate', 'Personajes mejor valorados']];
        ratingData.forEach(function (e) {
            if (e.type === type)
                dataGraphic.push([e.name, e.rate]);
        });
    }
});