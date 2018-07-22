var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs("contactlist", ["contactlist"]);
var bodyParser = require("body-parser");
var http = require("http");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/contactlist", function(req, res) {
  db.contactlist.find(function(err, docs) {
    console.log(docs);
    res.json(docs);
  });
});
app.post("/contactlist", function(req, res) {
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete("/contactlist/:id", function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({ _id: mongojs.ObjectId(id) }, function(err, doc) {
    res.json(doc);
  });
});
app.get("/contactlist/:id", function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({ _id: mongojs.ObjectId(id) }, function(err, doc) {
    res.json(doc);
  });
});

app.put("/contactlist/:id", function(req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify(
    {
      Query: { _id: mongojs.ObjectId(id) },
      update: {
        $set: {
          name: req.body.name,
          email: req.body.email,
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          number: req.body.number,
        },
      },
      new: true,
    },
    function(err, doc) {
      res.json(doc);
    },
  );
});
const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = { server, db };
