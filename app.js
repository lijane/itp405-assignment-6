var express = require('express');
var app = express();
var mysql = require('mysql');
 
app.get('/dvds/:id', function (request, response) {
  // response.json({
  // 	song: 'Test Song'
  // });

	var connection = mysql.createConnection({
	  host     : 'itp460.usc.edu',
	  user     : 'student',
	  password : 'ttrojan',
	  database : 'dvd'
});

// var dvdID = request.params.id; 
connection.connect();
connection.query('SELECT * FROM dvds WHERE id = ?',[ request.params.id ],function(error, dvds){
	if (error){
		throw error;
	}

	var dvd = dvds[0];

// Nested Genre
connection.query('SELECT * FROM genres WHERE id = ?',[ dvd.genre_id ],function(error, genres){
	if (error){
		throw error;
	}

	var genre = genres[0];
	dvd.genre = genre;

// Nested Rating
connection.query('SELECT * FROM ratings WHERE id = ?',[ dvd.rating_id ],function(error, ratings){
	if (error){
		throw error;
	}

	var rating = ratings[0];
	dvd.rating = rating;

// Delete uneccessary output
	delete dvd.id;
	delete dvd.release_date;
	delete dvd.genre_id;
	delete dvd.rating_id;
	delete dvd.label_id;
	delete dvd.sound_id;
	delete dvd.format_id;
	delete dvd.created_at;
	delete dvd.updated_at;

    response.json(dvd);
    connection.end();
	});
});
});
});
app.listen(8000);