import React, { useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    Image,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList
} from 'react-native';


import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

function Item({ title }) {
    return (
        <View style={styles.product}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/asus.png')} />
            </View>
            <View style={{ flex: 2, paddingHorizontal: 5, borderLeftWidth: 1,justifyContent:'center' }}>
                <Text style={{fontSize:15,fontWeight:'bold'}} numberOfLines={2}>
                    HP 14-dq1037wm Laptop Intel   Core i3-1005G1, 4GB SDRAM 128 GB M.2 SSD 14"
                    HD Display Intel® UHD Graphic Intel® UHD
                    Graphic Natural Silver Webcam,Windows 10 New, One Year Warranty
                </Text>
                <Text style={{marginTop:10,fontSize:15,fontWeight:'bold'}}>$419.99</Text>
            </View>
        </View>
    );
}

const Products = (props) => {

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const DATA = [
        { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }
    ];
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    toggleModal()
                }}
            >
                <View style={styles.modalView}>

                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => toggleModal()}>
                            <Entypo name={'cross'} size={25} style={{ alignSelf: 'flex-end', marginBottom: 10 }} />
                        </TouchableOpacity>
                        <View style={{ borderWidth: 1, marginBottom: 5 }}>
                            <Text style={{ paddingVertical: 5, alignSelf: 'center' }}>All</Text>
                        </View>
                        <View style={{ borderWidth: 1, marginBottom: 5 }}>
                            <Text style={{ paddingVertical: 5, alignSelf: 'center' }}>New</Text>
                        </View>
                        <View style={{ borderWidth: 1, marginBottom: 5 }}>
                            <Text style={{ paddingVertical: 5, alignSelf: 'center' }}>Refubrished</Text>
                        </View>
                        <View style={{ borderWidth: 1, marginBottom: 5 }}>
                            <Text style={{ paddingVertical: 5, alignSelf: 'center' }}>Special Price</Text>
                        </View>

                    </View>
                </View>
            </Modal>
            <View style={{ flex: .1, borderBottomColor: '#d3d3d3', borderBottomWidth: 1, justifyContent: 'center',backgroundColor:'#3EC5FD' }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Menu')}>
                    <Ionicons
                        name={'ios-arrow-round-back'}
                        size={30}
                        style={{ marginLeft: 10 }}
                    />
                </TouchableOpacity>

                <Text style={{ position: 'absolute', zIndex: 999, alignSelf: 'center',fontSize:22 }}>Products</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',margin:10 }}>
                <TextInput
                    placeholder='Search in all items'
                    style={{ borderWidth: 1, flex: 3 }}
                />
                <View style={{
                    height: 40,
                    backgroundColor: '#3EC5FD',
                    marginLeft: 10,
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>Search</Text>
                </View>
            </View>
            <View style={{ margin: 10, alignItems: 'center', flexDirection: 'row' }}>
                {/* <Ionicons name={'ios-arrow-dropleft'} size={25} /> */}
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginHorizontal: 5 }}
                    horizontal={true}
                >
                    <TouchableOpacity style={styles.category}>
                        <Text style={{color:'#fff'}}>All Items</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category}>
                        <Text style={{color:'#fff'}}>Laptops</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category}>
                        <Text style={{color:'#fff'}}>Multimedia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category}>
                        <Text style={{color:'#fff'}}>Electronics</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category}>
                        <Text style={{color:'#fff'}}>Others</Text>
                    </TouchableOpacity>
                </ScrollView>
                {/* <Ionicons name={'ios-arrow-dropright'} size={25} /> */}
            </View>
            <View style={{ margin: 10, alignItems: 'center', flexDirection: 'row' }}>
                {/* <Ionicons name={'ios-arrow-dropleft'} size={25} /> */}
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginHorizontal: 5 }}
                    horizontal={true}
                >

                    <TouchableOpacity style={styles.brand}>
                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/asus.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.brand}>
                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/acer.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.brand}>
                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/dell.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.brand}>
                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/hp.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.brand}>
                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/lenovo.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.brand}>
                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/jbl.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.brand}>
                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/apple.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.brand}>
                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/msi.png')} />
                    </TouchableOpacity>
                </ScrollView>
                {/* <Ionicons name={'ios-arrow-dropright'} size={25} /> */}
            </View>
            <TouchableOpacity onPress={() => toggleModal()} style={styles.pickerContainer}>
                <Text style={{ position: 'absolute', alignSelf: 'center', letterSpacing: 1 }}>Filter your search </Text>
                <Ionicons name={'ios-arrow-down'} size={25} />
            </TouchableOpacity>
            <View style={{ flex: 1,margin:10 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={DATA}
                    renderItem={({ item, index }) => <Item />}
                    keyExtractor={item => item.id}
                />
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
        backgroundColor:'#000',
        padding:15
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
