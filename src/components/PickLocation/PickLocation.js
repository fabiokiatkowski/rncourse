import React, { Component } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

class PickLocation extends Component {
    state = {  }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Text>Map</Text>
                </View>
                <View style={styles.button}>
                    <Button
                        title="Locate Me"
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
        height: 100
    },
    button: {
        margin: 8
    }
});

export default PickLocation;
