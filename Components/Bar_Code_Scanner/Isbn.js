import { View, Text, StyleSheet, ScrollView, Image, Linking, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { IP,PORT } from '../../constant';

const Isbn = ({ navigation, route }) => {

  const { isbn } = route.params;
  const [status, setStatus] = useState(null);
  const [datas, setData] = useState([]);
  const [isloaded, setLoaded] = useState(true);
  const [isTruncated,setTruncated]=useState(true);
  const [nedIsbn,setNedIsbn]=useState(null);
  const [isbnStatus,setIsbnStatus]=useState(null);


  let isbn_value;
  let Link_value;
  let isbn_NED;

  const handleApi = async () => {
    
    const data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${isbn}`);
    const bookisbn = await data.json();
    // setStatus(true);
    
    
    // console.log(bookisbn);
    // console.log(bookisbn.items[0].volumeInfo.industryIdentifiers);
    // const values = bookisbn.items;
    // console.log(values);
    // setLoaded(false);
    setData(bookisbn.items)


    console.log('Value Data', datas);
    Link_value = bookisbn.items[0].volumeInfo.previewLink.includes(`${isbn}`);
    console.log("Link Value isbn :", Link_value);

    bookisbn.items.forEach(element => {
      console.log(element);
      for (let i in element.volumeInfo.industryIdentifiers) {
        console.log(element.volumeInfo.industryIdentifiers[i])
        let obj = element.volumeInfo.industryIdentifiers.find(o => o.type === 'ISBN_13');
        isbn_value = obj?.identifier;
        console.log("Identifier Value :", isbn_value);
      }
      
   
    });
    const isbnNed=()=>{
      axios.get(`http://${IP}:${PORT}/api/getBookStatus`,{params:{isbn}})
      .then((res)=>{
        setLoaded(false);
        // console.log('IsbnResponse',res.data)
        setNedIsbn(res.data);
        if(res?.data?.bookBankData){
          setIsbnStatus("Book is Available in Book Bank")
          setStatus(true)
        } else if (res?.data?.circulationBookData){
          setIsbnStatus("Book is Available in Circulation")
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
      // const check = () => {
      //   if (isbn_value === isbn || Link_value == true && isbn_NED==true) {
      //     console.log("The book is available in NED Library")
      //     setStatus(true);
      //   }
      //   if(isbnStatus.bookInBookBank==true && isbnStatus.circulationBooks==false)
      //   {
      //     console.log("The book is available in Book Bank Department")
      //     setStatus(true);
      //   }
      //   if(isbn_value === isbn || Link_value == true || isbnStatus.bookInBookBank==false && isbnStatus.circulationBooks==true)
      //   {
      //     console.log("The book is available in Circulation Department")
      //     setStatus(true); 
      //   }
      //   else {
      //     console.log('Sorry!! This book is not available');
      //   }
      // }

      isbnNed();
    
        // check();
        console.log('ISBN NED',nedIsbn)
  }
  // const check = () => {
  //   if (isbn_value === isbn || Link_value == true) {
  //     console.log("The book is available in NED Library")
  //     setStatus(true);
  //   }
  //   else {
  //     console.log('Sorry!! This book is not available');
  //     setStatus(false);
  //   }
  // }

  //Description Read More/Less 
  const descriptionValue = datas[0]?.volumeInfo?.description;
  console.log(descriptionValue);
  const description = isTruncated ? descriptionValue?.slice(0,200)+"..." : descriptionValue;

  const handleRead=()=>{
    setTruncated(!isTruncated);
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
          <Text style={{ color:'#3f3f3f', marginHorizontal: 9,marginBottom:15 }}>
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
    if(datas[0]?.volumeInfo?.subtitle )
    {
      return (
        <View>
          <Text style={{ marginHorizontal: 10, fontSize: 22, fontFamily: 'Roboto', color: 'coral' }}>
          SubTitle: {datas[0]?.volumeInfo?.subtitle ? datas[0]?.volumeInfo?.subtitle : " "}
          </Text>
        </View>
      )
    }
    else 
    return null;
  }

  

  useEffect(() => {
    handleApi();
  }, [isbn])

  if (status == null) {
    return (
      <View style={styles.container}>
        {
          isloaded ? (
            <View>
              <ActivityIndicator size={50} color='#74b1e0' />
            </View >
          ) : (
            <View>
              <View>

                <Text style={{ fontSize: 25 }}>No Data is Available</Text>
                <Text>No ISBN is Scanned</Text>
              </View>
            </View>

          )}
      </View>
    )
  } 

  if (status == true) {

    return (
      <View style={styles.container}>
        {
          isloaded ? (
            <View>
              <ActivityIndicator size={50} color='#74b1e0' />
            </View >
          ) : (
            <View>
              <View>
                <ScrollView>
                  <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Isbn:  {isbn}</Text>
                  <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Status: <Text style={{ color: '#3ED443' ,fontSize:16}}>Book is Available in {"\n"}Eng.Abul Kalam Library </Text></Text>
                  {datas.slice(0, 1).map((item, index) => (

                    <View style={styles.content}>
                      <Text style={{ marginVertical: 10, marginHorizontal: 10, fontSize: 30, fontFamily: 'fantasy', color: '#219ebc' }}>
                        Title: {item.volumeInfo.title}</Text>
                        {subtitle()}
                      <Image source={{ uri: item?.volumeInfo?.imageLinks?.thumbnail ? item?.volumeInfo?.imageLinks?.thumbnail : 'https://eaklibrary.neduet.edu.pk:8443/catalog/bk/No-book.png' }}
                        style={{ height: 200, width: 200, marginHorizontal: 80, marginVertical: 15 }}
                        key={index} resizeMode='contain' />
                      <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>Authors: {item.volumeInfo.authors}</Text>
                      <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>Publisher: {item.volumeInfo.publisher}</Text>
                      <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Publish Date: {item.volumeInfo.publishedDate}</Text>
                      <Text style={styles.link} onPress={() => Linking.openURL(item.volumeInfo.previewLink)}>
                        More Details
                      </Text>
                      <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000', fontSize: 17 }}>Description: </Text>
                      {/* <Text style={{ color: '#6E6E6E', marginHorizontal: 9 }}> {item.volumeInfo.description ? item.volumeInfo.description : 'No Description Available ...'}</Text> */}
                    {desc()}
                    </View>
                  ))}

                </ScrollView>
              </View>
            </View>

          )}
      </View>
    )
  }
  if (status === false) {

    return (
      <View style={styles.container}>
        {isloaded ? (
          <View>
            <ActivityIndicator size={50} color='#74b1e0' />
          </View>
        ) : (
          <View >
            <ScrollView>
              <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Isbn:  {isbn}</Text>
              <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Status: <Text style={{ color: 'red',fontSize:16 }}>Book is not Available in {"\n"}Eng.Abul Kalam Library</Text></Text>
              {datas.slice(0, 1).map((item, index) => (
                <View style={styles.content}>
                  <Text style={{ marginVertical: 10, marginHorizontal: 10, fontSize: 30, fontFamily: 'fantasy', color: '#219ebc' }}>
                    Title: {item.volumeInfo.title}</Text>
                    {subtitle()}
                    <Image source={{ uri: item?.volumeInfo?.imageLinks?.thumbnail ? item?.volumeInfo?.imageLinks?.thumbnail : 'https://eaklibrary.neduet.edu.pk:8443/catalog/bk/No-book.png' }}
                        style={{ height: 200, width: 200, marginHorizontal: 80, marginVertical: 15 }}
                        key={index} resizeMode='contain' />
                  <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>Authors: {item.volumeInfo.authors}</Text>
                  <Text style={{ marginHorizontal: 10, fontSize: 18, color: '#000' }}>Publisher: {item.volumeInfo.publisher}</Text>
                  <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000' }}>Publish Date: {item.volumeInfo.publishedDate}</Text>
                  <Text style={styles.link} onPress={() => Linking.openURL(item.volumeInfo.previewLink)}>
                    More Details
                  </Text>
                  <Text style={{ marginHorizontal: 10, fontSize: 15, color: '#000', fontSize: 17 }}>Description: </Text>
                  {/* <Text style={{ color: '#6E6E6E', marginHorizontal: 9 }}> {item.volumeInfo.description ? item.volumeInfo.description : 'No Description Available ...'}</Text> */}
                {desc()}
                </View>
              ))}

            </ScrollView>
          </View>

        )}
      </View>
    )

  }

}

export default Isbn

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
