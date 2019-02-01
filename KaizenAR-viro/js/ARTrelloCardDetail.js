'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  ViroNode,
  ViroText,
  ViroFlexView,
  ViroImage,
} from 'react-viro';
import {getCardMembers, getCardDueDate, getCheckLists, getTimeLineGraph} from "./backend/backendController";

class Checkbox extends Component {
  constructor(props) {
   super(props);
   this.state = {
     stateComplete: "lala"
   };
   this.onClick = this.onClick.bind(this);
 }
 componentDidMount(){
   this.setState({stateComplete: this.props.state});
 }
  onClick(position, source){
   if(this.state.stateComplete === "complete") {
     this.setState({stateComplete: 'incomplete'});
   } else {
     this.setState({stateComplete: 'complete'});
   }
 }
  render(){
    let ret = null;
   console.log(this.state.stateComplete);
   if(this.state.stateComplete === "complete"){
     ret =
       <ViroImage
         style={styles.prodDescriptionText}
         source={require("./res/complete.jpg")}
         onClick={this.onClick}
         scale= {[0.5, 0.5, 0.5]}
       />;
   } else {
     ret =
       <ViroImage
         style={styles.prodDescriptionText}
         source={require("./res/incomplete.jpg")}
         onClick={this.onClick}
         scale= {[0.5, 0.5, 0.5]}
       />;
   }
   return (ret);
 }
}

class ARTrelloCardDetail extends Component {

  constructor() {
    super();
    this.state = {
      cardPosition: [-4, -0.5, 0],
      members:[],
      membersLoaded: false,
      dueDate:"",
      dueDateLoaded: false,
      checkLists: [],
      checkListsLoaded: false,
      timeLineGraph: "Loading...",
      timeLineGraphLoaded: false,
    };

    this.onClickComment = this.onClickComment.bind(this);
  }

  componentDidMount() {
    getCardMembers(this.props.cardId).then((response) => {
      this.setState({
        members: response,
        membersLoaded: true
      });
    });

    getCardDueDate(this.props.cardId).then((response) => {
      this.setState({
        dueDate: response._value,
        dueDateLoaded: true
      });
    });

    getCheckLists(this.props.cardId).then((response) => {
      this.setState({
        checkLists: response,
        checkListsLoaded: true
      });
    });

    getTimeLineGraph(this.props.cardId).then((response) => {
      this.setState({
        timeLineGraph: response,
        timeLineGraphLoaded: true
      });
    });
  }

  onClickComment(){
    console.log("Load comment module");
    Actions.commentModal();
  }

  render() {

    let checkLists = (
      this.state.checkLists.map ((n, i) => {
        return(
          <ViroFlexView style={{flexDirection: 'column'}} height={4} width={3}>
            <ViroFlexView style={{flexDirection: 'column'}} height={0.7} width={3}>
              <ViroText style={styles.prodDescriptionText} text={n.name + ": "}/>
            </ViroFlexView>
            {this.state.checkLists[i].checkItems.map((m, j) => {
              return (
                <ViroFlexView style={{flexDirection: 'row'}} height={0.7} width={3}>
                  <Checkbox state={m.state} />
                  <ViroText style={styles.prodDescriptionText} text={
                    m.name
                  }/>
                </ViroFlexView>
              );
            })}
          </ViroFlexView>
        );
      })
    );

    // var dateStr = () => {
    //
    //   var today = (new Date()).toLocaleDateString();
    //
    //   if (this.state.dueDate == null) {
    //     return "No Due Date";
    //   } else {
    //     return "Due Date"
    //     //return this.state.dueDate;
    //   }
    // };

    var dateStr = "";

    var today = (new Date()).toLocaleDateString();

    if (this.state.dueDate == null) {
        dateStr = "No Due Date";
    } else {
      var diff = Math.round((new Date(this.state.dueDate.slice(0, 19)).getTime() - new Date().getTime())/(1000*60*60*24));
      if (diff < 0) {
        dateStr = "Overdue for " + (0 - diff) + " days!!"
      } else {
        dateStr = diff + " days until deadline!!"
      }
    }

    return (
      <ViroNode position={this.props.cardViewPosition}>
        <ViroFlexView style={styles.titleContainer} height={9} width={3}>
        <ViroFlexView style={{flexDirection: 'column'}}  height={0.5} width={3}>
          <ViroFlexView style={{flexDirection: 'row'}} height={0.5} width={3}>
            <ViroText
              style={styles.prodDescriptionText}
              text="Dummy Card 1"
              />
          </ViroFlexView>
        </ViroFlexView>
          <ViroFlexView style={{flexDirection: 'column'}} >
            <ViroImage
              height={3}
              width={3}
              onClick={this.onClickComment}
              source={(this.state.timeLineGraphLoaded) ? {uri: this.state.timeLineGraph} : require("./res/Logo.png")}
            />
          </ViroFlexView>
          <ViroFlexView style={{flexDirection: 'column'}}  height={0.5} width={3}>
            <ViroFlexView style={{flexDirection: 'row'}} height={0.5} width={3}>
              <ViroText
                style={styles.prodDescriptionText}
                text={dateStr}
                />
            </ViroFlexView>
          </ViroFlexView>
          <ViroFlexView style={{flexDirection: 'column'}} height={1} width={3}>
            <ViroFlexView style={{flexDirection: 'row'}} height={0.7} width={3}>
              <ViroText
                style={styles.prodDescriptionText}
                text="Members: "
              />
              <ViroFlexView style={{flexDirection: 'row'}} height={0.7} width={2}>{
                (this.state.membersLoaded) ? (
                  this.state.members.map((n, i) => {
                      return (<ViroText style={styles.memberNameText} text={this.state.members[i].fullName}/>);
                  })
                ) : null
              }
              </ViroFlexView>
            </ViroFlexView>
            {(this.state.checkListsLoaded) ? checkLists : null}
          </ViroFlexView>
        </ViroFlexView>
      </ViroNode>
    );
  }
}


var styles = StyleSheet.create({
  prodDescriptionText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    color: '#222222',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: "#c0c0c0",
  },
  memberNameText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    color: '#222222',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 0.2,
  },
  cardBack: {
    flexDirection: 'column',
    backgroundColor: "#c0c0c0",
    display: 'none',
  }
});

module.exports = ARTrelloCardDetail;
