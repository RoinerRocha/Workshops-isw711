const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/fifapp");
const dbConnect = require('./mongodb');
const dbConnect2 = require('./mongodbp');
const mongodb = require('mongodb');
const mongodbp = require('mongodb');
const bodyParser = require("body-parser");
const Task = require("./tasksModel");
const TeamModel = require("./models/team");
const Player = require("./models/player");



const app = express();
app.use(bodyParser.json());
app.use(express.json())

// check for cors
app.use(cors({
  domains: '*',
  methods: "*"
}));


app.get('/tipocambio', function (req, res) {
  res.send(`{
    "TipoCompraDolares" : "608",
    "TipoVentaDolares" : "621",
    "TipoCompraEuros" : "731.85",
    "TipoVentaEuros" : "761.9"
  }`);
});


app.post('/team', function (req, res) {

  const team = new TeamModel.model();


  team.name = req.body.name;
  team.description = req.body.description;;
  if (team.name && team.description) {
    team.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the team', err);
        res.json({
          error: 'There was an error saving the team'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/team/?id=${team.id}`
      });
      res.json(team);
    });
  } else {
    res.status(422);
    console.log('error while saving the team')
    res.json({
      error: 'No valid data provided for team'
    });
  }
});

app.get('/', async(res,resp)=>{
  let data = await dbConnect();
  data = await data.find().toArray();
  resp.send(data);
})

app.delete("/:id", async (req, resp) => {
  console.log(req.params.id);
  const data = await dbConnect();
  const result = await data.deleteOne({ _id: new mongodb.ObjectId(req.params.id) })
  resp.send(result)
})

app.put("/:name", async (req, resp) => {
  console.log(req.body);
  const data = await dbConnect();
  let result = data.updateOne(
    { name: req.params.name },
    { $set: req.body  }
  )
  resp.send({ status: "updated" })
})

app.post('/player', function (req, res) {
  const player = new Player.model();
  player.first_name = req.body.first_name;
  player.last_name = req.body.last_name;
  player.age = req.body.age;

  //find the team
  console.log('team:', req.body.team);
  TeamModel.model.findById(req.body.team, (error,teamFound) => {
    console.log('error:',error);
    console.log('team:', teamFound);
    if(error) {

    }
    if (teamFound) {
      player.team = teamFound;
    }
  });


  if (player.first_name && player.last_name) {
    player.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the player', err);
        res.json({
          error: 'There was an error saving the player'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/player/?id=${player.id}`
      });
      res.json(player);
    });
  } else {
    res.status(422);
    console.log('error while saving the player')
    res.json({
      error: 'No valid data provided for player'
    });
  }
});

app.delete("/:id",async(req, resp)=>{
  console.log(req.params.id);
  const data = await dbConnect2();
  const result = await data.deleteOne({_id : new  mongodbp.ObjectId(req.params.id)})
    resp.send("result")
})
app.put("/:name", async (req, resp) => {
  console.log(req.body);
  const data = await dbConnect2();
  let result = data.updateOne(
    { name: req.params.name },
    { $set: req.body  }
  )
  resp.send({ status: "updated" })
})


app.listen(3000, () => console.log(`Example app listening on port 3000!`))
