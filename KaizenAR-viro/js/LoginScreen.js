import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button, Linking, WebView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Dimensions } from 'react-native';
import {vw, vh} from 'react-native-viewport-units';
import {getUserIdMapping, loginTrello} from "./backend/backendController";

import { copilot, walkthroughable, CopilotStep } from '@okgrow/react-native-copilot';
const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);
const WalkthroughableButton = walkthroughable(TouchableOpacity);


class LoginScreen extends Component {

  constructor(props){

    super(props);

    this.state = {
    };

    this.onPressAR = this.onPressAR.bind(this);
    this.onPressKaizenImprov = this.onPressKaizenImprov.bind(this);
    this.submitPin = this.submitPin.bind(this);
    this.loadHelp = this.loadHelp.bind(this);
  }


  componentDidMount() {
    if(this.props.firstLoad){
      this.props.start();
      this.props.setFirstLoad();
    }
  }



  submitPin(){
    loginTrello().then((response) => {
      this.props.setURL(response.url);
      Actions.loginwebview();
    });
  }

  loadHelp(){
    Actions.help();
  }

  onPressAR() {
    console.log(this.props.userId);
    console.log(this.props.userName);
    if(this.props.userId === "none"){
      alert("No user selected");
    } else {
      Actions.viro();
    }
  }

  onPressKaizenImprov() {
    Actions.improvement();
  }


  render() {
    return (
      <View style={styles.container}>

      <CopilotStep active={this.state.secondStepActive} text="Kaizen AR Logo" order={5} name="logo">
        <WalkthroughableImage source={require('./res/Logo.png')} style={styles.image}/>
      </CopilotStep>

        <Text style={styles.description}>
          Driving Efficiency
        </Text>


        <CopilotStep text="Enter the AR application" order={2} name="Enter AR">
          <WalkthroughableButton activeOpacity={this.disabled ? 1 : 0.7} onPress={this.onPressAR}>
            <View style={styles.button}>
              <Text  style={styles.buttonText}>
                {this.props.userId === "none" ? "ENTER AR" : `ENTER AR: ${this.props.userName}`}
              </Text>
            </View>
          </WalkthroughableButton>
        </CopilotStep>

        <CopilotStep text="View the Cross Project Kaizen Improvements" order={3} name="Kaizen Improvement">
          <WalkthroughableButton onPress={this.onPressKaizenImprov}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>KAIZEN IMPROVEMENT</Text>
            </View>
          </WalkthroughableButton>
        </CopilotStep>

        <CopilotStep text="Login using your Trello Login Credentials first!" order={1} name="Login">
          <WalkthroughableButton onPress={this.submitPin}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </View>
          </WalkthroughableButton>
        </CopilotStep>

        <CopilotStep text="User Guide for the Application" order={4} name="Help">
          <WalkthroughableButton onPress={this.loadHelp}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>HELP</Text>
            </View>
          </WalkthroughableButton>
        </CopilotStep>

      </View>
    );
  }
}

export default copilot({
  animated: false,
  overlay: 'view',
})(LoginScreen);

const styles = StyleSheet.create({
    description: {
        marginTop: 1 * vh,
        marginBottom: 3 * vh,
        fontSize: 18,
        textAlign: 'center',
        color: '#444444'
    },
    container: {
        padding: 5,
        marginTop: 0,
        alignItems: 'center',
    },
    searchInput: {
        height: 36,
        width: 150,
        padding: 4,
        marginRight: 5,
        marginBottom: 15,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    image: {
        resizeMode: 'cover',
        width: 80 * vw,
        height: 40 * vh,
    },
    button: {
        marginBottom: 3 * vh,
        alignItems: 'center',
        backgroundColor: '#9ef5f6',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 4, // Android
        justifyContent: 'center',
        borderRadius: 2,
        padding: 0
    },
    buttonText: {
        color: '#444444',
        fontSize: 20,
        textAlign: 'center',
        padding: 8,
        fontWeight: '500',
    },
});
