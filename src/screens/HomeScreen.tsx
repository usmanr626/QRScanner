import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import colors from '../assets/colors';
import {WIDTH} from '../assets/styles';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {LABELS} from '../labels';

const HomeScreen = () => {
  //states
  const [openScanner, setOpenScanner] = useState(false);

  const QRScanRef = useRef();

  const toggleScanner = () => {
    setOpenScanner(!openScanner);
  };

  const onSuccess = e => {
    console.log('🎯: HomeScreen -> e', e);

    Alert.alert(LABELS.goToLink, e.data, [
      {
        text: LABELS.cancel,
        onPress: () => {
          setTimeout(() => {
            QRScanRef.current.reactivate();
          }, 1000);
        },
        style: 'cancel',
      },
      {
        text: LABELS.ok,
        onPress: () =>
          Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err),
          ),
      },
    ]);
  };

  return (
    <View style={styles.mainContainer}>
      {openScanner ? (
        <QRCodeScanner
          ref={QRScanRef}
          reactivateTimeout={10000}
          showMarker
          fadeIn
          onRead={onSuccess}
          cameraStyle={styles.scanner}
          bottomContent={
            <TouchableOpacity
              onPress={toggleScanner}
              style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>{LABELS.cancel}</Text>
            </TouchableOpacity>
          }
        />
      ) : (
        <TouchableOpacity
          onPress={toggleScanner}
          style={styles.scanButton}
          activeOpacity={0.7}>
          <Text>{LABELS.touchToScan}</Text>
        </TouchableOpacity>
      )}
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
    width: WIDTH * 0.8,
    height: WIDTH * 1.1,
    backgroundColor: colors.grey5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanner: {
    width: WIDTH * 0.8,
    height: WIDTH * 0.6,
    borderRadius: 20,
    position: 'absolute',
    left: WIDTH * 0.5 - 150,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});