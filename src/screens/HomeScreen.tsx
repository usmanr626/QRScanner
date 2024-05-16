import React, {useEffect, useRef, useState} from 'react';
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

import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {LABELS, getLabels} from '../labels';

import SettingsButton from '../Components/SettingsButton';

import Config from 'react-native-config';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? Config.DEV_AD_UNIT_ID : Config.PROD_AD_UNIT_ID;

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
  const openLink = ({e}) => {
    // console.log('🎯: openLink -> e', e);

    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
    try {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
      setTimeout(() => {
        QRScanRef.current.reactivate();
      }, 1500);
    } catch (error) {
      // console.log('🎯: openLink -> error', error);
    }
  };
  const onSuccess = e => {
    // console.log('🎯: HomeScreen -> e', e);

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
          openLink({e});
        },
      },
    ]);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{position: 'absolute', top: 0}}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      </View>
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
