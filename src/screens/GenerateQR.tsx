import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../assets/colors';
import QRCode from 'react-native-qrcode-svg';
// import Barcode from 'react-native-barcode-builder';

const GenerateQR = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>GENERATE</Text>
      <QRCode value="Just some string value" backgroundColor="red" size={200} />
      {/* <Barcode value="Hello World" format="CODE128" />; */}
    </View>
  );
};
export default GenerateQR;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, padding: 10, backgroundColor: colors.white},
});
