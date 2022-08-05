import { View, Text, StyleSheet, FlatList, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import Card from './Card';


var { width,height } = Dimensions.get('window');
const Recommend = ({ route ,navigation}) => {
    
    // const navigation = useNavigation();
    const { recommendData } = route.params;
    // const [recommend,setRecommend]=useState(recommendData)
    console.log('Recommended Data', recommendData)
    const random=Math.floor((Math.random()*7)+1)
    console.log('Random',random)
    // const [bookItem, setBookItem] = useState(recommendData);
    const slice = recommendData.slice(random,8);
    const [recommend,setRecommend]=useState(slice);
    //  setRecommend(slice);
    console.log('Sliced Data', slice)
    return (

        // <Item title={item.title} />
        <View style={styles.container}>
           
           <View style={styles.cards}>
              <FlatList
                data={slice}
                numColumns={2}
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
            
                </View>
    )
}

export default Recommend

const styles = StyleSheet.create({

    container:
    {
        flex:1,
        backgroundColor:"#fff"

    },
    Cardcontianer:
    {
        flex: 1,
        maxWidth:width-210,
        width: width / 2 -50,
        // height: width/1.3,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        marginLeft:10,
        marginRight:10,
        alignItems: 'center',
        elevation: 12,
        backgroundColor: 'white',
    },
    cards: {
        flex: 1
    },
    image:
    {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 15,
        // borderRadius: 15
    },
    
    card:
    {
        marginBottom: 10,
        height: width / 2 - 20 - 100,
        width: width / 2 - 20 - 10,
        backgroundColor: 'transparent'
    },

    title:
    {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: 'center',
        marginTop: 90
    },
    subtitle: {

        fontSize: 15,
        textAlign: 'center',
        // marginTop:-20
    },
    author:
    {
        fontSize: 16,
        color: 'black',
        marginTop: 5,
        fontFamily: 'fantasy',
        margin: 10

    }
})