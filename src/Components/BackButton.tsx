import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {WIDTH} from '../assets/styles';
import ImagePath from '../Constants/ImagePath';

const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',

        // backgroundColor: 'red',
        top: WIDTH * 0.18,
        left: WIDTH * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={ImagePath.backIcon}
        style={{width: 35, height: 35}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};
export default BackButton;
