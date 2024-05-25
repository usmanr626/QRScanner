import Barcode from '@kichiyaki/react-native-barcode-generator';
import {Picker} from '@react-native-picker/picker';

import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import QRCode from 'react-native-qrcode-svg';
import SettingsButton from '../Components/SettingsButton';
import colors from '../assets/colors';
import {WIDTH} from '../assets/styles';
import {LABELS, getLabels} from '../labels';

import Config from 'react-native-config';
import ViewShot from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

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
  const [imageUri, setImageUri] = useState('');

  //for ad

  const [loaded, setLoaded] = useState(false);
  const [reloadAd, setReloadAd] = useState(false);

  const [selectedFormat, setSelectedFormat] = useState(null);
  const [formatPicker, setFormatPicker] = useState(false);

  const viewShotRef = useRef();

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

  useEffect(() => {
    if (codeReady) {
      // console.log('🎯: GenerateQR -> codeReady', codeReady);
      captureAndConvertToImage();
    }
  }, [codeReady]);

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
    // setTimeout(() => {
    //   captureAndConvertToImage();
    // }, 1000);
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
    // setTimeout(() => {
    //   captureAndConvertToImage();
    // }, 1000);
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
      }
    : {};

  const askToRemove = () => {
    Alert.alert(LABELS.removeImage, '', [
      {
        text: LABELS.yes,
        onPress: () => {
          setUserImage(null);
        },
      },
      {
        text: LABELS.selectAnother,
        onPress: () => {
          imageHandler();
        },
      },
    ]);
  };

  const saveToAsync = async linkData => {
    console.log('🎯: GenerateQR -> linkData', linkData);
    try {
      if (typeof linkData !== 'string') {
        console.log('🎯: Invalid link data. Expected a string.');
        return;
      }

      // Get the current date and time
      const currentDate = new Date();
      const formattedDate = currentDate
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
        .replace(/ /g, ' '); // '23 May 2024'
      const formattedTime = currentDate
        .toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        .toLowerCase(); // '12:40 am'
      const formattedDateTime = `${formattedDate} ${LABELS.at} ${formattedTime}`;

      // Append the date and time to the link data
      const linkDataWithDateTime = `${linkData} - ${formattedDateTime}`;

      // Retrieve the existing links from AsyncStorage
      const existingLinks = await AsyncStorage.getItem('savedGeneratedLinks');

      let linksArray = [];

      if (existingLinks !== null) {
        try {
          // Attempt to parse the existing links to an array
          linksArray = JSON.parse(existingLinks);

          // Ensure it's an array
          if (!Array.isArray(linksArray)) {
            console.log(
              '🎯: Existing data is not an array, initializing with an empty array',
            );
            linksArray = [];
          }
        } catch (e) {
          console.log(
            '🎯: Error parsing existing data, initializing with an empty array',
            e,
          );
          linksArray = [];
        }
      }

      // Append the new link to the array
      linksArray.push(linkDataWithDateTime);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem(
        'savedGeneratedLinks',
        JSON.stringify(linksArray),
      );

      console.log('🎯: Data saved successfully');
    } catch (e) {
      console.log('🎯: Error saving data', e);
    }
  };

  const checkAndroidPermission = async () => {
    try {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      await PermissionsAndroid.request(permission);
      Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  };

  const captureAndSaveToGallery = async () => {
    console.log('🎯: captureAndSaveToGallery ->imageUri ', imageUri);
    try {
      // setRemoveBorder(true);

      if (Platform.OS === 'android') {
        await checkAndroidPermission();
      }

      CameraRoll.saveAsset(imageUri, {type: 'photo', album: 'QR-BarCode'});

      ToastAndroid.showWithGravity(
        LABELS.savedToGallery,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

      setCodeReady(false);
    } catch (error) {
      console.error('Error capturing the view: ', error);
    }
  };
  const captureAndConvertToImage = async () => {
    try {
      // setRemoveBorder(true);

      console.log('HERHE');

      const uri = await viewShotRef.current.capture();
      setImageUri(uri);
      // Now 'uri' contains the captured image of the TextInput

      // You can use the captured image URI to display it or save it as needed.
      console.log('Image VIEW SHOT', uri);

      saveToAsync(uri);

      // setRemoveBorder(false);
    } catch (error) {
      console.error('Error capturing the view: ', error);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={{position: 'absolute', top: 0}}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      </View>

      <SafeAreaView />

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
            <Text numberOfLines={3} style={styles.buttonTextStyle}>
              {LABELS.selectImage}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            // onLongPress={() => setUserImage(null)}
            onPress={userImage ? () => askToRemove() : imageHandler}>
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
          <Text numberOfLines={3} style={styles.buttonTextStyle}>
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
          style={styles.generateButton}>
          <Text style={styles.generateButtonText}>{LABELS.generate}</Text>
        </TouchableOpacity>
      </View>

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
          <Picker.Item color={colors.black} label="CODE39" value="CODE39" />
          <Picker.Item color={colors.black} label="CODE128" value="CODE128" />
          <Picker.Item color={colors.black} label="CODE128A" value="CODE128A" />
          <Picker.Item color={colors.black} label="CODE128B" value="CODE128B" />
          <Picker.Item color={colors.black} label="CODE128C" value="CODE128C" />
          <Picker.Item color={colors.black} label="EAN13" value="EAN13" />
          <Picker.Item color={colors.black} label="EAN8" value="EAN8" />
          <Picker.Item color={colors.black} label="EAN5" value="EAN5" />
          <Picker.Item color={colors.black} label="EAN2" value="EAN2" />
          <Picker.Item color={colors.black} label="UPC" value="UPC" />
          <Picker.Item color={colors.black} label="UPCE" value="UPCE" />
          <Picker.Item color={colors.black} label="ITF14" value="ITF14" />
          <Picker.Item color={colors.black} label="ITF" value="ITF" />
          <Picker.Item color={colors.black} label="MSI" value="MSI" />
          <Picker.Item color={colors.black} label="MSI10" value="MSI10" />
          <Picker.Item color={colors.black} label="MSI11" value="MSI11" />
          <Picker.Item color={colors.black} label="MSI1010" value="MSI1010" />
          <Picker.Item color={colors.black} label="MSI1110" value="MSI1110" />
          <Picker.Item
            color={colors.black}
            label="pharmacode"
            value="pharmacode"
          />
          <Picker.Item color={colors.black} label="codabar" value="codabar" />
          {/* Add more Picker.Item components for additional formats */}
        </Picker>
      )}

      <Modal
        animationType="slide"
        transparent={codeReady}
        visible={codeReady}
        onRequestClose={() => setCodeReady(false)}>
        <View style={styles.modalMainContainer}>
          <View style={styles.modalInnerContainer}>
            <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
              {codeType === 'QR' ? (
                <QRCode
                  value={inputText}
                  // backgroundColor="grey"
                  size={120}
                  {...logoProps}
                  quietZone={10}
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
            </ViewShot>
            <TouchableOpacity
              onPress={captureAndSaveToGallery}
              style={styles.saveToGalleryButtonStyle}>
              <Text style={styles.buttonTextStyle}>{LABELS.saveToGallery}</Text>
            </TouchableOpacity>
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
  buttonTextStyle: {
    textAlign: 'center',
    fontWeight: '500',
    color: colors.black,
    fontSize: 16,
    // letterSpacing: 0.3,
  },
  pickerStyle: {
    height: 50,
    width: WIDTH,
    bottom: '10%',
  },
  generateButton: {
    width: 250,
    height: 80,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  generateButtonText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH * 0.45,
    height: 120,
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 10,
  },
  saveToGalleryButtonStyle: {
    top: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH * 0.45,
    height: 60,
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 10,
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
  modalMainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  modalInnerContainer: {
    width: WIDTH * 0.9,
    height: '95%',
    borderRadius: 40,
    backgroundColor: colors.grey6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
