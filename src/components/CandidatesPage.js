import React, { Component } from 'react';
import AllCandidates from "./AllCandidates.js";

class Candidates extends Component {
  constructor(props) {
  super (props);

  this.state = {
    itmes: [ ' ' ],
    isLoaded: false,
  }


  }

  

  ComponentDidMount() {
    fetch()
    .then(res => res.json())

  }

  render() {
    return (
      <section className="candidates">

      <h1>Welcome, candidates!</h1>



      
      <ul>
        <li>View Jobs</li>
        <li>Add a CV</li>
      </ul>

<AllCandidates/>

      </section>
    )
  }
}

export default Candidates;