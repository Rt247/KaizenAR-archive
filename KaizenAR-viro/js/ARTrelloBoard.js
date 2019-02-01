'use strict';

import React, {Component} from 'react';
import {
  ViroText,
  ViroNode,
  ViroFlexView
} from 'react-viro';

import {StyleSheet} from "react-native";
import {getBoardName, getBoardId, setBoardID} from "./backend/backendController";

class ARTrelloBoard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      boardList: [{boardName: "Loading...", boardId: "Loading...."}],
      boardNameLoaded: false,
      boardClick: false,
      boardObj: {boardName: "Loading...", boardId: "Loading...."},
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    getBoardId(this.props.currentMemberID).then((response) => {
      this.setState({boardList: response, boardNameLoaded: true});
    });
  }

  onClick(position, source, boardObj){
    this.setState({boardClick: true, boardObj: boardObj});
    if(this.state.boardNameLoaded){
      console.log("Setting boardId: " + boardObj.boardId);
      this.props.setMenuViewName(boardObj.boardName);
      this.props.setBoardName(boardObj.boardName);
      this.props.setBoardId(boardObj.boardId);
      setBoardID(boardObj.boardId);
      this.props.setMenuOption("List Menu");
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
          (this.state.boardNameLoaded)? (
            this.state.boardList.map((n, i) => {

              if(n.boardName !== undefined && n.boardName.length > charLimit){
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
                  key={n.boardId}
                  onClick={(pos, src, boardObj = n) => this.onClick(pos, src, boardObj)}>
                  <ViroText
                    style={styleSizeCard}
                    text={n.boardName}
                    key={n.boardId}
                  />
                </ViroFlexView>);
            })
          ) : null
        }
      </ViroNode>
    );
  }
}

module.exports = ARTrelloBoard;


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