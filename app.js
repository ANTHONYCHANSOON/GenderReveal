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

app.get("/names", function (req, res) {
    // http://names.drycodes.com/10
    // https.get("")
    let girlName = [];
    let boyName = [];

    http.get("http://names.drycodes.com/10?nameOptions=girl_names", function (response) {
        //console.log("girls's status = " + response.statusCode);
        response.on("data", function (data) {
            // console.log(data);
            let parseData = JSON.parse(data);
            //console.log(parseData);

            for (let i = 0; i < parseData.length; i++) {
                girlName.push(parseData[i]);
            }
            //console.log(girlName);

            // res.write("<h1>GIRL</h1>");

            // for (let i = 0; i < girlName.length; i++) {
            //     res.write("<li>" + girlName[i] + "</li>")
            // }

            http.get("http://names.drycodes.com/10?nameOptions=boy_names", function (response) {
                //console.log("boy's status = " + response.statusCode);
                response.on("data", function (data) {
                    // console.log(data);
                    let parseData = JSON.parse(data);
                    //console.log(parseData);

                    for (let i = 0; i < parseData.length; i++) {
                        boyName.push(parseData[i]);
                    }
                    //console.log(boyName);

                    // res.write("<h1>BOY</h1>");

                    // for (let i = 0; i < boyName.length; i++) {
                    //     res.write("<li>" + boyName[i] + "</li>")
                    // }
                    res.render("names", 
                    {
                        listofboy : boyName,
                        listofgirl : girlName
                    });
                })
            })
        })
    })




    

    // res.sendFile(__dirname + '/index.html');


})

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening to ${process.env.PORT || 3000}`);
})