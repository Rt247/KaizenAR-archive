'use strict';

import React, {Component} from 'react';
import {
  ViroNode,
  ViroText,
  ViroFlexView
} from 'react-viro';
import {getFilteredListMap} from './backend/backendController';
import {StyleSheet} from "react-native";

class ARTrelloList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listLoaded: false,
      lists: [{
        listName: "Loading....", listId: "Loading...."
      }],
      listClick: false,
      listObj: {
        listName: "Loading....", listId: "Loading...."
      },
    };

    this.clickList = this.clickList.bind(this);
  }

  componentDidMount() {
    this.props.setOverDueFlag(false);
    console.log("List board ID: " + this.props.boardId);
    getFilteredListMap(this.props.boardId, "none").then((response) => {
      this.setState({lists: response, listLoaded: true});
    });
  }

  clickList(position, source, listObj) {
    this.setState({listClick: true, listObj: listObj});
    if(this.state.listLoaded){
      this.props.setListID(listObj.listId);
      this.props.setMenuOption("Card Menu");
      this.props.setMenuViewName(listObj.listName);
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
          (this.state.listLoaded) ? (
            this.state.lists.map((n, i) => {


              if(n.listName !== undefined && n.listName.length > charLimit){
                styleSizeCard = styles.prodDescriptionTextSmall;
              } else {
                styleSizeCard = styles.prodDescriptionText;
              }


              return (
                <ViroFlexView
                  position={[0, (-0.5 * (i)), 0]}
                  style={styles.titleContainer}
                  height={cardHeight}
                  width={cardWidth}
                  key={n.listId}
                  onClick={(pos, src, listObj = n) => this.clickList(pos, src, listObj)}>
                  <ViroText
                    style={styleSizeCard}
                    text={n.listName}
                    key={n.listId}
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