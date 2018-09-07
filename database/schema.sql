DROP DATABASE IF EXISTS visitors;
CREATE DATABASE mentees;

USE mentees;

CREATE TABLE mentees_table (
	id INT NOT NULL AUTO_INCREMENT, 
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	photo VARCHAR(250) NOT NULL,
	email VARCHAR(50) NOT NULL, 
	PRIMARY KEY(id)
);

INSERT INTO mentees_table (first_name, last_name, photo, email) VALUES ('JP', 'Vertil', 'aaa', 'jvertil@nd.edu');
INSERT INTO mentees_table (first_name, last_name, photo, email) VALUES ('Jeffry', 'Magloire', 'bbb', 'jmagloire@rochester.edu');
