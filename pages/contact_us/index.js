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
import Apis from '../../network/ApiCall';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../../components/header';

const ContactUs = (props) => {

    const [content, setContent] = useState(``);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Apis.getCmsData('contact_us').then((res) => {
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
                headerText={'Contact Us'}
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

export default ContactUs;
