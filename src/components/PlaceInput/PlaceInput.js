import React, { Component } from 'react';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

const placeInput = props => {
    return <DefaultInput
        value={props.placeData.value}
        onChangeText={props.onChangeText}
        placeholder="Place name"
        touched={props.placeData.touched}
        valid={props.placeData.valid}
    />;
};

export default placeInput;
