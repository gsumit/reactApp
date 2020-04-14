// this component for about page
import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

class About extends Component {
  render() {
    return (
      <div>
        <br />
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            Technology is my passion and I am interested in using technology to
            solve complex and challenging problems that have high impact.
            <br /> I am constantly learning new programming languages,
            paradigms, technologies and frameworks. <br />
            Proficient in Java, Javascript, Python. <br />
            Contact: gsumitee@gmail.com
          </p>
        </Jumbotron>
      </div>
    );
  }
}
export default About;
