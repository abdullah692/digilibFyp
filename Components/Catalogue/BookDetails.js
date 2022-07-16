import { View, Text, StyleSheet, ScrollView, Image, Linking } from 'react-native'
import React from 'react'

const BookDetails = ({ route }) => {
  const { bookDetails } = route.params;
  console.log('Details', bookDetails);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <ScrollView>
            {/* <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Isbn:  {isbn}</Text> */}
            <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Status: <Text style={{ color: '#3ED443' }}>Book is Available </Text></Text>


            <View style={styles.content}>
              <Text style={{ marginVertical: 10, marginHorizontal: 10, fontSize: 30, fontFamily: 'fantasy', color: '#000' }}>
                Title: {bookDetails.volumeInfo.title}</Text>
              <Image source={{ uri: bookDetails.volumeInfo.imageLinks.thumbnail ? bookDetails.volumeInfo.imageLinks.thumbnail : '	https://al-ameenacademy.org/wp-content/themes/eikra/assets/img/noimage-420x273.jpg' }}
                style={{ height: 200, width: 200, marginHorizontal: 80, marginVertical: 15 }}
                resizeMode='contain' />
              <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>Authors: {bookDetails.volumeInfo.authors}</Text>
              <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>Publisher: {bookDetails.volumeInfo.publisher}</Text>
              <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Publish Date: {bookDetails.volumeInfo.publishedDate}</Text>
              <Text style={styles.link} onPress={() => Linking.openURL(bookDetails.volumeInfo.previewLink)}>
                More Details
              </Text>
              <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000', fontSize: 17 }}>Description: </Text>
              <Text style={{ color: '#6E6E6E', marginHorizontal: 9 }}> {bookDetails.volumeInfo.description ? bookDetails.volumeInfo.description : 'No Description Available ...'}</Text>
            </View>


          </ScrollView>
        </View>
      </View>
    </View>
  )
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
    color: 'blue',
    textDecorationLine: 'underline',
    marginVertical: 10
  }
})
