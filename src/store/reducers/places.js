import { ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE } from '../actions/actionTypes';

const initialState = {
    places: [],
    selectedPlace: null
};

const addReducer = (state, action) => {
    return {
        ...state,
        places: state.places.concat({
            key: Math.random().toString(),
            placeName: action.data.placeName,
            placeImage: action.data.placeImage
        })
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE: return addReducer(state, action);
        case DELETE_PLACE: return {
            ...state,
            places: state.places.filter(p => p.key !== state.selectedPlace.key),
            selectedPlace: null
        }
        case SELECT_PLACE: return {
            ...state,
            selectedPlace: state.places.find(p => p.key === action.data.key)
        }
        case DESELECT_PLACE: return {
            ...state,
            selectedPlace: null
        }
        default: return state;
    }
};

export default reducer;
