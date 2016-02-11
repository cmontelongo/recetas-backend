
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('data/citas.db');

db.serialize(function() {

  db.run('CREATE TABLE user (id TEXT PRIMARY KEY, name TEXT, password TEXT)');
  db.run('CREATE TABLE cita (id TEXT PRIMARY KEY, user_id TEXT, paciente TEXT, fecha TEXT, observaciones TEXT)');
  db.run('CREATE INDEX idx_cita_user ON cita(user_id)');
  db.run('CREATE TABLE expediente (id TEXT PRIMARY KEY, paciente TEXT, fecha TEXT, observaciones TEXT, receta_id TEXT)');

  db.run('CREATE TABLE receta (id TEXT PRIMARY KEY, user_id TEXT, paciente TEXT, fecha TEXT, observaciones TEXT)');
  db.run('CREATE TABLE recetaDetalle (id TEXT PRIMARY KEY, receta_id TEXT, medicamento TEXT, cantidad TEXT, observaciones TEXT)');



  db.run("INSERT INTO user (id, name, password) VALUES ('alice', 'Alice', 'alice123')");

  db.run("INSERT INTO cita (id, user_id, paciente, fecha, observaciones) VALUES ('000001', 'alice', 'Paciente #1', '01/02/2016', 'Observaciones...1')");
  db.run("INSERT INTO expediente (id, paciente, fecha, observaciones, receta_id) VALUES ('000001', 'Paciente #1', '15/01/2016', 'Observaciones...1', '000001')");
  db.run("INSERT INTO receta (id, user_id, fecha, observaciones) VALUES ('000001', 'alice', '15/01/2016', 'Observaciones...1')");
  db.run("INSERT INTO recetaDetalle (id, receta_id, medicamento, cantidad, observaciones) VALUES ('000001', '000001', 'med#1', '1', 'Observaciones...1')");
  db.run("INSERT INTO recetaDetalle (id, receta_id, medicamento, cantidad, observaciones) VALUES ('000002', '000001', 'med#2', '5', 'Observaciones...1')");
  db.run("INSERT INTO expediente (id, paciente, fecha, observaciones, receta_id) VALUES ('000002', 'Paciente #1', '15/01/2016', 'Observaciones...1', '000002')");
  db.run("INSERT INTO receta (id, user_id, fecha, observaciones) VALUES ('000002', 'alice', '15/01/2016', 'Observaciones...1')");
  db.run("INSERT INTO recetaDetalle (id, receta_id, medicamento, cantidad, observaciones) VALUES ('000003', '000002', 'med#1', '1', 'Observaciones...1')");
  db.run("INSERT INTO recetaDetalle (id, receta_id, medicamento, cantidad, observaciones) VALUES ('000004', '000002', 'med#2', '5', 'Observaciones...1')");

  db.run("INSERT INTO cita (id, user_id, paciente, fecha, observaciones) VALUES ('000002', 'alice', 'Paciente #2', '03/02/2016', 'Observaciones....2')");
  db.run("INSERT INTO expediente (id, paciente, fecha, observaciones, receta_id) VALUES ('000003', 'Paciente #2', '03/01/2016', 'Observaciones...1', '000003')");
  db.run("INSERT INTO receta (id, user_id, fecha, observaciones) VALUES ('000003', 'alice', '03/01/2016', 'Observaciones...1')");
  db.run("INSERT INTO recetaDetalle (id, receta_id, medicamento, cantidad, observaciones) VALUES ('000005', '000003', 'med#1', '1', 'Observaciones...1')");


  db.run("INSERT INTO user (id, name, password) VALUES ('bob', 'Bob', 'bob123')");
  db.run("INSERT INTO cita (id, user_id, paciente, fecha, observaciones) VALUES ('000003', 'bob', 'Paciente #3', '02/02/2016', 'Observaciones....3')");
  db.run("INSERT INTO cita (id, user_id, paciente, fecha, observaciones) VALUES ('000004', 'bob', 'Paciente #4', '02/02/2016', 'Observaciones....4')");

});

db.close();

var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!!!');
});

app.listen(3000, function () {
});
