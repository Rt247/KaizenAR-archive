'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
    ViroARScene,
    ViroText,
    ViroConstants,
    ViroBox,
    ViroMaterials,
    Viro3DObject,
    ViroAmbientLight,
    ViroSpotLight,
    ViroARImageMarker,
    ViroARTrackingTargets,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  componentDidMount() {
    return fetch('http://ec2-35-178-8-185.eu-west-2.compute.amazonaws.com:8080/trello/getBoardName/SkS6g4qa')
     .then((response) => {
       response.json().then(body => this.setState({
         text: body._value,
       }));
     })
     .catch((error) =>{
       console.error(error);
     });
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroARImageMarker target={"poster"}>
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} />
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                require('./res/emoji_smile/emoji_smile_normal.png'),
                require('./res/emoji_smile/emoji_smile_specular.png')]}
            position={[-.5, .5, -1]}
            scale={[.2, .2, .2]}
            type="VRX" />
        </ViroARImageMarker>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    // if (state == ViroConstants.TRACKING_NORMAL) {
    //   this.setState({
    //     text : "Hello World!"
    //   });
    // } else if (state == ViroConstants.TRACKING_NONE) {
    //   // Handle loss of tracking
    // }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroARTrackingTargets.createTargets({
    poster : {
        source : require('./res/trello-logo.png'),
        orientation : "Up",
        physicalWidth : 0.3 // real world width in meters
    }
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/trello-logo.jpg'),
  },
});

module.exports = HelloWorldSceneAR;
