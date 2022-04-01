var express = require('express');
var app = express();

app.set("view engine","ejs");

app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res){
	res.render("home.ejs");
});

app.get("*", (req,res) => {
    res.render("404.ejs");
});

var port = process.env.PORT || 31000
app.listen(port,process.env.IP,function(){
	console.log("Server started at port:"+port);
});