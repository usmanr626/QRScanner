import Barcode from '@kichiyaki/react-native-barcode-generator';
import {Picker} from '@react-native-picker/picker';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import {launchImageLibrary} from 'react-native-image-picker';
import QRCode from 'react-native-qrcode-svg';
import SettingsButton from '../Components/SettingsButton';
import colors from '../assets/colors';
import {WIDTH} from '../assets/styles';
import {LABELS, getLabels} from '../labels';

import Config from 'react-native-config';

const adUnitId = __DEV__ ? Config.DEV_AD_UNIT_ID : Config.PROD_AD_UNIT_ID;
const InterAdUnitId = __DEV__
  ? Config.DEV_INTERSTITIAL_AD_UNIT_ID
  : Config.PROD_INTERSTITIAL_AD_UNIT_ID;

const interstitial = InterstitialAd.createForAdRequest(InterAdUnitId);

const GenerateQR = () => {
  const route = useRoute();
  const {params} = route;
  const selectedLanguage = params ? params.selectedLanguage : 'english'; // Default to 'english' if selectedLanguage is not provided
  let labels = getLabels(selectedLanguage);

  const navigation = useNavigation(); // Use useNavigation hook to get navigation object
  const isFocused = useIsFocused();

  // states

  const [userImage, setUserImage] = useState(null);
  const [codeReady, setCodeReady] = useState(false);
  const [inputText, setInputText] = useState('');
  const [codeType, setCodeType] = useState('');

  //for ad

  const [loaded, setLoaded] = useState(false);
  const [reloadAd, setReloadAd] = useState(false);

  const [selectedFormat, setSelectedFormat] = useState(null);
  const [formatPicker, setFormatPicker] = useState(false);

  useEffect(() => {
    // Update labels when screen is focused
    if (isFocused) {
      labels = getLabels(selectedLanguage);
    }
  }, [isFocused, selectedLanguage]);

  useEffect(() => {
    console.log('🎯: Ad use effect ');
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);

        console.log('🎯: Ad Loaded ');
      },
    );

    interstitial.addAdEventListener(AdEventType.CLICKED, () => {
      console.log('🎯: Ad Clicked -> ');
    });
    interstitial.addAdEventListener(AdEventType.OPENED, () => {
      console.log('🎯: Ad Opened -> ');
    });
    interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('🎯: Ad Closed -> ');
      // setReloadAd(!reloadAd);
      interstitial.load();
    });
    interstitial.addAdEventListener(AdEventType.ERROR, e => {
      console.log('🎯: Ad Error -> ', e);
    });
    interstitial.addAdEventListener(AdEventType.PAID, e => {
      console.log('🎯: Ad Paid -> ', e);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, [reloadAd]);

  const imageHandler = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeExtra: true,
    });
    console.log('🎯: imageHandler -> result', result.assets[0].uri);
    setUserImage(result.assets[0].uri);
  };
  const handleInputChange = text => {
    console.log('🎯: GenerateQR -> text', text);
    setInputText(text);
  };

  const handleFormatChange = itemValue => {
    setSelectedFormat(itemValue);
    console.warn('done');
    setFormatPicker(false);

    // setModalVisible(false);
  };

  const errorHandler = () => {
    Alert.alert(LABELS.generateCodeError);
  };

  const generateQRHandler = () => {
    console.log('🎯: generateQRHandler -> ');
    if (loaded) {
      interstitial.show();
      setLoaded(false);
    }
    setTimeout(() => {
      setCodeReady(true);
      setCodeType('QR');
    }, 1000);
  };
  const generateBarHandler = () => {
    console.log('🎯: generateBarHandler -> ');
    if (loaded) {
      interstitial.show();
      setLoaded(false);
    }
    setTimeout(() => {
      setCodeReady(true);
      setCodeType('BAR');
    }, 1000);
  };

  const askUser = () => {
    Alert.alert(LABELS.pleaseChoose, '', [
      {
        text: LABELS.generateQR,
        onPress: () => {
          generateQRHandler();
        },
      },
      {
        text: LABELS.generateBAR,
        onPress: () => {
          generateBarHandler();
        },
      },
    ]);
  };
  const logoProps = userImage
    ? {
        logo: {uri: userImage},
        logoSize: 20,
        logoMargin: 1,
        logoBackgroundColor: 'white',
        quietZone: 5,
      }
    : {};

  return (
    <View style={styles.mainContainer}>
      <View style={{position: 'absolute', top: 0}}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      </View>

      <SafeAreaView />

      {/* <QRCode
        value="https://www.npmjs.com/package/@kichiyaki/react-native-barcode-generator"
        // backgroundColor="grey"
        size={250}
        logo={ImagePath.settingsIcon}
        logoSize={40}
        logoBackgroundColor="white"
      />
      <Barcode
        format="CODE128"
        value="0123456789012"
        text="0123456789012"
        style={{marginBottom: 40, backgroundColor: 'red'}}
        maxWidth={200}
      /> */}
      <SettingsButton onPress={() => navigation.navigate('SettingsScreen')} />

      <View style={{paddingTop: 100}} />

      <TextInput
        placeholder={LABELS.pasteLink}
        style={styles.textInputStyle}
        onChangeText={handleInputChange}
      />

      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {userImage === null ? (
          <TouchableOpacity
            onPress={() => {
              selectedFormat !== null ? errorHandler() : imageHandler();
            }}
            activeOpacity={0.8}
            style={styles.buttonStyle}>
            <Text numberOfLines={3} style={{textAlign: 'center'}}>
              {LABELS.selectImage}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onLongPress={() => setUserImage(null)}
            onPress={imageHandler}>
            <Image
              source={{uri: userImage}}
              resizeMode="contain"
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: WIDTH * 0.45,
                height: 120,
                borderRadius: 20,
                padding: 5,
              }}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => (userImage ? errorHandler() : setFormatPicker(true))}
          activeOpacity={0.8}
          style={styles.buttonStyle}>
          <Text numberOfLines={3} style={{textAlign: 'center'}}>
            {selectedFormat ? selectedFormat : LABELS.selectFormat}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center', top: '12%'}}>
        <TouchableOpacity
          onPress={() => {
            inputText
              ? userImage
                ? generateQRHandler()
                : selectedFormat
                ? generateBarHandler()
                : askUser()
              : Alert.alert(LABELS.pleaseEnter);
          }}
          // onPress={() => {
          //   // interstitial.load(),
          //   interstitial.show();
          // }}
          style={{
            width: 250,
            height: 80,
            backgroundColor: 'pink',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <Text>{LABELS.generate}</Text>
        </TouchableOpacity>
      </View>
      {/* <QRCode
        value="https://www.npmjs.com/package/@kichiyaki/react-native-barcode-generator"
        // backgroundColor="grey"
        size={120}
        logo={{uri: userImage}}
        logoSize={20}
        logoMargin={1}
        logoBackgroundColor="white"
        quietZone={5}
      /> */}

      {/* <Barcode
        format="CODE128"
        value="0123456789012"
        text="0123456789012"
        style={{marginBottom: 40, backgroundColor: 'red'}}
        maxWidth={200}
      /> */}

      {formatPicker && (
        <Picker
          selectedValue={selectedFormat}
          style={styles.pickerStyle}
          onValueChange={handleFormatChange}>
          <Picker.Item
            label={LABELS.removeSelectedCode}
            color="red"
            value={null}
          />
          <Picker.Item color="black" label="CODE39" value="CODE39" />
          <Picker.Item color="black" label="CODE128" value="CODE128" />
          <Picker.Item color="black" label="CODE128A" value="CODE128A" />
          <Picker.Item color="black" label="CODE128B" value="CODE128B" />
          <Picker.Item color="black" label="CODE128C" value="CODE128C" />
          <Picker.Item color="black" label="EAN13" value="EAN13" />
          <Picker.Item color="black" label="EAN8" value="EAN8" />
          <Picker.Item color="black" label="EAN5" value="EAN5" />
          <Picker.Item color="black" label="EAN2" value="EAN2" />
          <Picker.Item color="black" label="UPC" value="UPC" />
          <Picker.Item color="black" label="UPCE" value="UPCE" />
          <Picker.Item color="black" label="ITF14" value="ITF14" />
          <Picker.Item color="black" label="ITF" value="ITF" />
          <Picker.Item color="black" label="MSI" value="MSI" />
          <Picker.Item color="black" label="MSI10" value="MSI10" />
          <Picker.Item color="black" label="MSI11" value="MSI11" />
          <Picker.Item color="black" label="MSI1010" value="MSI1010" />
          <Picker.Item color="black" label="MSI1110" value="MSI1110" />
          <Picker.Item color="black" label="pharmacode" value="pharmacode" />
          <Picker.Item color="black" label="codabar" value="codabar" />
          {/* Add more Picker.Item components for additional formats */}
        </Picker>
      )}

      <Modal
        animationType="slide"
        transparent={codeReady}
        visible={codeReady}
        onRequestClose={() => setCodeReady(false)}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: WIDTH * 0.9,
              height: '95%',
              borderRadius: 40,
              backgroundColor: 'lightgrey',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {codeType === 'QR' ? (
              <QRCode
                value={inputText}
                // backgroundColor="grey"
                size={120}
                {...logoProps}
              />
            ) : codeType === 'BAR' ? (
              <Barcode
                format={selectedFormat ? selectedFormat : 'CODE128'}
                value={inputText}
                text={inputText}
                style={{marginBottom: 40}}
                maxWidth={200}
              />
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default GenerateQR;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, padding: 10, backgroundColor: colors.white},
  textInputStyle: {
    borderColor: colors.grey5,
    borderWidth: 1,
    backgroundColor: colors.white,
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  pickerStyle: {
    height: 50,
    width: WIDTH,
    bottom: '10%',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH * 0.45,
    height: 120,
    backgroundColor: colors.grey5,
    borderRadius: 20,
    padding: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',

    // alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: WIDTH / 2,
    height: 150,
    position: 'absolute',
    right: 20,
    top: 100,
  },
});
