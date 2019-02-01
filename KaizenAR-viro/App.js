import React, { Component } from 'react';
import { Router, Scene, Modal } from 'react-native-router-flux';
import ViroEntry from "./js/ViroEntry";
import LoginContainer from "./js/containers/LoginContainer";
import CommentContainer from "./js/containers/CommentContainer";
import HelpContainer from "./js/containers/HelpContainer";
import KaizenImprovContainer from "./js/containers/KaizenImprovContainer";
import LoginWebContainer from "./js/containers/LoginWebContainer";


class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Router>
        <Modal hideNavBar>
          <Scene key="root">
            <Scene
              key="login"
              component={LoginContainer}
              title="Login"
              initial
            />
            <Scene
              key="viro"
              component={ViroEntry}
              title="Kaizen AR"
            />

            <Scene
              key="loginwebview"
              component={LoginWebContainer}
              title="LoginBrowser"
            />
            <Scene
              key="improvement"
              component={KaizenImprovContainer}
              title="Kaizen Improvement"
            />
            <Scene
              key="help"
              component={HelpContainer}
              title="Help Page"
            />
            <Scene
              key="commentModal"
              component={CommentContainer}
              title="Comments"
            />
          </Scene>
        </Modal>
      </Router>
    );
  }
}

export default App;
