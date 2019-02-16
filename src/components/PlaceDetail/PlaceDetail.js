import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

import Icons from 'react-native-vector-icons/Ionicons';

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
                    <View style={styles.deleteButton}>
                        <TouchableOpacity onPress={props.onItemDeleted}>
                            <Icons size={30} name="md-trash" color="red"/>
                        </TouchableOpacity>
                    </View>
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
    },
    deleteButton: {
        alignItems: 'flex-end'
    }
})

export default placeDetail;
