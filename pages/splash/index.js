import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';

const Splash = (props) => {

    useEffect(() => {
        setTimeout(()=>{
            props.navigation.navigate('Menu');
        },1000)
    });

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/images/logo.jpeg')} 
                style={styles.image} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#3EC5FD'
    },
    image: {
        width:null,
        height:null,
        flex:1,
        resizeMode:'contain',
        backgroundColor:'transparent'
    }
});

export default Splash;
