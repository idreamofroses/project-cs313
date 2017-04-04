var express = require('express');
var app = express();
var url = require('url');
var bodyParser = require('body-parser');
var pg = require("pg"); // This is the postgres database connection module.
const connectionString = "postgres://brother_burton:bradismyfavoritestudent@localhost:5432/classquiz";

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/viewClasses', function(request, response) {
  //  console.log("view Classes called");
    viewClasses(request, response);
});

app.get('/viewGroups', function(request, response) {
    viewGroups(request, response);  
});

app.get('/viewQuizzes', function(request, response) {
    console.log("view quizzes called");
    viewQuizzes(request, response);  
});

app.get('/viewStudents', function(request, response) {
  //  console.log("view students called");
    viewStudents(request, response);  
});

app.get('/viewQuiz', function(request, response) {
  //  console.log("view students called");
    viewQuiz(request, response);  
});

app.get('/viewAnswers', function(request, response) {
    console.log("view answers called");
    viewAnswers(request, response);  
});

app.get('/getStudents', function(request, response) {
  //  console.log("get students called");
    getStudents(request, response); 
});

app.get('/getStudentsInClass', function(request, response) {
   console.log("get students in class called");
    getStudentsInClass(request, response);
});

app.get('/getGrades', function(request, response) {
   console.log("Get grades called");
    getGrades(request, response);
});

app.post('/newClass', function(request, response) {
 //   console.log("success!!");
    insertClass(request, response);
});

app.post('/newGroup', function(request, response) {
   // console.log("success!!");
    insertGroup(request, response);
});

app.post('/newQuiz', function(request, response) {
   // console.log("success!!");
    insertQuiz(request, response);
});

app.post('/addStudentToGroup', function(request, response) {
   // console.log("success!!");
    insertStudentInGroup(request, response);
});

app.post('/newQuestion', function(request, response) {
  //  console.log("success!!");
    insertQuestion(request, response);
});

app.post('/newAnswer', function(request, response) {
    console.log("success answer!!");
    insertAnswer(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


function viewClasses(request, response) {
    var client = new pg.Client(connectionString);
    
    client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        var sql = "SELECT id, name, class_code, section FROM class WHERE teacher_id = $1::int;"
        var params = [1 /*temporary until we know the teacher_id*/];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            //console.log("Found result: " + JSON.stringify(result.rows));
            
            response.json(result.rows);
        });
    });
}

function viewGroups(request, response) {
   var requestUrl = url.parse(request.url, true);
   var classId = parseInt(requestUrl.query.classId);  
    console.log("class id: " + classId);
  
    var client = new pg.Client(connectionString);
    
   client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        var sql = "SELECT cg.id, cg.group_name FROM classgroup cg INNER JOIN class c ON cg.class_id = c.id WHERE c.id = $1::int;";
        var params = [classId];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
         //   console.log("Found result: " + JSON.stringify(result.rows));
            
            response.json(result.rows);
        });
    }); 
}

function viewQuizzes(request, response) {
   var requestUrl = url.parse(request.url, true);
   var classId = parseInt(requestUrl.query.classId);  
    console.log("class id: " + classId);
  
    var client = new pg.Client(connectionString);
    
   client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        var sql = "SELECT id, quizname FROM quiz WHERE class_id = $1::int;";
        var params = [classId];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
         console.log("Found result: " + JSON.stringify(result.rows));
            
            response.json(result.rows);
        });
    }); 
}

function viewStudents(request, response) {
   var requestUrl = url.parse(request.url, true);
   var groupId = parseInt(requestUrl.query.groupId);  
    console.log("group id: " + groupId);
  
    var client = new pg.Client(connectionString);
    
   client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        var sql = "SELECT firstname, lastname FROM classuserTOgroup ctg INNER JOIN classUser cu ON cu.id = ctg.classUser_id WHERE ctg.group_id = $1::int;";
        var params = [groupId];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            console.log("Found result: " + JSON.stringify(result.rows));
            
            response.json(result.rows);
        });
    }); 
}

function getStudentsInClass(request, response) {
   var requestUrl = url.parse(request.url, true);
   var classId = parseInt(requestUrl.query.classId);  
    console.log("class id: " + classId);
  
    var client = new pg.Client(connectionString);
    
   client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        var sql = "SELECT cu.id, cu.firstname, cu.lastname FROM classuserTOclass ctc INNER JOIN classUser cu ON cu.id = ctc.classuser_id WHERE class_id = $1::int;";
        var params = [classId];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            console.log("Found result: " + JSON.stringify(result.rows));
            
            response.json(result.rows);
        });
    }); 
}

function viewQuiz(request, response) {
   var requestUrl = url.parse(request.url, true);
  // var classId = parseInt(requestUrl.query.courseNumber);
   var quizId = parseInt(requestUrl.query.quizName);
  //  console.log("class id: " + classId);
     console.log("quiz id: " + quizId);
  
    var client = new pg.Client(connectionString);
    
   client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        var sql = "SELECT q.id, c.name, c.class_code, c.section, c.id AS class_id, q.quizName, q.id AS quiz_id, qu.question, qu.id AS question_id FROM quizTOquestion qtq INNER JOIN quiz q ON q.id = qtq.quiz_id INNER JOIN question qu ON qu.id = question_id INNER JOIN class c ON q.class_id = c.id WHERE q.id = $1::int;";
        var params = [quizId];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            console.log("Found result: " + JSON.stringify(result.rows));
            
            
            response.render('pages/viewQuiz', { 'sql' : result.rows });
        });
    });  
}

function getStudents(request, response) {
   var requestUrl = url.parse(request.url, true);
   var classId = parseInt(requestUrl.query.classId);  
    console.log("class id: " + classId);
  
    var client = new pg.Client(connectionString);
    
   client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        var sql = "SELECT cu.firstname, cu.lastname, c.name, c.class_code, c.section  FROM classuserTOclass ctc INNER JOIN classUser cu ON ctc.classuser_id = cu.id INNER JOIN class c ON class_id = c.id WHERE c.id = $1::int;";
        var params = [classId];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            console.log("Found result: " + JSON.stringify(result.rows));
            
           // response.json(result.rows);
            response.render('pages/studentsInclass', { 'sql' : result.rows });
        });
    }); 
}

function insertClass(request, response) {
    console.log("inserting class");
    //pull form data from body
    var courseName = request.body.courseName;
    var courseNumber = request.body.courseNumber;
    var sectionNumber = request.body.sectionNumber;
   
    var client = new pg.Client(connectionString);
    
    client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        var sql = "INSERT INTO class(name, class_code, section, teacher_id) VALUES($1::text, $2::text, $3::text, $4::int);"
        var params = [courseName, courseNumber, sectionNumber, 1 /*temporary until we know how to get the teacher_id*/];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            response.redirect('/viewclasses.html');
        });
        
    });
}

function insertGroup(request, response) {
    console.log("inserting group");
    //pull form data from body
    var courseId = parseInt(request.body.courseNumber);
    var groupName = request.body.newGroupNumber;
    console.log("Group Name: " + groupName);
    console.log("course Id: " + courseId);
    var client = new pg.Client(connectionString);
    
    client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        var sql = "INSERT INTO classgroup(group_name, class_id) VALUES($1::text, $2::int);"
        var params = [groupName, courseId];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            response.redirect('/viewGroups.html');
        });
        
    }); 
}

function insertQuiz(request, response) {
    console.log("inserting group");
    //pull form data from body
    var courseId = parseInt(request.body.courseNumber);
    var quizName = request.body.quizName;
    console.log("Group Name: " + quizName);
    console.log("course Id: " + courseId);
    var client = new pg.Client(connectionString);
    
    client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        var sql = "INSERT INTO quiz(quizName, class_id) VALUES($1::text, $2::int);"
        var params = [quizName, courseId];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            response.redirect('/viewquizzes.html');
        });
        
    }); 
}

function insertStudentInGroup(request, response) {
    console.log("inserting student in group");
    //pull form data from body
   // var courseId = parseInt(request.body.courseNumber);
    var userId = parseInt(request.body.studentName);
    var groupId = parseInt(request.body.groupName);
    console.log("Group Id: " + groupId);
   // console.log("Course Id: " + courseId);
    console.log("User Id: " + userId);
    
    var client = new pg.Client(connectionString);
    
    client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        var sql = "INSERT INTO classuserTOgroup(classUser_id, group_id) VALUES($1::int, $2::int);"
        var params = [userId, groupId];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            response.redirect('/viewGroups.html');
        });
        
    });  
}

function insertQuestion(request, response) {
    console.log("inserting question");
    //pull form data from body
    var quizId = parseInt(request.body.quizId);
    var question = request.body.newQuestion;
    console.log("Quiz Id: " + quizId);
   // console.log("Course Id: " + courseId);
    console.log("Question: " + question);
    
    var client = new pg.Client(connectionString);
    
    client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        //we are inserting into two tables here
        var sql = "INSERT INTO question(question) VALUES($1::text);";
        var params = [question];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            
           insertQuestiontoQuiz(response, question, quizId);
        });
        
    });  
}

function insertQuestiontoQuiz(response, question, quizId) {
    console.log("inserting question into quiz");
    //pull form data from body
    console.log("Quiz Id: " + quizId);
   // console.log("Course Id: " + courseId);
    console.log("Question: " + question);
    
    var client = new pg.Client(connectionString);
    
    client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        //we are inserting into two tables here
        var sql = "INSERT INTO quizTOquestion(quiz_id, question_id) VALUES($2::int, (SELECT id FROM question WHERE question = $1::text));;";
        /* SELECT q.id, c.name, c.class_code, c.section, q.quizName, qu.question FROM quizTOquestion qtq INNER JOIN quiz q ON q.id = qtq.quiz_id INNER JOIN question qu ON qu.id = question_id INNER JOIN class c ON q.class_id = c.id WHERE q.id = $2::int;"; */
        var params = [question, quizId];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            
            returnViewQuiz(response, quizId);
           // response.render('pages/viewQuiz', { 'sql' : result.rows });
        });
        
    });  
}

function returnViewQuiz(response, quizId) {
    console.log("preparing to view quiz");
    //pull form data from body
    console.log("Quiz Id: " + quizId);
    
    var client = new pg.Client(connectionString);
    
    client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        //we are inserting into two tables here
        var sql = "SELECT q.id, c.name, c.class_code, c.section, c.id AS class_id, q.quizName, q.id AS quiz_id, qu.question, qu.id AS question_id FROM quizTOquestion qtq INNER JOIN quiz q ON q.id = qtq.quiz_id INNER JOIN question qu ON qu.id = question_id INNER JOIN class c ON q.class_id = c.id WHERE q.id = $1::int;";
        var params = [quizId];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            
            
            response.render('pages/viewQuiz', { 'sql' : result.rows });
        });
        
    });  
}

function viewAnswers(request, response) {
    var requestUrl = url.parse(request.url, true);
     console.log("retrieving answers");
    //pull form data from body
    var quizId = parseInt(requestUrl.query.quizId);
    var questionId = parseInt(requestUrl.query.questionId);
    console.log("Quiz Id: " + quizId);
   // console.log("Course Id: " + courseId);
    console.log("Question Id: " + questionId);
    
    var client = new pg.Client(connectionString);
    
    client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        //we are inserting into two tables here
        var sql = "SELECT a.choice, a.isAnswer AS answer, c.name, c.class_code, c.section, q.quizName, qu.question, q.id AS quiz_id, a.question_id FROM answer a INNER JOIN question qu ON a.question_id = qu.id INNER JOIN quizTOquestion qtq ON a.question_id = qu.id INNER JOIN quiz q ON q.id = qtq.id INNER JOIN class c ON q.class_id = c.id WHERE a.question_id = $1::int AND q.id = $2::int;";
        var params = [questionId, quizId];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            
            console.log("Found result: " + JSON.stringify(result.rows));
            
            response.render('pages/viewAnswers', { 'sql' : result.rows });
        });
        
    });   
}

function insertAnswer(request, response) {
    console.log("inserting answer");
    //pull form data from body
    var quizId = parseInt(request.body.quizId);
    var questionId = parseInt(request.body.questionId);
    var answer = request.body.newAnswer;
    var isAnswer = request.body.isAnswer;
    console.log("Question Id: " + questionId);
    console.log("Answer: " + answer);
    if(isAnswer == 'on') {
        isAnswer = true;
        console.log("Is Answer: true");
    } else {
        isAnswer = false;
        console.log("Is Answer: false");
    }
    
    var client = new pg.Client(connectionString);
    
    client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        //we are inserting into two tables here
        var sql = "INSERT INTO answer(choice, isAnswer, question_id) VALUES($1::text, $2::boolean, $3::int);";
        var params = [answer, isAnswer, questionId];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            
          returnViewAnswers(response, questionId, quizId);
        });
        
    });  
}

function returnViewAnswers(response, questionId, quizId) {
    console.log("Quiz Id: " + quizId);
    console.log("Question Id: " + questionId);
    
    var client = new pg.Client(connectionString);
    
    client.connect(function(err){
        if (err) {
            console.log("Error connecting to database");
            console.log(err);
            callback(err, null);
        }
        
        //we are inserting into two tables here
        var sql = "SELECT a.choice, a.isAnswer AS answer, c.name, c.class_code, c.section, q.quizName, qu.question, q.id AS quiz_id, a.question_id FROM answer a INNER JOIN question qu ON a.question_id = qu.id INNER JOIN quizTOquestion qtq ON a.question_id = qu.id INNER JOIN quiz q ON q.id = qtq.id INNER JOIN class c ON q.class_id = c.id WHERE a.question_id = $1::int AND q.id = $2::int;";
        var params = [questionId, quizId];
        
        var query = client.query(sql, params, function(err, result){
            client.end(function(err) {
                if (err) throw err;
            });
            
            if (err) {
                console.log("Error in query");
                console.log(err);
                callback(err, null);
            }
            
            
            console.log("Found result: " + JSON.stringify(result.rows));
            
            response.render('pages/viewAnswers', { 'sql' : result.rows });
        });
        
    });   
}

function getGrades(request, response) {
    console.log("Getting grades");
    
}