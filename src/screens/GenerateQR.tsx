import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
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

  useEffect(() => {
    // Update labels when screen is focused
    if (isFocused) {
      labels = getLabels(selectedLanguage);
    }
  }, [isFocused, selectedLanguage]);
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView />
      <Text>{LABELS.touchToScan}</Text>
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

      <View style={{marginTop: 100}} />

      <TextInput placeholder={LABELS.pasteLink} style={styles.textInputStyle} />

      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle}>
          <Text numberOfLines={3} style={{textAlign: 'center'}}>
            Select an Image optional, for QR Code only
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle}>
          <Text numberOfLines={3} style={{textAlign: 'center'}}>
            Select a Code Format default CODE128, for BAR Code only
          </Text>
        </TouchableOpacity>
      </View>

      <Button title={LABELS.generate} />
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
    height: '7%',
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
