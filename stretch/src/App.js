import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    form: {
      name: '',
      bio: '',
      id: null
    },
  }

  componentDidMount() {
    this.getUsers();
  }
  
  deleteUser = id => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        this.getUsers();
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUsers = () => {
    axios.get('http://localhost:5000/api/users')
    .then(res => {
      this.setState({
        users: res.data
      });
    })
    .catch(err => {
      console.log(err.message)
    });
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((state) => {
      return {
        form: {
          ...state.form,
          [name]: value
        }
      };
    });
  }

  submitForm = e => {
    e.preventDefault();
    const { id } = this.state.form;
    const user = {
      name: this.state.form.name,
      bio: this.state.form.bio,
    };
    id ? this.updateUser(id, user) : this.newUser(user);
    this.resetFormState();
  }

  newUser = user => {
    axios.post('http://localhost:5000/api/users/', user)
      .then(res => {
        this.getUsers();
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  resetFormState = () => {
    this.setState({
      form: {
        name: '',
        id: null,
        bio: ''
      }
    })
  }

  resetForm = e => {
    e.preventDefault();
    this.resetFormState();
  }

  populateForm = user => {
    this.setState({
      form: {
        name: user.name,
        bio: user.bio,
        id: user.id
      }
    })
  }

  updateUser(id, user) {
    axios.put(`http://localhost:5000/api/users/${id}`, user)
      .then(res => {
        this.getUsers();
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    return (
      <div className="App">
      <form
        onSubmit={this.submitForm}
      >
        <input
          onChange={this.handleChange}
          name="name"
          placeholder="name"
          value={this.state.form.name}
        />
        <input
          onChange={this.handleChange}
          name="bio"
          placeholder="bio"
          value={this.state.form.bio}
        />
        <button>{this.state.form.id ? 'Update' : 'Submit'}</button>
        <button
          onClick={this.resetForm}
        >
          Reset
        </button>
      </form>
      {
        this.state.users.map(user => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.bio}</p>
            <button
              onClick={() => this.deleteUser(user.id)}
            >
              Delete User
            </button>
            <button
              onClick={() => this.populateForm(user)}
            >
              Update User
            </button>
          </div>
        ))
      }
      </div>
    );
  }
}

export default App;
