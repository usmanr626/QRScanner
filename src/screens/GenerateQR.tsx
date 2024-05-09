import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../assets/colors';

const GenerateQR = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>GENERATE</Text>
    </View>
  );
};
export default GenerateQR;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, padding: 10, backgroundColor: colors.pink},
});
