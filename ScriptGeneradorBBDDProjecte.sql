-- mysql workbench forward engineering
drop database lloguervacacional;

-- -----------------------------------------------------
-- schema lloguervacacional
-- -----------------------------------------------------

set @old_unique_checks=@@unique_checks, unique_checks=0;
set @old_foreign_key_checks=@@foreign_key_checks, foreign_key_checks=0;
set @old_sql_mode=@@sql_mode, sql_mode='only_full_group_by,strict_trans_tables,no_zero_in_date,no_zero_date,error_for_division_by_zero,no_engine_substitution';

create schema if not exists `lloguervacacional` default character set utf8 ;
use `lloguervacacional` ;

-- -----------------------------------------------------
-- table `lloguervacacional`.`usuari`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`usuari` (
  `id` int auto_increment,
  `dni` varchar(9) not null unique,
  `nom` varchar(45) not null,
  `llinatge1` varchar(45) not null,
  `llinatge2` varchar(45) null,
  `correu` varchar(45) not null unique,
  `contrasenya` varchar(100) not null,
  `eliminat` bit(1) default 0 not null,
  primary key (`id`))
engine = innodb;

-- -----------------------------------------------------
-- table `lloguervacacional`.`administrador`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`administrador` (
  `id` int not null,
  primary key (`id`),
  constraint `usuari`
    foreign key (`id`)
    references `lloguervacacional`.`usuari` (`id`)
    on delete cascade
    on update cascade)
engine = innodb;

-- -----------------------------------------------------
-- table `lloguervacacional`.`propietari`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`propietari` (
  `id` int not null,
  `descripcio` varchar(400) ,
  primary key (`id`),
  constraint `usuari_propietari`
    foreign key (`id`)
    references `lloguervacacional`.`usuari` (`id`)
    on delete cascade
    on update cascade)
engine = innodb;

-- -----------------------------------------------------
-- table `lloguervacacional`.`client`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`client` (
  `id` int not null,
  primary key (`id`),
  constraint `dni`
    foreign key (`id`)
    references `lloguervacacional`.`usuari` (`id`)
    on delete cascade
    on update cascade)
engine = innodb;

-- -----------------------------------------------------
-- table `lloguervacacional`.`comentari`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`comentari` (
  `id_prop` int not null,
  `id_cli` int not null,
  `comentari` varchar(400) not null,
  primary key (`id_prop`, `id_cli`),
  index `client_idx` (`id_cli` asc),
  constraint `propietari_dni_comentari`
    foreign key (`id_prop`)
    references `lloguervacacional`.`propietari` (`id`)
    on delete no action
    on update no action,
  constraint `client_dni_comentari`
    foreign key (`id_cli`)
    references `lloguervacacional`.`client` (`id`)
    on delete no action
    on update no action)
engine = innodb;

-- -----------------------------------------------------
-- table `lloguervacacional`.`localitat`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`localitat` (
  `idlocalitat` int not null auto_increment,
  `nom_localitat`  varchar(45) not null,
  `cp_localitat`  varchar(5) not null,
  primary key (`idlocalitat`))
engine = innodb;

insert into localitat (nom_localitat, cp_localitat) values 
('Artà', '07200'),
("Sant Llorenç", "08960"),
("Manacor", "07030"),
("Son Servera", "08734"),
("Alcudia", "07080"),
("Alaior", "01769"),
("Capdepera", "07050"),
("Petra", "09897"),
("Felanitx", "03059"),
("Llucmajor", "01080"),
("Binissalem", "03254"),
("Marratxi", "06895"),
("Costitx", "02354"),
("Lloseta", "07554"),
("Sant Joan", "09121"),
("Pollença", "07431"),
("Palma", "09183"),
("Andratx", "07100"),
("Calvia", "07500"),
("Llubí", "05800");

-- ------------------------------------------------------------------------------------------------------------------------------------------
-- table `lloguervacacional`.`propietat`
-- ------------------------------------------------------------------------------------------------------------------------------------------
create table if not exists `lloguervacacional`.`propietat` (
  `idpropietat` int not null auto_increment,
  `id_prop` int ,
  `nom_propietat` varchar(45) not null,
  `id_localitat` int not null,
  `normes` varchar(400) default 'sense normes' null,
  `habitacions` int default 0 null,
  `banys_propietat` int default 0 null,
  `direccio` varchar(45) not null,
  `preu_base` float not null,
  `places` int not null,
  `descompte_setmana` int not null,
  `descompte_mes` int not null,
  `x` varchar(50) not null,
  `y` varchar(50) not null,
  primary key (`idpropietat`),
  index `localitat_idx` (`id_localitat` asc),
  constraint `localitat`
    foreign key (`id_localitat`)
    references `lloguervacacional`.`localitat` (`idlocalitat`)
    on delete cascade
    on update cascade,
   index `propietari_idx` (`id_prop` asc),
   constraint `propietari`
     foreign key (`id_prop`)
     references `lloguervacacional`.`propietari` (`id`)
     on delete cascade
     on update cascade)  
engine = innodb;

-- -----------------------------------------------------
-- table `lloguervacacional`.`review_propietat`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`review_propietat` (
  `id_propietat` int not null,
  `id_cli` int not null,
  `comentari` varchar(400) not null,
  `data_comentari` date not null,
  `nota_neteja` int not null,
  `nota_localitzacio` int not null,
  `nota_accesibilitat` int not null,
  primary key (`id_propietat`, `id_cli`),
  index `client_idx` (`id_cli` asc),
  constraint `client`
    foreign key (`id_cli`)
    references `lloguervacacional`.`client` (`id`)
    on delete cascade
    on update cascade,
  constraint `id_propietat`
    foreign key (`id_propietat`)
    references `lloguervacacional`.`propietat` (`idpropietat`)
    on delete cascade
    on update cascade)
engine = innodb;

-- -----------------------------------------------------
-- table `lloguervacacional`.`bloqueig`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`bloqueig` (
  `idbloqueig` int not null auto_increment,
  `d_inici` date not null,
  `d_fi` date not null,
  `id_propietat` int not null,
  primary key (`idbloqueig`),
  index `propietat_idx` (`id_propietat` asc),
  constraint `propietat`
    foreign key (`id_propietat`)
    references `lloguervacacional`.`propietat` (`idpropietat`)
    on delete cascade
    on update cascade)
engine = innodb;

-- -----------------------------------------------------
-- table `lloguervacacional`.`habitacions`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`habitacions` (
  `idhabitacions` int not null auto_increment,
  `bany` bit(1) not null,
  `llit_doble` int not null,
  `llit_simple` int not null,
  `id_propietat` int not null,
  primary key (`idhabitacions`),
  index `propieat_idx` (`id_propietat` asc),
  constraint `propieat`
    foreign key (`id_propietat`)
    references `lloguervacacional`.`propietat` (`idpropietat`)
    on delete cascade
    on update cascade)
engine = innodb;

-- -----------------------------------------------------
-- table `lloguervacacional`.`tarifa`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`tarifa` (
  `idtarifa` int not null auto_increment,
  `id_propietat` int not null,
   `preu` float not null,
  `d_inici` date not null,
  `d_fi` date not null,
  `activa` bit(1) null,
  primary key (`idtarifa`),
  index `propietat_idx` (`id_propietat` asc),
  constraint `propietat_tarifa`
    foreign key (`id_propietat`)
    references `lloguervacacional`.`propietat` (`idpropietat`)
    on delete cascade
    on update cascade)
engine = innodb;

-- -----------------------------------------------------
-- table `lloguervacacional`.`politica_cancelacio`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`politica_cancelacio` (
  `idpolitica_cancelacio` int not null auto_increment,
  `id_propietat` int not null,
  `dies` int not null,
  `perdut` int not null,
  `activa` bit(1) not null default 1,
  primary key (`idpolitica_cancelacio`),
  index `propietat_idx` (`id_propietat` asc),
  constraint `propietat_politica_cancelacio`
    foreign key (`id_propietat`)
    references `lloguervacacional`.`propietat` (`idpropietat`)
    on delete cascade
    on update cascade)
engine = innodb;

-- -----------------------------------------------------
-- table `lloguervacacional`.`reserva`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`reserva` (
  `idreserva` int not null auto_increment,
  `id_propietat` int not null,
  `id_cli` int not null,
  `data_reserva` datetime not null,
  `d_arribada` date not null,
  `d_sortida` date not null,
  `copia_normes` varchar(400) not null,
  `preu_final` float not null,
  `cancelada` bit(1) default 0 null,
  `pagada`bit(1) default 0,
  primary key (`idreserva`),
  index `dni_idx` (`id_cli` asc),
  index `id_propietat_idx` (`id_propietat` asc),
   constraint `dni_reserva`
     foreign key (`id_cli`)
     references `lloguervacacional`.`client` (`id`)
    on delete cascade
    on update cascade,
 constraint `id_propietat_reserva`
    foreign key (`id_propietat`)
    references `lloguervacacional`.`propietat` (`idpropietat`)
    on delete cascade
    on update cascade)
engine = innodb;
select * from reserva;

-- -----------------------------------------------------
-- table `lloguervacacional`.`assigna_politica`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`assigna_politica` (
  `idassigna_politica` int not null auto_increment,
  `id_politica` int not null,
  `id_reserva` int not null,
  primary key (`idassigna_politica`),
  index `politica_idx` (`id_politica` asc),
  index `reserva_idx` (`id_reserva` asc),
  constraint `politica`
    foreign key (`id_politica`)
    references `lloguervacacional`.`politica_cancelacio` (`idpolitica_cancelacio`)
    on delete cascade
    on update cascade,
  constraint `reserva`
    foreign key (`id_reserva`)
    references `lloguervacacional`.`reserva` (`idreserva`)
    on delete cascade
    on update cascade)
engine = innodb;

-- -----------------------------------------------------
-- table `lloguervacacional`.`gananacies`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`gananacies` (
  `idgananacies` int not null auto_increment,
  `gananciapropietari` int null,
  `gananciaclient` int null,
  `activa` bit(1) null,
  primary key (`idgananacies`))
engine = innodb;

-- -----------------------------------------------------
-- table `lloguervacacional`.`caracteristiques`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`caracteristiques` (
  `id_caracteristica` int not null auto_increment,
  `caracteristica` varchar(45) not null,
  primary key (`id_caracteristica`))
engine = innodb;

insert into caracteristiques (caracteristica) values
("Pisicina"),
("Vitro"),
("Garatje"),
("Jardi"),
("WiFi"),
("TV"),
("Pati"),
("Jacuzzi"),
("Banyera"),
("Terrassa"),
("Cuina de gas"),
("Permet animals"),
("Aire acondicionat"),
("Vistes al mar"),
("Ascensor"),
("Gimnas"),
("Balco"),
("Vistes rurals");

-- -----------------------------------------------------
-- table `lloguervacacional`.`caracteristiques_propietats`
-- -----------------------------------------------------
create table if not exists `lloguervacacional`.`caracteristiques_propietats` (
  `id_car` int not null,
  `id_pro` int not null,
  primary key (`id_car`, `id_pro`),
  index `referencia_propietat_idx` (`id_pro` asc),
  constraint `referencia_caracteristica`
    foreign key (`id_car`)
    references `lloguervacacional`.`caracteristiques` (`id_caracteristica`)
    on delete no action
    on update cascade,
  constraint `referencia_propietat`
    foreign key (`id_pro`)
    references `lloguervacacional`.`propietat` (`idpropietat`)
    on delete no action
    on update cascade)
engine = innodb;

set sql_mode=@old_sql_mode;
set foreign_key_checks=@old_foreign_key_checks;
set unique_checks=@old_unique_checks;

-- INSERTS PER DEFECTE --

-- USUARIS

	 -- Propietari (Contrassenya -> propietari)
     insert into usuari (dni, nom, llinatge1, llinatge2, correu, contrasenya, eliminat) values 
     ('41551809T', 'Propietari', 'Owner', 'Dueño', 'propietari@gmail.com', '$2a$10$VQQRJ27LW7Ne/6pHF5d3xeV9IHrya8kwzheDjo4WAEAkHVMBpNSBq', 0);
     insert into propietari (id) values (1);
     
     -- Clients (Contrassenyes -> client)
     insert into usuari (dni, nom, llinatge1, llinatge2, correu, contrasenya, eliminat) values
     ('41000001A', 'Client1', 'Guest1', 'Invitado1', 'client@gmail.com', '$2a$10$CLnX3YJSJ3msCqF1C0sYRueGkJ4Mh6UJxosUp9E.2ga0c4/B8TBAi', 0),
     ('41000001B', 'Client2', 'Guest2', 'Invitado2', 'client2@gmail.com', '$2a$10$CLnX3YJSJ3msCqF1C0sYRueGkJ4Mh6UJxosUp9E.2ga0c4/B8TBAi', 0),
     ('41000001C', 'Client3', 'Guest3', 'Invitado3', 'client3@gmail.com', '$2a$10$CLnX3YJSJ3msCqF1C0sYRueGkJ4Mh6UJxosUp9E.2ga0c4/B8TBAi', 0),
     ('41000001D', 'Client4', 'Guest4', 'Invitado4', 'client4@gmail.com', '$2a$10$CLnX3YJSJ3msCqF1C0sYRueGkJ4Mh6UJxosUp9E.2ga0c4/B8TBAi', 0),
     ('41000001E', 'Client5', 'Guest5', 'Invitado5', 'client5@gmail.com', '$2a$10$CLnX3YJSJ3msCqF1C0sYRueGkJ4Mh6UJxosUp9E.2ga0c4/B8TBAi', 0);
     insert into client (id) values (2), (3), (4), (5), (6);
     
     -- Admin (No Utilitzam) (Contrassenya -> admin)
     insert into usuari (dni, nom, llinatge1, llinatge2, correu, contrasenya, eliminat) values
     ('41552829T', 'Admin', 'Admin', 'Admin', 'admin@gmail.com', '$2a$10$TMCAmw/gU4J6SQwFao3Ls.ppTaT2NOcja4jQ8frMH6qOPXzNufqIW', 0);
     insert into administrador (id) values (7);
			
-- Propietats (Totes pertanyen a l'usuari propietari)

insert into PROPIETAT (id_prop, nom_propietat, id_localitat, normes, direccio, preu_base, places, descompte_Setmana, descompte_mes, x, y) values 
(1, 'Ca Na Antonia', 1,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Major 50', 100, 4, 12, 22, "3.348524151187764", "39.70687053738144"),
(1, 'Es Rafal Pai', 2,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Sos Monjos 38', 220, 6, 10, 25, "3.1998126920000702", "39.56158221305032"),
(1, 'Lara de Crestatx', 8,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Tapareres 12', 400, 2, 0, 5, "3.1998126920000702", "39.56158221305032"),
(1, 'Villa Alejandra', 6,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Botavant 22', 500, 5, 5, 10, "3.1998126920000702", "39.56158221305032"),
(1, 'Son Blavet', 3,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Boticari 13', 240, 6, 5, 15, "3.1998126920000702", "39.56158221305032"),
(1, 'Ca Na Carmen', 5,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Rafel Blanes 41', 367, 4, 0, 10, "3.1998126920000702", "39.56158221305032"),
(1, 'Casa Habana', 1,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Ses Catiusques 23', 521, 2, 0, 10, "3.348524151187764", "39.70687053738144"),
(1, 'Villa Benet', 1,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Ramos 10', 114, 7, 0, 15, "3.348524151187764", "39.70687053738144"),
(1, 'Can Lau', 3,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Ciutat 12', 500, 8, 10, 20, "3.1998126920000702", "39.56158221305032"),
(1, 'Sa Marineta den Moll', 9,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Des Cristians 28', 566, 8, 15, 30, "3.1998126920000702", "39.56158221305032"),
(1, 'Casa Amorena', 10,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Guatleres 2', 250, 9, 0, 15, "2.987844571289049", "39.70687053738144"),
(1, 'Can Guillem Boquet', 5,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Sera Vella 21', 266, 6, 0, 10, "2.987844571289049", "39.48583447391049"),
(1, 'Son Cosme Pons', 4,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Trui 13', 365, 4, 0, 10, "2.987844571289049", "39.48583447391049"),
(1, 'Can Nofre', 6,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Cruce 86', 250, 5, 0, 0, "2.987844571289049", "39.48583447391049"),
(1, 'Es Clape de Sa Galera', 12,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Indi 23', 250, 4, 0, 5, "2.987844571289049", "39.48583447391049"),
(1, 'Son Bielo', 13,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Urgell 12', 200, 3, 0, 2, "2.987844571289049", "39.48583447391049"),
(1, 'Sa Carrotja Nova', 14,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Corts 65', 100, 6, 0, 10, "2.987844571289049", "39.48583447391049"),
(1, 'Villa Marimont', 2,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Sagrista 56', 350, 3, 5, 15, "39.58327515128242", "2.653499929079568"),
(1, 'Son Perot', 1,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Antoni Camps 5', 230, 4, 10, 50, "39.58327515128242", "2.653499929079568"),
(1, 'Sauma', 7,'Segueix les instruccions dels adults. Està prohibit fer mal a altres. No has denganxar ni donar puntades de peu. No interrompis els altres. Espera el teu torn per parlar. Res de crits a la casa. A la casa es parla sense cridar. No grimpis pels mobles ni saltis sobre ells.', 'Nose 18', 568, 4, 2, 10, "39.58327515128242", "2.653499929079568");

select * from propietat;

-- Caracteristiques

 -- Propietat 1
 insert into caracteristiques_propietats (id_car, id_pro) values
 (1, 1), (2, 1), (4, 1), (7, 1), (18, 1), (6, 1), (13, 1); 
 -- Propietat 2
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 2), (6, 2), (15, 2), (7, 2), (18, 2), (2, 2), (11, 2); 
 -- Propietat 3
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 3), (4, 3), (7, 3), (5, 3), (6, 3), (17, 3); 
 -- Propietat 4
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 4), (5, 4), (9, 4), (7, 4), (18, 4), (4, 4), (13, 4); 
 -- Propietat 5
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 5), (2, 5), (4, 5), (3, 5), (15, 5), (8, 5), (14, 5); 
 -- Propietat 6
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 6), (2, 6), (4, 6), (5, 6), (10, 6), (7, 6), (11, 6); 
 -- Propietat 7
  insert into caracteristiques_propietats (id_car, id_pro) values
  (8, 7), (14, 7), (4, 7), (7, 7), (15, 7), (6, 7), (9, 7); 
 -- Propietat 8
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 8), (2, 8), (18, 8), (6, 8), (13, 8); 
 -- Propietat 9
  insert into caracteristiques_propietats (id_car, id_pro) values
 (2, 9), (4, 9), (7, 9), (18, 9), (6, 9), (13, 9); 
 -- Propietat 10
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 10), (2, 10), (4, 10), (7, 10), (18, 10), (6, 10), (13, 10); 
 -- Propietat 11
  insert into caracteristiques_propietats (id_car, id_pro) values
  (4, 11), (7, 11), (18, 11), (6, 11), (13, 11); 
 -- Propietat 12
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 12), (2, 12), (18, 12), (6, 12), (13, 12); 
 -- Propietat 13
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 13), (6, 13), (3, 13), (17, 13), (16, 13), (7, 13), (13, 13); 
 -- Propietat 14
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 14), (2, 14), (4, 14), (7, 14), (13, 14); 
 -- Propietat 15
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 15), (2, 15), (4, 15), (7, 15), (18, 15), (6, 15), (13, 15); 
 -- Propietat 16
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 16), (2, 16), (4, 16), (7, 16), (18, 16); 
 -- Propietat 17
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 17), (2, 17), (4, 17), (7, 17), (18, 17); 
 -- Propietat 18
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 18), (2, 18), (4, 18), (7, 18), (18, 18), (6, 18), (13, 18); 
 -- Propietat 19
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 19), (2, 19), (6, 19), (13, 19); 
 -- Propietat 20
  insert into caracteristiques_propietats (id_car, id_pro) values
  (1, 20), (2, 20), (4, 20), (5, 20), (9, 20), (6, 20), (15, 20);
  
  -- Comentaris del client a la propietat  
insert into review_propietat (id_propietat, id_cli, comentari, data_comentari, nota_neteja, nota_localitzacio, nota_accesibilitat) values
 (1, 2, "Was a great time there, we all love the place and those beaches. For sure we will come again!", '2022-02-24', 9, 9, 9),
 (1, 3, "Fue una estancia muy agradable, el trato fenomenal y la villa de ensueño, los dueños encantadores, recomendado 100%", '2022-02-27', 10, 9, 9),
 (1, 4, "Nos quedamos sin luz ni agua durante dias, todo un desastre. Las playas han salvado el viaje a Mallorca...", '2022-02-28', 5, 2, 1),
 (1, 5, "Durant el viatje va ploure la major part dels dies, encara així l'estada a la casa va ser fantastica, l'ambient es tranquil i el lloc ideal.", '2022-03-02', 7, 8, 7),
 (2, 6, "Sitio bonito i agradable, uno de los grifos no funciona, esta bien", '2022-02-27', 6, 7, 7),
 (3, 2, "La localitzacio es molt bona Te unes vistes precioses i el menjar de la zona es increible Definitivament tornarem", '2022-02-22', 5, 5, 5),
 (4, 2, "La casa es molt guapa i comfortable i el menjar de la zona es increible l'unica falta la localitzacio", '2022-02-22', 4, 4, 4),
 (5, 2, "No m'agradta la casa, trob que la localitzacio es dolenta, i a mes les vistes son horribles", '2022-02-22', 1, 2, 1),
 (3, 3, "No es una casa increible però pel preu que te esta bastant be, la recoman", '2022-02-22', 3, 3, 3),
 (5, 4, "Les fotos no es corresponen amb la casa, es una estafa", '2022-02-22',0, 0, 0);
 
 -- Habitacions
 
 insert into habitacions (bany,llit_doble,llit_simple,id_propietat) values 
 (1,1,0,3),(0,1,0,3),(0,0,1,3),(1,0,1,4),(1,0,0,5),(1,0,1,5),(0,1,1,5),
 (1,1,0,1),(0,1,0,1),(0,0,1,1),(1,0,1,1),(1,0,0,2),(1,0,1,2),(0,1,1,2);
 
 -- Bloqueigs
 
insert into bloqueig(d_inici,d_fi,id_propietat) values
('2022-03-28','2022-03-31',1),('2022-04-5','2022-04-10',1),('2022-04-20','2022-04-25',1), ('2022-03-19','2022-03-20',1),('2022-05-5','2022-05-6',1),('2022-05-23','2022-05-25',1),('2022-03-03','2022-03-06',1),
('2022-03-20','2022-03-22',2),('2022-03-27','2022-03-28',2),('2022-03-31','2022-04-05',2),
('2022-03-20','2022-03-22',3),('2022-03-27','2022-03-28',3),('2022-03-31','2022-04-05',3),
('2022-03-15','2022-03-20',4),('2022-04-27','2022-04-28',4),('2022-03-10','2022-03-12',4),
('2022-03-28','2022-03-31',5),('2022-04-5','2022-04-10',5),('2022-04-20','2022-04-25',5);

-- Reserves
   
insert into reserva(id_propietat,id_cli,data_reserva,d_arribada,d_sortida,copia_normes,preu_final,cancelada,pagada) values
(1,2,'2022-02-08 00:00:00','2022-03-10','2022-03-18',"Normes Generiques",300,0,1),
(1,3,'2022-02-13 00:00:00','2022-03-22','2022-03-27',"Normes Generiques",300,0,1),
(1,4,'2022-01-15 00:00:00','2022-04-11','2022-04-19',"Normes Generiques",300,0,1),
(1,5,'2022-02-18 00:00:00','2022-04-28','2022-05-03',"Normes Generiques",300,0,1),
(1,6,'2022-02-24 00:00:00','2022-02-07','2022-02-26',"Normes Generiques",300,0,1), 
(2,2,'2022-02-08 00:00:00','2022-03-10','2022-03-19',"Normes Generiques",300,0,1),
(2,3,'2022-02-16 00:00:00','2022-02-14','2022-02-25',"Normes Generiques",300,0,1),
(3,2,'2022-02-08 00:00:00','2022-03-10','2022-03-19',"Normes Generiques",300,0,1),
(4,2,'2022-03-08 00:00:00','2022-03-10','2022-03-14',"Normes generiques",200,0,1),
(5,2,'2022-03-08 00:00:00','2022-04-15','2022-04-19',"Normes generiques",250,0,1);


-- hi ha dos cases amb dos comentaris una amb un, devers 3 habitacions per casa i llogar en es març sera complicat per que entre bloquejos i reserves queden pocs dies
  