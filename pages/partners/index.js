import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import HTML from 'react-native-render-html';
import Apis from '../../network/ApiCall';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../../components/header';

const items = [
    { name: 'About Us', link: 'Aboutus', icon: require('../../assets/images/about_us.png') },
    { name: 'Exports', link: 'Exports', icon: require('../../assets/images/export.png') },
    { name: 'RMA', link: 'RMA', icon: require('../../assets/images/rma.png') },
    { name: 'Contact Us', link: 'ContactUs', icon: require('../../assets/images/contact_us.png') },
    { name: 'Products', link: 'Products', icon: require('../../assets/images/bag.png') }
];

const Partners = (props) => {

    const [content, setContent] = useState(``);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        Apis.getCmsData('partners').then((res) => {
            setContent(res.page_details);
            setLoading(false);
        })
    });


    goback = () => {
        props.navigation.navigate('Menu');
    }

    contactUS = () => {
        props.navigation.navigate('ContactUs');
    }

    return (
        <View style={{ flex: 1 }}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{}}
            />
            <Header
                headerText={'Partners'}
                goback={goback}
                contactUS={contactUS}
            />
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                >
                    {content != '' && <HTML
                        decodeEntities={true}
                        html={content}
                        imagesMaxWidth={Dimensions.get('window').width}
                    />}
                </ScrollView>
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
                        onPress={() => props.navigation.navigate(single.link)}
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
                                fontSize: boxsize * .15
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
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 30
    },

});

export default Partners;
