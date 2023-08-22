import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet,Keyboard } from 'react-native';
import { searchMovies } from '../api';

const SearchBar = ({ placeholder, handleSearch,onChangeVal }) => {
  

  return (
    <View style={styles.container}>
      <TextInput
          style={styles.input}
          placeholder='mau cari film apa...'
          onSubmitEditing={handleSearch}
          onChangeText={onChangeVal}
          placeholderTextColor="#ffffff" 
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#',
    padding: 10,
    color:'white'
  },
  input: {
    height: 40,
    color: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
