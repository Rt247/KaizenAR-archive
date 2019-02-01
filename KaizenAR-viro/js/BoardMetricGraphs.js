'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroNode,
  ViroText,
  ViroFlexView,
} from 'react-viro';

class BoardMetricGraphs extends Component {

  constructor() {
    super();
    this.state = {

    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.unsetBoardMetric();
  }

  onClick(graphType){

    if(graphType === "OverDue"){
      this.props.setMenuOption("Card Menu");
      this.props.setOverDueFlag(true);
      this.props.unsetBoardMetric();
    } else {
      this.props.setMenuOption("Main Menu");
      this.props.setGraphType(graphType);
      this.props.setBoardMetric();
    }
  }

  render() {

    const cardHeight = 0.4;
    const cardWidth = 2.5;

    return (
      <ViroNode position={this.props.disArr}>
        <ViroFlexView
          position={[0, 0, 0]} style={styles.titleContainer} height={cardHeight} width={cardWidth}
          onClick={() => this.onClick("Column Count")}
        >
          <ViroText
            style={styles.prodDescriptionText}
            text={"Card Per Column"}
          />
        </ViroFlexView>
        <ViroFlexView
          position={[0, -0.5, 0]} style={styles.titleContainer} height={cardHeight} width={cardWidth}
          onClick={() => this.onClick("Performance")}
        >
          <ViroText
            style={styles.prodDescriptionText}
            text={"Performance"}
          />
        </ViroFlexView>
        <ViroFlexView
          position={[0, -1.0, 0]} style={styles.titleContainer} height={cardHeight} width={cardWidth}
          onClick={() => this.onClick("OverDue")}
        >
          <ViroText
            style={styles.prodDescriptionText}
            text={"Over Due Tickets"}
          />
        </ViroFlexView>
      </ViroNode>
    );
  }
}


var styles = StyleSheet.create({
  prodDescriptionText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    flex: 1,
    color: '#222222',
    textAlignVertical: 'center',
    overflow: 'hidden',
    textAlign: 'center',
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: "rgba(245, 245, 245, 0.8)",
  }
});
module.exports = BoardMetricGraphs;
