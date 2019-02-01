import React, { Component } from 'react';
import { WebView, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {getUserName, loginTrello} from "./backend/backendController";

class LoginWebView extends Component {

  constructor(props){

    super(props);

    this.state = {
      url: "",
    };
  }

  componentDidMount(){

  }

  render() {
    const url = this.props.url;
    console.log("URL SET IS: " + url);
    let jsCode = `
        window.postMessage("Message from webView");
    `;

    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{uri: url }}
        onNavigationStateChange={(event) => {
          if(event.url.includes("result")){
            var n = event.url.lastIndexOf('/');
            var result = event.url.substring(n + 1);
            getUserName(result).then((response) => {
              this.props.setUserId(result, response._value);
              Actions.login();
            });
          }
        }}
      />
    );
  }
}

export default LoginWebView;