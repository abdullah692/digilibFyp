import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image ,Dimensions} from 'react-native'

export default function DigLib({ navigation }) {

    var { height,width } = Dimensions.get("window");
    return (
        <ScrollView>
            <View  style={styles.links}>
                <View style={styles.btns}>
                    <TouchableOpacity onPress={() => navigation.navigate('Lending')}>
                        <Text style={styles.txt}>Lending</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Reference')}>
                        <Text style={styles.txt}>Reference</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Digital Library')}>
                        <Text style={styles.txt}>Digital Library</Text>
                    </TouchableOpacity>
                </View>
                </View>
                <View style={styles.container}>
                <View style={styles.content}>

                    <Text style={styles.heading}>Digital Library Section</Text>
                    <View>
                        <Image style={{ width:width-40, height: height/4 }} source={
                            require('../../assets/diglib.png')} resizeMode="contain" />
                    </View>
                    <Text style={styles.text}>
                        The Digital Library section started as an initiative of the HEC in 2006 with 15 computers to facilitate university students to use the digital resources, E journals and E books provided by the National Digital Library Program.
                    </Text>
                    <Text style={styles.text}>
                        In addition to this facility, the library started providing printing and scanning. This service was highly appreciated as it provided a central place to all university students to work on their assignments and study projects.
                        Soon the need was felt to enhance this service which was done under the mega projects of the university. The section now comprises of 64 high configuration desktops running windows 7.{"\n"}{"\n"}
                        The following facilities are provided:
                    </Text>
                    <Text style={styles.subheading}>
                        Computational Facilities </Text>
                    <Text style={styles.text}>
                        •	 Standard software such as Microsoft office, Adobe acrobat is installed on all computers. Students can use internet facility for academic purpose.{"\n"}{"\n"}
                        •	In addition commonly used software in engineering disciplines such as AutoCAD, MATLAB, Microsoft project, Microsoft Visio have also been installed to facilitate students.{"\n"}</Text>
                    <Text style={styles.subheading}>Printing Facilities</Text>
                    <Text style={styles.text}>
                        •	Laser printing facility is being provided to library users at the cost of Rs.5.00 per page.{"\n"}</Text>
                    <Text style={styles.subheading}>Scanning Facilities</Text>
                    <Text style={styles.text}>
                        •	Scanning facility of few figures/tables/text from reference material is allowed. This service is provided @ Rs.2.00 per scan.

                    </Text>

                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#fff',
        alignItems:'center'
    },
    links:
    {
        flex:1,
        backgroundColor:'#fff'
    },
    btns:
    {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 15
    },
    txt:
    {
        marginHorizontal: 6,
        // fontSize: 16,
        color: '#74b1e0'
    },
    content:
    {
        marginVertical: 10,
        marginHorizontal: 15,
    },
    text:
    {
        // fontSize: 15,
        color: "#000",
        marginVertical: 10
    },
    subheading:
    {
        fontSize: 20,
        color: '#000',
    },
    heading:
    {
        fontSize: 30,
        color: '#000',
        textAlign: 'center',
        // marginTop: 20,
    },
})