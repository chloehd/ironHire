import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";

class AddJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      salary: "",
      educationLevel: "",
      description: "",
      contractType: "",
      location: "",
      createdAt: "",
      deadline: "",
      owner: "recruiter",
      isSubmitSuccessful: false,
    }
  }



  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/recruiter/add-job",
      {
        name: this.state.name,
        salary: this.state.salary,
        educationLevel: this.state.educationLevel,
        description: this.state.description,
        contractType: this.state.contractType,
        location: this.state.location,
        createdAt: this.state.createdAt,
        deadline: this.state.deadline,
        owner: this.state.owner.name,
      },
      { withCredentials: true }
    )
      .then(response => {
        console.log("Add Job", response.data);
        this.setState({ isSubmitSuccessful: true });
      })
      .catch(err => {
        console.log("Add Job ERROR", err);
        alert("Sorry! Something went wrong. AddJob52")
      });
  }

  logoutClick() {
    axios
      .delete(process.env.REACT_APP_SERVER_URL + "/api/logout", {
        withCredentials: true
      })
      .then(() => {
        this.syncCurrentUser(null);
      })
      .catch(err => {
        console.log("Logout ERROR", err);
      });
  }


  render() {
    if (this.state.isSubmitSuccessful) {
      return <Redirect to="/recruiter" />
    }

    return (
      <section className="AddJob">
        <header className="row fixNavBar">
          <nav>
            <a href="/recruiter">ALL CANDIDATES</a>
            <a href="/recruiter/add-job">ADD A JOB</a>
            <a className="linkHome" href="/logout" onClick={() => this.logoutClick()}>LOGOUT</a>
          </nav>
        </header>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Job's name:
            <input value={this.state.name}
              onChange={event => this.genericSync(event)}
              type="text" name="name" placeholder="Communication officer" />
          </label>

          <label>
            Salary:
            <input value={this.state.salary}
              onChange={event => this.genericSync(event)}
              type="number" name="salary" placeholder="30K" />
          </label>

          <label>
            Education Level:
            <input value={this.state.educationLevel}
              onChange={event => this.genericSync(event)}
              type="text" name="educationLevel" placeholder="Bachelor required" />
          </label>

          <label>
            Description:
            <input value={this.state.description}
              onChange={event => this.genericSync(event)}
              type="text" name="description" placeholder="As a communication officer, you will have to..." />
          </label>

          <label>
            Contract Type:
            <input value={this.state.contractType}
              onChange={event => this.genericSync(event)}
              type="text" name="contractType" placeholder="6 months contract" />
          </label>

          <label>
            Location:
            <input value={this.state.location}
              onChange={event => this.genericSync(event)}
              type="text" name="location" placeholder="London" />
          </label>

          <label>
            Deadline:
            <input value={this.state.deadline}
              onChange={event => this.genericSync(event)}
              type="date" name="deadline" placeholder="London" />
          </label>

          <button className="waves-effect waves-light btn-small indigo lighten-1">Add a job offer</button>

        </form>
      </section>
    )
  }
}

export default AddJob;