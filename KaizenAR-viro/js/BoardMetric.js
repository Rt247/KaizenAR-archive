'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroNode,
  ViroText,
  ViroFlexView,
  ViroImage,
} from 'react-viro';
import {getColumnCountGraph, getPerformanceGraph} from "./backend/backendController";

class BoardMetric extends Component {

  constructor() {
    super();
    this.state = {
      graph: "Loading...",
      graphLoaded: false,
      cardLoaded: false,
      cards: [{
        cardName: "Loading....", cardId: "Loading...."
      }],
    };
  }



componentDidMount() {

    switch(this.props.graphType){
      case "Column Count":
        getColumnCountGraph(this.props.boardId).then((response) => {
          this.setState({
            graph: response,
            graphLoaded: true
          });
        });
        break;
      default:
        getPerformanceGraph(this.props.boardId).then((response) => {
          this.setState({
            graph: response,
            graphLoaded: true
          });
        });
    }
  }

  render() {

    return (
      <ViroNode position={this.props.graphViewPosition}>
        <ViroFlexView style={styles.titleContainer} height={4} width={4}>
          <ViroFlexView style={{flexDirection: 'column'}} >
            <ViroImage
              height={4}
              width={4}
              source={(this.state.graphLoaded) ? {uri: this.state.graph} : require("./res/Logo.png")}
            />
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
    backgroundColor: "#ffffdd",
  },
});

module.exports = BoardMetric;
