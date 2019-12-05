import React, { Component, Fragment } from 'react'
import { TouchableOpacity, ToastAndroid, Text, View, ScrollView, TextInput } from 'react-native'
import { Form, Textarea, Icon } from 'native-base'
import { connect } from 'react-redux'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'



class editbioinvestorScreen extends Component {
    state = {
        phone: '',
        address: '',
        name: ''
    }

    static navigationOptions = {
        header: null,
    };

    Biodata = async (id) => {
        const { phone, address, name } = this.state;
        const token = await AsyncStorage.getItem('@token');
        try {
            const apiBiodata = await axios({
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                url: `https://belegend.herokuapp.com/api/v1/investor/${id}`,
                data: JSON.stringify({
                    phone: phone,
                    address: address,
                    name: name
                })
            })
            if (apiBiodata.data) {
                ToastAndroid.show('Edit Profile Success ', ToastAndroid.SHORT)
                this.props.navigation.navigate('Profile')

            }
        }
        catch (e) {
            ToastAndroid.show('Cant Complate Profile, Please Contact Admin', ToastAndroid.SHORT)
        }
    }
    componentDidMount() {
        this.setState({
            phone: this.props.investor.phone,
            address: this.props.investor.address,
            name: this.props.investor.name
        })
    }
    render() {
        return (
            <Fragment>
                <ScrollView>
                <View
                    style={{
                        backgroundColor: 'crimson',
                        padding: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                        style={{ flex: 2 }}
                        onPress={() => {
                            this.props.navigation.navigate('Profile');
                        }}>
                        <Icon
                            type="Ionicons"
                            name="md-arrow-back"
                            style={{ color: 'white' }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 17,
                            flex: 3.2,
                        }}>
                        {' '}Edit Profile{' '}
                    </Text>
                </View>
                    <View>
                        <Form bordered style={{ marginTop: 5 }}>
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
                            onPress={() => this.Biodata(this.props.investor._id)}>
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
    investor: state.investor.data,
    user: state.user.data
});

export default connect(mapStateToProps)(editbioinvestorScreen);