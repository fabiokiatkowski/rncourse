import { ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE, DELETE_PLACE_LIST } from './actionTypes'
import placeImage from '../../assets/beatiful-place.jpg';

export const addPlace = placeName => {
    return {
        type: ADD_PLACE,
        data: {
            placeName,
            placeImage
        }
    }
};

export const deletePlace = () => {
    return {
        type: DELETE_PLACE
    }
};

export const deletePlaceList = (place) => {
    return {
        type: DELETE_PLACE_LIST,
        data: place
    }
}

export const selectPlace = (place) => {
    return {
        type: SELECT_PLACE,
        data: place
    }
};

export const deselectPlace = () => {
    return {
        type: DESELECT_PLACE
    }
};