import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Button, Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';



var { width } = Dimensions.get('window');
function Card({ title, image, subtitle, author, booksData ,rating}) {



    let Subtitle = subtitle?.length > 15 ? subtitle.substring(0, 30) + "..." : subtitle
    // const { books } = props
    // console.log('Cards data', books);

    //  const { title, image, subtitle, author ,booksData} = props

    // const { image, price, name, countInStock } = props;
    const navigation = useNavigation();
    const [bookItem, setBookItem] = useState(booksData);
    // console.log('All books Data', bookItem);
    // console.log('Ratings', bookItem?.volumeInfo?.averageRating)
     let rateOfBook = rating ? rating : 0;
    const [reviews, setReviews] = useState(rateOfBook);
    // console.log('Reviews',reviews)
    const ratingCompleted = (rating) => {
        if (reviews == undefined) 
        {
            setReviews(0)
        }
    }

    return (
        <View>
            <View style={styles.contianer} >
                <TouchableOpacity onPress={() => [navigation.navigate("BookDetails", { bookDetails: bookItem })]}>
                    <Image style={styles.image}
                        resizeMode="contain"
                        source={{ uri: image ? image : 'https://eaklibrary.neduet.edu.pk:8443/catalog/bk/No-book.png' }} />
                    <View style={styles.card} />
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.subtitle}>
                        {Subtitle ? Subtitle : 'A good learning eperienced book'}
                    </Text>
                    {/* <Text>Ratings : {bookItem?.volumeInfo?.averageRating ? bookItem?.volumeInfo?.averageRating : 0}</Text> */}
                    {/* <Text style={styles.author}>
                    Author: {author}
                </Text> */}
                    <Rating
                        readonly={true}
                        //   showRating
                        imageSize={25}
                        onFinishRating={ratingCompleted}
                        startingValue={reviews}
                        style={{ paddingVertical: 10 }}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}
  
export default Card

const styles = StyleSheet.create({

    contianer:
    {
        flex: 1,
        width: width / 2 - 20,
        // height: width/1.3,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 12,
        backgroundColor: 'white',

    },
    cards:
    {
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
