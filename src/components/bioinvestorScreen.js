import React, { Component, Fragment } from 'react'
import { TouchableOpacity, ToastAndroid, Text, View, Image, ScrollView, TextInput } from 'react-native'
import { Form, Textarea } from 'native-base'
import { connect } from 'react-redux'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

import logo from '../images/logo.png';


class bioinvestorScreen extends Component {
    state = {
        phone: '',
        address: '',
        name: ''
    }

    static navigationOptions = {
        header: null,
    };

    Biodata = async () => {
        const { phone, address, name } = this.state;
        const token = await AsyncStorage.getItem('@token');
        try {
            const apiBiodata = await axios({
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                url: 'https://belegend.herokuapp.com/api/v1/investor',
                data: JSON.stringify({
                    phone: phone,
                    address: address,
                    name: name
                })
            })
            if (apiBiodata.data) {
                ToastAndroid.show('Profile Complate ', ToastAndroid.SHORT)
                this.setState({ phone: '', address: '', name: '' })
                this.props.navigation.navigate('Home')

            }
        }
        catch (e) {
            ToastAndroid.show('Cant Complate Profile, Please Contact Admin', ToastAndroid.SHORT)
        }
    }
    render() {
        return (
            <Fragment>
                <ScrollView>
                    <View
                        style={{
                            padding: 15,
                            backgroundColor: 'crimson',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>
                            {' '}
                            Complate Registration{' '}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            height: 20,
                        }}>
                        <View
                            style={{
                                backgroundColor: 'rgba(0,0,0, 0.5)',
                                width: 155,
                                height: 50,
                                left: 257,
                                bottom: 210,
                            }}>
                            <Image
                                source={logo}
                                style={{ height: 50, width: 50, alignSelf: 'center' }}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ marginTop: 5, fontSize: 17, fontWeight: 'bold' }}>
                            {' '}
                            Hello {this.props.user.fullname}{' '}
                        </Text>
                        <Text
                            style={{
                                fontStyle: 'italic',
                                color: 'rgba(0,0,0, 0.5)',
                                marginTop: 15,
                            }}>
                            Thank You for joining us.
                </Text>
                        <Text
                            style={{
                                fontStyle: 'italic',
                                color: 'rgba(0,0,0, 0.5)',
                                marginBottom: 10,
                            }}>
                            Your support is an opportunity for them
                </Text>
                        <Text style={{ fontStyle: 'italic', color: 'rgba(0,0,0, 0.4)' }}>
                            Please complete your registration
                </Text>
                    </View>
                    <View>
                        <Form bordered style={{ marginTop: 35 }}>
                            <View style={{ marginTop: 10, marginLeft: 4 }}>
                                <Text style={{ fontSize: 15 }}>
                                    {' '}Company Name{' '}
                                    <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                    <Text> : </Text>
                                </Text>
                                <TextInput
                                    underlineColorAndroid={'green'}
                                    style={{
                                        width: '99%',
                                        borderRadius: 5,
                                    }}
                                    onChangeText={name => this.setState({ name })}
                                    value={this.state.name}
                                />
                            </View>
                            <View style={{ marginTop: 10, marginLeft: 4 }}>
                                <Text style={{ fontSize: 15 }}>
                                    {' '} Phone <Text style={{ color: 'red', fontSize: 19 }}> * </Text>
                                    <Text> : </Text>
                                </Text>
                                <TextInput
                                    underlineColorAndroid={'green'}
                                    style={{
                                        width: '99%',
                                        borderRadius: 5,
                                    }}
                                    onChangeText={phone => this.setState({ phone })}
                                    value={this.state.phone}
                                />
                            </View>
                            <View style={{ marginTop: 10, marginLeft: 4 }}>
                                <Text style={{ fontSize: 15 }}>
                                    {' '}Address{' '}
                                    <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                    <Text> : </Text>
                                </Text>
                                <Textarea
                                    rowSpan={3}
                                    bordered
                                    style={{
                                        width: '99%',
                                        borderRadius: 5,
                                    }}
                                    onChangeText={address => this.setState({ address })}
                                    value={this.state.address}
                                />
                            </View>
                        </Form>
                    </View>
                    <View style={{ marginTop: 25 }}>
                        <TouchableOpacity
                            style={{
                                width: 250,
                                backgroundColor: 'crimson',
                                borderRadius: 5,
                                alignSelf: 'center',
                                padding: 10,
                                borderWidth: 2,
                                borderColor: 'pink',
                            }}
                            onPress={() => this.Biodata()}>
                            <Text
                                style={{
                                    color: 'white',
                                    alignSelf: 'center',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}>
                                Save
                  </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
});

export default connect(mapStateToProps)(bioinvestorScreen);