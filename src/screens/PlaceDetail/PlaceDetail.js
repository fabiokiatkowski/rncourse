import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';

import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component {
    state = {
        viewMode: 'portrait'
    }
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    }
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }
    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        })
    }
    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        Navigation.pop(this.props.componentId);
    }
    render() {
        const {
            viewMode
        } = this.state;
        return (
            <View style={[styles.container, viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer]} >
                <View style={styles.placeDeatailContainer}>
                    <View style={styles.subContainer}>
                        <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
                    </View>
                    <View style={styles.subContainer}>
                        <MapView
                            initialRegion={{
                                ...this.props.selectedPlace.location,
                                latitudeDelta: 0.0122,
                                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
                            }}
                            style={styles.map}
                        >
                            <MapView.Marker coordinate={{
                                ...this.props.selectedPlace.location,
                                latitudeDelta: 0.0122,
                                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
                            }} />
                        </MapView>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View style={styles.palceNameContainer}>
                        <Text style={styles.palceName}>{this.props.selectedPlace.name}</Text>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <Icon size={30} name={Platform.OS === 'android' ? "md-trash" : "ios-trash"} color="red"/>
                        </TouchableOpacity>
                    </View>
                    {/* <View>
                    </View> */}
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
    },
    portraitContainer: {
        flexDirection: 'column'
    },
    landscapeContainer: {
        flexDirection: 'row'
    },
    placeImage: {
        width: '100%',
        height: '100%'
    },
    placeDeatailContainer: {
        flex: 2
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    palceNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    palceName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28
    },
    subContainer: {
        flex: 1
    },

})

const mapDispatchToProps = dispatch => ({
    onDeletePlace: bindActionCreators(deletePlace, dispatch)
});

export default connect(null, mapDispatchToProps)(PlaceDetail);
