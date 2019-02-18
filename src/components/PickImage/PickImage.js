import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import imagePlaceholder from '../../assets/3D-Cool-Image.jpg';

class PickImage extends Component {
    state = {
        pickedImage: null
    }
    pickImageHandler = () => {
        ImagePicker.showImagePicker(null, (respose) => {
            if (!respose.didCancel && !respose.error && !respose.customButton && respose.uri) {
                this.setState(prevState => {
                    return {
                        ...this.state.pickedImage,
                        pickedImage: respose
                    }
                });
                this.props.onImagePick(respose);
            } else {
                this.setState(prevState => {
                    return {
                        ...this.state.pickedImage,
                        pickedImage: null
                    }
                });
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image
                        style={styles.previewImage}
                        source={this.state.pickedImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Pick Image"
                        onPress={this.pickImageHandler}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#eee',
        width: '80%',
        height: 120
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }
});

export default PickImage;
