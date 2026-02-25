CREATE DATABASE formdatafeladatok
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

USE formdatafeladatok;

CREATE TABLE konyvek(
    id INT PRIMARY KEY AUTO_INCREMENT,
    cim VARCHAR(60),
    szerzo VARCHAR(60),
    kiado VARCHAR(60),
    kiadas_eve INT,
    mufaj VARCHAR(60),
    ar INT
);