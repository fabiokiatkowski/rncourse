import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem';

const flatPlaceList = props => {
    const placesOutput = ({ item }) => (<ListItem
        placeName={item.placeName}
        placeImage={item.placeImage}
        onItemPressed={() => props.onItemSelected(item)}
        onItemDeleted={() => props.onItemDeleted(item)}
    />)
    // <Text>{item.place}</Text>
    return (
        <FlatList
            style={styles.listContainer}
            data={props.places}
            renderItem={placesOutput}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
      width: "100%"
    }
});

export default flatPlaceList;