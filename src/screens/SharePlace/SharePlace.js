import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation'

class SharePlace extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange'
    }
    state ={
        controls: {
            placeName: {
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            }
        }
    }
    constructor(props) {
        super(props);
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
    placeAddedHandler = () => {
        const {
            controls
        } = this.state
        if (controls.placeName.value.trim() !== '') {
            this.props.onAddPlace(controls.placeName.value);
            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        placeName: {
                            ...prevState.controls.placeName,
                            value: '',
                            valid: false
                        }
                    }
                }
            })
        }
    }
    placeNameChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules)
                    }
                }
            }
        })
    };
    render() {
        const {
            controls
        } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a place with us!</HeadingText>
                    </MainText>
                    <PickLocation />
                    <PickImage />
                    <PlaceInput
                        placeData={controls.placeName}
                        onChangeText={this.placeNameChangedHandler}
                    />
                    <View style={styles.button}>
                        <Button
                            title="Share the place!"
                            onPress={this.placeAddedHandler}
                            disabled={!controls.placeName.valid}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }
});

const mapDispatchToProps = dispatch => ({
    onAddPlace: bindActionCreators(addPlace, dispatch)
})

export default connect(null, mapDispatchToProps)(SharePlace);
