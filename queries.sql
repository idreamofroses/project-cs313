--quizes for a given class

SELECT quizname 
FROM class c
INNER JOIN quiz q
ON c.id = q.class_id
WHERE c.id = 1;


--group numbers for given quizes

SELECT ctg.group_id, group_name FROM 
classusertogroup ctg
INNER JOIN classgroup cg
ON ctg.group_id = cg.id
INNER JOIN quiz q
ON cg.quiz_id = q.id
WHERE q.id = 1;


--students for a specific group

SELECT firstname, lastname, group_name FROM 
classusertogroup ctg
INNER JOIN classgroup cg
ON ctg.group_id = cg.id
INNER JOIN classuser cu
ON ctg.classuser_id = cu.id
where group_id = 1;


--alter classgroup table
ALTER TABLE classgroup ADD COLUMN group_name;

UPDATE classgroup
SET group_name = 'Alpha';

ALTER TABLE classgroup ALTER COLUMN group_name SET NOT NULL;