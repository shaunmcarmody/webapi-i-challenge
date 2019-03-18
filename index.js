// implement your API here
const express = require('express');
const db = require('./data/dj.js');
const server = express();
server.use(express.json());

// POST	/api/users

server.post('/api/users', (req, res) => {
  const user = req.body;

  if (!user.name || !user.bio) {
    res
      .json(400)
      .end({ errorMessage: "Please provide name and bio for the user." });
  }

  db.insert(user)
    .then(user => {
      res
        .status(200)
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
  const { id } = req.body;
  db.findById(id)
    .then(user => {
      res
        .status(200)
        .json(user)
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});


// DELETE	/api/users/:id


server.delete('/api/users/:id', (req, res) => {
  const { id } = req.body;
  db.remove(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res
          .status(200)
          .json(user.length)
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
  const { id } = req.body;
  const user = req.body;

  if (!user.name || !user.bio) {
    res
      .status(400)
      .end({ errorMessage: "Please provide name and bio for the user." });
  }

  db.findById(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        db.update(id, user)
          .then(updatedUser => {
            res
              .status(200)
              .json(updatedUser)
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: "The user information could not be modified." });
          })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could be found (catch)." });
    });
});