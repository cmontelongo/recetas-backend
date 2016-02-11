
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('data/citas.db');

db.serialize(function() {

  db.run('CREATE TABLE user (id INT PRIMARY KEY, name TEXT, username TEXT, password TEXT, activo BOOLEAN)');

  db.run('CREATE TABLE paciente (id INT PRIMARY KEY, nombre TEXT, domicilio TEXT, telefono TEXT, email TEXT, observaciones TEXT, fecha_alta DATETIME, activo BOOLEAN)');

  db.run('CREATE TABLE cita (id TEXT PRIMARY KEY, fecha_cita DATETIME, fecha_alta DATETIME, paciente_id INT, atiende_user_id INT, registra_user_id INT, observaciones TEXT, activo BOOLEAN)');
  db.run('CREATE INDEX idx_cita_id ON cita(id)');

  db.run('CREATE TABLE expediente (id INT PRIMARY KEY, paciente_id INT, fecha_cita DATETIME, observaciones TEXT, atiende_user_id INT)');
  db.run('CREATE INDEX idx_expediente_id ON expediente(id)');

  db.run('CREATE TABLE receta (id INT PRIMARY KEY, expediente_id INT, fecha_alta DATETIME, fecha_surtido DATETIME, observaciones TEXT, surte_user_id INT, activo BOOLEAN)');
  db.run('CREATE INDEX idx_receta_id ON receta(id)');
  db.run('CREATE TABLE recetaDetalle (id INT PRIMARY KEY, receta_id INT, medicamento TEXT, cantidad TEXT, observaciones TEXT)');

//------------------------------------------------------------------------------------------

  db.run("INSERT INTO user (id, name, username, password, activo) VALUES (1, 'Alice', 'alice', 'alice123', 1)");
  db.run("INSERT INTO user (id, name, username, password, activo) VALUES (2, 'Bob', 'bob', 'bob123', 1)");

//------------------------------------------------------------------------------------------

  db.run("INSERT INTO paciente (id, nombre, fecha_alta, activo) VALUES (1, 'Paciente #1', '2016-01-01 08:15:00.000', 1)");
  db.run("INSERT INTO paciente (id, nombre, fecha_alta, activo) VALUES (2, 'Paciente 2', '2016-01-01 08:20:00.000', 1)");
  db.run("INSERT INTO paciente (id, nombre, fecha_alta, activo) VALUES (3, 'Paciente 3', '2016-01-01 08:25:00.000', 1)");
  db.run("INSERT INTO paciente (id, nombre, fecha_alta, activo) VALUES (4, 'Paciente 4', '2016-01-01 08:30:00.000', 1)");
  db.run("INSERT INTO paciente (id, nombre, fecha_alta, activo) VALUES (5, 'Paciente 5', '2016-01-01 08:35:00.000', 1)");

//------------------------------------------------------------------------------------------

  db.run("INSERT INTO cita (id, fecha_cita, fecha_alta, paciente_id, atiende_user_id, registra_user_id, observaciones, activo) VALUES ('1000001', '2016-02-01 08:15:00.000', '2016-02-01 08:15:00.000', 1, 1, 1, 'Observaciones...1', 1)");
  db.run("INSERT INTO cita (id, fecha_cita, fecha_alta, paciente_id, atiende_user_id, registra_user_id, observaciones, activo) VALUES ('1000002', '2016-02-01 09:15:00.000', '2016-02-01 08:15:00.000', 2, 1, 1, 'Observaciones...2', 1)");
  db.run("INSERT INTO cita (id, fecha_cita, fecha_alta, paciente_id, atiende_user_id, registra_user_id, observaciones, activo) VALUES ('1000003', '2016-02-01 10:15:00.000', '2016-02-01 08:15:00.000', 3, 1, 1, 'Sin observaciones', 1)");
  db.run("INSERT INTO cita (id, fecha_cita, fecha_alta, paciente_id, atiende_user_id, registra_user_id, observaciones, activo) VALUES ('1000004', '2016-02-01 08:15:00.000', '2016-02-01 08:15:00.000', 4, 2, 2, 'Observaciones...3', 1)");
  db.run("INSERT INTO cita (id, fecha_cita, fecha_alta, paciente_id, atiende_user_id, registra_user_id, observaciones, activo) VALUES ('1000005', '2016-02-01 11:15:00.000', '2016-02-01 08:15:00.000', 5, 2, 2, 'Observaciones...4', 1)");

//------------------------------------------------------------------------------------------

  db.run("INSERT INTO expediente (id, paciente_id, fecha_cita, observaciones, atiende_user_id) VALUES (1, 1, '2016-01-02 10:30:00.000', 'Observaciones...1', 1)");
  db.run("INSERT INTO receta (id, expediente_id, fecha_alta, fecha_surtido, observaciones, surte_user_id, activo) VALUES (1, 1, '2016-01-02 10:30:00.000', '2016-01-02 10:30:00.000', 'Observaciones...1', 1, 0)");
  db.run("INSERT INTO recetaDetalle (id, receta_id, medicamento, cantidad, observaciones) VALUES (1, 1, 'med#2', '5', 'Observaciones...1')");
  db.run("INSERT INTO recetaDetalle (id, receta_id, medicamento, cantidad, observaciones) VALUES (2, 1, 'med#3', '1', 'Observaciones...1')");

});

db.close();

var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!!!');
});

app.listen(8080, function () {});
