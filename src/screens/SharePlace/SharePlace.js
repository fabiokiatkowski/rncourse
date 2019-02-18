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
            },
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            }
        },
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
    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        ...prevState.controls.location,
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }
    imagePickedHanlder = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        ...prevState.controls.image,
                        value: image,
                        valid: true
                    }
                }
            }
        });
    }
    placeAddedHandler = () => {
        const {
            controls
        } = this.state
        console.log(controls.image)
        this.props.onAddPlace(controls.placeName.value, controls.location.value, controls.image.value);
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: '',
                        valid: false
                    },
                    location: {
                        ...prevState.controls.location,
                        value: null,
                        valid: false
                    },
                    image: {
                        ...prevState.controls.image,
                        value: null,
                        valid: false
                    }
                }
            }
        })
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
                    <PickImage onImagePick={this.imagePickedHanlder} />
                    <PickLocation onLocationPick={this.locationPickedHandler} />
                    <PlaceInput
                        placeData={controls.placeName}
                        onChangeText={this.placeNameChangedHandler}
                    />
                    <View style={styles.button}>
                        <Button
                            title="Share the place!"
                            onPress={this.placeAddedHandler}
                            disabled={!controls.placeName.valid &&
                                !controls.location.valid && 
                                !controls.image.valid}
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
