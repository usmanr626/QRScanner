import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../assets/colors';
import BackButton from '../Components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker
import {LABELS, updateLabels} from '../labels';

const SettingsScreen = () => {
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // State to manage selected language

  // Function to handle language change
  const handleLanguageChange = value => {
    console.log('🎯: SettingsScreen -> value', value);
    setSelectedLanguage(value);
    updateLabels(value); // Update labels when language is changed
  };

  return (
    <View style={styles.mainContainer}>
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
