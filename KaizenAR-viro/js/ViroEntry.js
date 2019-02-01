import React, { Component } from 'react';

import {
  ViroARSceneNavigator
} from 'react-viro';

const sharedProps = {
  apiKey:"2960EB0C-18D5-49A0-9BE2-D418371F615D",
};

// Sets the default scene you want for AR and VR
import KaizenContainer from "./containers/KaizenContainer";

export default class ViroEntry extends Component {

  constructor() {
    super();
    this.state = {
      sharedProps : sharedProps
    };
  }

  render() {
    return (<ViroARSceneNavigator {...this.state.sharedProps}
                                  initialScene={{scene: KaizenContainer}} />);
  }
}

module.exports = ViroEntry;
