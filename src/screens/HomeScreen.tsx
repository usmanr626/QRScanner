import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../assets/colors';
import {WIDTH} from '../assets/styles';

const HomeScreen = () => {
  const launchScanner = () => {
    console.log('launch');
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={launchScanner}
        style={styles.scanButton}
        activeOpacity={0.7}>
        <Text>Touch here to scan</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    width: WIDTH * 0.6,
    height: WIDTH * 0.6,
    backgroundColor: colors.grey5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
