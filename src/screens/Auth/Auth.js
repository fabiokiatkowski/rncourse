import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import { tryAuth } from '../../store/actions/index';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/background.jpg'
import validate from '../../utility/validation';

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
        authMode: 'login',
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
            },
        }
    }
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyles)
    }
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles)
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            }
        })
    }
    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        });
    };
    loginHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }
        this.props.onLogin(authData);
        startMainTabs();
    };
    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password' ? 
                            validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue)
                            : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: value
                    },
                }
            }
        })
    }
    render() {
        const {
            viewMode,
            authMode
        } = this.state;
        const headingText = viewMode === 'portrait' ? (
            <MainText>
                <HeadingText>Please Log In</HeadingText>
            </MainText>
        ) : null
        const confirmPasswordControl = authMode === 'signup' ? (
            <View style={viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                <DefaultInput
                    placeholder="Confirm password"
                    style={styles.input}
                    value={this.state.controls.confirmPassword.value}
                    onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                    valid={this.state.controls.confirmPassword.valid}
                    touched = {this.state.controls.confirmPassword.touched}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                />
            </View>
        ) : null
        return (
                <ImageBackground
                    style={styles.backgroundImage}
                    source={backgroundImage}
                >
                    <KeyboardAvoidingView style={styles.container} behavior="padding">
                        {headingText}
                        <ButtonWithBackground
                        color="#29aaf4"
                            onPress={this.switchAuthModeHandler}
                        >
                            Switch to {authMode === 'login' ? 'Sign Up' : 'Login'}
                        </ButtonWithBackground>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.inputContainer}>
                                <DefaultInput
                                    placeholder="Your e-mail address"
                                    style={styles.input}
                                    value={this.state.controls.email.value}
                                    onChangeText={(val) => this.updateInputState('email', val)}
                                    valid={this.state.controls.email.valid}
                                    touched = {this.state.controls.email.touched}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                />
                                <View style={(viewMode === 'portrait' || authMode === 'login') ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                                    <View style={(viewMode === 'portrait' || authMode === 'login') ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                        <DefaultInput
                                            style={styles.input}
                                            placeholder="Your password"
                                            value={this.state.controls.password.value}
                                            onChangeText={(val) => this.updateInputState('password', val)}
                                            valid={this.state.controls.password.valid}
                                            touched = {this.state.controls.password.touched}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            secureTextEntry
                                        />
                                    </View>
                                    {confirmPasswordControl}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <ButtonWithBackground
                            color="#29aaf4"
                            onPress={this.loginHandler}
                            disabled={
                                (!this.state.controls.confirmPassword.valid && authMode === 'signup') ||
                                !this.state.controls.password.valid ||
                                !this.state.controls.email.valid
                            }
                        >
                            Submit
                        </ButtonWithBackground>
                    </KeyboardAvoidingView>
                </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        width: '100%',
        flex: 1
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    },
    landscapePasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    portraitPasswordContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    landscapePasswordWrapper: {
        width: '45%'
    },
    portraitPasswordWrapper: {
        width: '100%'
    }
});

const mapDispatchToProps = dispatch => ({
    onLogin: bindActionCreators(tryAuth, dispatch)
});

export default connect(null, mapDispatchToProps)(AuthScreen);
