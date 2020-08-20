import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Alert,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import Header from '../../components/header';
import { ApiUrl } from '../../network/Url';


class RMA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            company_name: '',
            email: '',
            phone: '',
            rmaInfo: [
                {
                    invoice_no: '',
                    brand_name: '',
                    mpn_no: '',
                    serial_no: '',
                    remarks: ''
                }
            ]
        }
    }

    goback = () => {
        this.props.navigation.navigate('Menu');
    }

    addAnotherProduct = () => {
        const { rmaInfo } = this.state;
        rmaInfo.push({
            invoice_no: '',
            brand_name: '',
            mpn_no: '',
            serial_no: '',
            remarks: ''
        })
        this.setState({
            rmaInfo
        })
    }

    deleteProduct = (indexToRemove) => {
        const { rmaInfo } = this.state;
        rmaInfo.splice(indexToRemove, 1);
        this.setState({
            rmaInfo
        })
    }

    checkArray = (my_arr) => {
        for (var i = 0; i < my_arr.length; i++) {
            if (my_arr[i] === "")
                return false;
        }
        return true;
    }

    serialize =  (obj, prefix) => {
        var str = [],
        p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
                str.push((v !== null && typeof v === "object") ?
                    this.serialize(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }

    submitRMA = () => {
        const { rmaInfo, company_name, email, phone } = this.state;
        let submitData = {
            company_name: company_name,
            email: email,
            phone: phone,
            invoice_no: [],
            brand_name: [],
            mpn_no: [],
            serial_no: [],
            remarks: []
        };

        rmaInfo.forEach((rma) => {
            submitData.invoice_no.push(rma.invoice_no)
            submitData.brand_name.push(rma.brand_name)
            submitData.mpn_no.push(rma.mpn_no)
            submitData.serial_no.push(rma.serial_no)
            submitData.remarks.push(rma.remarks)
        });
        let formBody = this.serialize(submitData);
        if (submitData.company_name != ''
            && submitData.email != ''
            && submitData.invoice_no.length > 0
            && this.checkArray(submitData.invoice_no)
            && submitData.brand_name.length > 0
            && this.checkArray(submitData.brand_name)
            && submitData.invoice_no.length > 0
            && this.checkArray(submitData.invoice_no)
            && submitData.mpn_no.length > 0
            && this.checkArray(submitData.mpn_no)
            && submitData.serial_no.length > 0
            && this.checkArray(submitData.serial_no)
        ) {
            console.log('submitData', JSON.stringify(submitData, null, 4));
            fetch(`${ApiUrl}rma_submit`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            })
                .then((response) => response.json())
                .then((res) => {
                    console.log('resp====', res)
                    if (res.success == 1) {
                        this.setState({
                            company_name: '',
                            email: '',
                            phone: '',
                            rmaInfo: [
                                {
                                    invoice_no: '',
                                    brand_name: '',
                                    mpn_no: '',
                                    serial_no: '',
                                    remarks: ''
                                }
                            ]
                        })
                        Alert.alert(
                            'Success',
                            res.msg,
                            [

                                { text: 'OK', onPress: () => console.log('OK Pressed') }
                            ],
                            { cancelable: false }
                        );
                    } else {
                        this.setState({
                            company_name: '',
                            email: '',
                            phone: '',
                            rmaInfo: [
                                {
                                    invoice_no: '',
                                    brand_name: '',
                                    mpn_no: '',
                                    serial_no: '',
                                    remarks: ''
                                }
                            ]
                        })
                        Alert.alert(
                            'Error',
                            res.msg,
                            [

                                { text: 'OK', onPress: () => console.log('OK Pressed') }
                            ],
                            { cancelable: false }
                        );
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            Alert.alert(
                'Error',
                'Please Fill all required fields(*)',
                [

                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
        }

    }

    contactUS = () => {
        this.props.navigation.navigate('ContactUs');
    }

    render() {
        const { rmaInfo, company_name, email, phone } = this.state;
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}
            >

                <ScrollView
                    keyboardShouldPersistTaps={'always'}
                    style={{ flexGrow: 1 }}
                >
                    <Header
                        headerText={'RMA'}
                        goback={this.goback}
                        contactUS={this.contactUS}
                    />
                    <View style={{ padding: 15 }}>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>Customer Information</Text>
                        <Text style={{ fontSize: 15, marginBottom: 10, fontWeight: 'bold' }}>Company Name: *</Text>
                        <TextInput
                            onChangeText={(company_name) => {
                                this.setState({ company_name: company_name })
                            }}
                            value={company_name}
                            style={{ height: 50, borderWidth: 1, marginBottom: 10 }}
                        />
                        <Text style={{ fontSize: 15, marginBottom: 10, fontWeight: 'bold' }}>E-mail Address: *</Text>
                        <TextInput
                            onChangeText={(email) => {
                                this.setState({ email: email })
                            }}
                            value={email}
                            style={{ height: 50, borderWidth: 1, marginBottom: 10 }}
                        />
                        <Text style={{ fontSize: 15, marginBottom: 10, fontWeight: 'bold' }}>Phone Number:</Text>
                        <TextInput
                            value={phone}
                            onChangeText={(phone) => {
                                this.setState({ phone: phone })
                            }}
                            style={{ height: 50, borderWidth: 1, marginBottom: 10 }}
                        />
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>RMA Information</Text>
                        {rmaInfo.map((data, index) => (<View
                            key={index}
                            style={{
                                minHeight: 50,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                flexWrap: 'wrap',
                                marginBottom: 10
                            }}>
                            <View style={{ width: '48%', paddingVertical: 5 }}>
                                <Text style={{ fontSize: 12 }}>Invoice Nr.: *</Text>
                                <TextInput
                                    onChangeText={(invoice_no) => {
                                        rmaInfo[index].invoice_no = invoice_no;
                                        this.setState(rmaInfo)
                                    }}
                                    value={data.invoice_no}
                                    style={{ flex: 1, borderWidth: 1 }}
                                />
                            </View>
                            <View style={{ width: '48%', paddingVertical: 5 }}>
                                <Text style={{ fontSize: 12 }}>Brand Name: *</Text>
                                <TextInput
                                    onChangeText={(brand_name) => {
                                        rmaInfo[index].brand_name = brand_name;
                                        this.setState(rmaInfo)
                                    }}
                                    value={data.brand_name}
                                    style={{ flex: 1, borderWidth: 1 }}
                                />
                            </View>
                            <View style={{ width: '48%', paddingVertical: 5 }}>
                                <Text style={{ fontSize: 12 }}>Part Nr.(MPN): *</Text>
                                <TextInput
                                    onChangeText={(mpn_no) => {
                                        rmaInfo[index].mpn_no = mpn_no;
                                        this.setState(rmaInfo)
                                    }}
                                    value={data.mpn_no}
                                    style={{ flex: 1, borderWidth: 1 }}
                                />
                            </View>
                            <View style={{ width: '48%', paddingVertical: 5 }}>
                                <Text style={{ fontSize: 12 }}>Serial Nr.: *</Text>
                                <TextInput
                                    onChangeText={(serial_no) => {
                                        rmaInfo[index].serial_no = serial_no;
                                        this.setState(rmaInfo)
                                    }}
                                    value={data.serial_no}
                                    style={{ flex: 1, borderWidth: 1 }}
                                />
                            </View>
                            <View style={{ width: '48%', paddingVertical: 5 }}>
                                <Text style={{ fontSize: 12 }}>Remarks (Reason for RMA):</Text>
                                <TextInput
                                    onChangeText={(remarks) => {
                                        rmaInfo[index].remarks = remarks;
                                        this.setState(rmaInfo)
                                    }}
                                    value={data.remarks}
                                    style={{ flex: 1, borderWidth: 1 }}
                                />
                            </View>
                            {index != 0 && <View style={{ width: '48%', paddingVertical: 5, justifyContent: 'flex-end', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => this.deleteProduct(index)}
                                    style={{ backgroundColor: '#3EC5FD' }}>
                                    <Text style={{ color: '#fff', padding: 10 }}>Remove</Text>
                                </TouchableOpacity>

                            </View>}

                        </View>))}
                        <TouchableOpacity
                            onPress={this.addAnotherProduct}
                            style={{
                                height: 40,
                                backgroundColor: '#3EC5FD',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginVertical: 10
                            }}>
                            <Text style={{ paddingHorizontal: 5, color: '#fff' }}>Add Another Product</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.submitRMA}
                            style={{
                                height: 40,
                                backgroundColor: '#3EC5FD',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginVertical: 10
                            }}>
                            <Text style={{ paddingHorizontal: 5, color: '#fff' }}>Submit RMA Request</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default RMA;