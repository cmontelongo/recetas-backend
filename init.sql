CREATE TABLE user (id TEXT PRIMARY KEY, name TEXT, password TEXT);
CREATE TABLE cita (id TEXT PRIMARY KEY, user_id TEXT, paciente TEXT, fecha TEXT, observaciones TEXT);
CREATE INDEX idx_note_user ON note(user_id);

INSERT INTO user (id, name, password) VALUES ('alice', 'Alice', 'alice123');
INSERT INTO note (id, user_id, paciente, fecha, observaciones) VALUES ('000001', 'alice', 'Paciente #1', '01/02/2016', 'Observaciones...1');
INSERT INTO note (id, user_id, paciente, fecha, observaciones) VALUES ('000002', 'alice', 'Paciente #2', '03/02/2016', 'Observaciones....2');

INSERT INTO user (id, name, password) VALUES ('bob', 'Bob', 'bob123');
INSERT INTO note (id, user_id, paciente, fecha, observaciones) VALUES ('000003', 'bob', 'Paciente #3', '02/02/2016', 'Observaciones....3');
INSERT INTO note (id, user_id, paciente, fecha, observaciones) VALUES ('000004', 'bob', 'Paciente #4', '02/02/2016', 'Observaciones....4');
