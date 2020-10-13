const express=require("express")
const request=require("request")
const bodyParser=require("body-parser")
const https = require("https")

const app=express();
app.use(express.static("public"));//the function is used to add static files to html
//using css function for that created a one folder and put all the static filesin it and use the path with respect to that folder
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/sign_up.html");
})

app.post("/", function (req, res){
  const firstName=req.body.firstName
  const lastName=req.body.lastName
  const mailAddress=req.body.mailAddress
  const data={
    members:[
        {
          email_address: mailAddress,
          status: "subscribed",
          merge_fields:{
            FNAME:firstName,
            LNAME: lastName
            }
        }
    ]
  }
  const jsonData=JSON.stringify(data);

  const url="";
  const options = {
    method: "POST",
    auth:"authkey"
    }
  const request=https.request(url, options, function(response){
   if(response.statusCode === 200){
     res.sendFile(__dirname + "/sucess.html")
   }
   else{
     res.sendFile(__dirname + "/failure.html")
   }
  });
  request.write(jsonData);
  request.end();


})

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT||3000,function(){
  console.log("server has started")
})

