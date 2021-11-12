const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const https=require('https');
const app =express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {
  res.sendFile(__dirname+"/signup.html")


})


app.post("/",function (req,res) {
const firstn=req.body.fname;
const lastn=req.body.lname;
const mail_id=req.body.mail;


const data={
members:[
  {
    email_address:mail_id,
    status:"subscribed",
    merge_fields:{
      FNAME:firstn,
      LNAME:lastn
    }
  }
]



};

const jsonData= JSON.stringify(data);

const url="https://us20.api.mailchimp.com/3.0/lists/7dbcc24cfe";
const options={
  method:"POST",
  auth:"viby:aeefce5d115abf3e14fa35a4b3f51de0-us20"

};

const request=https.request(url,options,function (response) {
if (response.statusCode==200){
  res.sendFile(__dirname+"/success.html")

}
else{
  res.sendFile(__dirname+"/failure.html")
}

  response.on("data",function (data) {
    console.log(JSON.parse(data));

  });
});

request.write(jsonData);
request.end();
});

app.post("/failure",function (req,res) {
  res.redirect("/");

})




app.listen(process.env.PORT || 3000,function () {
  console.log("Server UP");
})
// aeefce5d115abf3e14fa35a4b3f51de0-us20
 // 7dbcc24cfe
