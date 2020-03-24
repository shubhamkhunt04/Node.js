const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser"); //midelware

const hostname = "localhost";
const port = "3000";

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());


app.all('/dishes',(req,res,next)=>{   // for all requiest(GET,POST,PUT,DELETE)
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
});



app.get('/dishes',(req,res,next)=>{
    res.end('Will send all the dishes to you');
});

app.post('/dishes',(req,res,next)=>{
    res.end('Will add the dish : '+req.body.name+' with details: '+req.body.description+' and price : '+req.body.price);
});

app.put('/dishes',(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation dose not support on /dishes');
});

app.delete('/dishes',(req,res,next)=>{
    res.end('Deleting all the dishes !!');
});



// for /dishes/:dishId



app.get('/dishes/:dishId',(req,res,next)=>{
    res.end('Will send details of the dish: '+req.params.dishId+' to you !!');
});

app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+req.params.dishId);
});

app.put('/dishes/:dishId',(req,res,next)=>{
    res.write('Updating the dishes'+req.params.dishId)
    res.end('Will update the dish:'+req.body.name+' with details:'+req.body.description+' and price :'+req.body.price);
});

app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end('Deleting dishes :'+req.params.dishId);
});



app.use(express.static(__dirname+'/public')); // root of this project and only accept GET requiest.

app.use((req,res,next)=>{               // All requiest handel
    //console.log(req.header);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an Express Server Shubham</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
})