-- SCRIPT DE CARGA DE OFERTA ACADÉMICA
-- Generado automáticamente

USE kiin_db;
SET NAMES 'utf8mb4';
SET FOREIGN_KEY_CHECKS = 0;

-- [1] LIMPIEZA DE TABLAS
TRUNCATE TABLE GRUPOS_HORARIOS;
TRUNCATE TABLE DETALLE_LISTA;
TRUNCATE TABLE LISTAS_HORARIOS;
TRUNCATE TABLE GRUPOS;
TRUNCATE TABLE MALLA_CURRICULAR;
TRUNCATE TABLE ASIGNATURAS;
TRUNCATE TABLE PROFESORES;

-- [2] CARRERAS BASE
INSERT IGNORE INTO CARRERA (ClvCarrera, NomCarrera, NumSemestres) VALUES 
('LIS', 'Licenciatura en Ingeniería de Software', 9),
('LCC', 'Licenciatura en Ciencias de la Computación', 9),
('LIC', 'Licenciatura en Ingeniería de la Computación', 9),
('LA', 'Licenciatura en Actuaría', 9),
('LM', 'Licenciatura en Matemáticas', 9),
('LEM', 'Licenciatura en Enseñanza de las Matemáticas', 9);

-- [3] PROFESORES (135)
INSERT INTO PROFESORES (ClvProfesor, NomProfesor) VALUES
(1, 'Jesús Efrén Pérez Terrazas'),
(2, 'Pedro David  Sánchez Salazar'),
(3, 'Ángel Adrián Bacelis Jiménez'),
(4, 'Abraham Moisés Canul Pech'),
(5, 'Alejandro Waldemar Cobá Magaña'),
(6, 'Victor Manuel  Bautista Ancona'),
(7, 'Carlos Jacob  Rubio Barrios'),
(8, 'Jesús Efrén  Pérez Terrazas'),
(9, 'María Guadalupe Ordaz Arjona'),
(10, 'Javier Arturo  Díaz Vargas'),
(11, 'Alejandro Argáez García'),
(12, 'Luis Celso  Chan Palomo'),
(13, 'María del Pilar Rosado Ocaña'),
(14, 'Estelita  García'),
(15, 'María Guadalupe  Ordaz Arjona'),
(16, 'Isabel  Tuyub Sánchez'),
(17, 'Safira Amigai  Pech Chi'),
(18, 'Otilio Santos Aguilar'),
(19, 'Johan Jair Estrada López'),
(20, 'Aarón Abraham Aguayo González'),
(21, 'Gabriel Murrieta Hernández'),
(22, 'Fernando Alberto Ruiz Cardeña'),
(23, 'Irwing Aarón Cifuentes González'),
(24, 'Collí Yah Freddy Cambranes Martínez Edgar'),
(25, 'Eduardo Antonio Rodríguez González'),
(26, 'Smith Shein Moguel Solís Juan Carlos'),
(27, 'Pastor Enrique Góngora Cárdenas'),
(28, 'José Luis López Martínez'),
(29, 'Carlos José Herrera Plata'),
(30, 'David Antonio Soberanis Ramírez'),
(31, 'Genny Rocío Uicab Ballote'),
(32, 'Heidy Cecilia Escamilla Puc'),
(33, 'Lucía Belén Gamboa Salazar'),
(34, 'Jorge Carlos Lugo Jiménez'),
(35, 'Óscar Iván Muñoz Carballo'),
(36, 'Ángel Gabriel Estrella González'),
(37, 'Felipe de Jesús Rosado Vázquez'),
(38, 'Isabel Tuyub Sánchez'),
(39, 'Miguel Ángel Can Ek'),
(40, 'Omar Muñiz Pérez'),
(41, 'Ma. Isabel Hernández'),
(42, 'Eddie de Jesús Aparicio Landa'),
(43, 'Landy Elena Sosa Moguel'),
(44, 'Eric José Ávila Vales'),
(45, 'Eddie de Jesús/Landy Elena  Aparicio Landa/Sosa Moguel'),
(46, 'José Luis Batún Cutz'),
(47, 'María Auxilio Lucía Chan García'),
(48, 'Eduardo Camilo Carlos Hernández García'),
(49, 'Jesús Burgos Bastarrachea'),
(50, 'Jesús Enrique López Flores'),
(51, 'Salvador Medina Peralta'),
(52, 'Jorge Miguel Guzmán Arjona'),
(53, 'Felipe Reyes Tuz Poot'),
(54, 'Rubén Alejandro Cool Padilla'),
(55, 'Mariana Escalante Barrera'),
(56, 'Daniel Abraham Adrián Osorio'),
(57, 'María Dolores Matus Basto'),
(58, 'Adrián Alberto Ayora Quintal'),
(59, 'Henry Gaspar Pantí Trejo'),
(60, 'Luis Armando Luna Gamboa'),
(61, 'Jorge Armando Argáez Sosa'),
(62, 'Pablo Agustín Vázquez Montejo'),
(63, 'Juan Pablo Navarrete Carrillo'),
(64, 'Waldemar del Jesús Barrera Vargas'),
(65, 'José Matías Navarro Soza'),
(66, 'Julio César Díaz Mendoza'),
(67, 'Carlos Benito Mojica Ruíz'),
(68, 'María Enriqueta Castellanos Bolaños'),
(69, 'Víctor Hugo Menéndez Domínguez'),
(70, 'Antonio Armando Aguileta Güemez'),
(71, 'Edwin Jesús León Bojórquez'),
(72, 'Daniel G. Cantón Puerto'),
(73, 'Edgar Antonio Cambranes Martínez'),
(74, 'Juan Pablo Ucán Pech'),
(75, 'Raúl Antonio Aguilar Vera'),
(76, 'Leidy Ofelia Caballero Chi'),
(77, 'Alejandro Pasos Ruíz'),
(78, 'Emilio Gabriel Rejón Herrera'),
(79, 'Luis Ramiro Basto Díaz'),
(80, 'Víctor Emanuel Uc Cetina'),
(81, 'Carlos Benito Mojica Ruiz'),
(82, 'Naomi Alexandra  Martínez Ku'),
(83, 'Roberto  Balcázar Araiza'),
(84, 'René Humberto Moreno Acevedo'),
(85, 'Virtual autogestiva'),
(86, 'Arturo Espinosa Romero'),
(87, 'Anabel Martín González'),
(88, 'Francisco  Heredia López'),
(89, 'Ricardo Legarda Sáenz'),
(90, 'Francisco José Moo Mena'),
(91, 'Francisco Alejandro Madera Ramírez'),
(92, 'Jorge Ricardo Gómez Montalvo'),
(93, 'Jorge Carlos Reyes Magaña'),
(94, 'Martín Leonel Chi Pérez'),
(95, 'Jorge Alberto  Ríos Martínez'),
(96, 'Daniel Fernando Baas Colonia'),
(97, 'Luis Fernando  Curi Quintal'),
(98, 'Joel Trejo Sánchez'),
(99, 'Enrique  Ayala Franco'),
(100, 'Luis Ramiro/Jorge Carlos/Luis Fernando  Basto Díaz/Reyes Magaña/Curi Quintal'),
(101, 'Luis Ramiro  Basto Díaz'),
(102, 'Francisco Alejandro  Madera Ramírez'),
(103, 'Sergio Antonio Cervera Loeza'),
(104, 'Ernesto Antonio Guerrero Lara'),
(105, 'Jorge Armando   Argáez Sosa'),
(106, 'Salvador Díaz Serrano'),
(107, 'Henry  Pantí Trejo'),
(108, 'Waldemar Barrera Vargas'),
(109, 'Javier  Díaz Vargas'),
(110, 'Efrén Pérez Terrazas'),
(111, 'Víctor Bautista Ancona'),
(112, 'Carlos Brito Loeza'),
(113, 'José Alejandro Lara Rodríguez'),
(114, 'Brito Loeza Carlos Francisco Bautista Ancona Víctor Manuel'),
(115, 'Navarrete Carrillo Juan Pablo Barrera Vargas Waldemar del Jesús'),
(116, 'Henry Pantí Trejo'),
(117, 'Argáez Sosa Jorge Armando Medina Peralta Salvador'),
(118, 'Javier Arturo Díaz Vargas Lara Rodríguez José Alejandro'),
(119, 'Raúl Antonio  Aguilar Vera'),
(120, 'Julio César  Díaz Mendoza'),
(121, 'Murrieta Hernández Gabriel Aguileta Güemez Antonio Armando'),
(122, 'Uc Cetina Víctor Emanuel Ríos Martínez Jorge Alberto'),
(123, 'Victor Emanuel Uc Cetina'),
(124, 'Aguilar Vera Raúl Antonio Ucán Pech Juan Pablo'),
(125, 'Gómez Montalvo Jorge Ricardo Menéndez Domínguez Víctor Hugo'),
(126, 'Aguilar Vera Raúl Antonio Aguileta Güemez Antonio Armando'),
(127, 'Moo Mena Francisco José Aguileta Güemez Antonio Armando'),
(128, 'Bassam Alí Martín González Anabel'),
(129, 'Brito Loeza Carlos Francisco Legarda Sáenz Ricardo'),
(130, 'Javier Arturo Díaz Vargas'),
(131, 'José Matías Navarro Sosa'),
(132, 'Henry Gaspar  Pantí Trejo'),
(133, 'Matías Navarro Soza'),
(134, 'Por Asignar'),
(135, 'Laura Carolina Sánchez Leal');

-- [4] ASIGNATURAS (206)
INSERT INTO ASIGNATURAS (ClvAsignatura, NomAsignatura, NumCreditos, Tipo) VALUES
('1', 'Álgebra Abstracta I', 9, 'Obligatoria'),
('2', 'Álgebra Avanzada', 8, 'Obligatoria'),
('3', 'Álgebra Intermedia', 8, 'Obligatoria'),
('4', 'Álgebra Lineal', 8, 'Obligatoria'),
('5', 'Álgebra Lineal II', 8, 'Obligatoria'),
('6', 'Álgebra Superior', 8, 'Obligatoria'),
('7', 'Álgebra Superior I', 5, 'Obligatoria'),
('8', 'Álgebra Superior II', 6, 'Obligatoria'),
('9', 'Álgebra Conmutativa', 9, 'Optativa'),
('10', 'Criptografia I', 9, 'Optativa'),
('11', 'Didáctica de la Geometría', 10, 'Obligatoria'),
('12', 'Didáctica de la Probabilidad y Estadística', 10, 'Obligatoria'),
('13', 'Planeación y Evaluación Educativa', 8, 'Obligatoria'),
('14', 'Prácticas Profesionales', 8, 'Obligatoria'),
('15', 'Servicio Social', 12, 'Obligatoria'),
('16', 'Currículo por Competencias', 10, 'Optativa'),
('17', 'Pensamiento Matemático y Medios Tecnológicos', 8, 'Optativa'),
('18', 'Pensamiento Matemático Avanzado como herramienta didáctica para la docencia', 10, 'Optativa'),
('19', 'Taller de Resolución de Problemas Matemáticos', 8, 'Optativa'),
('20', 'Arquitectura de Computadoras', 8, 'Obligatoria'),
('21', 'Arquitectura y Organización de Computadoras', 8, 'Obligatoria'),
('22', 'Circuitos Electrónicos I', 8, 'Obligatoria'),
('23', 'Circuitos Electrónicos II', 8, 'Obligatoria'),
('24', 'Electricidad y Magnetismo', 8, 'Obligatoria'),
('25', 'Física', 8, 'Obligatoria'),
('26', 'Métodos Numéricos', 8, 'Obligatoria'),
('27', 'Señales y Sistemas', 8, 'Obligatoria'),
('28', 'Sistemas Digitales II', 8, 'Obligatoria'),
('29', 'Sistemas Embebidos', 8, 'Obligatoria'),
('30', 'Diseño y Manufactura Digital con Fusion 360', 8, 'Optativa'),
('31', 'Domótica con Linux y Raspberry Pi', 8, 'Optativa'),
('32', 'Física de Dispositivos Semiconductores', 6, 'Optativa'),
('33', 'Sensores Inteligentes', 8, 'Optativa'),
('34', 'Agile Enterprise Project Delivery using the Salesforce Platform', 9, 'Optativa'),
('35', 'AWS Academy Cloud Foundations', 9, 'Optativa'),
('36', 'Commerce Cloud using the Salesforce Platform', 9, 'Optativa'),
('37', 'Ethical Hacking', 9, 'Optativa'),
('38', 'Modelos de Programación Paralela', 8, 'Optativa'),
('39', 'Software Architecture in Practice', 9, 'Optativa'),
('40', 'Desarrollo web ágil de API y SPA', 9, 'Optativa'),
('41', 'Cálculo Diferencial', 8, 'Obligatoria'),
('42', 'Cálculo III/Cálculo Multivariado', 15, 'Obligatoria'),
('43', 'Cálculo Integral', 10, 'Obligatoria'),
('44', 'Cálculo Multivariable', 9, 'Obligatoria'),
('45', 'Cálculo Univariable', 11, 'Obligatoria'),
('46', 'Cálculo Vectorial', 8, 'Obligatoria'),
('47', 'Introducción al Cálculo', 4, 'Obligatoria'),
('48', 'Software para Matemáticas', 5, 'Obligatoria'),
('49', 'Análisis Funcional', 9, 'Optativa'),
('50', 'Combinatoria Enumerativa', 9, 'Optativa'),
('51', 'Introducción a la Teoría de Nudos', 9, 'Optativa'),
('52', 'Introducción a las álgebras de Lie', 9, 'Optativa'),
('53', 'Análisis Matemático', 9, 'Obligatoria'),
('54', 'Didáctica del Álgebra', 10, 'Obligatoria'),
('55', 'Didáctica del Cálculo', 10, 'Obligatoria'),
('56', 'Ecuaciones Diferenciales', 8, 'Obligatoria'),
('57', 'Informática Educativa', 8, 'Obligatoria'),
('58', 'Introducción a la Investigación en Matemática Educativa', 8, 'Obligatoria'),
('59', 'Laboratorio Didáctico', 8, 'Obligatoria'),
('60', 'Lectura y Redacción Técnica', 6, 'Obligatoria'),
('61', 'Modelación Matemática', 9, 'Obligatoria'),
('62', 'Teorías en Matemática Educativa', 8, 'Obligatoria'),
('63', 'Reconceptualización del Saber Matemático Escolar', 10, 'Optativa'),
('64', 'Análisis de Supervivencia', 5, 'Obligatoria'),
('65', 'Cálculo Actuarial para el Seguro de No Vida', 9, 'Obligatoria'),
('66', 'Cálculo Actuarial para el Seguro de Vida I', 8, 'Obligatoria'),
('67', 'Cálculo Actuarial para el Seguro de Vida II', 8, 'Obligatoria'),
('68', 'Contabilidad Financiera', 7, 'Obligatoria'),
('69', 'Demografía', 4, 'Obligatoria'),
('70', 'Estadística No Paramétrica', 6, 'Obligatoria'),
('71', 'Herramientas Computacionales', 6, 'Obligatoria'),
('72', 'Inferencia Estadística', 8, 'Obligatoria'),
('73', 'Introducción a la Admon. de Riesgos', 4, 'Obligatoria'),
('74', 'Introducción a la Seguridad Social', 4, 'Obligatoria'),
('75', 'Investigación de Operaciones', 6, 'Obligatoria'),
('76', 'Macroeconomía', 5, 'Obligatoria'),
('77', 'Matemáticas Financieras', 6, 'Obligatoria'),
('78', 'Microeconomia', 5, 'Obligatoria'),
('79', 'Operación del Seguro', 6, 'Obligatoria'),
('80', 'Probabilidad', 7, 'Obligatoria'),
('81', 'Probabilidad I', 8, 'Obligatoria'),
('82', 'Probabilidad II', 8, 'Obligatoria'),
('83', 'Procesos Estocásticos', 8, 'Obligatoria'),
('84', 'Productos Derivados', 5, 'Obligatoria'),
('85', 'Profesionalismo', 6, 'Obligatoria'),
('86', 'Series de Tiempo', 6, 'Obligatoria'),
('87', 'Sistemas Financieros', 4, 'Obligatoria'),
('88', 'Técnicas de Muestreo', 4, 'Obligatoria'),
('89', 'Teoría del Seguro', 4, 'Obligatoria'),
('90', 'Valuación de Activos Financieros', 5, 'Obligatoria'),
('91', 'Costos y Análisis Presupuestal', 7, 'Optativa'),
('92', 'Estadística Bayesiana y Teoría de Decisiones', 8, 'Optativa'),
('93', 'Finanzas Corporativas', 7, 'Optativa'),
('94', 'Inteligencia de Negocios para la toma de decisiones', 8, 'Optativa'),
('95', 'Métodos Estadísticos para Machine Learning', 9, 'Optativa'),
('96', 'Storytelling con Datos', 8, 'Optativa'),
('97', 'Geometría Analítica I', 8, 'Obligatoria'),
('98', 'Geometría Analítica II', 8, 'Obligatoria'),
('99', 'Geometría Diferencial', 8, 'Obligatoria'),
('100', 'Geometría Euclidiana', 8, 'Obligatoria'),
('101', 'Topología', 9, 'Obligatoria'),
('102', 'Cálculo en Variedades', 9, 'Optativa'),
('103', 'Sistemas Dinámicos Discretos', 9, 'Optativa'),
('104', 'Administración de Proyectos I', 7, 'Obligatoria'),
('105', 'Análisis y Diseño de Software', 7, 'Obligatoria'),
('106', 'Arquitecturas de Software', 7, 'Obligatoria'),
('107', 'Aseguramiento de la calidad del Software', 7, 'Obligatoria'),
('108', 'Construcción de Software', 7, 'Obligatoria'),
('109', 'Desarrollo de Aplicaciones Web', 7, 'Obligatoria'),
('110', 'Desarrollo de Software a Pequeña Escala', 8, 'Obligatoria'),
('111', 'Diseño de Bases de Datos', 7, 'Obligatoria'),
('112', 'Diseño de Software', 7, 'Obligatoria'),
('113', 'Experimentación en Ingeniería de Software', 7, 'Obligatoria'),
('114', 'Fundamentos de Ingeniería de Software', 6, 'Obligatoria'),
('115', 'Fundamentos de Programación', 8, 'Obligatoria'),
('116', 'Gestión de Tecnologías de la Información', 6, 'Obligatoria'),
('117', 'Innovación Tecnológica', 6, 'Obligatoria'),
('118', 'Interacción Humano Computadora', 7, 'Obligatoria'),
('119', 'Mantenimiento de Software', 7, 'Obligatoria'),
('120', 'Métricas de Software', 7, 'Obligatoria'),
('121', 'Programación', 8, 'Obligatoria'),
('122', 'Programación Específica', 7, 'Obligatoria'),
('123', 'Programación Estructurada', 7, 'Obligatoria'),
('124', 'Programación Orientada a Objetos', 8, 'Obligatoria'),
('125', 'Requisitos de Software', 7, 'Obligatoria'),
('126', 'Verificación y Validación de Software', 6, 'Obligatoria'),
('127', 'Optimización de Aplicaciones Web', 9, 'Optativa'),
('128', 'Reconocimiento de la Actividad Humana Basada en la Fusión de Datos con Python', 9, 'Optativa'),
('129', 'Sistemas de recomendación de información', 9, 'Optativa'),
('130', 'Cultura Maya', 6, 'Obligatoria'),
('131', 'Desarrollo de Emprendedores/Taller de Emprendedores', 6, 'Obligatoria'),
('132', 'Responsabilidad Social Universitaria', 6, 'Obligatoria'),
('133', 'Control Digital', 8, 'Obligatoria'),
('134', 'Desarrollo de Prototipos', 8, 'Obligatoria'),
('135', 'Estructuras de Datos', 8, 'Obligatoria'),
('136', 'Sistemas de Comunicación', 8, 'Obligatoria'),
('137', 'Sistemas Digitales I', 8, 'Obligatoria'),
('138', 'Introducción a la programación con Julia', 8, 'Optativa'),
('139', 'Algoritmia', 7, 'Obligatoria'),
('140', 'Análisis de Algoritmos', 6, 'Obligatoria'),
('141', 'Compiladores', 7, 'Obligatoria'),
('142', 'Cómputo Científico', 7, 'Obligatoria'),
('143', 'Inteligencia Artificial', 8, 'Obligatoria'),
('144', 'Matemáticas Discretas', 8, 'Obligatoria'),
('145', 'Redes de Computadoras', 7, 'Obligatoria'),
('146', 'Sistemas Distribuidos', 7, 'Obligatoria'),
('147', 'Sistemas Operativos', 7, 'Obligatoria'),
('148', 'Teoría de la Computación', 8, 'Obligatoria'),
('149', 'Teoría de Lenguajes de Programación', 6, 'Obligatoria'),
('150', 'Fundamentos de Ciberseguridad', 8, 'Optativa'),
('151', 'Introducción a la Ingeniería de Datos', 8, 'Optativa'),
('152', 'Introducción a la Programación Orientada a Objetos con Python', 5, 'Optativa'),
('153', 'Modelado y Animación 3D', 8, 'Optativa'),
('154', 'Programación de Robots Móviles', 8, 'Optativa'),
('155', 'CCNA Fundamentos de enrutadores y conmutadores', 9, 'Optativa'),
('156', 'Técnicas de muestro', 8, 'Obligatoria'),
('157', 'Regresión lineal', 8, 'Obligatoria'),
('158', 'Estadística no Paramétrica y Datos Categóricos', 8, 'Optativa'),
('159', 'Matemáticas', 8, 'Prope'),
('160', 'Probabilidad y Estadística', 8, 'Prope'),
('161', 'Cuantificación de la Incertidumbre', 8, 'Optativa'),
('162', 'Introducción al Cálculo Estocástico', 8, 'Optativa'),
('163', 'Geometría Hiperbólica Compleja', 8, 'Optativa'),
('164', 'Teoría Geométrica de Grupos', 8, 'Optativa'),
('165', 'Campos de Funciones Globales', 8, 'Optativa'),
('166', 'Teoría de Anillos', 8, 'Optativa'),
('167', 'Representaciones de Grupos', 8, 'Optativa'),
('168', 'Curvas Elípticas', 8, 'Optativa'),
('169', 'Criptografía Computacional', 8, 'Optativa'),
('170', 'Teoría de Galois', 8, 'Optativa'),
('171', 'Seminario de Tesis I (Evelyn Alicia Ara Heredia)', 8, 'Obligatoria'),
('172', 'Seminario de Tesis I (Victor Daniel King Sánchez)', 8, 'Obligatoria'),
('173', 'Seminario de Tesis I (Alfonso Abraham Ávila Palma)', 8, 'Obligatoria'),
('174', 'Seminario de Tesis I  (Haverth Jesús Zapata Ruiz)', 8, 'Obligatoria'),
('175', 'Seminario de Tesis III (Elías Canche Estrella)', 8, 'Obligatoria'),
('176', 'Seminario de Tesis III (Salvador Díaz Serrano)', 8, 'Obligatoria'),
('177', 'Seminario de Tesis III (Juan Escamilla Flores)', 8, 'Obligatoria'),
('178', 'Seminario de Tesis III (José Muñoz Cetina)', 8, 'Obligatoria'),
('179', 'Tópicos de informática educativa (Sebastian Meléndez Zorrilla)', 8, 'Optativa'),
('180', 'Ingeniería de software (Sebastian Meléndez Zorrilla)', 8, 'Optativa'),
('181', 'Desarrollo Web con Frameworks (Sebastian Meléndez Zorrilla)', 8, 'Optativa'),
('182', 'Experimentación Científica en Ingeniería de Software(Leonardo  Espinoza Arévalo)', 8, 'Optativa'),
('183', 'Procesamiento de Señales (Williams)', 8, 'Optativa'),
('184', 'Redes Neuronales Convolucionales', 8, 'Optativa'),
('185', 'Visión Computacional', 8, 'Optativa'),
('186', 'Seminario de Investigación II (Amado Ignacio García Albert)', 8, 'Obligatoria'),
('187', 'Seminario de Investigación II (Manuel Isaac González Chi)', 8, 'Obligatoria'),
('188', 'Seminario de Investigación II (Hector Arturo Hernández Escalante)', 8, 'Obligatoria'),
('189', 'Seminario de Investigación II (William Felipe Cetina Pech)', 8, 'Obligatoria'),
('190', 'Seminario de Investigación II (Sebastian Meléndez Zorrilla)', 8, 'Obligatoria'),
('191', 'Seminario de Investigación IV (Fátima Cocom)', 8, 'Obligatoria'),
('192', 'Seminario de Investigación IV (Leonardo Espinosa Arévalo)', 8, 'Obligatoria'),
('193', 'Seminario de Investigación IV (Moisés Medina Ramirez)', 8, 'Obligatoria'),
('194', 'Seminario de Investigación IV (Yuniel Adrián Villar del Mazo)', 8, 'Obligatoria'),
('195', 'Documentación de la Investigación (Xavier Sierra Canto)', 37, 'Obligatoria'),
('196', 'Documentación de la Investigación (Eduardo Camilo de los Reyes Hernández Mézquita)', 37, 'Obligatoria'),
('197', 'Seminario de Investigación VI (Carlos Felipe Ávila Cruz)', 40, 'Obligatoria'),
('198', 'Seminario de Investigación IV (Vicente Alfonso Lizama Pool)', 40, 'Obligatoria'),
('199', 'Seminario de Investigación III (Lucía Liliane Campa Cardeña)', 40, 'Obligatoria'),
('200', 'Seminario de Investigación II (Luis Gustavo Pérez Reyes)', 40, 'Obligatoria'),
('201', 'Seminario de Investigación I (Noé Guadalupe Chan Chí)', 40, 'Obligatoria'),
('202', 'Seminario de Investigación I ( Roberto Balcazar Araiza)', 40, 'Obligatoria'),
('203', 'Seminario de Investigación I ( Gustavo Humberto Vargas de los Santos)', 40, 'Obligatoria'),
('204', 'Inglés', 8, 'PII'),
('205', 'Manejo y Control de las Emociones', 6, 'Libre'),
('206', 'Aprendizaje automático', 8, 'Optativa');

-- [5] GRUPOS Y HORARIOS
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (1, 1, '1', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (1, 'Martes', 'D2', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (1, 'Miercoles', 'H6', '16:30:00', '18:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (1, 'Jueves', 'C6', '17:00:00', '18:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (2, 2, '2', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (2, 'Lunes', 'C4', '10:00:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (2, 'Martes', 'D3', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (2, 'Miercoles', 'C1', '08:00:00', '09:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (3, 3, '3', 'Regular/Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (3, 'Martes', 'H1', '13:30:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (3, 'Viernes', 'C10', '15:30:00', '17:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (4, 3, '3', 'Regular/Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (4, 'Miercoles', 'D4', '13:30:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (4, 'Viernes', 'C1', '13:30:00', '15:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (5, 4, '3', 'Regular/Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (5, 'Miercoles', 'C8', '13:30:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (5, 'Viernes', 'C6', '13:30:00', '15:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (6, 5, '4', 'Regular/Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (6, 'Lunes', 'H7', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (6, 'Miercoles', 'H6', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (6, 'Jueves', 'C2', '10:30:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (7, 5, '4', 'Regular/Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (7, 'Lunes', 'C3', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (7, 'Martes', 'D4', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (7, 'Viernes', 'C2', '09:00:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (8, 6, '4', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (8, 'Martes', 'D1', '14:00:00', '16:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (9, 7, '4', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (9, 'Jueves', 'D3', '15:00:00', '17:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (10, 7, '4', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (10, 'Martes', 'C4', '15:00:00', '17:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (11, 8, '5', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (11, 'Martes', 'C7', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (11, 'Jueves', 'C3', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (11, 'Viernes', 'C3', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (12, 5, '6', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (12, 'Lunes', 'H7', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (12, 'Martes', 'C10', '10:30:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (12, 'Jueves', 'H1', '09:00:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (13, 9, '6', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (13, 'Lunes', 'H1', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (13, 'Martes', 'D3', '10:30:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (13, 'Jueves', 'D2', '09:00:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (14, 7, '6', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (14, 'Lunes', 'D4', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (14, 'Martes', 'H6', '10:30:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (14, 'Jueves', 'D1', '09:00:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (15, 7, '6', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (15, 'Martes', 'H3', '07:30:00', '09:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (15, 'Viernes', 'H1', '07:30:00', '09:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (16, 9, '6', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (16, 'Jueves', 'H4', '13:30:00', '16:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (17, 10, '6', 'Recursamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (17, 'Lunes', 'C10', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (17, 'Miercoles', 'C4', '09:30:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (17, 'Viernes', 'C4', '09:00:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (18, 11, '7', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (18, 'Miercoles', 'D3', '13:30:00', '15:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (19, 6, '8', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (19, 'Miercoles', 'D1', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (19, 'Jueves', 'H2', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (20, 12, '8', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (20, 'Miercoles', 'H4', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (20, 'Jueves', 'H1', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (21, 5, '8', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (21, 'Miercoles', 'D4', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (21, 'Jueves', 'H4', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (22, 7, '8', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (22, 'Miercoles', 'C10', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (22, 'Jueves', 'D1', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (23, 10, '9', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (23, 'Lunes', 'H3', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (23, 'Martes', 'C8', '18:00:00', '19:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (23, 'Jueves', 'D3', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (24, 6, '10', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (24, 'Lunes', 'C2', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (24, 'Martes', 'H2', '10:30:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (24, 'Jueves', 'C8', '10:30:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (25, 13, '11', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (25, 'Lunes', 'D1', '09:30:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (25, 'Jueves', 'C6', '09:30:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (25, 'Viernes', 'C6', '09:30:00', '11:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (26, 14, '12', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (26, 'Lunes', 'H4', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (26, 'Jueves', 'C1', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (26, 'Viernes', 'C8', '12:00:00', '14:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (27, 15, '13', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (27, 'Lunes', 'D4', '09:30:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (27, 'Miercoles', 'C3', '09:00:00', '11:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (28, 14, '14', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (28, 'Miercoles', 'Cubículo', '11:00:00', '12:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (29, 14, '15', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (29, 'Jueves', 'Cubículo', '10:30:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (30, 15, '16', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (30, 'Lunes', 'H2', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (30, 'Miercoles', 'H1', '15:30:00', '17:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (30, 'Viernes', 'H2', '14:00:00', '15:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (31, 16, '17', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (31, 'Martes', 'C10', '15:30:00', '17:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (31, 'Jueves', 'C7', '15:00:00', '17:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (32, 17, '18', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (32, 'Martes', 'H4', '14:00:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (32, 'Miercoles', 'C2', '13:30:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (32, 'Jueves', 'H3', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (33, 2, '19', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (33, 'Lunes', 'C10', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (33, 'Miercoles', 'D2', '15:30:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (33, 'Viernes', 'C2', '14:00:00', '15:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (34, 18, '20', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (34, 'Lunes', 'CC2', '07:30:00', '10:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (35, 18, '21', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (35, 'Martes', 'CC4', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (35, 'Miercoles', 'CC4', '09:30:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (35, 'Jueves', 'CC4', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (36, 18, '21', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (36, 'Martes', 'CC1', '15:30:00', '18:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (37, 19, '22', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (37, 'Jueves', 'Laboratorio de electrónica', '08:00:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (38, 18, '23', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (38, 'Lunes', 'Laboratorio de electrónica', '12:30:00', '14:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (38, 'Jueves', 'Laboratorio de electrónica', '14:00:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (38, 'Viernes', 'Laboratorio de electrónica', '14:30:00', '16:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (39, 20, '24', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (39, 'Lunes', 'D3', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (39, 'Miercoles', 'D2', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (39, 'Viernes', 'D3', '08:00:00', '09:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (40, 20, '25', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (40, 'Jueves', 'D2', '14:00:00', '16:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (41, 21, '26', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (41, 'Martes', 'CC7', '15:00:00', '17:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (42, 19, '14', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (42, 'Miercoles', 'Cubículo', '11:00:00', '12:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (43, 21, '27', 'Regular/Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (43, 'Lunes', 'C6', '17:30:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (43, 'Martes', 'CC3', '12:30:00', '14:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (43, 'Jueves', 'CC3', '16:30:00', '18:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (44, 19, '15', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (44, 'Jueves', 'Cubículo', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (45, 19, '28', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (45, 'Lunes', 'Laboratorio de electrónica', '16:00:00', '17:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (45, 'Miercoles', 'H2', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (45, 'Jueves', 'H1', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (46, 18, '29', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (46, 'Lunes', 'Laboratorio de robótica', '10:00:00', '12:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (47, 22, '30', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (47, 'Martes', 'Laboratorio de robótica', '10:00:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (47, 'Jueves', 'Laboratorio de robótica', '10:30:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (47, 'Viernes', 'Laboratorio de robótica', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (48, 21, '31', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (48, 'Lunes', 'Laboratorio de electrónica', '14:00:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (48, 'Martes', 'Laboratorio de electrónica', '17:30:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (48, 'Jueves', 'Laboratorio de electrónica', '18:30:00', '20:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (49, 3, '32', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (49, 'Miercoles', 'Laboratorio de electrónica', '19:30:00', '21:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (49, 'Viernes', 'Laboratorio de electrónica', '19:30:00', '21:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (50, 23, '33', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (50, 'Lunes', 'Laboratorio de robótica', '14:00:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (50, 'Martes', 'Laboratorio de robótica', '17:30:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (50, 'Jueves', 'Laboratorio de robótica', '18:30:00', '20:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (51, 24, '34', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (51, 'Lunes', 'V. Síncrona', '19:00:00', '21:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (51, 'Miercoles', 'V. Síncrona', '19:00:00', '21:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (52, 25, '35', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (52, 'Lunes', 'V. Síncrona', '19:00:00', '21:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (52, 'Jueves', 'V. Síncrona', '19:00:00', '21:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (53, 26, '36', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (53, 'Lunes', 'V. Síncrona', '19:00:00', '21:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (53, 'Miercoles', 'V. Síncrona', '19:00:00', '21:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (54, 27, '37', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (54, 'Martes', 'CC1', '19:00:00', '21:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (54, 'Viernes', 'CC1', '19:00:00', '21:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (55, 28, '38', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (55, 'Martes', 'CC7', '18:00:00', '20:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (55, 'Miercoles', 'CC7', '14:30:00', '16:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (56, 29, '39', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (56, 'Miercoles', 'V. Síncrona', '13:00:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (56, 'Viernes', 'V. Síncrona', '13:00:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (57, 30, '40', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (57, 'Lunes', 'CC4', '19:00:00', '21:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (57, 'Martes', 'CC4', '19:00:00', '21:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (58, 13, '41', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (58, 'Martes', 'C8', '10:00:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (58, 'Miercoles', 'C9', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (58, 'Viernes', 'C6', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (59, 31, '41', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (59, 'Martes', 'H3', '10:00:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (59, 'Miercoles', 'C6', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (59, 'Viernes', 'C2', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (60, 31, '41', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (60, 'Martes', 'H1', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (60, 'Jueves', 'D2', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (60, 'Viernes', 'H7', '09:30:00', '11:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (61, 32, '41', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (61, 'Martes', 'H2', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (61, 'Jueves', 'H6', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (61, 'Viernes', 'H2', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (62, 33, '41', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (62, 'Martes', 'D3', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (62, 'Jueves', 'D4', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (62, 'Viernes', 'H3', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (63, 34, '41', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (63, 'Martes', 'H4', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (63, 'Jueves', 'D3', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (63, 'Viernes', 'H4', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (64, 31, '41', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (64, 'Jueves', 'C6', '12:00:00', '14:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (65, 35, '41', 'Recursamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (65, 'Lunes', 'C10', '10:30:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (65, 'Jueves', 'H8', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (65, 'Viernes', 'C10', '11:00:00', '12:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (66, 33, '42', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (66, 'Lunes', 'C6', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (66, 'Martes', 'H2', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (66, 'Miercoles', 'C2', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (66, 'Jueves', 'D4', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (66, 'Viernes', 'C9', '09:00:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (67, 4, '43', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (67, 'Martes', 'C4', '10:00:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (67, 'Jueves', 'H6', '10:00:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (67, 'Viernes', 'H1', '10:00:00', '11:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (68, 13, '43', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (68, 'Miercoles', 'C3', '14:30:00', '17:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (69, 33, '44', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (69, 'Viernes', 'H3', '14:00:00', '16:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (70, 32, '45', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (70, 'Lunes', 'H8', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (70, 'Miercoles', 'C10', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (70, 'Jueves', 'H3', '09:30:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (70, 'Viernes', 'D2', '09:30:00', '11:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (71, 36, '45', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (71, 'Lunes', 'D3', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (71, 'Miercoles', 'H8', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (71, 'Jueves', 'H2', '09:30:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (71, 'Viernes', 'H4', '09:30:00', '11:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (72, 35, '45', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (72, 'Lunes', 'H3', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (72, 'Miercoles', 'H3', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (72, 'Jueves', 'H4', '09:30:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (72, 'Viernes', 'H2', '09:30:00', '11:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (73, 4, '46', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (73, 'Lunes', 'C2', '11:00:00', '12:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (73, 'Martes', 'C7', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (73, 'Jueves', 'H4', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (74, 34, '46', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (74, 'Lunes', 'C8', '11:00:00', '12:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (74, 'Martes', 'H8', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (74, 'Jueves', 'H6', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (75, 37, '46', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (75, 'Lunes', 'D3', '11:00:00', '12:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (75, 'Martes', 'C8', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (75, 'Jueves', 'D4', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (76, 38, '47', 'Regular/Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (76, 'Jueves', 'D2', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (76, 'Viernes', 'D4', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (77, 20, '26', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (77, 'Lunes', 'CC4', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (77, 'Viernes', 'CC3', '13:00:00', '14:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (78, 39, '26', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (78, 'Lunes', 'CC8', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (78, 'Viernes', 'CC1', '13:00:00', '14:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (79, 35, '14', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (79, 'Miercoles', 'Cubículo', '11:00:00', '12:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (80, 35, '15', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (80, 'Jueves', 'Cubículo', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (81, 39, '48', 'Recursamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (81, 'Martes', 'CC1', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (81, 'Jueves', 'CC1', '09:00:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (82, 40, '49', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (82, 'Lunes', 'C3', '18:00:00', '19:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (82, 'Miercoles', 'C6', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (82, 'Viernes', 'C2', '17:30:00', '19:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (83, 2, '50', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (83, 'Lunes', 'H2', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (83, 'Martes', 'C3', '10:30:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (83, 'Jueves', 'D2', '10:30:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (84, 12, '51', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (84, 'Lunes', 'C9', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (84, 'Martes', 'C2', '10:30:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (84, 'Jueves', 'C1', '10:30:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (85, 41, '52', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (85, 'Lunes', 'D2', '18:00:00', '19:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (85, 'Miercoles', 'H1', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (85, 'Viernes', 'C1', '17:30:00', '19:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (86, 36, '53', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (86, 'Lunes', 'H7', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (86, 'Jueves', 'D4', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (86, 'Viernes', 'C10', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (87, 42, '54', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (87, 'Lunes', 'C1', '12:00:00', '14:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (88, 42, '55', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (88, 'Lunes', 'C4', '07:30:00', '09:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (88, 'Martes', 'C1', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (88, 'Miercoles', 'C4', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (89, 37, '56', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (89, 'Viernes', 'D1', '09:00:00', '11:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (90, 11, '56', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (90, 'Lunes', 'H6', '07:30:00', '09:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (90, 'Martes', 'H6', '08:00:00', '10:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (91, 37, '56', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (91, 'Lunes', 'D2', '07:30:00', '09:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (91, 'Martes', 'H7', '08:00:00', '10:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (92, 43, '57', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (92, 'Lunes', 'CC6', '13:00:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (93, 42, '58', 'Regular/Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (93, 'Martes', 'C3', '17:30:00', '19:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (93, 'Viernes', 'F1', '17:30:00', '19:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (94, 42, '59', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (94, 'Lunes', 'C7', '15:00:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (94, 'Martes', 'H7', '12:00:00', '14:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (94, 'Jueves', 'C8', '17:00:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (94, 'Viernes', 'C6', '15:30:00', '17:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (95, 43, '59', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (95, 'Lunes', 'H7', '15:00:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (95, 'Martes', 'C2', '12:00:00', '14:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (95, 'Jueves', 'C2', '17:00:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (95, 'Viernes', 'H4', '15:30:00', '17:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (96, 43, '60', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (96, 'Martes', 'C7', '10:00:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (97, 44, '61', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (97, 'Martes', 'C6', '16:30:00', '18:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (97, 'Miercoles', 'C6', '16:30:00', '18:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (97, 'Jueves', 'C9', '16:30:00', '18:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (98, 43, '62', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (98, 'Martes', 'C7', '17:30:00', '19:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (98, 'Miercoles', 'C2', '17:30:00', '19:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (99, 45, '63', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (99, 'Martes', 'C2', '14:00:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (99, 'Miercoles', 'C7', '13:30:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (99, 'Jueves', 'H8', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (100, 46, '64', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (100, 'Viernes', 'CC2', '11:30:00', '13:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (101, 47, '65', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (101, 'Jueves', 'H8', '09:00:00', '11:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (102, 48, '66', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (102, 'Lunes', 'F1', '11:00:00', '13:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (103, 47, '67', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (103, 'Miercoles', 'CC3', '15:00:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (103, 'Jueves', 'CC4', '16:00:00', '18:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (104, 48, '67', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (104, 'Miercoles', 'CC1', '15:00:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (104, 'Jueves', 'CC1', '16:00:00', '18:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (105, 49, '68', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (105, 'Lunes', 'D3', '15:00:00', '17:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (106, 50, '69', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (106, 'Martes', 'H6', '15:00:00', '17:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (107, 51, '70', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (107, 'Martes', 'C3', '08:00:00', '09:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (108, 52, '71', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (108, 'Martes', 'CC3', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (108, 'Miercoles', 'CC8', '17:00:00', '18:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (109, 48, '71', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (109, 'Martes', 'CC8', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (109, 'Miercoles', 'CC1', '17:00:00', '18:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (110, 48, '72', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (110, 'Martes', 'H8', '10:00:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (110, 'Miercoles', 'H3', '10:00:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (110, 'Jueves', 'C4', '10:00:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (111, 53, '72', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (111, 'Martes', 'C1', '10:00:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (111, 'Miercoles', 'C7', '10:00:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (111, 'Jueves', 'D3', '10:00:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (112, 54, '72', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (112, 'Lunes', 'H7', '17:30:00', '19:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (112, 'Viernes', 'H1', '17:30:00', '19:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (113, 51, '72', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (113, 'Martes', 'C7', '15:00:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (113, 'Jueves', 'H2', '15:00:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (113, 'Viernes', 'C7', '18:00:00', '19:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (114, 51, '72', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (114, 'Lunes', 'H6', '10:30:00', '13:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (115, 47, '73', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (115, 'Martes', 'D2', '08:30:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (116, 47, '73', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (116, 'Lunes', 'H3', '10:30:00', '12:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (117, 55, '73', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (117, 'Martes', 'C10', '08:30:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (118, 50, '74', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (118, 'Viernes', 'D4', '14:30:00', '15:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (119, 3, '75', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (119, 'Martes', 'C6', '10:00:00', '11:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (120, 56, '76', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (120, 'Martes', 'C1', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (120, 'Jueves', 'H3', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (121, 56, '76', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (121, 'Jueves', 'C10', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (121, 'Viernes', 'C8', '10:30:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (122, 56, '76', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (122, 'Lunes', 'H7', '10:30:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (122, 'Viernes', 'H8', '09:00:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (123, 55, '77', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (123, 'Miercoles', 'H7', '13:30:00', '15:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (124, 56, '78', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (124, 'Lunes', 'C8', '13:00:00', '14:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (125, 47, '79', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (125, 'Lunes', 'D4', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (125, 'Martes', 'H7', '15:00:00', '16:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (126, 47, '14', 'Regular/Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (126, 'Miercoles', 'Cubículo', '11:00:00', '12:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (127, 57, '80', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (127, 'Lunes', 'C10', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (127, 'Martes', 'H8', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (127, 'Viernes', 'H6', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (128, 53, '80', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (128, 'Lunes', 'C6', '13:00:00', '14:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (128, 'Miercoles', 'D4', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (128, 'Jueves', 'C8', '08:30:00', '10:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (129, 53, '80', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (129, 'Lunes', 'C6', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (129, 'Martes', 'C8', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (129, 'Viernes', 'C7', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (130, 57, '80', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (130, 'Miercoles', 'H2', '09:00:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (130, 'Jueves', 'C10', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (130, 'Viernes', 'H6', '09:30:00', '11:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (131, 58, '80', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (131, 'Lunes', 'C7', '11:00:00', '13:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (131, 'Miercoles', 'C7', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (131, 'Viernes', 'D3', '10:30:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (132, 54, '80', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (132, 'Viernes', 'C3', '09:30:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (133, 54, '80', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (133, 'Martes', 'D1', '09:00:00', '11:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (134, 50, '81', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (134, 'Jueves', 'C10', '14:30:00', '17:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (135, 52, '82', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (135, 'Lunes', 'D1', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (135, 'Miercoles', 'H1', '07:30:00', '09:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (135, 'Viernes', 'D1', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (136, 50, '82', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (136, 'Lunes', 'H1', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (136, 'Miercoles', 'H7', '07:30:00', '09:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (136, 'Viernes', 'H8', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (137, 59, '83', 'Regular/Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (137, 'Lunes', 'C4', '15:00:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (137, 'Martes', 'C4', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (137, 'Jueves', 'C9', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (138, 52, '84', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (138, 'Lunes', 'C1', '10:00:00', '11:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (139, 48, '85', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (139, 'Viernes', 'C4', '16:30:00', '17:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (140, 46, '86', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (140, 'Jueves', 'CC8', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (140, 'Viernes', 'CC4', '15:00:00', '16:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (141, 47, '15', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (141, 'Jueves', 'Cubículo', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (142, 49, '87', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (143, 49, '87', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (144, 49, '87', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (145, 54, '88', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (145, 'Martes', 'H1', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (145, 'Miercoles', 'D1', '17:00:00', '18:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (146, 55, '89', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (146, 'Jueves', 'D1', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (146, 'Viernes', 'C7', '10:00:00', '11:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (147, 55, '89', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (147, 'Martes', 'C3', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (147, 'Viernes', 'C4', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (148, 55, '90', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (148, 'Lunes', 'C9', '09:30:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (149, 55, '90', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (149, 'Jueves', 'H7', '07:30:00', '10:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (150, 60, '91', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (150, 'Martes', 'CC5', '13:00:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (150, 'Jueves', 'CC7', '13:00:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (151, 61, '92', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (151, 'Lunes', 'C6', '15:00:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (151, 'Viernes', 'D3', '15:30:00', '17:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (152, 60, '93', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (152, 'Lunes', 'CC1', '13:00:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (152, 'Miercoles', 'CC3', '13:00:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (153, 50, '94', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (153, 'Lunes', 'CC8', '15:00:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (153, 'Miercoles', 'CC8', '15:00:00', '17:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (154, 46, '95', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (154, 'Martes', 'CC5', '15:00:00', '16:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (154, 'Miercoles', 'CC7', '18:00:00', '19:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (154, 'Jueves', 'CC7', '15:00:00', '16:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (155, 52, '96', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (155, 'Jueves', 'CC6', '15:00:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (155, 'Viernes', 'CC2', '13:00:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (156, 39, '97', 'Regular/Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (156, 'Lunes', 'H1', '13:30:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (156, 'Jueves', 'C8', '13:30:00', '15:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (157, 62, '97', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (157, 'Lunes', 'H8', '13:30:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (157, 'Jueves', 'C4', '13:30:00', '15:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (158, 63, '98', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (158, 'Lunes', 'D1', '07:30:00', '09:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (158, 'Jueves', 'C4', '07:30:00', '09:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (159, 63, '99', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (159, 'Martes', 'H2', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (159, 'Jueves', 'H2', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (159, 'Viernes', 'D2', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (160, 13, '100', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (160, 'Martes', 'H3', '12:00:00', '14:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (161, 64, '101', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (161, 'Martes', 'C10', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (161, 'Jueves', 'D2', '18:00:00', '19:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (161, 'Viernes', 'H4', '14:00:00', '15:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (162, 65, '102', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (162, 'Lunes', 'C9', '15:30:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (162, 'Miercoles', 'C10', '15:00:00', '16:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (162, 'Viernes', 'H2', '16:00:00', '17:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (163, 64, '103', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (163, 'Lunes', 'C1', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (163, 'Martes', 'H7', '10:30:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (163, 'Jueves', 'C10', '10:30:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (164, 66, '104', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (164, 'Martes', 'H8', '14:00:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (164, 'Miercoles', 'H8', '15:30:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (164, 'Jueves', 'D3', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (165, 67, '104', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (165, 'Lunes', 'C8', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (165, 'Martes', 'H2', '19:00:00', '20:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (165, 'Viernes', 'D3', '19:00:00', '20:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (166, 68, '105', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (166, 'Lunes', 'H7', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (166, 'Martes', 'CC4', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (166, 'Viernes', 'CC8', '16:30:00', '18:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (167, 69, '106', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (167, 'Viernes', 'CC6', '11:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (168, 70, '107', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (168, 'Lunes', 'D2', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (168, 'Martes', 'C9', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (168, 'Jueves', 'C4', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (169, 71, '107', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (169, 'Lunes', 'H2', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (169, 'Martes', 'C7', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (169, 'Jueves', 'H7', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (170, 71, '108', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (170, 'Viernes', 'D4', '07:30:00', '10:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (171, 68, '109', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (171, 'Jueves', 'CC2', '07:30:00', '10:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (172, 72, '110', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (172, 'Lunes', 'C7', '09:30:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (172, 'Martes', 'CC3', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (172, 'Jueves', 'C10', '09:00:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (173, 66, '111', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (173, 'Martes', 'CC6', '09:00:00', '11:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (174, 73, '112', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (174, 'Lunes', 'CC4', '11:30:00', '13:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (174, 'Miercoles', 'CC8', '09:30:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (174, 'Jueves', 'CC8', '13:00:00', '14:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (175, 28, '112', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (175, 'Lunes', 'CC1', '11:30:00', '13:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (175, 'Miercoles', 'CC1', '09:30:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (175, 'Jueves', 'CC4', '13:00:00', '14:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (176, 74, '112', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (176, 'Lunes', 'CC3', '11:30:00', '13:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (176, 'Miercoles', 'CC3', '09:30:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (176, 'Jueves', 'CC3', '13:00:00', '14:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (177, 75, '113', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (177, 'Martes', 'CC2', '08:00:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (178, 76, '114', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (178, 'Viernes', 'C3', '16:30:00', '18:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (179, 77, '115', 'Regular/Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (179, 'Martes', 'CC8', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (179, 'Miercoles', 'CC8', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (179, 'Viernes', 'CC8', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (180, 78, '116', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (180, 'Lunes', 'CC5', '17:00:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (180, 'Martes', 'CC1', '12:30:00', '14:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (181, 78, '117', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (181, 'Jueves', 'Cubículo', '11:00:00', '13:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (182, 73, '118', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (182, 'Lunes', 'H6', '17:30:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (182, 'Martes', 'C4', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (182, 'Jueves', 'H1', '15:30:00', '17:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (183, 69, '118', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (183, 'Lunes', 'C4', '17:30:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (183, 'Martes', 'C10', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (183, 'Jueves', 'H6', '15:30:00', '17:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (184, 70, '119', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (184, 'Martes', 'D3', '17:30:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (184, 'Jueves', 'C3', '16:00:00', '17:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (184, 'Viernes', 'CC1', '17:00:00', '18:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (185, 71, '119', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (185, 'Martes', 'H7', '17:30:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (185, 'Jueves', 'H4', '16:00:00', '17:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (185, 'Viernes', 'CC3', '17:00:00', '18:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (186, 68, '120', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (186, 'Martes', 'CC4', '15:00:00', '16:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (186, 'Jueves', 'C7', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (186, 'Viernes', 'C7', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (187, 71, '120', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (187, 'Martes', 'CC8', '15:00:00', '16:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (187, 'Jueves', 'F3', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (187, 'Viernes', 'D2', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (188, 79, '14', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (188, 'Miercoles', 'Cubículo', '11:00:00', '12:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (189, 23, '121', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (189, 'Lunes', 'CC3', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (189, 'Jueves', 'CC3', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (189, 'Viernes', 'CC3', '11:30:00', '13:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (190, 80, '121', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (190, 'Lunes', 'CC1', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (190, 'Jueves', 'CC1', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (190, 'Viernes', 'CC1', '11:30:00', '13:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (191, 81, '121', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (191, 'Martes', 'CC2', '17:00:00', '18:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (192, 82, '121', 'Recursamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (192, 'Martes', 'CC1', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (192, 'Miercoles', 'CC1', '07:30:00', '09:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (192, 'Viernes', 'CC1', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (193, 83, '122', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (193, 'Jueves', 'CC8', '07:30:00', '09:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (193, 'Viernes', 'CC8', '07:30:00', '09:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (194, 78, '123', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (194, 'Lunes', 'CC4', '07:30:00', '09:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (194, 'Viernes', 'CC4', '07:30:00', '09:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (195, 68, '123', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (195, 'Lunes', 'CC8', '09:30:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (195, 'Viernes', 'CC1', '09:30:00', '11:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (196, 66, '123', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (196, 'Lunes', 'CC1', '09:30:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (196, 'Viernes', 'CC4', '09:30:00', '11:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (197, 78, '123', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (197, 'Lunes', 'CC3', '09:30:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (197, 'Viernes', 'CC3', '09:30:00', '11:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (198, 74, '123', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (198, 'Lunes', 'CC4', '09:30:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (198, 'Viernes', 'CC8', '09:30:00', '11:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (199, 77, '124', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (199, 'Miercoles', 'CC4', '08:00:00', '09:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (199, 'Jueves', 'CC3', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (199, 'Viernes', 'CC3', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (200, 74, '124', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (200, 'Lunes', 'CC2', '15:30:00', '18:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (201, 75, '125', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (201, 'Miercoles', 'D2', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (201, 'Jueves', 'H1', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (201, 'Viernes', 'C10', '17:30:00', '19:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (202, 67, '125', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (202, 'Miercoles', 'H4', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (202, 'Jueves', 'D4', '17:30:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (202, 'Viernes', 'H8', '17:00:00', '18:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (203, 79, '15', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (203, 'Jueves', 'Cubículo', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (204, 84, '126', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (204, 'Miercoles', 'CC6', '15:00:00', '17:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (205, 69, '127', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (205, 'Lunes', 'CC4', '13:30:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (205, 'Miercoles', 'CC4', '13:00:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (206, 70, '128', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (206, 'Lunes', 'CC7', '13:30:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (206, 'Miercoles', 'CC2', '18:30:00', '20:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (207, 69, '129', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (207, 'Martes', 'CC4', '17:00:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (207, 'Miercoles', 'CC4', '15:00:00', '17:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (208, 85, '130', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (209, 85, '130', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (210, 85, '130', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (211, 85, '130', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (212, 85, '130', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (213, 85, '130', 'Recursamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (214, 84, '131', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (214, 'Lunes', 'H3', '15:30:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (214, 'Viernes', 'H7', '15:00:00', '16:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (215, 84, '131', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (215, 'Lunes', 'D1', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (215, 'Jueves', 'C10', '17:00:00', '18:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (216, 85, '132', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (217, 86, '133', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (217, 'Lunes', 'CC5', '12:30:00', '14:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (217, 'Jueves', 'CC5', '15:00:00', '16:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (217, 'Viernes', 'Laboratorio de electrónica', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (218, 87, '134', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (218, 'Miercoles', 'Laboratorio de robótica', '15:30:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (218, 'Jueves', 'Laboratorio de robótica', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (219, 86, '135', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (219, 'Lunes', 'C2', '14:00:00', '16:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (220, 88, '136', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (220, 'Viernes', 'Laboratorio de electrónica', '17:00:00', '18:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (221, 23, '137', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (221, 'Lunes', 'Laboratorio de electrónica', '09:30:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (222, 89, '138', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (222, 'Martes', 'CC4', '09:00:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (222, 'Viernes', 'CC4', '12:00:00', '14:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (223, 90, '139', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (223, 'Miercoles', 'CC2', '14:30:00', '17:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (224, 91, '140', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (224, 'Lunes', 'C8', '09:00:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (224, 'Viernes', 'C1', '10:00:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (225, 91, '141', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (225, 'Martes', 'CC4', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (225, 'Miercoles', 'CC3', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (225, 'Jueves', 'CC1', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (226, 89, '142', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (226, 'Lunes', 'CC2', '12:00:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (226, 'Jueves', 'CC2', '12:30:00', '14:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (226, 'Viernes', 'CC4', '17:00:00', '18:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (227, 92, '135', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (227, 'Lunes', 'CC3', '13:00:00', '14:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (227, 'Martes', 'CC3', '09:30:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (227, 'Miercoles', 'CC3', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (228, 93, '135', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (228, 'Lunes', 'CC8', '08:00:00', '09:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (228, 'Martes', 'CC8', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (228, 'Jueves', 'CC8', '10:00:00', '11:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (229, 93, '135', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (229, 'Lunes', 'CC8', '13:00:00', '14:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (229, 'Martes', 'CC8', '09:30:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (229, 'Miercoles', 'CC8', '07:30:00', '09:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (230, 87, '143', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (230, 'Martes', 'CC8', '11:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (231, 94, '144', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (231, 'Lunes', 'H2', '10:30:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (231, 'Martes', 'D2', '11:30:00', '13:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (231, 'Jueves', 'C8', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (232, 93, '144', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (232, 'Lunes', 'C3', '10:30:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (232, 'Martes', 'D4', '11:30:00', '13:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (232, 'Jueves', 'C2', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (233, 95, '144', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (233, 'Martes', 'C9', '10:30:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (233, 'Miercoles', 'D3', '09:30:00', '11:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (233, 'Jueves', 'C2', '09:00:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (234, 96, '144', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (234, 'Martes', 'H4', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (234, 'Miercoles', 'H2', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (234, 'Jueves', 'D1', '10:30:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (235, 97, '144', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (235, 'Martes', 'D4', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (235, 'Miercoles', 'D1', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (235, 'Jueves', 'H7', '10:30:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (236, 98, '144', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (236, 'Martes', 'C2', '09:00:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (236, 'Miercoles', 'C2', '07:30:00', '09:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (236, 'Jueves', 'D4', '10:30:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (237, 95, '14', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (237, 'Miercoles', 'Cubículo', '11:00:00', '12:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (238, 99, '145', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (238, 'Martes', 'Laboratorio de redes', '14:30:00', '16:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (238, 'Jueves', 'Laboratorio de redes', '16:00:00', '17:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (238, 'Viernes', 'Laboratorio de redes', '13:00:00', '14:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (239, 92, '145', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (239, 'Jueves', 'Laboratorio de redes', '10:30:00', '13:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (240, 95, '15', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (240, 'Jueves', 'Cubículo', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (241, 99, '146', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (241, 'Lunes', 'CC3', '15:30:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (241, 'Jueves', 'CC8', '14:30:00', '16:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (241, 'Viernes', 'CC8', '15:00:00', '16:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (242, 97, '146', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (242, 'Lunes', 'CC4', '15:30:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (242, 'Jueves', 'CC4', '14:30:00', '16:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (242, 'Viernes', 'CC3', '15:00:00', '16:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (243, 90, '146', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (243, 'Lunes', 'CC1', '15:30:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (243, 'Jueves', 'CC3', '14:30:00', '16:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (243, 'Viernes', 'CC1', '15:00:00', '16:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (244, 94, '147', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (244, 'Martes', 'D2', '13:00:00', '14:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (244, 'Miercoles', 'H4', '13:00:00', '14:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (244, 'Viernes', 'H3', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (245, 92, '147', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (245, 'Martes', 'H4', '11:00:00', '12:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (245, 'Miercoles', 'D2', '13:00:00', '14:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (245, 'Viernes', 'H1', '11:30:00', '13:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (246, 90, '147', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (246, 'Jueves', 'CC1', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (247, 94, '147', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (247, 'Miercoles', 'CC5', '17:30:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (247, 'Jueves', 'CC6', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (247, 'Viernes', 'CC5', '13:30:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (248, 91, '148', 'Acompañamiento', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (248, 'Viernes', 'C3', '13:30:00', '16:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (249, 97, '149', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (249, 'Lunes', 'H1', '09:30:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (249, 'Viernes', 'C10', '09:00:00', '11:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (250, 77, '149', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (250, 'Lunes', 'H4', '09:30:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (250, 'Viernes', 'H3', '09:00:00', '11:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (251, 99, '150', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (251, 'Martes', 'Laboratorio de redes', '17:00:00', '18:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (251, 'Miercoles', 'Laboratorio de redes', '15:00:00', '16:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (251, 'Viernes', 'Laboratorio de redes', '19:00:00', '20:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (252, 100, '151', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (252, 'Miercoles', 'CC4', '17:00:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (252, 'Jueves', 'CC4', '18:00:00', '20:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (253, 101, '152', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (254, 102, '153', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (254, 'Martes', 'CC7', '10:00:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (254, 'Jueves', 'CC7', '10:30:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (254, 'Viernes', 'CC7', '12:00:00', '13:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (255, 95, '154', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (255, 'Lunes', 'CC2', '14:00:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (255, 'Martes', 'CC2', '18:30:00', '20:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (255, 'Miercoles', 'CC2', '13:00:00', '14:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (256, 103, '155', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (256, 'Lunes', 'Laboratorio de redes', '19:00:00', '20:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (256, 'Miercoles', 'Laboratorio de redes', '19:00:00', '20:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (256, 'Jueves', 'Laboratorio de redes', '19:00:00', '20:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (257, 104, '156', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (257, 'Martes', 'C5', '17:00:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (257, 'Jueves', 'C5', '17:00:00', '19:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (258, 105, '157', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (258, 'Lunes', 'C5', '17:00:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (258, 'Martes', 'C5', '19:00:00', '21:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (259, 51, '158', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (259, 'Lunes', 'C5', '19:00:00', '21:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (259, 'Jueves', 'C5', '19:00:00', '21:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (260, 106, '159', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (260, 'Martes', 'V. Síncrona', '19:00:00', '21:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (260, 'Miercoles', 'V. Síncrona', '19:00:00', '21:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (260, 'Viernes', 'V. Síncrona', '19:00:00', '21:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (261, 57, '160', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (261, 'Martes', 'V. Síncrona', '17:30:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (261, 'Miercoles', 'V. Síncrona', '17:30:00', '19:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (261, 'Viernes', 'V. Síncrona', '17:30:00', '19:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (262, 44, '161', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (262, 'Lunes', 'C5', '09:30:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (262, 'Jueves', 'C7', '09:00:00', '11:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (263, 107, '162', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (263, 'Miercoles', 'C5', '08:30:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (263, 'Viernes', 'C5', '10:00:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (264, 63, '163', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (264, 'Martes', 'C5', '07:30:00', '09:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (264, 'Viernes', 'C5', '08:00:00', '10:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (265, 108, '164', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (266, 109, '165', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (266, 'Martes', 'F3', '11:30:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (266, 'Jueves', 'C7', '11:00:00', '13:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (267, 110, '166', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (267, 'Lunes', 'C5', '11:30:00', '13:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (267, 'Martes', 'C5', '09:30:00', '11:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (268, 110, '167', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (268, 'Jueves', 'C5', '10:00:00', '12:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (268, 'Viernes', 'C5', '13:00:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (269, 111, '168', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (269, 'Martes', 'C5', '12:00:00', '14:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (269, 'Jueves', 'C5', '12:00:00', '14:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (270, 112, '169', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (270, 'Lunes', 'C5', '07:30:00', '09:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (270, 'Jueves', 'C5', '07:30:00', '09:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (271, 113, '170', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (271, 'Lunes', 'C5', '15:00:00', '17:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (271, 'Viernes', 'C5', '15:00:00', '17:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (272, 114, '171', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (273, 1, '172', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (274, 113, '173', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (275, 115, '174', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (276, 116, '175', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (277, 117, '176', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (277, 'Martes', 'F3', '09:30:00', '11:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (277, 'Miercoles', 'C5', '13:00:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (278, 118, '177', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (279, 44, '178', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (280, 119, '179', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (281, 120, '180', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (282, 74, '181', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (282, 'Martes', 'CC2', '13:30:00', '15:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (282, 'Viernes', 'CC2', '15:00:00', '17:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (283, 75, '182', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (284, 121, '183', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (285, 87, '184', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (285, 'Jueves', 'CC6', '08:30:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (285, 'Viernes', 'CC6', '08:30:00', '10:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (286, 86, '185', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (286, 'Lunes', 'CC5', '08:30:00', '10:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (286, 'Martes', 'CC5', '07:30:00', '09:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (287, 86, '186', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (288, 122, '187', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (289, 123, '188', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (290, 70, '189', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (291, 124, '190', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (292, 125, '191', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (293, 126, '192', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (294, 127, '193', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (295, 128, '194', 'Ordinario', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (296, 129, '195', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (297, 130, '196', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (298, 131, '197', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (299, 129, '198', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (300, 115, '199', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (301, 132, '200', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (302, 44, '201', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (303, 133, '202', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (304, 64, '203', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (305, 134, '204', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (305, 'Martes', 'D3', '13:00:00', '14:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (305, 'Jueves', 'C3', '13:00:00', '14:30:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (306, 134, '204', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (306, 'Miercoles', 'D2', '09:00:00', '12:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (307, 135, '205', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (307, 'Lunes', 'D4', '13:30:00', '15:00:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (307, 'Miercoles', 'H6', '13:00:00', '15:00:00');
INSERT INTO GRUPOS (ClvGrupo, ClvProfesor, ClvAsignatura, Modalidad, Periodo) VALUES (308, 80, '206', 'Regular', 'Ene-Jun 2026');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (308, 'Martes', 'CC2', '10:30:00', '12:30:00');
INSERT INTO GRUPOS_HORARIOS (ClvGrupo, Dia, Salon, HoraEntrada, HoraSalida) VALUES (308, 'Jueves', 'CC2', '10:30:00', '12:30:00');

-- [6] MALLA CURRICULAR (243)
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '1', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '2', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '4', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '4', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '4', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '4', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '4', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '5', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '6', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '6', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '6', 1);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '6', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '7', 1);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '8', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '9', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '10', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '10', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '10', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '11', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '12', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '13', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '14', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '15', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '16', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '17', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '18', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '19', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '20', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '21', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '21', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '22', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '23', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '24', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '25', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '26', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '14', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '27', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '15', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '28', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '29', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '30', 38082);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '30', 38082);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '30', 38082);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '31', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '32', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '33', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '34', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '34', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '34', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '35', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '36', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '36', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '36', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '37', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '37', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '37', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '38', 38477);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '38', 38477);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '38', 38477);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '39', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '40', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '40', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '40', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '41', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '41', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '41', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '41', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '41', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '42', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '43', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '43', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '43', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '43', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '44', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '45', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '46', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '46', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '47', 1);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '26', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '14', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '15', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '48', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '49', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '50', 32);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '51', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '52', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '53', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '54', 1);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '55', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '56', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '56', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '56', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '57', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '58', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '59', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '60', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '61', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '62', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '63', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '64', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '65', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '66', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '67', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '68', 1);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '69', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '70', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '71', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '72', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '72', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '72', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '72', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '73', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '74', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '75', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '76', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '77', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '78', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '79', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '14', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '80', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '80', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '80', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '80', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '80', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '81', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '82', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '83', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '84', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '85', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '86', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '15', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '87', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '88', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '89', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '90', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '91', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '92', 39238);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '92', 39238);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '92', 39238);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '93', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '94', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '95', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '96', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '98', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '99', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '100', 1);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '101', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '102', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '103', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '104', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '105', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '106', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '107', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '108', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '109', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '110', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '111', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '112', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '113', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '114', 1);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '115', 1);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '116', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '117', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '118', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '119', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '120', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '14', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '121', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '121', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '121', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '122', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '123', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '123', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '124', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '124', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '125', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '15', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '126', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '127', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '127', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '128', 56);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '128', 56);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '129', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '129', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '130', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LA', '130', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '130', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '130', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '130', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LM', '130', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '131', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '131', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '131', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LEM', '131', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '132', 1);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '132', 1);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '133', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '134', 1);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '135', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '135', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '136', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '137', 5);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '138', 38082);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '138', 38082);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '138', 38082);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '139', 1);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '139', 1);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '140', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '141', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '142', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '135', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '143', 59);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '143', 59);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '144', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '144', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '144', 2);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '14', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '145', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '145', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '15', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '146', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '146', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '147', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '147', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '147', 8);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '148', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '148', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '148', 3);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '149', 4);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '150', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '150', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '150', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '151', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '151', 7);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '152', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '153', 46);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '153', 46);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '154', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '154', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '154', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIS', '155', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LCC', '155', 6);
INSERT IGNORE INTO MALLA_CURRICULAR (ClvCarrera, ClvAsignatura, Semestre) VALUES ('LIC', '155', 6);

-- [7] CONFIGURACIÓN
INSERT IGNORE INTO CONFIGURACION (Clave, Valor) VALUES ('PeriodoActual', 'Ene-Jun 2026');
UPDATE CONFIGURACION SET Valor = 'Ene-Jun 2026' WHERE Clave = 'PeriodoActual';

SET FOREIGN_KEY_CHECKS = 1;
