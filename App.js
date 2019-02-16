import React, {Component} from 'react';
import {Platform, StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import FlatPlaceList from './src/components/PlaceList/FlatPlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

import {
  addPlace,
  deletePlace,
  deselectPlace,
  selectPlace,
  deletePlaceList
} from './src/store/actions';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends Component {
  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
  };
  placeSelectedHandler = place => {
    this.props.onSelectPlace(place);
  }
  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  }
  placeDeleteListHanlder = place => {
    this.props.onDeletePlaceList(place);
  }
  modalCloseHanlder = () => {
    this.props.onDeselectPlace();
  }
  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          onItemDeleted={this.placeDeletedHandler}
          onModalClose={this.modalCloseHanlder}
          selectedPlace={this.props.selectedPlace}
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        {/* <PlaceList
          places={this.state.places}
          onItemDeleted={this.placeDeletedHandler}
        /> */}
        <FlatPlaceList
          places={this.props.places}
          onItemSelected={this.placeSelectedHandler}
          onItemDeleted={this.placeDeleteListHanlder}
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

const mapStateToProps = state => ({
  places: state.places.places,
  selectedPlace: state.places.selectedPlace
});

const mapDispatchToProps = dispatch => ({
  onAddPlace: bindActionCreators(addPlace, dispatch),
  onDeletePlace: bindActionCreators(deletePlace, dispatch),
  onDeletePlaceList: bindActionCreators(deletePlaceList, dispatch),
  onSelectPlace: bindActionCreators(selectPlace, dispatch),
  onDeselectPlace: bindActionCreators(deselectPlace, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
