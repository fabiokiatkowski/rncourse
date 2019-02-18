import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';

const initialState = {
    places: []
}

const addPlaceReducer = (state, action) => {
    return {
        ...state,
        places: state.places.concat({
            key: Math.random().toString(),
            name: action.placeName,
            location: action.location,
            image: {
                uri: action.image.uri
            }
        })
    }
}
const deletePlaceReducer = (state, action) => {
    return {
        ...state,
        places: state.places.filter(place => {
            return place.key !== action.placeKey
          })
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE: return addPlaceReducer(state, action);
        case DELETE_PLACE: return deletePlaceReducer(state, action);
        default: return state;
    }
};

export default reducer