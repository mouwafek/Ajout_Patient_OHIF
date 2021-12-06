import React, { Component } from 'react';
import axios from 'axios';
import './Patients.css';

const Patient = props => (
  <tr>
    <td>{props.patient.nom}</td>
    <td>{props.patient.prenom}</td>
    <td>{props.patient.genre}</td>
    <td><button>Generate report</button></td>
  </tr>
);

export default class PatientList extends Component {
  constructor(props) {
    super(props);

    this.state = { patients: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/Patient/')
      .then(response => {
        this.setState({ patients: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  patientList() {
    return this.state.patients.map(currentpatient => {
      return (
        <Patient
          patient={currentpatient}
          key={currentpatient._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Patients</h3>
        <table className="container">
          <thead>
            <tr>
              <th>Patient first name</th>
              <th>Patient last name</th>
              <th>Patient gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.patientList()}</tbody>
        </table>
      </div>
    )
  }
}
