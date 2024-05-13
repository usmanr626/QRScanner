import React, {useRef, useState, useEffect} from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../assets/colors';
import {WIDTH} from '../assets/styles';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {LABELS, getLabels, updateLabels} from '../labels';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';

import SettingsButton from '../Components/SettingsButton';

const HomeScreen = () => {
  const route = useRoute();
  const {params} = route;
  const selectedLanguage = params ? params.selectedLanguage : 'english'; // Default to 'english' if selectedLanguage is not provided
  let labels = getLabels(selectedLanguage);

  //states
  const [openScanner, setOpenScanner] = useState(false);
  const QRScanRef = useRef();

  const navigation = useNavigation(); // Use useNavigation hook to get navigation object
  const isFocused = useIsFocused();

  useEffect(() => {
    // Update labels when screen is focused
    if (isFocused) {
      labels = getLabels(selectedLanguage);
    }
  }, [isFocused, selectedLanguage]);

  const toggleScanner = () => {
    setOpenScanner(!openScanner);
    // navigation.navigate('SettingsScreen');
  };
  const openLink = () => {
    try {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } catch (error) {
      console.log('🎯: openLink -> error', error);
    }
  };
  const onSuccess = e => {
    console.log('🎯: HomeScreen -> e', e);

    Alert.alert(LABELS.goToLink, e.data, [
      {
        text: LABELS.cancel,
        onPress: () => {
          setTimeout(() => {
            QRScanRef.current.reactivate();
          }, 1500);
        },
        style: 'cancel',
      },
      {
        text: LABELS.ok,
        onPress: () => {
          openLink;
        },
      },
    ]);
  };

  return (
    <View style={styles.mainContainer}>
      {openScanner ? (
        <QRCodeScanner
          ref={QRScanRef}
          reactivateTimeout={3000}
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
      <SettingsButton onPress={() => navigation.navigate('SettingsScreen')} />
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
