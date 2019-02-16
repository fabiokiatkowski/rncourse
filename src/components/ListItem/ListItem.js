import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Icons from 'react-native-vector-icons/Ionicons';

const listItem = (props) => (
    <View style={styles.listItem}>
        <TouchableOpacity onPress={props.onItemPressed} >
            <View style={styles.titleItem}>
                <Image style={styles.placeImage} source={props.placeImage} />
                <Text>{props.placeName}</Text>
            </View>
        </TouchableOpacity>
        <View style={styles.deleteButtom}>
            <TouchableOpacity onPress={props.onItemDeleted}>
                <Icons size={18} name="md-trash" color="red" />
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    placeImage: {
        marginRight: 8,
        height: 30,
        width: 30
    },
    titleItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    deleteButtom: {
        padding: 10
    }
});

export default listItem;
