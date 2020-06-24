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

const ContactUs = (props) => {

    const [content, setContent] = useState(``);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Apis.getCmsData('contact_us').then((res) => {
            setContent(res.page_details);
            setLoading(false);
        })
    });

    return (
        <View style={{ flex: 1 }}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{}}
            />
            <View style={{ flex: .1, borderBottomColor: '#d3d3d3', borderBottomWidth: 1, justifyContent: 'center',backgroundColor:'#3EC5FD' }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Menu')}>
                    <Ionicons
                        name={'ios-arrow-round-back'}
                        size={30}
                        style={{ marginLeft: 10 }}
                    />
                </TouchableOpacity>

                <Text style={{ position: 'absolute', zIndex: 999, alignSelf: 'center',fontSize:22 }}>Contact Us</Text>
            </View>
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
