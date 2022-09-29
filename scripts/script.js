$(document).ready(function(){
    $('#txt-search').keyup(function(){
        var searchField = $(this).val();
        if(searchField === '')  {
            $('#filter-records').html('');
            return;
        }
        
        var regex = new RegExp(searchField, "i");
        var output = '<div class="row">';
        var count = 1;
        $.each(filmListSearch, function(key, val){
            if ((val.title.search(regex) != -1) || (val.original_title.search(regex) != -1) || (val.description.search(regex) != -1) || (val.director.search(regex) != -1) || (val.release_date.search(regex) != -1)) {
            output += '<div class="col-md-6 well">';
            output += '<div class="col-md-3"><img class="img-responsive" src="'+val.image+'" alt="'+ val.title +'" width="100"/></div>';
            output += '<div class="col-md-7">';
            output += '<h5>' + val.title + '</h5>';
            output += '<p>' + val.original_title + '</p>'
            output += '<p>' + val.release_date + '</p>'
            output += '</div>';
            output += '</div>';
            if(count%2 == 0){
                output += '</div><div class="row">'
            }
            count++;
            }
        });
        output += '</div>';
        $('#filter-records').html(output);
    });
});

var filmListSearch = [];

function initAppMP() {
    $.getJSON('https://ghibliapi.herokuapp.com/films', function (data) {
            console.log('success');
            console.log('inside init app function')
            processDataMP(data);
        });
}

function initApp() {
    $.getJSON('https://ghibliapi.herokuapp.com/films', function (data) {
            console.log('success');
            console.log('inside init app function')
            processData(data);
        });
}

function processData(data) {
    console.log(data.length);

    var titles = '<thead><tr>';
    var row1 = data[0];

    for(key in row1) {
        if (key == 'title' || key == 'original_title' || key == 'description' || key == 'director'
        || key == 'release_date') {
            titles = titles + '<th>' + key + '</th>';
        }
    }
    titles = titles + '</tr></thead>';
    console.log(titles);

    var film;
    var films = [];

    for (i = 0; i < data.length; i++) {
        var rowData = '<tr>';
        film = data[i];
        for (key in film) {
            if (key == 'title' || key == 'original_title' || key == 'description' || key == 'director'
            || key == 'release_date' ) {
                rowData = rowData + '<td>' + film[key] + '</td>';
            } 
        }
        filmListSearch.push(data[i]);
        films.push(rowData);
    }
    displayFilms(films, titles);
}

function displayFilms(films, titles) {
    var table = $('#output');
	table.html('');
	table.append(titles);
	table.append('<tbody>');

	for(var i = 0; i < films.length; i++) {
		var row = films[i];
		table.append(row);
	}

	table.append('</tbody>');
}

function initAppMP() {
    $.getJSON('https://ghibliapi.herokuapp.com/films', function (data) {
            console.log('success');
            console.log('inside mp init app function')
            processDataMP(data);
        });
}

function processDataMP(data) {
    var poster;
    var posters = [];
    for (i = 0; i < data.length; i++) {
        var rowData = '<tr>';
        poster = data[i];
        for (key in poster) {
            if (key == 'image') {
                rowData = rowData + '<td><div class="col-md-3"><img class="img-responsive" src="'+ poster[key]+'" width="300"/></div></td>';
            }
        }
        posters.push(rowData);
    }
    displayPosters(posters);
}

function displayPosters(posters) {
    console.log("inside displayposters")
    var table = $('#output');
	table.html('');
	table.append('<tbody>');
	for(var i = 0; i < posters.length; i++) {
		var row = posters[i];
		table.append(row);
	}

	table.append('</tbody>');
}
