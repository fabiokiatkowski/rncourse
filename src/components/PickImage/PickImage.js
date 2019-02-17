import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import imagePlaceholder from '../../assets/3D-Cool-Image.jpg';

class PickImage extends Component {
    state = {  }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image
                        style={styles.previewImage}
                        source={imagePlaceholder}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Pick Image"
                        onPress={() => {}}
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
