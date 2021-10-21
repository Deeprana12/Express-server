// const { urlencoded } = require('express');
const express= require('express');
const helmet=require('helmet');
const https= require('https');
const path= require('path');
const fs= require('fs');

const app=express();
app.use(helmet());

app.use(express.urlencoded({
    extended:true
}));

//Routes
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/openssl_server/form.html');    
});

app.post('/submitForm',(req,res)=>{    
    const data=req.body.xname
    console.log(data);
});

// Creating opensslserver for certi
const sslServer=https.createServer({
    key:fs.readFileSync(path.join(__dirname,'openssl_server','certi','key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'openssl_server','certi','certi.pem'))
},app)


sslServer.listen(3443,()=> console.log('Server Listening on Port number 3443'));

