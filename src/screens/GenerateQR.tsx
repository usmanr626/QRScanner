import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import colors from '../assets/colors';
import QRCode from 'react-native-qrcode-svg';
// import Barcode from 'react-native-barcode-builder';

const GenerateQR = () => {
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView />
      <Text>GENERATE</Text>
      <QRCode
        value="Just some string value"
        backgroundColor="grey"
        size={200}
      />
      {/* <Barcode value="Hello World" format="CODE128" />; */}
    </View>
  );
};
export default GenerateQR;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, padding: 10, backgroundColor: colors.white},
});
