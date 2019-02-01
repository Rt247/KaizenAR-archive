import React, { Component } from 'react';
import {View, RefreshControl, StyleSheet, ScrollView} from 'react-native';
import {getCardComments, postCardComment} from "./backend/backendController";
import CommentInput from "./CommentInput";
import CommentComponent from "./CommentComponent";


class CommentModal extends Component {

  constructor(props){
    super(props);

    this.state = {
      commentsLoaded: false,
      commentsLoading: false,
      comments: [{
        cardId: "Loading....", userId: "Loading....", userName: "Loading....", comment: "Loading....", date: "Loading..."
      }],
    };
    this.onPostSubmit = this.onPostSubmit.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
  }


  fetchComments(){
    this.setState({commentsLoading: true});

    getCardComments(this.props.cardId).then((response) => {
      this.setState({comments: response, commentsLoaded: true, commentsLoading: false});
    });
  }

  componentWillMount(){
    this.fetchComments();
  }

  onRefresh(){
    this.fetchComments();
  }

  onPostSubmit(commentData) {

    this._scrollView.scrollTo({y: 0});

    postCardComment(this.props.cardId, commentData).then((response) => {
      console.log(response);
      let newComments = this.state.comments;

      let date = new Date();

      newComments.unshift(
        {
          cardId: this.props.cardId,
          userId: this.props.currentMemberID,
          userName: this.props.currentMemberName,
          date: date.toDateString(),
          comment: commentData
        });
      this.setState({comments: newComments});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(scrollView) => this._scrollView = scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.commentsLoading}
              onRefresh={this.onRefresh}
            />
          }
        >
          {this.state.comments.reverse().map((comment, index) => <CommentComponent key={index} comment={comment}/>)}
        </ScrollView>
        <CommentInput onSubmit={(text) => this.onPostSubmit(text)} />

      </View>
    );
  }
}

export default CommentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  }
});

