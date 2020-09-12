import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    Image,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    Keyboard
} from 'react-native';

import Header from '../../components/header';
import Apis from '../../network/ApiCall';
import { ImageUrl, ApiUrl } from '../../network/Url';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
const DATA_TO_SHOW = 6;

function Item({ data, productIndex }) {
    return (
        <TouchableOpacity onPress={()=>productsDetails(productIndex)} style={styles.product}>
            <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }} numberOfLines={0}>
                    {`${data.productDesc}`}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10 }} numberOfLines={0}>
                    {`$${data.productPrice}  `}{`  ${data.available} pcs`}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const Products = (props) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [categories, setCategories] = useState([]);

    const [brands, setBrands] = useState([]);

    const [products, setproducts] = useState([]);

    const [param, setParam] = useState({ page_no: 1, per_page: DATA_TO_SHOW });

    const [searchText, setSearchText] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllCategories();
        getAllBrands();
        getAllProducts(param);
    }, []);


    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    getAllCategories = () => {
        Apis.getAllCategory().then((res) => {
            if (res.success == 1)
                setCategories(res.categoryList)
        })
    }

    getAllBrands = () => {
        Apis.getAllBrands().then((res) => {
            if (res.success == 1)
                setBrands(res.brandList)
        })
    }

    getAllProducts = (details) => {

        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");
        fetch(`${ApiUrl}getAllProducts`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
            .then((response) => response.json())
            .then((res) => {
                // console.log('res.productList',JSON.stringify(res.productList,null,4))
                setproducts(res.productList);
                setLoading(false)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    goback = () => {
        props.navigation.navigate('Menu');
    }

    contactUS = () => {
        props.navigation.navigate('ContactUs');
    }

    generateQueryParam = (category = null, brand = null, searchText = '') => {
        setLoading(true);
        let tempParam = param;
        if (category){
            tempParam = { page_no: 1, category, per_page: DATA_TO_SHOW, search_data: '' };
            console.log('category-->',tempParam)
            setSearchText('')
        }
        else if (brand){
            tempParam = { page_no: 1, brand, per_page: DATA_TO_SHOW, search_data: '' };
            console.log('brand-->',tempParam)
            setSearchText('')
        }
        else if (searchText != '') {
            Keyboard.dismiss();
            tempParam = { page_no: 1, per_page: DATA_TO_SHOW, search_data: searchText };
            console.log('searchText-->',tempParam)
        }
        setParam(tempParam);
        getAllProducts(tempParam);
    }

    handleLoadMore = () => {
        let tempParam = param;
        tempParam = {
            ...param,
            per_page: param.per_page + 10
        };

        setParam(tempParam);
        getAllProducts(tempParam);
    };

    productsDetails = async(index) =>{
        await AsyncStorage.setItem('product_details', JSON.stringify(products[index])) ; 
        props.navigation.navigate('Productdetails')
    }

    return (
        <View style={styles.container}>
            <Header
                headerText={'Products'}
                goback={goback}
                contactUS={contactUS}
            />
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{}}
            />
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                    <TextInput
                        placeholder='Search in all items'
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                        style={{ borderWidth: 1, flex: 3, height: 40, paddingLeft: 10 }}
                    />
                    <TouchableOpacity
                        onPress={() => generateQueryParam(null, null, searchText)}
                        style={{
                            height: 40,
                            backgroundColor: '#3EC5FD',
                            marginLeft: 10,
                            width: 80,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{ color: '#fff' }}>EZ Search</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ margin: 10, alignItems: 'center', flexDirection: 'row' }}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginHorizontal: 5 }}
                        horizontal={true}
                    >
                        {categories.length > 0 && categories.map((category, index) => (
                            <TouchableOpacity
                                onPress={() => generateQueryParam(category.category_id)}
                                key={index}
                                style={styles.category}>
                                <Text style={{ color: '#fff' }}>{category.category_title}</Text>
                            </TouchableOpacity>
                        ))}

                    </ScrollView>
                </View>
                <View style={{ margin: 10, alignItems: 'center', flexDirection: 'row' }}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginHorizontal: 5 }}
                        horizontal={true}
                    >

                        {brands.length > 0 && brands.map((brand, index) => (
                            <TouchableOpacity
                                onPress={() => generateQueryParam(null, brand.brand_id)}
                                key={index}
                                style={styles.brand}>
                                <Image
                                    style={{ width: 50, height: 50 }}
                                    source={{ uri: `${ImageUrl}${brand.brand_logo}` }}
                                />
                            </TouchableOpacity>
                        ))}

                    </ScrollView>
                </View>
                <View style={{ flex: 1, margin: 10 }}>
                    {products.length > 0 && !loading && <FlatList
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        initialNumToRender={10}
                        showsVerticalScrollIndicator={false}
                        data={products}
                        renderItem={({ item, index }) => <Item productIndex={index} data={item} productsDetails={productsDetails} />}
                        keyExtractor={item => item.productID}
                    />}
                    {products.length == 0 && <Text style={{ alignSelf: 'center', fontSize: 22, fontWeight: 'bold' }}>No Products To Show</Text>}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // padding: 15,
    },
    category: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingHorizontal: 10,
        backgroundColor: '#000',
        padding: 15
    },
    brand: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#26BEFD'
    },
    pickerContainer: {
        paddingVertical: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        alignItems: 'flex-end',
        borderRadius: 30,
        justifyContent: 'center',
        borderWidth: 1,
        margin: 10
    },

    modalView: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 15
    },
    itemContainer: {
        backgroundColor: "#3EC5FD",
        padding: 15,
        elevation: 5
    },

    product: {
        minHeight: 100,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#0EB6FC',
        borderRadius: 10,
        marginBottom: 10
    }
});

export default Products;
