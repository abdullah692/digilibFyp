import { View, Text, StyleSheet, ScrollView, Image, Linking } from 'react-native'
import React, { useState } from 'react'


const RecommendDetails = ({ route }) => {
  const { RecommendbookDet } = route.params;
  console.log('RecommendDataDet',RecommendbookDet)
  const [isTruncated, setTruncated] = useState(true);
//   const [available, setAvailable] = useState(true);


  const descriptionValue = RecommendbookDet?.volumeInfo?.description;
  console.log(descriptionValue);
  const description = isTruncated ? descriptionValue?.slice(0, 150)+"..." : descriptionValue;

  const handleRead = () => {
    setTruncated(!isTruncated);
    // setAvailable(true);
  }
  const desc=()=>{
    if(!descriptionValue)
    {
      return(
        <View>
          <Text  style={{ color: '#6E6E6E', marginHorizontal: 9 }}>No description is available...</Text>
        </View>
      )
    }

    else
    {
      return(
        <View>
          <Text style={{ color:'#3f3f3f', marginHorizontal: 9 ,marginBottom:15}}>
            {description} {"\t"}
            <Text onPress={handleRead} style={{ color:'blue', fontSize:16,}}>  
                  {isTruncated ? "Read More" : "Read Less"}
                </Text>
          </Text>
        </View>
      )
    }
  }


  const subtitle=()=>{
    if(RecommendbookDet?.volumeInfo?.subtitle )
    {
      return (
        <View>
          <Text style={{ marginHorizontal: 10, fontSize: 22, fontFamily: 'Roboto', color: 'coral' }}>
          SubTitle: {RecommendbookDet?.volumeInfo?.subtitle ? RecommendbookDet?.volumeInfo?.subtitle : " "}
          </Text>
        </View>
      )
    }
    else 
    return null;
  }
  return (
    <View style={styles.container}>
      <View>
        <View>
          <ScrollView>
            {/* <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Isbn:  {isbn}</Text> */}
            <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Status: <Text style={{ color: '#3ED443' }}>Book is Available </Text></Text>
            <View style={styles.content}>
              <Text style={{ marginVertical: 10, marginHorizontal: 10, fontSize: 30, fontFamily: 'fantasy', color: '#219ebc' }}>
                Title: {RecommendbookDet[0]?.volumeInfo?.title}</Text>
                {/* <Text style={{ marginHorizontal: 10, fontSize: 22, fontFamily: 'Roboto', color: '#000' }}>
                SubTitle: {RecommendbookDet?.volumeInfo?.subtitle ? RecommendbookDet?.volumeInfo?.subtitle : " "}</Text>
                 */}
                {subtitle()} 
              <Image source={{ uri: RecommendbookDet?.volumeInfo?.imageLinks?.thumbnail ? RecommendbookDet?.volumeInfo?.imageLinks?.thumbnail : '	https://al-ameenacademy.org/wp-content/themes/eikra/assets/img/noimage-420x273.jpg' }}
                style={{ height: 200, width: 200, marginHorizontal: 80, marginVertical: 15 }}
                resizeMode='contain' />
              <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>Authors: {RecommendbookDet?.volumeInfo?.authors}</Text>
              <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>Publisher: {RecommendbookDet?.volumeInfo?.publisher}</Text>
              <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Publish Date: {RecommendbookDet?.volumeInfo?.publishedDate}</Text>
              <Text style={styles.link} onPress={() => Linking.openURL(RecommendbookDet.volumeInfo.previewLink)}>
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

export default RecommendDetails

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
