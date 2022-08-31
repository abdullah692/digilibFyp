import { View, Text, StyleSheet, ScrollView, Image, Linking } from 'react-native'
import React, { useState,useEffect } from 'react'
import { Rating } from 'react-native-ratings'
import {IP,PORT} from '../../constant'
import axios from 'axios'

const BookDetails = ({ route }) => {
  const { bookDetails } = route.params;
  console.log('Details', bookDetails);
  // console.log('RecommendDataDet',RecommendbookDet)
  const [isTruncated, setTruncated] = useState(true);
  const [status, setStatus] = useState(false);
  const [nedIsbn,setNedIsbn]=useState(null);
  const [isbnStatus,setIsbnStatus]=useState(null);
  let rateOfBook = bookDetails?.volumeInfo?.averageRating ? bookDetails?.volumeInfo?.averageRating : 0;
  const [reviews, setReviews] = useState(rateOfBook);
  // console.log('Reviews',reviews)
  const ratingCompleted = (rating) => {
    if (reviews == undefined) {
      setReviews(0)
    }
  }

  const isbn_value=bookDetails?.volumeInfo?.industryIdentifiers.find(o => o.type === 'ISBN_13');
  const isbn = isbn_value?.identifier;
  console.log(isbn)
  // console.log('ISBN VALUE IN DETIALS',isbnValue)

  const isbnNed=()=>{
    axios.get(`http://${IP}:${PORT}/api/getBookStatus`,{params:{isbn}})
    .then((res)=>{
      setLoaded(false);
      // console.log('IsbnResponse',res.data)
      // setNedIsbn(res.data);
      if(res?.data?.bookBankData){
        isbnStatus("Book is Available in Eng.Abul Kalam Lib")
        setStatus(true)
      } else if (res?.data?.circulationBooks){
        setNedIsbn("Book is Available in Eng.Abul Kalam Lib")
        // console.log(isbnStatus)
        setStatus(true)
      } else if(!res.data?.bookInBookBank && !res.data?.circulationBooks){
        setIsbnStatus("Book is Not Available")
        setStatus(false)
      } else {
        setIsbnStatus("Book is Available in Library")
        setStatus(true)
      }
     
      
    }).catch(err => {
      console.log(err)
    })
  }


  useEffect(() => {
    isbnNed();
  }, )



  const descriptionValue = bookDetails?.volumeInfo?.description;
  console.log(descriptionValue);
  const description = isTruncated ? descriptionValue?.slice(0, 150) + "..." : descriptionValue;

  const handleRead = () => {
    setTruncated(!isTruncated);
    // setAvailable(true);
  }
  const desc = () => {
    if (!descriptionValue) {
      return (
        <View>
          <Text style={{ color: '#6E6E6E', marginHorizontal: 9 }}>No description is available...</Text>
        </View>
      )
    }


    else {
      return (
        <View>
          <Text style={{ color: '#3f3f3f', marginHorizontal: 9, marginBottom: 15 }}>
            {description} {"\t"}
            <Text onPress={handleRead} style={{ color: '#74b1e0', fontSize:17, }}>
              {isTruncated ? "Read More" : "Read Less"}
            </Text>
          </Text>
        </View>
      )
    }
  }


    

    // console.log('Isbn Value',isbnValue)
  
  // statusIsbn();
  const subtitle = () => {
    if (bookDetails?.volumeInfo?.subtitle) {
      return (
        <View>
          <Text style={{ marginHorizontal: 10, fontSize: 22, fontFamily: 'Roboto', color: 'coral' }}>
            SubTitle: {bookDetails?.volumeInfo?.subtitle ? bookDetails?.volumeInfo?.subtitle : " "}
          </Text>
        </View>
      )
    }
    else
      return null;
  }
  // const availability=()=>{
  //   if(description == "No description is available")
  //   return setAvailable(false);
  //   else
  //   {
  //     return description
  //   }
  // }

if(status==true)
{
  return (
    <View style={styles.container}>
      <View>
        <View>
          <ScrollView>
            {/* <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Isbn:  {isbn}</Text> */}
            <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Status: <Text style={{ color: '#3ED443',fontSize:16 }}>Book is available in NED lUBRARY </Text></Text>
            <View style={styles.content}>
              <Text style={{ marginVertical: 10, marginHorizontal: 10, fontSize: 30, fontFamily: 'fantasy', color: '#219ebc' }}>
                Title: {bookDetails?.volumeInfo?.title}</Text>
              {/* <Text style={{ marginHorizontal: 10, fontSize: 22, fontFamily: 'Roboto', color: '#000' }}>
                SubTitle: {bookDetails?.volumeInfo?.subtitle ? bookDetails?.volumeInfo?.subtitle : " "}</Text>
                 */}
              {subtitle()}
              <Image source={{ uri: bookDetails?.volumeInfo?.imageLinks?.thumbnail ? bookDetails?.volumeInfo?.imageLinks?.thumbnail : '	https://al-ameenacademy.org/wp-content/themes/eikra/assets/img/noimage-420x273.jpg' }}
                style={{ height: 200, width: 200, marginHorizontal: 80, marginVertical: 15 }}
                resizeMode='contain' />
              {/* <Text style={{ marginHorizontal: 10,marginBottom:10, fontSize: 18, color: '#000',textAlign:'center' }}>Reviews : */}
              <Rating
                readonly={true}
                //   showRating
                imageSize={30}
                onFinishRating={ratingCompleted}
                startingValue={reviews}
                style={{ marginVertical: 10, marginRight: 35 }}
              />

              {/* </Text> */}
              <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>Authors: {bookDetails?.volumeInfo?.authors}</Text>
              <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>Publisher: {bookDetails?.volumeInfo?.publisher}</Text>
              <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Publish Date: {bookDetails?.volumeInfo?.publishedDate}</Text>
              <Text style={styles.link} onPress={() => Linking.openURL(bookDetails.volumeInfo.previewLink)}>
                More Details
              </Text>
              <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000', fontSize: 17 }}>Description: </Text>
              {desc()}
            </View>


          </ScrollView>
        </View>
      </View>
    </View>
  )
}

if(status==false)
{
  return (
    <View style={styles.container}>
      <View>
        <View>
          <ScrollView>
            {/* <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Isbn:  {isbn}</Text> */}
            <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Status: <Text style={{ color: 'red' ,fontSize:16}}>Not availabile in NED b </Text></Text>
            <View style={styles.content}>
              <Text style={{ marginVertical: 10, marginHorizontal: 10, fontSize: 30, fontFamily: 'fantasy', color: '#219ebc' }}>
                Title: {bookDetails?.volumeInfo?.title}</Text>
              {/* <Text style={{ marginHorizontal: 10, fontSize: 22, fontFamily: 'Roboto', color: '#000' }}>
                SubTitle: {bookDetails?.volumeInfo?.subtitle ? bookDetails?.volumeInfo?.subtitle : " "}</Text>
                 */}
              {subtitle()}
              <Image source={{ uri: bookDetails?.volumeInfo?.imageLinks?.thumbnail ? bookDetails?.volumeInfo?.imageLinks?.thumbnail : '	https://al-ameenacademy.org/wp-content/themes/eikra/assets/img/noimage-420x273.jpg' }}
                style={{ height: 200, width: 200, marginHorizontal: 80, marginVertical: 15 }}
                resizeMode='contain' />
              {/* <Text style={{ marginHorizontal: 10,marginBottom:10, fontSize: 18, color: '#000',textAlign:'center' }}>Reviews : */}
              <Rating
                readonly={true}
                //   showRating
                imageSize={30}
                onFinishRating={ratingCompleted}
                startingValue={reviews}
                style={{ marginVertical: 10, marginRight: 35 }}
              />

              {/* </Text> */}
              <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>Authors: {bookDetails?.volumeInfo?.authors}</Text>
              <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>Publisher: {bookDetails?.volumeInfo?.publisher}</Text>
              <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Publish Date: {bookDetails?.volumeInfo?.publishedDate}</Text>
              <Text style={styles.link} onPress={() => Linking.openURL(bookDetails.volumeInfo.previewLink)}>
                More Details
              </Text>
              <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000', fontSize: 17 }}>Description: </Text>
              {desc()}
            </View>


          </ScrollView>
        </View>
      </View>
    </View>
  )
}


 
}

export default BookDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff'
  },
  text:
  {
    marginHorizontal: 10,
    fontSize: 18,
    color: '#000'
  },
  link: {
    marginHorizontal: 10,
    fontSize: 15,
    color: '#fff',
    // textDecorationLine: 'underline',
    padding:7,
    width:110,
    borderRadius:10,
    marginVertical: 10,
    backgroundColor:'#74b1e0',
    textAlign:'center'
  }
})
