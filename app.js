const express = require("express");
const app = express();
const axios = require("axios");
const http = require("http");
const ejs = require("ejs");
//var NameGenerator = require('name-generator');

// var namer = new NameGenerator();
// var name = namer.next();
// console.log(name);

app.set('view engine', 'ejs');
app.use(express.static("public"));

let girlName = [];
let boyName = []

app.get("/", function (req, res) {
    // http://names.drycodes.com/10
    // https.get("")

    http.get("http://names.drycodes.com/10?nameOptions=girl_names", function (response) {
        console.log(response.statusCode);
        response.on("data", function(data){
            // console.log(data);
            let parseData = JSON.parse(data);
            //console.log(parseData);

            for(let i = 0; i < parseData.length; i++) {
                girlName.push(parseData[i]);
            }
            console.log(girlName);
        })
    })

    http.get("http://names.drycodes.com/10?nameOptions=boy_names", function (response) {
        console.log(response.statusCode);
        response.on("data", function(data){
            // console.log(data);
            let parseData = JSON.parse(data);
            //console.log(parseData);

            for(let i = 0; i < parseData.length; i++) {
                boyName.push(parseData[i]);
            }
            console.log(boyName);
        })
    })


    res.send("server good");
    // res.sendFile(__dirname + '/index.html');


})

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening to ${process.env.PORT || 3000}`);
})