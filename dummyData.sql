---------------------------
--- classuser insert test
---------------------------

INSERT INTO classuser(username, password, firstname,lastname,inumber,isadmin)
VALUES 
( 'sburton'
, 'Ilikecheese'
, 'Scott'
, 'Burton'
, 955477112
, true);

---------------------------
--- classuser insert 
---------------------------

INSERT INTO classuser(username, password, firstname,lastname,inumber,isadmin)
VALUES 
( 'Jonin'
, 'pigsarecool'
, 'John'
, 'Boneinchicken'
, 452687954
, false)
,( 'ktrine'
, 'pigs:notcool'
, 'Katie'
, 'Wohe'
, 452687954
, false)
,( 'JMS'
, 'RAMEN!'
, 'Jams'
, 'AnJelly'
, 785463344
, false)
,( 'Jin'
, 'pile'
, 'Jaden'
, 'Halfway'
, 452657854
, false);

---------------------------
--- classuser insert check
---------------------------

SELECT * FROM classuser;

---------------------------
--- class insert 
---------------------------

--subquery needed

INSERT INTO class (name, class_code, section, teacher_id)
VALUES
( 'Software Engineering II'
, 'B313'
, 02
, (SELECT id FROM classuser WHERE username = 'sburton'));

---------------------------
--- classuser and class insert check
--- (compare the two for accuracy)
---------------------------

SELECT * FROM classuser;
SELECT * FROM class;

---------------------------
--- quiz insert
---------------------------

INSERT INTO quiz (quizname, class_id, section)
VALUES
( 'quiz 1'
, (SELECT id FROM class WHERE name = 'Software Engineering II')
, 02),
( 'quiz 2'
, (SELECT id FROM class WHERE name = 'Software Engineering II')
, 02)
,( 'quiz 3'
, (SELECT id FROM class WHERE name = 'Software Engineering II')
, 02);

---------------------------
--- quiz check
---------------------------
SELECT * FROM class;
SELECT * FROM quiz;

---------------------------
--- classgroup insert
---------------------------

INSERT INTO classgroup (quiz_id)
VALUES(
 (SELECT id FROM quiz WHERE quizname = 'quiz 1'));

INSERT INTO classgroup (quiz_id)
VALUES(
 (SELECT id FROM quiz WHERE quizname = 'quiz 2')
 
 INSERT INTO classgroup (quiz_id)
VALUES(
 (SELECT id FROM quiz WHERE quizname = 'quiz 3')

---------------------------
--- classgroup check
---------------------------

SELECT * FROM classgroup;
SELECT * FROM quiz;

---------------------------
--- classuserTOgroup insert
--- technically there would have to be an inner join here
--- I have just hard coded it in
---------------------------

INSERT INTO classuserTOgroup (classuser_id, group_id)
VALUES
 ( 2, 1)
,( 3, 1)
,( 4, 1)
,( 5, 1);

---------------------------
--- classgroup check
---------------------------

SELECT * FROM classusertogroup;

SELECT classuser_id, group_id, username, firstname, lastname 
FROM classusertogroup
INNER JOIN classuser
ON classusertogroup.classuser_id = classuser.id;

---------------------------
--- question insert
---------------------------

INSERT INTO question (question)
VALUES
  ('Where is the pizza')
, ('Where is your basket')
, ('What is my favorite color')
, ('What is your favorite color')
, ('What is 2 + 2')
, ('What is 3 * 4');

---------------------------
--- question check
---------------------------

SELECT * FROM question;

---------------------------
--- answer insert
---------------------------

INSERT INTO answer (choice, isanswer, question_id)
VALUES 
 ('Fridge', FALSE, (SELECT id FROM question WHERE question = 'Where is the pizza'))
,('Table', FALSE, (SELECT id FROM question WHERE question = 'Where is the pizza'))
,('Stomack', TRUE, (SELECT id FROM question WHERE question = 'Where is the pizza'));

INSERT INTO answer (choice, isanswer, question_id)
VALUES 
 ('Table', FALSE, (SELECT id FROM question WHERE question = 'Where is your basket'))
,('Chair', FALSE, (SELECT id FROM question WHERE question = 'Where is your basket'))
,('Outside Table', FALSE, (SELECT id FROM question WHERE question = 'Where is your basket'))
,('Closet', TRUE, (SELECT id FROM question WHERE question = 'Where is your basket'));

INSERT INTO answer (choice, isanswer, question_id)
VALUES 
 ('Orange', FALSE, (SELECT id FROM question WHERE question = 'What is my favorite color'))
,('pink', TRUE, (SELECT id FROM question WHERE question = 'What is my favorite color'));

INSERT INTO answer (choice, isanswer, question_id)
VALUES 
 ('Something in the rainbow', TRUE, (SELECT id FROM question WHERE question = 'What is your favorite color'))
,('What else is ther to pick?', FALSE, (SELECT id FROM question WHERE question = 'What is your favorite color'));

INSERT INTO answer (choice, isanswer, question_id)
VALUES 
 (4, TRUE, (SELECT id FROM question WHERE question = 'What is 2 + 2'))
,('Fish', FALSE, (SELECT id FROM question WHERE question = 'What is 2 + 2'))
,(4.35, FALSE, (SELECT id FROM question WHERE question = 'What is 2 + 2'));

INSERT INTO answer (choice, isanswer, question_id)
VALUES 
 (8, FALSE, (SELECT id FROM question WHERE question = 'What is 3 * 4'))
,(12, TRUE, (SELECT id FROM question WHERE question = 'What is 3 * 4'))
,(16, FALSE, (SELECT id FROM question WHERE question = 'What is 3 * 4'))
,(20, FALSE, (SELECT id FROM question WHERE question = 'What is 3 * 4'))
,(15, FALSE, (SELECT id FROM question WHERE question = 'What is 3 * 4'))
,(11, FALSE, (SELECT id FROM question WHERE question = 'What is 3 * 4'))
,(13, FALSE, (SELECT id FROM question WHERE question = 'What is 3 * 4'));

---------------------------
--- answer check
---------------------------

SELECT FROM answer;

SELECT question, choice, isanswer
FROM answer as a
INNER JOIN question as q
ON a.question_id = q.id
ORDER BY question;

---------------------------
--- quiztoquestion insert
---------------------------

INSERT INTO quiztoquestion (quiz_id, question_id)
VALUES
 ((SELECT id FROM quiz WHERE quizname = 'quiz 1'), (SELECT id FROM question WHERE question = 'Where is your basket'))
,((SELECT id FROM quiz WHERE quizname = 'quiz 1'), (SELECT id FROM question WHERE question = 'Where is the pizza'))
,((SELECT id FROM quiz WHERE quizname = 'quiz 2'), (SELECT id FROM question WHERE question = 'What is my favorite color'))
,((SELECT id FROM quiz WHERE quizname = 'quiz 2'), (SELECT id FROM question WHERE question = 'What is your favorite color'))
,((SELECT id FROM quiz WHERE quizname = 'quiz 3'), (SELECT id FROM question WHERE question = 'What is 2 + 2'))
,((SELECT id FROM quiz WHERE quizname = 'quiz 3'), (SELECT id FROM question WHERE question = 'What is 3 * 4'));

---------------------------
--- quiztoquestion check
---------------------------

SELECT * FROM quiztoquestion;

SELECT quizname, question, choice, isanswer FROM quiz as q
INNER JOIN quiztoquestion as qq
ON q.id = qq.quiz_id
INNER JOIN question as qt
ON qq.question_id = qt.id
INNER JOIN answer as a
on qt.id = a.question_id;

---------------------------
--- grade insert
---------------------------

INSERT INTO grade (quiz_id, classuser_id, personal_grade, group_grade)
VALUES
 ((SELECT id FROM quiz WHERE quizname = 'quiz 1'),(SELECT id FROM classuser WHERE firstname = 'John'), 72, 90)
,((SELECT id FROM quiz WHERE quizname = 'quiz 1'),(SELECT id FROM classuser WHERE firstname = 'Katie'), 62, 90)
,((SELECT id FROM quiz WHERE quizname = 'quiz 1'),(SELECT id FROM classuser WHERE firstname = 'Jaden'), 48, 90);

INSERT INTO grade (quiz_id, classuser_id, personal_grade, group_grade)
VALUES
 ((SELECT id FROM quiz WHERE quizname = 'quiz 2'),(SELECT id FROM classuser WHERE firstname = 'John'), 100, 90)
,((SELECT id FROM quiz WHERE quizname = 'quiz 2'),(SELECT id FROM classuser WHERE firstname = 'Katie'), 56, 90)
,((SELECT id FROM quiz WHERE quizname = 'quiz 2'),(SELECT id FROM classuser WHERE firstname = 'Jaden'), 10, 90);

INSERT INTO grade (quiz_id, classuser_id, personal_grade, group_grade)
VALUES
 ((SELECT id FROM quiz WHERE quizname = 'quiz 3'),(SELECT id FROM classuser WHERE firstname = 'John'), 100, 90)
,((SELECT id FROM quiz WHERE quizname = 'quiz 3'),(SELECT id FROM classuser WHERE firstname = 'Katie'), 0, 90)
,((SELECT id FROM quiz WHERE quizname = 'quiz 3'),(SELECT id FROM classuser WHERE firstname = 'Jaden'), 100, 90);

---------------------------
--- grade check
---------------------------

SELECT * FROM grade;