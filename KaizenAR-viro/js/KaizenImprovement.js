import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View, ScrollView, RefreshControl} from 'react-native';
import {getKaizenImprovements, postKaizenImprovements} from "./backend/backendController";
import CommentInput from "./CommentInput";

class KaizenImprovement extends Component {

  constructor(props){
    super(props);

    this.state = {

      sectionLoaded: false,
      sectionLoading: false,
      sections: [
        {title: 'BoardName1', data: ['Improv1: Good']},
        {title: 'BoardName2', data: ['Improv1: Bad', 'Improv2: Good', 'Improv3: Bad', 'Improv4: Testing', 'Improv5: Testing']},
      ],

    };

    this.onPostSubmit = this.onPostSubmit.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.fetchImprovements = this.fetchImprovements.bind(this);
  }

  fetchImprovements(){
    this.setState({sectionLoading: true});
    let boardIDVal = this.props.boardId;
    if(boardIDVal === undefined){
      boardIDVal = "null";
    }
    getKaizenImprovements(boardIDVal).then((response) => {
      this.setState({sections: response, sectionLoaded: true, sectionLoading: false});
    });
  }

  componentWillMount(){
    this.fetchImprovements();
  }

  onRefresh(){
    this.fetchImprovements();
  }

  onPostSubmit(improvementData) {

    this._scrollView.scrollTo({y: 0});

    //{"id":1,
    // "board_id":"5bbb7e4006d2af393fc53e4d",
    // "improvement":"Create test rating table",
    // "status":"Useless",
    // "board_name":"WeWeregonnatest"}
    //( '5bbb7e4006d2af393fc53e4d', 'Pre iteration planning', 'Testing', 'WeWeregonnatest')

    postKaizenImprovements(this.props.boardId, this.props.boardName, improvementData).then((response) => {
      console.log(response);
      let newImprov = this.state.sections;
      newImprov.unshift({
          title: this.props.boardName,
          data: [`${improvementData}: Testing`]
        });
      this.setState({sections: newImprov});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(scrollView) => this._scrollView = scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.sectionLoading}
              onRefresh={this.onRefresh}
            />
          }
        >
        <SectionList
          sections={this.state.sections}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
        </ScrollView>
        <CommentInput onSubmit={(text) => this.onPostSubmit(text)} />
      </View>
    );
  }
}

export default KaizenImprovement;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

