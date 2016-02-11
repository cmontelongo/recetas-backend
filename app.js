var express = require('express');
var expressJwt = require('express-jwt');
var unless = require('express-unless');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var citastore = require('./notestore');

var JWT_SECRET = 'top-secret';
var citaS_DB = 'data/citas.db';


var NoteStore = citastore.create(citaS_DB);


var app = express();

app.set('etag', false);
app.use(bodyParser.json());
app.use(expressJwt({secret: JWT_SECRET}).unless({path: ['/authenticate']}));

//--------------------------------------

app.post('/authenticate', function(request, response) {
  var user = request.body.user;
  var password = request.body.password;
  var userId = -1;
  NoteStore.login(user, password, function(error, user) {
	if (error) {
	    response.sendStatus(401);
	} else {
		if (user != undefined) {
			userId = user.id;
		    response.json({
		      token: jwt.sign({}, 'top-secret', {subject: user}),
		      userid: userId
		    });
		} else {
		    response.sendStatus(401);
		}
	}
  });
});

//--------------------------------------

function sendError(response, error) {
  console.error(error);
  response.status(500).send('Internal Server Error');
}

//--------------------------------------

app.get('/cita/', function(request, response) {
  NoteStore.list(request.user.sub.id, function(error, notes) {
    if (error) {
      sendError(error);
    } else {
      response.json(notes);
    }
  });
});

app.get('/cita/:citaId', function(request, response) {
  NoteStore.get(request.user.sub.id, request.params.citaId, function(error, note) {
    if (error) {
      sendError(error);
    } else if (note) {
      response.json(note);
    } else {
      response.status(404).send('No such note: ' + request.params.citaId);
    }
  });
});

app.post('/cita/', function(request, response) {
	NoteStore.create(request.user.sub.id, request.body, function(error, citaId) {
		if (error) {
			console.log('ERROR');
			sendError(response, error);
		} else {
			console.log('ok');
			response.set('Location', '/cita/' + citaId);
			response.status(201).send();
		}
	});
});

app.put('/cita/:citaId', function(request, response) {
	if (request.params.citaId != request.body.id) {
		console.log('ERROR 400');
		response.status(400).send('URL does not match request body');
	};

	NoteStore.update(request.user.sub.id, request.body, function(error, updated) {
		if (error) {
			console.log('ERROR');
			sendError(response, error);
		} else if (updated) {
			console.log('ok');
		  	response.status(204).send();
		} else {
			console.log('ERROR 404');
			response.status(404).send('No such note: ' + request.params.citaId);
		}
	});
});

app.delete('/cita/:citaId', function(request, response) {
  NoteStore.remove(request.user.sub.id, request.params.citaId, function(error, deleted) {
    if (error) {
      sendError(response, error);
    } else if (deleted) {
      response.status(204).send();
    } else {
      response.status(404).send('No such note: ' + request.params.noteId);
    }
  });
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
});
