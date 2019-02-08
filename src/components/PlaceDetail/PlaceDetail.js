import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet } from 'react-native';

const placeDetail = (props) => {
    const modalContent = (props.selectedPlace) ?
        (
            <View>
                <Image source={props.selectedPlace.placeImage} style={styles.placeImage} />
                <Text style={styles.placeName}>{props.selectedPlace.placeName}</Text>
            </View>
        )
        : null
    return (
        <Modal
            onRequestClose={props.onModalClose}
            visible={props.selectedPlace !== null}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                {modalContent}
                <View>
                    <Button title="Delete" color="red" onPress={props.onItemDeleted} />
                    <Button title="Close" onPress={props.onModalClose}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        margin: 22
    },
    placeImage: {
        width: '100%',
        height: 200
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28
    }
})

export default placeDetail;
