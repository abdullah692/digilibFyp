import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Button, Dimensions, TextInput, FlatList, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from './Card'
import { Searchbar } from 'react-native-paper';

var { width } = Dimensions.get('window');
function Search({ navigation }) {


  const API_KEY = 'AIzaSyAKNZSHQPpky7-XGmvh7TIM3lQLzalqeZw';
  const [data, setData] = useState([])
  const [query, setQuery] = useState('react');
  const [isloaded, setLoaded] = useState(true);
  


  // const bookApi = async () => {
  //   const data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=newest&key=${API_KEY}`)
  //  const res=await data.json();
  //   setBooks(res.items);

  //   console.log('Book data', res.items);
  // }

  const Api = async () => {
    const data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`)
    const res = await data.json();
    setData(res.items);
    setLoaded(false);
    console.log('Books data', data);
    // console.log('Subtitle: ', res.items[0].volumeInfo.subtitle)

  }

  const image = () => {
    if (data.volumeInfo.imageLinks.thumbnail != undefined) {
      return data.volumeInfo.imageLinks.thumbnail;
    }
    else {
      return null
    }
  }


  useEffect(() => {
    Api();
  }, [query])

  const handleChange = ((value) => {
    setQuery(value);
    console.log(value);

  })

  return (
    <View style={styles.contianer}>
      <TextInput style={styles.Search}
        placeholder='Search a book'
        onChangeText={handleChange}
      >
        <Icon name='search' size={22} color='#74b1e0' style={styles.searchicon} placeholder='Search a book' />
        
      </TextInput>
      {isloaded ? (
        <View>
          <ActivityIndicator size={30} color='#74b1e0' />
        </View>
      ) : (
        <View style={styles.cards}>
          <FlatList
            data={data}
            numColumns={2}
            renderItem={({ item }) => <Card
              booksData={item}
              title={item?.volumeInfo?.title}
              subtitle={item?.volumeInfo?.subtitle}
              image={item?.volumeInfo?.imageLinks?.thumbnail}
              author={item?.volumeInfo?.authors}
            />}
            keyExtractor={item => item.id}
          />
        </View>


      )
      }
    </View>
  )
}
export default Search

const styles = StyleSheet.create({
  contianer:
  {
    flex: 1,
    backgroundColor: '#fff',
  },
  cards: {
    flex: 1
  },
Searchbar:
{
  
  marginTop:-50,
  marginBottom:20,
  marginLeft:30


},
  Search: {
    borderWidth: 1,
    width: 350,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20
  },
  
})
