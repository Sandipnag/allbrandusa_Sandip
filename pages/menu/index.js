import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions
} from 'react-native';

const items = [
    { name: 'About Us', link: 'Aboutus', icon: require('../../assets/images/about_us.png') },
    { name: 'Exports', link: 'Exports', icon: require('../../assets/images/export.png') },
    { name: 'Partners', link: 'Partners', icon: require('../../assets/images/partner.png') },
    { name: 'RMA', link: '', icon: require('../../assets/images/rma.png') },
    { name: 'Contact Us', link: 'ContactUs', icon: require('../../assets/images/contact_us.png') },
];

const Menu = (props) => {

    const [boxsize, setBoxsize] = useState(0);

    const [data, setData] = useState(items);

    calculate = (e) => {
        totalData = items.length;
        const numOfitemsPerRow = 5;
        mumberOfRow = Math.ceil(totalData / numOfitemsPerRow);
        setBoxsize((e.nativeEvent.layout.width - 4 * 2) / numOfitemsPerRow);
        let numberOfElementsLastRow = totalData - (mumberOfRow * numOfitemsPerRow);
        while (numberOfElementsLastRow !== numOfitemsPerRow && numberOfElementsLastRow !== 0) {
            items.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }
        setData(items);
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.9 }}>
                <ImageBackground
                    source={require('../../assets/images/home_image.png')}
                    style={{ width: null, height: null, flex: 1, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 22, marginTop: Dimensions.get('screen').height * .25 }}>AllbrandsUSA</Text>
                    <TouchableOpacity 
                        onPress={()=>props.navigation.navigate('Products')}
                        style={{ borderWidth: 2, borderColor: '#fff', alignSelf: 'center', marginTop: 30,padding:5 }}>
                        <Image
                            style={{
                                width: 150,
                                height: 80,
                                alignSelf: 'center',
                            }}
                            source={require('../../assets/images/product_logo.png')}
                        />
                        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold',fontSize:20}}>
                            Products
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>

            </View>
            <View
                onLayout={(e) => { this.calculate(e) }}
                style={{
                    flex: 0.1,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    justifyContent: 'space-between'
                }}>
                {data.map((single, index) => (
                    <TouchableOpacity
                        onPress={()=>props.navigation.navigate(single.link)}
                        key={index}
                        style={{
                            width: boxsize,
                            height: boxsize,
                            backgroundColor: '#d3d3d3',
                            padding: 5
                        }}>
                        <Image
                            style={{
                                width: 25,
                                height: 25,
                                alignSelf: 'center',
                                marginBottom: 10
                            }}
                            source={single.icon}
                        />
                        <Text
                            style={{
                                textAlign: 'center',
                                // fontSize: boxsize * .12,
                                // color: '#fff'
                            }}>
                            {single.name}
                        </Text>
                    </TouchableOpacity>
                ))}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 30
    },
    item: {
        backgroundColor: '#3EC5FD',
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        elevation: 2
    },
    headerText: {
        marginVertical: 20,
        // fontFamily: FontFamily.WorkSans_Bold,
        // fontSize:Font.large_size,
        letterSpacing: 1,
        color: '#878787'
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    }
});

export default Menu;
