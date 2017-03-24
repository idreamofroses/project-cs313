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
    console.log("view Classes called");
    viewClasses(request, response);
});

app.get('/viewGroups', function(request, response) {
    console.log("view quizzes called");
    viewGroups(request, response);
    
});

app.get('/viewStudents', function(request, response) {
    console.log("view students called");
    viewStudents(request, response);
    
});

app.get('/getStudents', function(request, response) {
    console.log("get students called");
    getStudents(request, response);
    
});

app.post('/newClass', function(request, response) {
    console.log("success!!");
    insertClass(request, response);
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


