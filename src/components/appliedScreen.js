import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import { Card, CardItem, Container, Content, Spinner, Icon } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { connect } from 'react-redux'
import { getDetail } from '../redux/action/DetailAction'
import { getProfile } from '../redux/action/ProfileAction'
import { getAachieve } from '../redux/action/AachieveAction'


class appliedScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    change = async (id, data) => {
        const token = await AsyncStorage.getItem('@token');
        try {
            const apiChange = await axios({
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                url: `https://belegend.herokuapp.com/api/v1/applied/${id}`,
                data: JSON.stringify({
                    status: data
                }),
            });
            if (apiChange.data) {
                this.props.get_Detail(token, this.props.iddetail.data._id)
                ToastAndroid.show(apiChange.data.msg, ToastAndroid.SHORT);
                this.props.navigation.navigate('Applied');
            }
        } catch (e) {
            ToastAndroid.show('Change status failed', ToastAndroid.SHORT);
        }
    }
    profile = async (id) => {
        this.props.get_Profile(id);
        this.props.get_Aachieve(id);
        this.props.navigation.navigate('Profilee')
    }
    render() {
        const loops = this.props.detail.map((item) => {
            if (item.status === 'applied') {
                return (
                    <Card key={item._id}>
                        <View
                            style={{
                                alignItems: 'center',
                                marginVertical: 15,
                            }}>
                                <View
                                    style={{
                                        width: 200,
                                        flexDirection: 'column',
                                        height: 200,
                                        borderRadius: 200,
                                        marginLeft: 5,
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.profile(item.id_user._id);
                                        }}>
                                        <Image
                                            source={{ uri: item.id_user.image }}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        marginTop: 10,
                                    }}>
                                    <Text style={{textAlign:"center"}}>{item.id_user.fullname}</Text>
                                    <Text style={{textAlign:"justify"}}>{item.reason}</Text>
                                </View>
                        </View>
                        <CardItem>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    marginBottom: 2,
                                }}>
                                <TouchableOpacity
                                    style={{
                                        padding: 8,
                                        borderWidth: 2,
                                        borderColor: 'grey',
                                        width: 150,
                                        borderRadius: 20,
                                    }}
                                    onPress={() => {
                                        this.change(item._id, 'reject');
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            color: 'grey',
                                            fontSize: 16,
                                            alignSelf: 'center',
                                        }}>
                                        {' '}
                                        Reject{' '}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        padding: 8,
                                        borderWidth: 2,
                                        borderColor: 'pink',
                                        backgroundColor: 'crimson',
                                        width: 150,
                                        borderRadius: 20,
                                    }}
                                    onPress={() => {
                                        this.change(item._id, 'accept');
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            color: '#fff',
                                            fontSize: 16,
                                            alignSelf: 'center',
                                        }}>
                                        {' '}
                                        Accept{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </CardItem>
                    </Card>
                )
            }
        })
        if (this.props.iddetail.loading === true) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner></Spinner>
                </View>
            )
        }
        else if (this.props.iddetail.loading === false) {
            return (
                <Container>
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
                                this.props.navigation.goBack();
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
                                fontSize: 16,
                                flex: 4
                            }}>
                            {' '}List Of Applied{' '}
                        </Text>
                    </View>
                    <Content>
                        {loops}
                    </Content>
                </Container>
            )
        }
    }
}

const mapStateToProps = state => ({
    detail: state.detail.data.list_id_applied,
    iddetail: state.detail
});
const mapDispatchToProps = dispatch => {
    return {
        get_Detail: (token, id) => dispatch(getDetail(token, id)),
        get_Profile: id => dispatch(getProfile(id)),
        get_Aachieve: id => dispatch(getAachieve(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(appliedScreen);