--------------------------------
-- Class User - Table 
--------------------------------
CREATE TABLE classUser
(
  id              SERIAL PRIMARY KEY 	NOT NULL
, userName        VARCHAR(30) 		   	NOT NULL
, password        VARCHAR(255) 	    	NOT NULL
, firstName       VARCHAR(30) 		   	NOT NULL
, lastName        VARCHAR(30) 		   	NOT NULL
, iNumber         INT               	NOT NULL
, isAdmin         BOOLEAN            	NOT NULL
);

--------------------------------
-- Class - Table 
--------------------------------
CREATE TABLE class
(
  id              SERIAL PRIMARY KEY 	NOT NULL
, name            VARCHAR(30) 			NOT NULL
, class_code      VARCHAR(30) 			NOT NULL
, section		  VARCHAR(10)			NOT NULL
, teacher_id	  INT	 				NOT NULL REFERENCES classUser(id)
);

--------------------------------
-- Quiz - Table
--------------------------------
CREATE TABLE quiz
(
  id              SERIAL PRIMARY KEY 	NOT NULL
, quizName        VARCHAR(30) 		   	NOT NULL
, class_id        INT               	NOT NULL REFERENCES class(id)
);

--------------------------------
-- Group - Table
--------------------------------
CREATE TABLE classgroup
(
  id              SERIAL PRIMARY KEY 	NOT NULL
, quiz_id         INT 					NOT NULL REFERENCES quiz(id)
);

--------------------------------
-- Class to Group - Table
--------------------------------
CREATE TABLE classuserTOgroup
(
  id 			 	SERIAL PRIMARY KEY  NOT NULL
, classUser_id	 	INT 				NOT NULL REFERENCES classUser(id)
, group_id		 	INT 				NOT NULL REFERENCES classgroup(id)
);

--------------------------------
-- Question - Table
--------------------------------
CREATE TABLE question
(
  id              SERIAL PRIMARY KEY  	NOT NULL
, question        VARCHAR(255) 	    	NOT NULL
);

--------------------------------
-- Answer - Table
--------------------------------
CREATE TABLE answer quizName
(
  id             SERIAL PRIMARY KEY NOT NULL
, choice         VARCHAR(255)       NOT NULL
, isAnswer       BOOLEAN            NOT NULL
, question_id	 INT 				NOT NULL REFERENCES question(id)
);

--------------------------------
-- Quiz to Question - Table 
--------------------------------
CREATE TABLE quizTOquestion
(
  id 			 	SERIAL PRIMARY KEY  NOT NULL
, quiz_id		 	INT 				NOT NULL REFERENCES quiz(id)
, question_id	 	INT 				NOT NULL REFERENCES question(id)
);

--------------------------------
-- Grade - Table
--------------------------------
CREATE TABLE grade
(
  id               	SERIAL PRIMARY KEY 	NOT NULL
, quiz_id 		 	INT	 				NOT NULL REFERENCES quiz(id)
, classUser_id	 	INT 				NOT NULL REFERENCES classUser(id)
, personal_grade 	INT
, group_grade	 	INT
);

--------------------------------
-- Quiz First Answer - Table
--------------------------------
CREATE TABLE quizFirstAnswer
(
  id             SERIAL PRIMARY KEY 	NOT NULL
, quiz_id		 INT 					NOT NULL REFERENCES quiz(id)
, question_id	 INT 					NOT NULL REFERENCES question(id)
, answer_id	   	 INT 					NOT NULL REFERENCES answer(id)
, count			 INT 					NOT NULL  -- must initialize to 0.  Add to it
);


-- create the user for database connection
CREATE USER brother_burton WITH PASSWORD 'bradismyfavoritestudent';

GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO brother_burton;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public to brother_burton;


-- insert dummy data ---
