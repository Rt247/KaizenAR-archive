'use strict';

import React, {Component} from 'react';
import {
  ViroNode,
  ViroText,
  ViroFlexView
} from 'react-viro';
import {getLabels} from './backend/backendController';
import {StyleSheet} from "react-native";

class ARTrelloList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      labels: [{id: "Loading..", name: "Loading..", color: "Loading.."}],
      labelsLoaded: false,
      labelClick: false,
      labelObj: {id: "Loading..", name: "Loading..", color: "Loading.."}
    };

    this.clickList = this.clickList.bind(this);
  }

  componentDidMount() {
    getLabels().then((response) => {
      console.log(response);
      this.setState({
        labels: response,
        labelsLoaded: true});
    });
  }

  clickList(position, source, labelObj) {
    this.setState({listClick: true, labelObj: labelObj});
    if(this.state.labelsLoaded){
      this.props.setLabelID(labelObj.id);
      this.props.setMenuOption("Main Menu");
      this.props.setLabelName(labelObj.name);
    }
  }

  render() {


    const cardHeight = 0.4;
    const cardWidth = 2.5;
    const charLimit = 25;
    let styleSizeCard = styles.prodDescriptionText;

    return (
      <ViroNode
        position={this.props.disArr}
      >
        {
          (this.state.labelsLoaded) ? (
            this.state.labels.map((n, i) => {

              if(n.name !== undefined && n.name.length > charLimit){
                styleSizeCard = styles.prodDescriptionTextSmall;
              } else {
                styleSizeCard = styles.prodDescriptionText;
              }

              return (
                <ViroFlexView
                  position={[0, (-0.5 * (i)), 0]}
                  style={{flexDirection: "column", backgroundColor: n.color === "sky" ? "lightblue" : n.color}}
                  height={0.4}
                  width={1.75}
                  key={n.id}
                  onClick={(pos, src, labelObj = n) => this.clickList(pos, src, labelObj)}>
                  <ViroText
                    style={styleSizeCard}
                    text={n.name}
                    key={n.id}
                  />
                </ViroFlexView>);
            })
          ) : null
        }
      </ViroNode>
    );
  }
}

module.exports = ARTrelloList;


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
  prodDescriptionTextSmall: {
    fontFamily: 'sans-serif-light',
    fontSize: 10,
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