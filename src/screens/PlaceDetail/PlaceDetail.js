import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

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
                <View style={styles.subContainer}>
                    <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
                </View>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.palceName}>{this.props.selectedPlace.name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <Icon size={30} name={Platform.OS === 'android' ? "md-trash" : "ios-trash"} color="red"/>
                        </TouchableOpacity>
                    </View>
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
        height: 200
    },
    palceName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28
    },
    subContainer: {
        flex: 1
    }
})

const mapDispatchToProps = dispatch => ({
    onDeletePlace: bindActionCreators(deletePlace, dispatch)
});

export default connect(null, mapDispatchToProps)(PlaceDetail);
