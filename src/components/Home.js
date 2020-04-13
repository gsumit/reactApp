import React, { Component } from "react";
class Home extends Component {
  render() {
    return (
      <div>
        <br />
        <div
          class="card text-white bg-primary mb-3 d-inline-block"
          style={{ "max-width": "20rem;" }}
        >
          <div class="card-header">My personal Webpages</div>
          <div class="card-body">
            <h4 class="card-title"></h4>
            <p class="card-text">
              This site was build using Create React App
              (https://facebook.github.io/create-react-app/). <br />
              The code is hosted on gitlab. It uses AWS Amplify to host the UI
              on AWS. <br />
              Amplify is used to build scalable cloud-powered apps. It also can
              deploy and host web apps. <br />
              For now I am using only the deploy feature of my github UI code. I
              connected my git repository to continuously deploy from changes.{" "}
              <br />
              > npm install -g @aws-amplify/cli <br />
              > amplify configure <br />
              > amplify init <br />> npm install --save aws-amplify <br />> npm
              install --save aws-amplify-react
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
