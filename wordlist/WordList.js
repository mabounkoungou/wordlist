import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const API_URLS = [
  'https://api.datamuse.com/words?ml=ringing+in+the+ears',
  'https://api.datamuse.com/words?rel_jjb=ocean',
  'https://api.datamuse.com/words?rel_jja=yellow',
  'https://api.datamuse.com/words?sl=jirraf',
  'https://api.datamuse.com/words?sp=t??k',
  'https://api.datamuse.com/words?ml=duck&sp=b*&max=10',
  'https://api.datamuse.com/words?rel_jjb=ocean&topics=temperature',
];

const WordList = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responses = await Promise.all(API_URLS.map(url => axios.get(url)));
      const combinedData = responses.flatMap(response => response.data);
      const sortedData = combinedData.sort((a, b) => a.word.localeCompare(b.word));
      setDataList(sortedData);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchText.trim() === '') {
      fetchData();
    } else {
      const lowerCaseSearchText = searchText.toLowerCase();
      const filteredData = dataList.filter(item =>
        item.word.toLowerCase().includes(lowerCaseSearchText)
      );
      setDataList(filteredData);
    }
  };

  const renderItem = ({ item, index }) => {
    const highlightStyle = item.word.toLowerCase().includes(searchText.toLowerCase())
      ? { color: 'green' }
      : null;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemNumber}>{index + 1}.</Text>
        <Text style={[styles.itemText, highlightStyle]}>{item.word}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search word..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <View style={styles.notFoundContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : dataList.length === 0 ? (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Word not found</Text>
        </View>
      ) : (
        <FlatList
          data={dataList}
          renderItem={renderItem}
          keyExtractor={item => item.word}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  itemNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#1e90ff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notFoundContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  notFoundText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default WordList;
