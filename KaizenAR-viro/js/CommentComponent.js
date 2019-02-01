import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Comment extends Component {

  constructor(props){
    super(props);

    this.state = {

    };
  }

  // comments: [{
  //   cardId: "Loading....", userId: "Loading....", userName: "Loading....", comment: "Loading...."
  // }],

  render(){

    return (
      <View style={styles.container}>
        {/*<View style={styles.avatarContainer}>*/}
          {/*{*/}
            {/*this.props.avatar && <Image*/}
              {/*resizeMode='contain'*/}
              {/*style={styles.avatar}*/}
              {/*source={{uri: this.props.avatar}}*/}
            {/*/>*/}
          {/*}*/}
        {/*</View>*/}
        <View style={styles.contentContainer}>
          <Text>
            <Text style={[styles.text, styles.name]}>{this.props.comment.userName}</Text>
            {' '}
            <Text style={styles.text}>{this.props.comment.comment}</Text>
          </Text>
          <Text style={[styles.text, styles.created]}> {this.props.comment.date}</Text>
        </View>
      </View>
    );
  }
}

export default Comment;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 13,
    width: 26,
    height: 26,
  },
  text: {
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: '#BBB',
  },
});


