import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, ActivityIndicator, RefreshControl, ScrollView } from 'react-native'
import Card from './Card'
import { Searchbar } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// import {useSelector,useDispatch} from 'react-redux'

import Recommend from './Recommend';


var { width } = Dimensions.get('window');
function Search() {


  const API_KEY = 'AIzaSyAKNZSHQPpky7-XGmvh7TIM3lQLzalqeZw';
  const [data, setData] = useState([])
  const [query, setQuery] = useState('Javascript');
  const [isloaded, setLoaded] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  // const bookData=useSelector((state)=>state.auth.books);
  // const dispatch=useDispatch();



  // const bookApi = async () => {
  //   const data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=newest&key=${API_KEY}`)
  //  const res=await data.json();
  //   setBooks(res.items);

  //   console.log('Book data', res.items);
  // }

  const Api = async () => {
      
    const data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}&maxResults=20`)
    const res = await data.json();
    setData(res.items);
    if (!data.length) {
      setLoaded(false);
      setRefreshing(false)
    }
    
    console.log('Books data', data);
    console.log('Query', `${query}`);
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
  const navigation = useNavigation();

  const onRefresh = () => {
    setRefreshing(true)
    Api();
  }

  useEffect(() => {
    Api();
  }, [query])

  const handleChange = ((value) => {
    setQuery(value);
    console.log(value);

  })

  if (!data) {
    return (
      <View style={styles.contianer}>
        <Searchbar
          placeholder="Search Books.."
          onChangeText={handleChange}
          value={data}
        />
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          <View style={{ margin: 20 }}>
            <Text style={{ textAlign: 'center', marginTop: 10 }}>Enter some keyword in Search Bar </Text>
          </View>
        </ScrollView>
      </View>
    )
  }

  return (
    <>
      <View style={styles.contianer}>
        {/* <TextInput style={styles.Search}
        placeholder='Search a book'
        onChangeText={handleChange}
      >
         <Icon name='search' size={22} color='#74b1e0'/>
      </TextInput> */}
        <Searchbar
          placeholder="Search Books.."
          onChangeText={handleChange}
          value={data}
        />

        {isloaded ? (
          <View>
            <ActivityIndicator size={30} color='#74b1e0' />
          </View>
        ) : (
          <ScrollView>
          <>
        
            <View style={styles.chip}>
            <Chip icon="star"  
        onPress={() =>[navigation.navigate("Recommend", { recommendData : data })]}>Recommended Books</Chip>

</View>

            <View style={styles.cards}>
              <FlatList
                data={data}
                numColumns={2}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
            
          </>
          </ScrollView>
        )
        }

      </View>
      
      {/* <View style={styles.recommend}>
    <Recommend recommendData={data}/></View> */}

    </>
    
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

    marginTop: -50,
    marginBottom: 20,
    marginLeft: 30,
  },
  Search: {
    borderWidth: 1,
    width: 350,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20
  },
  chip:{
    marginVertical:10,
    width:200,
    marginLeft:5
  }

})
