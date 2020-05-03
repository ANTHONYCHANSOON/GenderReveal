const express = require("express");
const app = express();
const http = require("http");
const mysql = require("mysql");
const bodyparser = require("body-parser");

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));


if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {

    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "asdfasdf",
        database: "boygirl"
    })
}

connection.connect(function (err) {
    if (err) {
        console.error(err.stack);
        return
    }
    console.log("connected as id " + connection.threadId);
})

app.get("/", function (req, res) {
    connection.query("select * from boygirl", function (err, data) {
        console.log(data);
        res.render("home", {
            dbdata: data
        })
    })
})

app.post("/", function (req, res) {
    //console.log(req.body);

    if (req.body.voterName === "") {
        console.log("User didnt put Name")
    } else {

        let voterName = req.body.voterName;
        let voterVote = 1;

        if (req.body.vote === "true") {
            voterVote = 1;
        } else {
            voterVote = 0;
        }

        connection.query("insert into boygirl (name, boy) values (?, ?)", [voterName, voterVote], function (err, result) {
            if (err) {
                console.error(err)
            }
            res.redirect("/");
        })
    }
})

app.get("/names", function (req, res) {
    let girlName = [];
    let boyName = [];

    http.get("http://names.drycodes.com/10?nameOptions=girl_names", function (response) {
        response.on("data", function (data) {
            let parseData = JSON.parse(data);

            for (let i = 0; i < parseData.length; i++) {
                girlName.push(parseData[i]);
            }

            http.get("http://names.drycodes.com/10?nameOptions=boy_names", function (response) {
                response.on("data", function (data) {
                    let parseData = JSON.parse(data);

                    for (let i = 0; i < parseData.length; i++) {
                        boyName.push(parseData[i]);
                    }

                    res.render("names",
                        {
                            listofboy: boyName,
                            listofgirl: girlName
                        });
                })
            })
        })
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening to ${process.env.PORT || 3000}`);
})