import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class CommentInput extends Component {

  constructor(props){
    super(props);

    this.state = {
      text: undefined
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeText(text){
    this.setState({text});
  }

  onSubmit(){
    const text = this.state.text;
    if(text){
      this.setState({}, () => this.props.onSubmit(text));
    } else {
      alert("Enter a valid input");
    }
  }

  render(){

    return (
      <KeyboardAvoidingView
        behavior='position'
      >
        <View style={styles.container}>
          <TextInput
            placeholder="Add a comment..."
            keyboardType="twitter"
            autoFocus={true}
            style={styles.input}
            value={this.state.text}
            onChangeText={this.onChangeText}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.onSubmit}
          >
            <Text style={[styles.text, !this.state.text ? styles.inactive : []]}>
              POST
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default CommentInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    color: '#CCC',
  },
  text: {
    color: '#3F51B5',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 15,
  },
});