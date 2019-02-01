'use strict';

import React, {Component} from 'react';
import ARTrelloBoard from "./ARTrelloBoard.js";
import ARTrelloLabel from "./ARTrelloLabel.js";
import BoardMetricGraphs from "./BoardMetricGraphs.js";
import MenuCardContainer from "./containers/MenuCardContainer.js";
import ARTrelloList from "./ARTrelloList.js";

import {
    ViroText,
    ViroNode,
    ViroFlexView,
} from 'react-viro';
import {StyleSheet} from "react-native";
//import {Actions} from "react-native-router-flux/index";
import {Actions} from "react-native-router-flux";


class ARTrelloMenu extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onClickComment = this.onClickComment.bind(this);

        this.state = {
            index: 0,
            displayBoard : false,
        };
    }

    componentDidMount() {

    }

    onClick(option){
        if(option === "Board Menu" || option === "Board Metric"){
            this.props.unsetCardId();
        }
        this.props.setMenuOption(option);
    }

    onClickComment(){
        console.log("Load comment module for : " + this.props.cardId);
        if(this.props.cardId !== "None"){
            Actions.commentModal();
        } else {
            alert("No Card Id chosen!");
        }
    }


    render() {

        const cardHeight = 0.4;
        const cardWidth = 2.5;
        const charLimit = 25;
        let styleSizeFilter = styles.prodDescriptionText;
        let styleSizeMenu = styles.prodDescriptionText;
        if(this.props.menuTitle !== undefined && this.props.menuTitle.length > charLimit){
            styleSizeMenu = styles.prodDescriptionTextSmall;
        }
        if(this.props.labelName !== undefined && this.props.labelName.length > charLimit){
            styleSizeFilter = styles.prodDescriptionTextSmall;
        }

        let mainMenu = (
            <ViroNode
                position={[0,0,0]}
            >
                <ViroFlexView
                    position={[0, -0.5, 0]}
                    style={styles.titleContainer}
                    height={cardHeight} width={cardWidth}
                    onClick={() => this.onClick("Filter Menu")}
                >
                    <ViroText
                        style={styleSizeFilter}
                        text={`${(this.props.labelSet) ? "Filter: " + this.props.labelName : "Filter Options"}`}
                    />
                </ViroFlexView>
                <ViroFlexView
                    position={[0, -1.0, 0]}
                    style={styles.titleContainer}
                    height={cardHeight} width={cardWidth}
                    onClick={() => this.onClick("Board Menu")}
                >
                    <ViroText
                        style={styleSizeMenu}
                        text={`${(this.props.titlePicked) ? "Search: " + this.props.menuTitle : "Search Options"}`}
                    />
                </ViroFlexView>
                <ViroFlexView
                    position={[0, -1.5, 0]}
                    style={styles.titleContainer}
                    height={cardHeight} width={cardWidth}
                    onClick={() => this.onClick("Board Metric")}
                >
                    <ViroText
                        style={styles.prodDescriptionText}
                        text={"Board Metric"}
                    />
                </ViroFlexView>
                <ViroFlexView
                    position={[0, -2.0, 0]}
                    style={styles.titleContainer}
                    height={cardHeight} width={cardWidth}
                    onClick={this.onClickComment}
                >
                    <ViroText
                        style={styles.prodDescriptionText}
                        text={"Card Comments"}
                    />
                </ViroFlexView>
            </ViroNode>
        );

        const mainComponent = (component => {
            switch (component) {
                case "Board Menu":
                    return <ARTrelloBoard
                        disArr={[0,-0.5,0]}
                        boardId={this.props.boardId}
                        currentMemberID={this.props.currentMemberID}
                        setMenuViewName={(title) => this.props.setMenuViewName(title)}
                        setBoardName={(boardName) => this.props.setBoardName(boardName)}
                        setBoardId={(boardId) => this.props.setBoardId(boardId)}
                        setMenuOption={(option) => this.props.setMenuOption(option)}
                    />;
                case "List Menu":
                    return <ARTrelloList
                        disArr={[0,-0.5,0]}
                        boardId={this.props.boardId}
                        setListID={(listID) => this.props.setListID(listID)}
                        setMenuViewName={(title) => this.props.setMenuViewName(title)}
                        setOverDueFlag={(flag) => this.props.setOverDueFlag(flag)}
                        setMenuOption={(option) => this.props.setMenuOption(option)}
                    />;
                case "Card Menu":
                    return <MenuCardContainer
                        listSet={this.props.listSet}
                        disArr={[0,-0.5,0]}
                        listID={this.props.listID}
                    />;
                case "Board Metric":
                    return <BoardMetricGraphs
                        setMenuOption={(option) => this.props.setMenuOption(option)}
                        setOverDueFlag={(flag) => this.props.setOverDueFlag(flag)}
                        setBoardMetric={() => this.props.setBoardMetric()}
                        unsetBoardMetric={() => this.props.unsetBoardMetric()}
                        setGraphType={(graphType) => this.props.setGraphType(graphType)}
                        disArr={[0,-0.5,0]}
                    />;
                case "Filter Menu":
                    console.log("Filter Menu");
                    return <ARTrelloLabel
                        disArr={[0,-0.5,0]}
                        setLabelID={(labelID) => this.props.setLabelID(labelID)}
                        setLabelName={(labelName) => this.props.setLabelName(labelName)}
                        setMenuOption={(option) => this.props.setMenuOption(option)}
                    />;
                case "Main Menu":
                //Fall Through
                default:
                    return mainMenu;
            }
        })(this.props.option);


        return (
            <ViroNode
                position={[1.5,0,0]}
            >

                <ViroFlexView position={[0, 0, 0]} style={styles.titleContainerMenu} height={cardHeight} width={cardWidth}>
                    <ViroText
                        style={styles.prodDescriptionText}
                        text={(this.props.option === "Main Menu") ? "Menu" : "Back"}
                        onClick={() => this.onClick("Main Menu")}
                    />
                </ViroFlexView>
                {mainComponent}
            </ViroNode>
        );
    }
}

module.exports = ARTrelloMenu;




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
    titleContainerMenu: {
        flexDirection: 'column',
        backgroundColor: "rgba(192, 192, 192, 0.8)",
    },
    titleContainer: {
        flexDirection: 'column',
        backgroundColor: "rgba(245, 245, 245, 0.8)",
    }
});