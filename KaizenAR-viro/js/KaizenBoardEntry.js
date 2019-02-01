'use strict';

import React, {Component} from 'react';
import ARTrelloMenu from "./ARTrelloMenu.js";
import ARTrelloCardTimeline from "./ARTrelloCardTimeline.js";
import ARTrelloCardDetail from "./ARTrelloCardDetail.js";
import BoardMetric from "./BoardMetric.js";

import {
  ViroARScene,
  ViroConstants,
  ViroText,
  ViroFlexView,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroBox,
  ViroNode,
} from 'react-viro';
import {StyleSheet} from "react-native";
import {setMenuOption} from "./actions/mainActions";


class KaizenBoardEntry extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: "Initializing AR...!"
    };
    this.setMarker();
    this._onInitialized = this._onInitialized.bind(this);
  }

  setMarker() {
    ViroARTrackingTargets.createTargets({
      menumarker: {
        source: require('./res/trello.png'),
        orientation: "Up",
        physicalWidth: 0.18 // real world width in meters
      }
    });
  }




  componentDidMount() {

  }

  _onInitialized(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Kaizen Board Menu"
      });
    } else if (state === ViroConstants.TRACKING_NONE) {
      this.setState({
        text: "Lost Tracking"
      });
      // Handle loss of tracking
    }
  }

  render() {

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
          <ViroARImageMarker target={"menumarker"} pauseUpdates={true}>
        <ViroNode
           // position={[-1, -7, -1]} rotation={[-90, 0, 0]}
            // dragPlane={[[-1, -10, -1], [0, 1, 0], 3]}
            position={[0, 0, -5]} dragType="FixedDistance" onDrag={()=>{}} // rotation={[-90, 0, 0]
        >
          <ARTrelloMenu
            menuTitle={this.props.menuTitle}
            graphType={this.props.graphType}
            option={this.props.option}
            cardId={this.props.cardId}
            boardId={this.props.boardId}
            listID={this.props.listID}
            currentMemberID={this.props.currentMemberID}
            listSet={this.props.listSet}
            labelName={this.props.labelName}
            labelID={this.props.labelID}
            labelSet={this.props.labelSet}
            cardChosen={this.props.cardChosen}
            titlePicked={this.props.titlePicked}
            setMenuViewName={(title) => this.props.setMenuViewName(title)}
            setMenuOption={(option) => this.props.setMenuOption(option)}
            setListID={(listID) => this.props.setListID(listID)}
            setGraphType={(graphType) => this.props.setGraphType(graphType)}
            setLabelID={(labelID) => this.props.setLabelID(labelID)}
            setLabelName={(labelName) => this.props.setLabelName(labelName)}
            setCardId={(cardId) => this.props.setCardId(cardId)}
            setBoardName={(boardName) => this.props.setBoardName(boardName)}
            setBoardId={(boardId) => this.props.setBoardId(boardId)}
            unsetCardId={() => this.props.unsetCardId()}
            setBoardMetric={() => this.props.setBoardMetric()}
            setOverDueFlag={(flag) => this.props.setOverDueFlag(flag)}
            unsetBoardMetric={() => this.props.unsetBoardMetric()}
          />
        </ViroNode>

        {/*TODO Card Detail*/}
        <ViroNode
         // position={[-3,-13,-5]} rotation={[-90, 0, 0]}
          position={[-5, 0,-5]}
          dragType="FixedDistance" onDrag={()=>{}}
        >
          {this.props.cardChosen ? <ARTrelloCardDetail
            cardViewPosition={[0,0,0]}
            cardId={this.props.cardId}
            boardId={this.props.boardId}/> : null}

        </ViroNode>


        <ViroNode
          // position={[-3,-13,-3]} rotation={[-90, 0, 0]}
          position={[-5,0,-5]}
          dragType="FixedDistance" onDrag={()=>{}}

        >
          {this.props.boardMetricChosen ? <BoardMetric
            graphViewPosition={[0,0,0]}
            boardId={this.props.boardId}
            graphType={this.props.graphType}
           /> : null}

        </ViroNode>


        <ViroNode
          // position={[5, -5, 0]} rotation={[-90, 0, 0]}
          position={[5, 0, -5]}
          dragType="FixedDistance" onDrag={()=>{}}
        >
          {this.props.cardChosen ? <ARTrelloCardTimeline timelinePosition={[0,0,0]} cardId={this.props.cardId} boardId={this.props.boardId}/> : null}
        </ViroNode>
        </ViroARImageMarker>

      </ViroARScene>
    );
  }
}


module.exports = KaizenBoardEntry;

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

