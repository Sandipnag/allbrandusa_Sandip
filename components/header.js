import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({ headerText, goback, contactUS }) => {
    return (
        <SafeAreaView style={{backgroundColor: '#3EC5FD', justifyContent: 'center', flexDirection: 'row' }}>
            <TouchableOpacity 
                onPress={goback}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Home</Text>
                <Ionicons
                    name={'ios-arrow-round-back'}
                    color={'#fff'}
                    size={30}
                />
            </TouchableOpacity>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>AllbrandsUSA</Text>
                <Text style={{ color: '#000000', fontSize: 15 }}>{headerText}</Text>
            </View>
            <TouchableOpacity
                onPress={contactUS}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                {headerText != 'Contact Us' &&
                    <Text style={{ color: '#fff', fontSize: 11 }}>Contact Us</Text>
                }
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Header;