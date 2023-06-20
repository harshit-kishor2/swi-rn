import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';

const WalkThroughScreen = () => {
  const [page, setPage] = useState(0);
  return (
    <View>
      {page === 0 && <View style={{ backgroundColor: 'green' }}>

        <Text>index{page}

        </Text>
        <Button title='next' onPress={() => {
          setPage(1);
        }} />
      </View>}

      {page === 1 && <View style={{ backgroundColor: 'red' }}>
        <Text>index{page}</Text>
        <Pressable onPress={() => {
          setPage(2);
        }}>
          <View style={styles.submitStyle}>
            <Text style={styles.bg_button}>final page</Text>
          </View>
        </Pressable>
      </View>}

      {page === 2 && <View style={{ backgroundColor: 'yellow' }}>
        <Text>index{page}</Text>
        <Button title='end' onPress={() => {
          //setPage(1);
        }} />
      </View>}


    </View>

  );
};

export default WalkThroughScreen;
const styles = StyleSheet.create({
  submitStyle: {
    height: 40,
    width: 350,
    backgroundColor: '#000000',
    color: 'white',
    elevation: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  bg_button: {
    color: 'white',
    font: 'Cabin'
  }
});

