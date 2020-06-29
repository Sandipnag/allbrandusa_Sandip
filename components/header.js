import React from 'react';
import { View, Text, SafeAreaView,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({headerText,goback}) => {
    return (
        <SafeAreaView style={{ flex: .1, backgroundColor: '#3EC5FD', justifyContent: 'center' }}>
            <View style={{ flex: 1, backgroundColor: '#3EC5FD', justifyContent: 'center' }}>
                <TouchableOpacity
                    style={{ zIndex: 999 }}
                    onPress={goback}>
                    <Ionicons
                        name={'ios-arrow-round-back'}
                        size={30}
                        style={{ marginLeft: 10 }}
                    />
                </TouchableOpacity>

                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontSize:22}}>{headerText}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Header;