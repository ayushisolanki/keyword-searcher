const express= require('express');
const ejs= require('ejs');
const path= require('path');
const fs= require('fs');
const bodyParser= require('body-parser');
const pdf = require('pdf-parse');
const { callbackify } = require('util');

const app= express();

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

const dirPath= path.join(__dirname, "public/Data");
const files= fs.readdirSync(dirPath).map(function(name){
    return{
        name: path.basename(name, ".pdf"),
        url: 'Data/'+name
    };

});

//console.log(files[0].name);

app.get("/", function(req,res){
    res.sendFile(__dirname+"\\index.html");
});

app.get("/result", function(req,res){
    res.render("result", {files});
});

app.post("/", function(req,res){
    
    console.log(req.body.keywords);
    var keywords= req.body.keywords; 

    let resfiles= [];
 
    // for(let i=0; i<files.length; i++)
    // {
    //     const filePath= dirPath+"\\"+path.basename(files[i].name)+".pdf";
    //     let dataBuffer = fs.readFileSync(filePath);
    //     pdf(dataBuffer).then(function(data) {
    //         //console.log(data.text); 
    //         const datatext= data.text;
    //         if(datatext.includes(keywords))
    //         {
    //             //resfiles.push(files[i]);  
                
    //         }
    //             //console.log("YESS  "+i); 
    //             //
    //         else
    //         {
    //             delete files[i];
    //             console.log("NOOO  "+i);
    //         }
                
    //     });
    // }
        
    // console.log(resfiles);
    res.render("result",{files:files,file:files[0].name});
    
});


app.get("/:file", (req, res) => {
    const file = files.find(f => f.name === req.params.file);
    res.render("result", { files:files, file :req.params.file});
  });

app.listen(3000 || process.env.PORT, function(){
    console.log("Server started on port 3000");
});

