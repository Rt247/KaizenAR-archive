'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
    ViroNode,
    ViroText,
    ViroFlexView,
} from 'react-viro';
import {getFilteredCardMap, getOverdueTicketCard} from "./backend/backendController";

class ARTrelloCard extends Component {

    constructor() {
        super();
        this.state = {
          cardLoaded: false,
          cards: [{
            cardName: "Loading....", cardId: "Loading....", dueDate: "Loading...."
          }],
          cardClick: false,
          cardObj: {
            cardName: "Loading....", cardId: "Loading....", dueDate: "Loading...."
          },
        };
        this.onClick = this.onClick.bind(this);
    }


    componentDidMount() {

      if(this.props.overDueFlag){
        getOverdueTicketCard(this.props.boardId).then((response) => {
          this.setState({cards: response, cardLoaded: true});
        });
      } else {
        getFilteredCardMap(this.props.listID , this.props.labelID).then((response) => {
          this.setState({cards: response, cardLoaded: true});
        });
      }

      this.props.unsetBoardMetric();
    }

    onClick(position, source, cardObj){
      this.setState({cardClick: true, cardObj: cardObj});
      if(this.state.cardLoaded){
        //Dispatch action for cardId
        this.props.unsetCardId();
        this.props.setMenuViewName(cardObj.cardName);
        this.props.setMenuOption("Main Menu");
        this.props.setCardId(cardObj.cardId);
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
                (this.state.cardLoaded && this.props.listSet)? (
                  this.state.cards.map((n, i) => {


                    if(n.cardName !== undefined && n.cardName.length > charLimit || this.props.overDueFlag){
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
                        key={n.cardId}
                        onClick={(pos, src, cardObj = n) => this.onClick(pos, src, cardObj)}>
                        <ViroText
                          style={styleSizeCard}
                          text={(this.props.overDueFlag) ? `${n.cardName} was due on ${n.dueDate}` : n.cardName}
                          key={n.cardId}
                        />
                      </ViroFlexView>);
                  })
                ) : null
              }
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
module.exports = ARTrelloCard;