var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;

var config = {
    user:'tony09thomas',
    database:'tony09thomas',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));


var articles = {
    'article-one':{
        title:'article-one',
        heading:'article-one',
        date:'Sep 3 ,2017',
        content:'<p> this is the content of article-one.this is the content of article-one.this is the content of article-one</p>.'
    },
    'article-two':{
        title:'article-two|tony thomas',
        heading:'article-two',
        date:'Sep 3 ,2017',
        content:'<p> this is the content of article-two.this is the content of article-two.this is the content of article-two</p>.'
    },
    'article-three':{
        title:'article-three|tony thomas',
        heading:'article-three',
        date:'Sep 3 ,2017',
        content:'<p> this is the content of article-three.this is the content of article-three.this is the content of article-ne</p>.'
    }
};




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool=new pool(config);
app.get('/test-db', function(req, res){
//make a select request
//return a response with the result
pool.query('SELECT * FROM test',function(err,result){
  if(err){
      res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
});

});


var counter=0;
app.get('/counter', function(req, res){
   counter=counter+1;
   res.send(counter.toString());
});


app.get('/articles//articleName', function(req, res){
    
    
    pool.query("SELECT * FROM article WHERE title=' + req.params.articleName + '", function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }else{
           if(result.rows.length ===0){
               res.status(404).send('Article not found');
           }else{
               var articleData = result.rows[0];
                res.send(createTemplate(articleData));
           }
       } 
    });
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
