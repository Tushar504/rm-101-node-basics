// install and import express
var fs = require('fs');
const fileName="./assets/user.json"
const file = require(fileName);
const express =require("express")

let app = express();
app.use(express.json())
// Code here
app.listen(8000,async()=>{
    try {
        console.log("Listening on port 8000")
    } catch (error) {
        console.log(error)
    }
})
app.get('/', async(req, res)=>{
    try {
        fs.readFile(__dirname + '/assets/users.html', 'utf8', function(err, text){
            if(err){
               return res.send(err)
            }
           return res.send(text);
        });
    } catch (error) {
        return res.send(error)
    }
   

})
 
app.get('/users',async(req,res)=>{
    try {
        fs.readFile(__dirname + '/assets/user.json', function(err, text){
            if(err){
               return res.send(err)
            }
           return res.send(text);
        });
    } 
    catch (error) {
        return res.send(error)
    }
})

app.get('/users/:id',async(req,res)=>{
    try {
           console.log(file.length)
           for(var i=0;i<file.length;i++){
             if(file[i].id==req.params.id){
                res.send(file[i])
             }
           }
            
        
    } 
    catch (error) {
        return res.send(error)
    }
})


app.post('/users',async(req,res)=>{
    try {
        let id=file[file.length-1].id
        req.body.id=id+1
        file.push(req.body)
        fs.writeFile(__dirname + '/assets/user.json', JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
            res.send(file[file.length-1])
           
            console.log('writing to ' + fileName);
          });
       
      
    } catch (error) {
        res.send(error)
    }
})
// Note: Do not remove this export statement
module.exports = app;
