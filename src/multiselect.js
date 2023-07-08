import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const WatchBrands = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const watchBrands = [
    'Rolex',
    'Omega',
    'Tag Heuer',
    'Patek Philippe',
    'Breitling',
    'Cartier',
    'Audemars Piguet',
    'Tissot',
    'Seiko',
    'Citizen',
    'Fossil',
    'Casio',
    'Timex',
    'Bulova',
    'Movado',
    'Swatch',
    'Daniel Wellington',
    'G-Shock',
    'Michael Kors',
    'Hugo Boss',
  ];

  const handleBrandToggle = brand => {
    const isSelected = selectedBrands.includes(brand);
    let updatedSelection = [];

    if (isSelected) {
      updatedSelection = selectedBrands.filter(item => item !== brand);
    } else {
      updatedSelection = [...selectedBrands, brand];
    }

    setSelectedBrands(updatedSelection);
  };

  return (
    <View>
      {watchBrands.map(brand => (
        <TouchableOpacity
          key={brand}
          onPress={() => handleBrandToggle(brand)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              marginRight: 10,
              borderWidth: 2,
              borderColor: selectedBrands.includes(brand) ? 'blue' : 'gray',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {selectedBrands.includes(brand) && (
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: 'blue',
                }}
              />
            )}
          </View>
          <Text>{brand}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default WatchBrands;
