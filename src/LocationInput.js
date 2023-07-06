import React, {useState} from 'react';
import {View, TextInput, FlatList, Text, TouchableOpacity} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {SafeAreaView} from 'react-native-safe-area-context';
const LocationInput = () => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const GOOGLE_PLACES_API_KEY = 'AIzaSyCGz3NzE46sAz0Q7J912AJftXjdy0fOrgI';

  return (
    <SafeAreaView style={{flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder="Type a place"
        onPress={(data, details = null) =>
          console.log(
            data,
            'Lat Long of selected Place',
            details?.geometry?.location,
            'response',
          )
        }
        query={{key: GOOGLE_PLACES_API_KEY}}
        fetchDetails={true}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        textInputProps={{
          autoFocus: true,
          blurOnSubmit: false,
        }}
      />
    </SafeAreaView>
  );
};

export default LocationInput;
