import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image
} from 'react-native';

import HTML from 'react-native-render-html';
import Apis from '../../network/ApiCall';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../../components/header';
import { ApiUrl } from '../../network/Url';

const items = [
    { name: 'About Us', link: 'Aboutus', icon: require('../../assets/images/contact_us.png') },
    { name: 'Exports', link: 'Exports', icon: require('../../assets/images/export.png') },
    { name: 'Partners', link: 'Partners', icon: require('../../assets/images/partner.png') },
    { name: 'RMA', link: 'RMA', icon: require('../../assets/images/rma.png') },
    { name: 'Products', link: 'Products', icon: require('../../assets/images/bag.png') },
];

const ContactUs = (props) => {

    const [content, setContent] = useState(``);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [data, setData] = useState(items);

    const [boxsize, setBoxsize] = useState(0);
    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        subject: '',
        content: ''
    });

    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailStatus = re.test(String(email).toLowerCase());
        return emailStatus;
    }

    useEffect(() => {
        Apis.getCmsData('contact_us').then((res) => {
            setContent(res.page_details);
            setLoading(false);
        })
    }, [message]);

    goback = () => {
        props.navigation.navigate('Menu');
    }

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

    submitForm = () => {
        setMessage('')
        if (formValue.name != "" && formValue.email != "" && formValue.subject != "" && formValue.content != "" && validateEmail(formValue.email)) {
            var formBody = [];
            for (var property in formValue) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(formValue[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch(`${ApiUrl}contact_submit`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            })
                .then((response) => response.json())
                .then((res) => {
                    setMessage(res.msg)
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            if (!validateEmail(formValue.email)) {
                setMessage('Please enter a valid email');
            } else {
                setMessage('Please fill all mandatory fields');
            }

        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{}}
            />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Header
                    headerText={'Contact Us'}
                    goback={goback}
                />
                <View style={{ padding: 15 }}>
                    <TextInput
                        style={styles.textArea}
                        placeholder={'Name'}
                        value={formValue.name}
                        onChangeText={(name) => {
                            let tempData = formValue;
                            tempData = { ...formValue, name: name };
                            setFormValue(tempData)
                        }}
                    />
                    <TextInput
                        style={styles.textArea}
                        placeholder={'Email Address'}
                        value={formValue.email}
                        onChangeText={(email) => {
                            let tempData = formValue;
                            tempData = { ...formValue, email: email };
                            setFormValue(tempData)
                        }}
                    />
                    <TextInput
                        style={styles.textArea}
                        placeholder={'Subject'}
                        value={formValue.subject}
                        onChangeText={(subject) => {
                            let tempData = formValue;
                            tempData = { ...formValue, subject: subject };
                            setFormValue(tempData)
                        }}
                    />
                    <TextInput
                        style={{
                            height: 100,
                            borderWidth: 1,
                            paddingLeft: 15
                        }}
                        value={formValue.content}
                        onChangeText={(content) => {
                            let tempData = formValue;
                            tempData = { ...formValue, content: content };
                            setFormValue(tempData)
                        }}
                        underlineColorAndroid="transparent"
                        placeholder="Message"
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                        textAlignVertical="top"
                    />
                    {message != '' && <Text style={{ textAlign: 'center', fontSize: 12, color: 'red' }}>{message}</Text>}
                    <TouchableOpacity
                        onPress={submitForm}
                        style={{
                            height: 40,
                            backgroundColor: '#3EC5FD',
                            marginLeft: 10,
                            width: 80,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginVertical: 10
                        }}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                    {content != '' && <HTML
                        decodeEntities={true}
                        html={content}
                        imagesMaxWidth={Dimensions.get('window').width}
                    />}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 30
    },
    textArea: {
        borderWidth: 1,
        borderColor: 'black',
        height: 40,
        paddingLeft: 15,
        marginBottom: 10
    }
});

export default ContactUs;
