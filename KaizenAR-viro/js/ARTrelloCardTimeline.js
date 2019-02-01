'use strict';

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
    ViroNode,
    ViroText,
    ViroFlexView,
    ViroAnimations,
    ViroImage,
    ViroPolygon
} from 'react-viro';
import {getCardHistory, getBoardById} from "./backend/backendController";

class ARTrelloCardTimeline extends Component {

    constructor() {
        super();
        this.state = {
            historyLoaded: false,
            columnsLoaded: false,
            timelinePosition: [-7, 0, 0],
            cardInfo: "",
            columns: [],
            cardHistory: [],
            infoPanelText: "",
            barStyles: [],
            selected: [],
            widths: [],
            times: []
        };
        this.onClick = this.onClick.bind(this);
    }


    componentWillMount() {
        this.setState({
            timelinePosition: this.props.timelinePosition,
            cardId: this.props.cardId,
            columns: [],
            cardHistory: [],
            infoPanelText: "Tap on the graph components to interact with them.",
        });
        getCardHistory(this.props.cardId)
            .then((response) => {
                this.setState({
                    cardHistory: response,
                    historyLoaded: true
                });
            }).then(getBoardById(this.props.boardId)
            .then(response => {
                this.setState({
                    columns: response.map(x => x["name"]).reverse(),
                    selected: new Array(response.length).fill(false),
                    columnsLoaded: true
                });
            }))
    }


    createDiagram = (_h, w) => {
        if (!this.state.historyLoaded || !this.state.columnsLoaded) {
            return (<ViroFlexView style={styles.titleContainer} height={0.4} width={1.5}>
                <ViroText
                    text="Loading diagram..."
                />
            </ViroFlexView>)
        }

        let actions = this.state.cardHistory;
        let columns = this.state.columns;

        let h = _h * 5 / 6; // split into graph and panel

        let graphHeight = h * 3 / 4;
        let graphWidth = w * 2 / 3;

        let graph = this.createGraph(graphHeight, graphWidth, actions, columns);
        let xAxisWidth = w * 1 / 3;

        let xAxis = this.createXAxis(graphHeight, xAxisWidth, columns);
        let yAxisHeight = h / 8;
        let yAxis = this.createYAxis(yAxisHeight, graphWidth, w, xAxisWidth);

        let titleHeight = h / 8;
        let titlePadding = <ViroFlexView
            style={styles.emptyContainer}
            height={titleHeight}
            width={xAxisWidth}
        />;
        let title = <ViroFlexView
            style={styles.emptyContainer}
            height={titleHeight}
            width={w-xAxisWidth}
        >
            <ViroText
                style={styles.titleStyle}
                height={titleHeight}
                width={w-xAxisWidth}
                text="Timeline of column movement"
            />
        </ViroFlexView>;

        let panelHeight = h / 5;
        let panel = this.createInfoPanel(panelHeight, w, graphWidth);

        return <ViroFlexView style={styles.diagramContainer} height={h} width={w}>
            {titlePadding}
            {title}
            {xAxis}
            {graph}
            {yAxis}
            {panel}
        </ViroFlexView>

    };

    createInfoPanel = (panelHeight, panelWidth, graphWidth) => {
        let padding = <ViroFlexView
            style={styles.emptyContainer}
            height={panelHeight}
            width={panelWidth-graphWidth}
        />;

        let textBox = <ViroFlexView
            style={styles.emptyContainer}
            height={panelHeight}
            width={graphWidth}
        >
            <ViroText
                text={this.state.infoPanelText}
                style = {styles.infoTextStyle}
                height={panelHeight}
                width={graphWidth}
                textAlignVertical='center'
            />
        </ViroFlexView>;

        return <ViroFlexView style={styles.infoPanelContainer} height={panelHeight} width={panelWidth}>
            {padding}
            {textBox}
        </ViroFlexView>;
    };

    createXAxis = (graphHeight, xAxisWidth, columns) => {
        let halfWidth = xAxisWidth / 2;
        let labels = [];
        labels.push(
            <ViroFlexView
                style={styles.emptyContainer}
                height={graphHeight}
                width={halfWidth}
            >
                <ViroText
                    text="Columns"
                    color = "#000000"
                    height={graphHeight}
                    width={halfWidth}
                    textAlignVertical='center'
                />
            </ViroFlexView>
        );
        let lineWidth = halfWidth / 15;
        for (let i = 0; i < columns.length; i++) {
            labels.push(
                <ViroFlexView
                    style={styles.emptyContainer}
                    height={graphHeight/columns.length}
                    width={halfWidth - lineWidth}
                >
                    <ViroText
                        color = "#000000"
                        text={columns[i]}
                        height={graphHeight/columns.length}
                        width={halfWidth - lineWidth}
                    />
                </ViroFlexView>
            );
        }
        let line =
            <ViroFlexView
                style={styles.lineStyle}
                height={graphHeight}
                width={lineWidth}
            />;
        return <ViroFlexView style={styles.xAxisContainer} height={graphHeight} width={xAxisWidth}>
            {labels}
            {line}
        </ViroFlexView>;
    };

    createYAxis = (yAxisHeight, graphWidth, w, xAxisWidth) => {
        let lineHeight = xAxisWidth / 30;
        let lineWidth = graphWidth + lineHeight;
        let children = [];
        let linePadding = <ViroFlexView
            style={styles.emptyContainer}
            height={lineHeight}
            width={w-lineWidth}
        />;
        let line = <ViroFlexView
            style={styles.lineStyle}
            height={lineHeight}
            width={lineWidth}
        />;
        children.push(linePadding);
        children.push(line);
        let textHeight = yAxisHeight - lineHeight;
        let textPadding = <ViroFlexView
            style={styles.emptyContainer}
            height={textHeight}
            width={xAxisWidth}
        />;
        let label =
            <ViroFlexView
                style={styles.emptyContainer}
                height={textHeight}
                width={graphWidth}
            >
                <ViroText
                    text="Time spent"
                    color = "#000000"
                    height={textHeight}
                    width={graphWidth}
                />
            </ViroFlexView>;
        children.push(textPadding);
        children.push(label);

        return <ViroFlexView style={styles.yAxisContainer} height={yAxisHeight} width={w}>
            {children}
        </ViroFlexView>;
    };

    onClick(pos, src, index, columnTimes) {
        let selected = this.state.selected;
        console.log("clicked", index, selected[index]);
        if (selected[index]) {
            selected[index] = false;
            this.setState({
                selected: selected,
                infoPanelText: "Tap on the graph components to interact with them."
            })
        } else {
            let ms = columnTimes[index];
            let t;
            if (ms > 86400000) {
                t = (ms / 86400000).toFixed(1) + " days"
            } else if (ms > 3600000) {
                t = (ms / 3600000).toFixed(1) + " hours"
            } else if (ms > 60000) {
                t = (ms / 60000).toFixed(0) + " minutes"
            } else if (ms > 1000) {
                t = (ms / 1000).toFixed(0) + " seconds"
            } else {
                t = ms + " milliseconds"
            }
            let text = "This ticket has spent " + t + " in column " + this.state.columns[index];

            let newSelected = new Array(selected.length).fill(false);
            newSelected[index] = true;
            this.setState({
                selected: newSelected,
                infoPanelText: text
            });
            console.log(text);
        }
    };

    createGraph = (graphHeight, graphWidth, actions, columns) => {
        let firstDate = Date.parse(actions[0].date);
        let finalDate = Date.parse(actions[actions.length - 1].date);
        let datePadding = finalDate + 3600000; // 1 hour padding time at the end for visual niceness
        let totalTime = datePadding - firstDate;
        let widths = [];
        let times = [];
        for (let i = 0; i < actions.length; i++) {
            let actionDate = Date.parse(actions[i].date);
            let nextDate;
            if (i != actions.length - 1) {
                nextDate = Date.parse(actions[i + 1].date);
            } else {
                nextDate = datePadding;
            }
            let time = nextDate - actionDate;
            let timeFraction = (time) / totalTime;
            times.push(time);
            widths.push(timeFraction * (graphWidth - 2) + 2 / actions.length-0.005); // to give width to very small values
        }

        let columnTimes = [];
        for (let j = 0; j < columns.length; j++) {
            let columnTime = 0;
            for (let i = 0; i < actions.length; i++) {
                if (j == columns.indexOf(actions[i].column)) {
                    columnTime += times[i];
                }
            }
            columnTimes.push(columnTime);
        }

        let graph = [];
        let barHeight = graphHeight / columns.length;
        for (let j = 0; j < columns.length; j++) {
            for (let i = 0; i < actions.length; i++) {
                let id = j * columns.length + i;
                if (j == columns.indexOf(actions[i].column)) { // if column name is correct, draw bar
                    console.log(widths[i], actions[i].column);
                    graph.push(
                        <ViroFlexView
                          style={this.state.selected[j] ? styles.selectedContainer : styles.barContainer}
                            height={barHeight}
                            width={widths[i]}
                            key={id}
                            onClick={(pos, src, ind = j, ts = columnTimes) => this.onClick(pos, src, ind, ts)}
                        />
                    );
                } else { // else empty container
                    graph.push(
                        <ViroFlexView
                            style={styles.emptyBarContainer}
                            height={barHeight}
                            width={widths[i]}
                            key={id}
                        />
                    );
                }
            }
        }

        return <ViroFlexView style={styles.graphContainer} height={graphHeight} width={graphWidth}>
            {graph}
        </ViroFlexView>;

    };

    render() {
        return (
            <ViroNode
                position={this.state.cardPosition}
            >
                {this.state.cardHistory.length ? this.createDiagram(4, 5) : <ViroText
                    text="Loading diagram..."
                />
                }
            </ViroNode>
        );
    }
}


var styles = StyleSheet.create({
    lineStyle: {
        backgroundColor: "#000000",
    },

    titleStyle: {
        color: "#000000",
        textAlign: "center"
    },

    yAxisContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: "#ffffff00",
        color: "#000000",
        textAlign: "center"
    },

    xAxisContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: "#ffffff00",
        color: "#000000"
    },

    diagramContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flex: 1,
        backgroundColor: "#00000000"
    },

    graphContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: "#00000000"
    },

    infoPanelContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },

    infoTextStyle: {
        fontFamily: "Arial",
        fontSize: 12,
        color: "#000000"

    },

    barContainer: {
        backgroundColor: "#990022",
    },

    selectedContainer: {
        backgroundColor: "#bb0099"
    },

    emptyBarContainer: {
        backgroundColor: "#00000000"

    },

    emptyContainer: {
        backgroundColor: "#00000000"
    }
});


module.exports = ARTrelloCardTimeline;
