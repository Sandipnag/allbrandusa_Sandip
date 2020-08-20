import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../../components/header';
import Apis from '../../network/ApiCall';
import { ImageUrl, ApiUrl } from '../../network/Url';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
export default Productdetails = (props) => {

    const [productDetails, setProductDetails] = useState({})

    contactUS = () => {
        props.navigation.navigate('ContactUs');
    }

    useEffect(() => {
        getProductDetails();
    }, []);

    getProductDetails = async () => {
        const value = await AsyncStorage.getItem('product_details');
        setProductDetails(JSON.parse(value));
    }

    return (
        <View style={styles.container}>
            <Header
                headerText={'Product Details'}
                goback={goback}
                contactUS={contactUS}
            />
            <View style={{ flex: 1,padding:22 }}>
                <Text style={styles.title}>Product Title : {productDetails.hasOwnProperty("brand_title") ? productDetails.brand_title : ''}</Text>
                <View style={styles.gap}></View>
                <Text style={styles.title}>Product description</Text>
                <Text style={{ marginVertical: 10 }}>{productDetails.hasOwnProperty("productDesc") ? productDetails.productDesc : ''}</Text>
                <View style={styles.gap}></View>
                <Text style={styles.title}>In stock : {productDetails.hasOwnProperty("available") ? productDetails.available : ''}</Text>
                <View style={styles.gap}></View>
                <Text style={styles.title}>Product Price : {productDetails.hasOwnProperty("productPrice") ? productDetails.productPrice : ''}</Text>
                <View style={styles.gap}></View>
                {/* <Text>MPN Number</Text>
                <Text style={{marginTop:10}}>{productDetails.productMPN}</Text>
                <Text>Product description</Text>
                <Text style={{marginVertical:10}}>{productDetails.productDesc}</Text> */}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    gap:{
        height:1,
        backgroundColor:'gray',
        marginVertical:5
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    }
})