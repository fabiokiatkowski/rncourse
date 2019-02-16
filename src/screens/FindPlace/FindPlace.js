import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Navigation } from 'react-native-navigation';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlace extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange'
    }

    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)
    }

    constructor(props) {
        super(props);
        console.log(props);
        Navigation.events().bindComponent(this);
    }
    navigationButtonPressed({ buttonId }) {
        if (buttonId === "drawerButton") {
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {
                        visible: true
                    }
                }
            });
        }
    }
    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
    }
    placesSearchHandler = () => {
        Animated.timing(
            this.state.removeAnim, 
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }
        ).start(() => {
            this.setState({
                placesLoaded: true
            });
            this.placesLoadedHandler();
        });
    }
    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => place.key === key)
        Navigation.push(this.props.componentId, {
            component: {
                name: 'awesome-places.PlaceDetailScreen',
                passProps: {
                    selectedPlace: selPlace
                },
                options: {
                    topBar: {
                        title: {
                            text: `${selPlace.name}  Details`
                        }
                    }
                }
            }
        });
    }
    render() {
        const content = (this.state.placesLoaded) ?
            <Animated.View
                style={{
                    opacity: this.state.placesAnim
                }}
            >
                <PlaceList
                    places={this.props.places}
                    onItemSelected={this.itemSelectedHandler}
                />
            </Animated.View>
            :
            (
                <Animated.View
                    style={{
                        opacity: this.state.removeAnim,
                        transform:[
                            {
                                scale: this.state.removeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1]
                                })
                            }
                        ]
                    }}
                >
                    <TouchableOpacity onPress={this.placesSearchHandler}>
                        <View style={styles.searchButton}>
                            <Text style={styles.searchButtonText}>Find Places</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            );
        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButton: {
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: 'orange',
        fontWeight: 'bold',
        fontSize: 26
    }
});

const mapStateToProps = state => ({
    places: state.places.places
})

export default connect(mapStateToProps)(FindPlace);
