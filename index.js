// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();
server.use(express.json());

// POST	/api/users
server.post('/api/users', (req, res) => {
  const user = req.body;

  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  db.insert(user)
    .then(user => {
      res
        .status(201)
        .json(user)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error while saving the user to the database" });
    });
});


// GET	/api/users
server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res
        .status(200)
        .json(users)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});


// GET	/api/users/:id
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res
          .status(200)
          .json(user)
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    });
});


// DELETE	/api/users/:id
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res
          .status(200)
          .json(user)
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user could not be removed" });
    });
});


// PUT	/api/users/:id
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

 if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  db.update(id, user)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." })
      } else {
        res
          .status(200)
          .json(user)
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

server.listen(5000, () => {
  console.log('Server listening on Port 5000');
});