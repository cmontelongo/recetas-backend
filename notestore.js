'use strict';
var crypto = require('crypto');
var sqlite3 = require('sqlite3');

function create(dbFile) {
  var db = new sqlite3.Database(dbFile);

  var listStmt = db.prepare('SELECT c.id, p.id pacienteId, p.nombre, c.fecha_cita, c.observaciones FROM cita c, paciente p WHERE c.paciente_id=p.id and c.atiende_user_id = $userId and c.activo=1');
  var getStmt = db.prepare('SELECT c.id, p.id pacienteId, p.nombre, c.fecha_cita, c.observaciones FROM cita c, paciente p WHERE c.paciente_id=p.id and c.id = $citaId AND c.atiende_user_id = $userId and c.activo=1');
  var createStmt = db.prepare('INSERT INTO cita (id, atiende_user_id, paciente_id, fecha_cita, observaciones, activo) VALUES ($citaId, $userId, $paciente, $fecha, $observaciones, 1)');
  var updateStmt = db.prepare('UPDATE cita SET fecha_cita=$fecha, observaciones = $observaciones WHERE id = $citaId AND atiende_user_id = $userId');
  var deleteStmt = db.prepare('DELETE FROM cita WHERE id = $citaId AND atiende_user_id = $userId');

  var listPacienteStmt = db.prepare('SELECT p.id, p.nombre FROM paciente p WHERE p.activo=1');
  var getPacienteStmt = db.prepare('SELECT p.id, p.nombre FROM paciente p WHERE p.id=$pacienteId and p.activo=1');

  var loginStmt = db.prepare('SELECT u.id, u.username, u.password FROM user u WHERE u.username = $user AND u.password=$password');

  return {
    list: function(userId, callback) {
      listStmt.all({$userId: userId}, callback);
    },
    get: function(userId, citaId, callback) {
      getStmt.get({$userId: userId, $citaId: citaId}, callback);
    },
    create: function(userId, cita, callback) {
      var citaId = crypto.randomBytes(4).toString('hex');
      console.log(cita);
      var params = {$userId: userId, $citaId: citaId, $paciente: cita.pacienteId, $fecha: cita.fecha_cita, $observaciones: cita.observaciones};
      return createStmt.run(params, function(error) {
          callback(error, citaId);
        });
    },
    update: function(userId, cita, callback) {
      var params = {$userId: userId, $citaId: cita.id, $fecha: cita.fecha_cita, $observaciones: cita.observaciones};
      updateStmt.run(params, function(error) {
        callback(error, this.changes === 1);
      });
    },
    remove: function(userId, citaId, callback) {
      deleteStmt.run({$userId: userId, $citaId: citaId}, function(error) {
        callback(error, this.changes === 1);
      });
    },

    listPaciente: function(callback) {
      listPacienteStmt.all({}, callback);
    },
    getPaciente: function(pacienteId, callback) {
        console.log(pacienteId);
      getPacienteStmt.get({$pacienteId: pacienteId}, callback);
    },

    login: function(user, password, callback) {
      loginStmt.get({$user: user, $password: password}, callback);
    }
  };
}

exports.create = create;
