import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    TextInput,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Image
} from 'react-native';

export default Login = (props) => {

    const [formData, setFormData] = useState({
        userName: "",
        passowrd: ""
    })
    const [error, setError] = useState({
        userNameError: "",
        passowrdError: ""
    })
    const login = () => {
        if (formData.userName != "" && formData.passowrd != "") {
            setError({ ...error, userNameError: "", passowrdError: "" });
            if (formData.userName == "admin" && formData.passowrd == "admin") {
                props.navigation.navigate('Menu')
            }
        } else if (formData.userName == "") {
            setError({ ...error, userNameError: "Username is required" });
        } else if (formData.passowrd == "") {
            setError({ ...error, passowrdError: "Passowrd is required" });
        } else {

        }
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.pageContainer}>
                <View style={{ height: Dimensions.get('screen').height * .5 }}>
                    <Image source={require('../../assets/images/logo.jpeg')} style={{flex: 1, width: null, height: null, resizeMode: 'contain' }} />
                </View>
                <KeyboardAvoidingView
                        behavior={'padding'}
                        keyboardVerticalOffset={80}
                        contentContainerStyle={{ height: Dimensions.get('screen').height * .5,  }}
                    >

                        <ScrollView
                            keyboardShouldPersistTaps={'always'}
                            contentContainerStyle={{ flexGrow: 1,paddingHorizontal: 22 }}
                        >

                            <View style={styles.formContainer}>
                                <View style={styles.textBoxContainer}>
                                    <TextInput
                                        autoCapitalize={'none'}
                                        placeholderTextColor={"#000"}
                                        placeholder={'User Name'}
                                        style={styles.textBox}
                                        onChangeText={(userName) => {
                                            setFormData({ ...formData, userName: userName })
                                        }}
                                    />
                                </View>
                                {error.userNameError != "" && <Text style={styles.error}>{error.userNameError}</Text>}
                                <View style={styles.textBoxContainer}>
                                    <TextInput
                                        placeholderTextColor={"#000"}
                                        placeholder={'Password'}
                                        secureTextEntry={true}
                                        style={styles.textBox}
                                        onChangeText={(passowrd) => {
                                            setFormData({ ...formData, passowrd: passowrd })
                                        }}
                                    />
                                </View>
                                {error.passowrdError != "" && <Text style={styles.error}>{error.passowrdError}</Text>}
                                <TouchableOpacity onPress={() => login()} style={styles.buttonContainer}>
                                    <Text style={styles.loginText}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1
    },
    pageContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    formContainer: {
        height: Dimensions.get('screen').height * .5,
        justifyContent: 'flex-end'
    },
    textBoxContainer: {
        height: Dimensions.get('screen').height * .06,
        marginBottom: 10
    },
    buttonContainer: {
        height: Dimensions.get('screen').height * .06,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#239ade",
        borderRadius: 10
    },
    textBox: {
        flex: 1,
        paddingLeft: 22,
        borderWidth: .5,
        borderColor: '#000',
        borderRadius: 10,
    },
    loginText: {
        color: "#fff",
        fontSize: 22
    },
    error: {
        color: "red"
    }
})