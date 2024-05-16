import {Picker} from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Config from 'react-native-config';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import BackButton from '../Components/BackButton';
import colors from '../assets/colors';
import {LABELS, updateLabels} from '../labels';

const adUnitId = __DEV__ ? Config.DEV_AD_UNIT_ID : Config.PROD_AD_UNIT_ID;

const SettingsScreen = () => {
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // State to manage selected language

  // Function to handle language change
  const handleLanguageChange = value => {
    // console.log('🎯: SettingsScreen -> value', value);
    setSelectedLanguage(value);
    updateLabels(value); // Update labels when language is changed
  };

  // console.log('🎯: SettingsScreen -> ');
  return (
    <View style={styles.mainContainer}>
      <View style={{position: 'absolute', top: 0}}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      </View>
      <BackButton
        onPress={() => navigation.navigate('Home', {selectedLanguage})}
      />

      <View style={{top: '15%'}}>
        <Text>{LABELS.selectLanguage}</Text>
        <Picker
          selectedValue={selectedLanguage}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) =>
            handleLanguageChange(itemValue)
          }>
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Español" value="Spanish" />
          <Picker.Item label="中文" value="Chinese" />
          <Picker.Item label="العربية" value="Arabic" />
          <Picker.Item label="Deutsch" value="German" />
          <Picker.Item label="Português" value="Portuguese" />
          <Picker.Item label="Français" value="French" />
        </Picker>
      </View>
    </View>
  );
};
export default SettingsScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, padding: 20, backgroundColor: colors.white},
});
