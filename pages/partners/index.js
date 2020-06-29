import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import HTML from 'react-native-render-html';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Apis from '../../network/ApiCall';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../../components/header';

const Partners = (props) => {

    const [content, setContent] = useState(``);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Apis.getCmsData('partners').then((res) => {
            setContent(res.page_details);
            setLoading(false);
        })
    });


    goback = () => {
        props.navigation.navigate('Menu');
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
