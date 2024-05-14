import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../assets/colors';
import QRCode from 'react-native-qrcode-svg';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import ImagePath from '../Constants/ImagePath';
import SettingsButton from '../Components/SettingsButton';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import {LABELS, getLabels} from '../labels';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {WIDTH} from '../assets/styles';

const GenerateQR = () => {
  const route = useRoute();
  const {params} = route;
  const selectedLanguage = params ? params.selectedLanguage : 'english'; // Default to 'english' if selectedLanguage is not provided
  let labels = getLabels(selectedLanguage);

  const navigation = useNavigation(); // Use useNavigation hook to get navigation object
  const isFocused = useIsFocused();

  // states

  const [userImage, setUserImage] = useState(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // Update labels when screen is focused
    if (isFocused) {
      labels = getLabels(selectedLanguage);
    }
  }, [isFocused, selectedLanguage]);

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

  return (
    <View style={styles.mainContainer}>
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
            onPress={imageHandler}
            activeOpacity={0.8}
            style={styles.buttonStyle}>
            <Text numberOfLines={3} style={{textAlign: 'center'}}>
              {LABELS.selectImage}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={imageHandler}>
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
        <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle}>
          <Text numberOfLines={3} style={{textAlign: 'center'}}>
            {LABELS.selectFormat}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center', top: 40}}>
        <TouchableOpacity
          onPress={() => console.log('asd', inputText)}
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
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH * 0.45,
    height: 120,
    backgroundColor: colors.grey5,
    borderRadius: 20,
    padding: 5,
  },
});
