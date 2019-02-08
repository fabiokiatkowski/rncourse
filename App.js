/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, TextInput, Button, Text } from 'react-native';

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import FlatPlaceList from './src/components/PlaceList/FlatPlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

import placeImage from './src/assets/beatiful-place.jpg';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends Component {
  state = {
    places: [],
    selectedPlace: null
  }
  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random().toString(),
          placeName,
          placeImage
        })
      };
    });
  };
  placeSelectedHandler = place => {
    this.setState(prevState => ( { selectedPlace: prevState.places.find(p => p.key === place.key) } ))
  }
  placeDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(p => p.key !== prevState.selectedPlace.key),
        selectedPlace: null
      }
    })
  }
  modalCloseHanlder = () => {
    this.setState({ selectedPlace: null })
  }
  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          onItemDeleted={this.placeDeletedHandler}
          onModalClose={this.modalCloseHanlder}
          selectedPlace={this.state.selectedPlace}
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        {/* <PlaceList
          places={this.state.places}
          onItemDeleted={this.placeDeletedHandler}
        /> */}
        <FlatPlaceList
          places={this.state.places}
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

export default App;
