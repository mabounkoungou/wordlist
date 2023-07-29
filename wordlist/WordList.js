import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Appearance,
} from 'react-native';
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
  const [greeting, setGreeting] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');

  useEffect(() => {
    
    const currentHour = new Date().getHours();

    
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responses = await Promise.all(API_URLS.map(url => axios.get(url)));
      const combinedData = responses.flatMap(response => response.data);
      const sortedData = combinedData.sort((a, b) => a.word.localeCompare(b.word));
      setDataList(sortedData);
      setLoading(false);
      setRefreshing(false); 
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      setLoading(false);
      setRefreshing(false); 
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

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const renderItem = ({ item, index }) => {
    const highlightStyle = item.word.toLowerCase().includes(searchText.toLowerCase())
      ? { color: 'green' }
      : null;

    return (
      <View style={styles.itemContainer}>
        <Text style={[styles.itemNumber, { color: theme === 'dark' ? 'white' : 'black' }]}>{index + 1}.</Text>
        <Text style={[styles.itemText, highlightStyle, { color: theme === 'dark' ? 'white' : 'black' }]}>{item.word}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <Text style={[styles.greetingText, { color: theme === 'dark' ? 'white' : 'black' }]}>{greeting}</Text>
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
      <FlatList
        data={dataList}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.word}-${index}`}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <View style={styles.notFoundContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : dataList.length === 0 ? (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Word not found</Text>
        </View>
      ) : null}
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={styles.themeButtonText}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  darkContainer: {
    backgroundColor: '#121212',
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
    backgroundColor: 'green',
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
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeButton: {
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  themeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WordList;
