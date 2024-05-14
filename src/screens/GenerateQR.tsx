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
  Modal,
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
import {Picker} from '@react-native-picker/picker';

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

  const [selectedFormat, setSelectedFormat] = useState(null);
  const [formatPicker, setFormatPicker] = useState(false);

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

  const handleFormatChange = itemValue => {
    setSelectedFormat(itemValue);
    console.warn('done');
    setFormatPicker(false);

    // setModalVisible(false);
  };

  const errorHandler = () => {
    console.log('Adasdas');
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
          <Picker.Item label="CODE39" value="CODE39" />
          <Picker.Item label="CODE128" value="CODE128" />
          <Picker.Item label="CODE128A" value="CODE128A" />
          <Picker.Item label="CODE128B" value="CODE128B" />
          <Picker.Item label="CODE128C" value="CODE128C" />
          <Picker.Item label="EAN13" value="EAN13" />
          <Picker.Item label="EAN8" value="EAN8" />
          <Picker.Item label="EAN5" value="EAN5" />
          <Picker.Item label="EAN2" value="EAN2" />
          <Picker.Item label="UPC" value="UPC" />
          <Picker.Item label="UPCE" value="UPCE" />
          <Picker.Item label="ITF14" value="ITF14" />
          <Picker.Item label="ITF" value="ITF" />
          <Picker.Item label="MSI" value="MSI" />
          <Picker.Item label="MSI10" value="MSI10" />
          <Picker.Item label="MSI11" value="MSI11" />
          <Picker.Item label="MSI1010" value="MSI1010" />
          <Picker.Item label="MSI1110" value="MSI1110" />
          <Picker.Item label="pharmacode" value="pharmacode" />
          <Picker.Item label="codabar" value="codabar" />
          <Picker.Item label="Remove" value={null} />
          {/* Add more Picker.Item components for additional formats */}
        </Picker>
      )}

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={selectedFormat}
              style={{height: 200, width: '100%'}}
              onValueChange={handleFormatChange}>
              <Picker.Item label="Format 1" value="format1" />
              <Picker.Item label="Format 2" value="format2" />
             
             
            </Picker>
          </View>
        </View>
      </Modal> */}
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
