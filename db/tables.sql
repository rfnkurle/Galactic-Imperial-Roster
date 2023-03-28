DROP DATABASE IF EXISTS imperial_database;
CREATE DATABASE imperial_database;

USE imperial_database;

CREATE TABLE service_branch (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  paygrade DECIMAL UNSIGNED NOT NULL,
  branch_id INT UNSIGNED NOT NULL,
FOREIGN KEY (branch_id) REFERENCES service_branch(id)
);

CREATE TABLE member_data(
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  rank VARCHAR(30),
  role_id INT NOT NULL,
     FOREIGN KEY (role_id) REFERENCES role(id),
  officer_id INT,
  FOREIGN KEY (officer_id) REFERENCES member_data(id)
);