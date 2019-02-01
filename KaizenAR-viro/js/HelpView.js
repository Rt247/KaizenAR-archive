import React, {Component} from 'react'

import {
  Text,
  View,
  SectionList
} from 'react-native'
import Swiper from 'react-native-swiper';

import {vw, vh} from 'react-native-viewport-units';


class HelpView extends Component {

  constructor(props){

    super(props);

    this.state = {
    };

  }

  render() {
    const data1 = [
      {title: 'Enter AR', data: ['Enter the AR application']},
      {title: 'Kaizen Improvement', data: ['View and add improvement measures with their current state across all projects']},
      {title: 'Login', data: ['Login using your Trello Login Credentials in order to access the Augmented Reality Interface']},
      {title: 'Help', data: ['User Guide for the AR Aspect']},
      {title: 'Tutorial', data: ['User Guide for the Login Screen']},
    ];


    const data2 = [
      {title: 'Filter Options', data: ['Allows you to filter the Trello Card results based on a Trello Label assigned on your Trello board by displaying the Trello Labels.']},
      {title: 'Search Options', data: ['Finds a Trello Card to display additional information. You search first through the Trello boards from the chosen Trello Board, you select a Trello List. Finally upon choosing the Trello List you can select a Trello Card from the list which will bring you back to the AR Menu with the chosen Trello Card title shown in the search options button. The Card Detail View and Card Timeline View will also pop up for the chosen card.']},
      {title: 'Board Metric', data: ['From the AR Menu, a project manager can also access the Board Metric Sub Menu which allows the manager to see various metrics about the project. These metrics are the cards per column, the performance of the group and the over due tickets. ']},
      {title: 'Card Comments', data: ['Allows you to communicate with team members and also flag certain cards. When a card has been selected via the search options sub menus, you can the see the comments on the card as well as post comments. If you want to refresh the comments pull down the screen from the top. \n']},
    ];

    const data3 = [
      {title: 'Card Timeline', data: ['Visualise the movement of a chosen card between various columns over time.']},
      {title: 'Card Detail View', data: ['See in depth metrics about a particular cards such as the members working on the card and a checklist on the card']},
    ];


    return (
      <Swiper style={styles.wrapper} showsButtons>
        <View style={styles.slide1}>
          <Text style={styles.titleText}> Main Page </Text>
          <SectionList
            renderItem={({item, index, section}) => <Text style={styles.text} key={index}>{item}</Text>}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.headerText}>{title}</Text>
            )}
            sections={data1}
            keyExtractor={(item, index) => item + index}
          />
        </View>
        <View style={styles.slide2}>
          <Text style={styles.titleText}> AR Menu </Text>
          <SectionList
            renderItem={({item, index, section}) => <Text style={styles.text} key={index}>{item}</Text>}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.headerText}>{title}</Text>
            )}
            sections={data2}
            keyExtractor={(item, index) => item + index}
          />
        </View>
        <View style={styles.slide3}>
          <Text style={styles.titleText}> AR Timeline / Card Detail </Text>
          <SectionList
            renderItem={({item, index, section}) => <Text style={styles.text} key={index}>{item}</Text>}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.headerText}>{title}</Text>
            )}
            sections={data3}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      </Swiper>
    );
  }
}

export default HelpView;


var styles = {
  wrapper: {
    marginTop: 1 * vh,
    marginBottom: 2 * vh,
    marginLeft: 2 * vw,
    marginRight: 2 * vw,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8 * vh,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8 * vh,
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8 * vh,
  },
  text: {
    color: '#444444',
    fontSize: 16,
    marginLeft: 7 * vw,
    marginRight: 9 * vw,
  },
  headerText: {
    color: '#444444',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 50,
    marginLeft: 7 * vw,
    marginRight: 9 * vw,
    backgroundColor: '#e9e9ef'
  },
  titleText: {
    color: '#444444',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  }
};
