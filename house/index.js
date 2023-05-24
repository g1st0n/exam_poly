const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const db = require('./models');
const houseSchema = require('./housescheme');
const houseResolver = require('./houseResolver');

const app = express();
const port = 5000;

app.use('/graphql', graphqlHTTP({
  schema: houseSchema,
  rootValue: houseResolver,
  graphiql: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/houses', (req, res) => {
  houseResolver.getAllHouses().then((houses) => {
    res.json(houses);
  }).catch((err) => {
    res.status(400).json({ "error": err.message });
  });
});

app.get('/house/:id', (req, res) => {
  houseResolver.getHouseById({ id: req.params.id }).then((house) => {
    res.json(house);
  }).catch((err) => {
    res.status(400).json({ "error": err.message });
  });
});

app.post('/house', (req, res) => {
  houseResolver.addHouse(req.body).then((house) => {
    res.json(house);
  }).catch((err) => {
    res.status(400).json({ "error": err.message });
  });
});

app.put('/house/:id', (req, res) => {
  houseResolver.updateHouse({ id: req.params.id, ...req.body }).then((house) => {
    res.json(house);
  }).catch((err) => {
    res.status(400).json({ "error": err.message });
  });
});

app.delete('/house/:id', (req, res) => {
  houseResolver.deleteHouse({ id: req.params.id }).then((house) => {
    res.json(house);
  }).catch((err) => {
    res.status(400).json({ "error": err.message });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
