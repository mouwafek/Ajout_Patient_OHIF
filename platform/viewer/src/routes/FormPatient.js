import React, { Component } from 'react';

import './FormPatient.css';

import axios from 'axios';

class FormPatient extends Component {

  constructor() {

    super();

    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      nom: '',
      prenom: '',
      genre: '',
      genres: ['Select gender', 'male', 'female'],
      date: '',
      formErrors: {
        nom: '',
        prenom: '',
        genre: '',
        date: '',
      },
      errors: {},
    };
  }
  onChangeNom(e) {
    this.setState({
      nom: e.target.value,
    });
  }
  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value,
    });
  }
  onChangeGenre(e) {
    this.setState({
      genre: e.target.value,
    });
  }
  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
  }
  onSubmit = e => {
    e.preventDefault();

    axios.post('http://localhost:3001/Patient/ajouter', {
      nom: this.state.nom,
      prenom: this.state.prenom,
      genre: this.state.genre,
      date: this.state.date,
    })
      .then(res => {
        if (res) {
          console.log();
         // window.location.reload('/studylist');
      window.location = '/patients';
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      nom: '',
      prenom: '',
      genre: '',
      date: '',
    });
  };

  render() {
    return (
      <div>
        <form className="box" onSubmit={this.onSubmit}>
          <h1>Add a new patient</h1>
          <input
            type="text"
            name="nom"
            value={this.state.nom}
            onChange={this.onChangeNom}
            placeholder="First Name..." />
          <br />
          <input
            type="text"
            name="prenom"
            value={this.state.prenom}
            onChange={this.onChangePrenom}
            placeholder="Last Name..." />
          <br />
          <input
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.onChangeDate} />
          <br />
          <select
            defaultValue="Select Gender"
            name="genre"
            value={this.state.genre}
            onChange={this.onChangeGenre}
          >
            {this.state.genres.map((genre, index) => {
              return (
                <option key={index} value={genre}>
                  {genre}
                </option>
              );
            })}
          </select>
          <br />
          <label class="patient-files">
            <input type="file" />
            Custom Upload
          </label>
          <br />
          <input className="add-patient" type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default FormPatient;