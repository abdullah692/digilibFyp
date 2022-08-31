import { View, Text ,StyleSheet,Dimensions,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Chip } from 'react-native-paper'


var {height,width}=Dimensions.get('window')

const Keywords = ({ keywordData, searchKeyword,api }) => {

  const [keyword,setKeyword]=useState([])

  
  // console.log('Keywords data', keywordData)
  // console.log('Query Search', searchKeyword)

  const keywordHandle=async()=>{
    const data=await fetch(`https://api.datamuse.com/words?rel_trg=${searchKeyword}`)
    const response=await data.json();
    // console.log('KeywordsDatas :',response)
    setKeyword(response);
  }

  useEffect(()=>{
    keywordHandle();
    
  },[keyword])

  // const random=Math.floor((Math.random()*5)+1)
  // console.log('Ranndom',random)

  return (
    <View>
      {/* <Text>Keywords </Text> */}
      <ScrollView horizontal>
      <View style={styles.container}>
      {
          keyword?.slice(0,8).map((item)=>{
            return(
              <View style={styles.keywords}>
                <Chip icon={"tag-search-outline"} >{item.word}</Chip>
              </View>
              ) 
          })
      }
      </View>
      </ScrollView>
    </View>
  )
}

export default Keywords 

const styles=StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    // justifyContent:'space-between',
    // alignContent:'space-between'

  },
  keywords:{
    marginHorizontal:5,
    //  marginVertical:2
    // width:150
  }
})