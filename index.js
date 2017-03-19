var express = require('express');
var app = express();
var url = require('url');
var pg = require("pg"); // This is the postgres database connection module.
const connectionString = "postgres://brother_burton:bradismyfavoritestudent@localhost:5432/classquiz";

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/viewClasses', function(request, response) {
    console.log("success!!");
    viewClasses(request, response);
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
        
        var sql = "SELECT * FROM class;"
        
        var query = client.query(sql, function(err, result){
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