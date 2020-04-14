import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <br />
        <div className="card text-white  mb-3 d-inline-block">
          <div className="card-header bg-primary">About this website</div>
          <div className="card-body bg-secondary" style={{ height: "650px" }}>
            <li>
              This site was build using Create React App
              (https://facebook.github.io/create-react-app/).
            </li>
            <li>
              Express library was used to implement API layer using concepts of
              Routes/Controller/Model.
            </li>
            <li>The code is hosted on gitlab.</li>
            <br />
            <img
              alt="Diagram Dark Blue@2x_with_dotted_line"
              title="Diagram Dark Blue@2x_with_dotted_line"
              src="//d1.awsstatic.com/re19/Amplify-iOS-and-Amplify-Android/Diagram%20Dark%20Blue@2x_with_dotted_line.c39ef9ae9a18e4a9911d215fa32429a1baecb23f.png"
              width="200"
              align="left"
            />
            <li>
              It uses AWS Amplify to host the UI on AWS. Amplify is used to
              build scalable cloud-powered apps. It also can deploy and host web
              apps.
            </li>
            <li>
              For now I am using only the deploy feature of my github UI code. I
              connected my git repository to continuously deploy the changes.{" "}
            </li>
            <br />
            <br />
            Below are needed only if login page and Auth backend services are
            needed:
            <br />
            > npm install -g @aws-amplify/cli <br />
            > amplify configure <br />
            > amplify init <br />> npm install --save aws-amplify <br />> npm
            install --save aws-amplify-react
            <hr />
            <img
              alt="Diagram Dark Blue@2x_with_dotted_line"
              title="Diagram Dark Blue@2x_with_dotted_line"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/6/62/MySQL.svg/800px-MySQL.svg.png"
              width="200"
              align="left"
            />
            <li>MySql is used as a DB to store the state in DB permanently.</li>
            <li>It is hosted on the AWS.</li>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
