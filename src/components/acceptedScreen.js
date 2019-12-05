import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Card, Container, Content, Spinner, Icon } from 'native-base'
import { connect } from 'react-redux'
import { getProfile } from '../redux/action/ProfileAction'
import { getAachieve } from '../redux/action/AachieveAction'

class acceptedScreen extends Component {
    static navigationOptions = {
        header: null,
    };
    profile = async (id) => {
        this.props.get_Profile(id);
        this.props.get_Aachieve(id);
        this.props.navigation.navigate('Profilee')
    }
    render() {
        if (this.props.laccepted.loading === true) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner></Spinner>
                </View>
            )
        }
        else if (this.props.laccepted.loading === false) {
            const loops = this.props.accepted.map((item) => {
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
                                        marginTop: 10,
                                    }}>
                                    <Text style={{textAlign:"center"}}>{item.id_user.fullname}</Text>
                                    <Text style={{textAlign:"justify"}}>{item.reason}</Text>
                                </View>
                        </View>
             
                    </Card>
                )
            })
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
                            {' '}List Of Accepted{' '}
                        </Text>
                    </View>
                    <Content>
                        {loops}
                    </Content>
                </Container >
            );
        }
    }
}

const mapStateToProps = state => ({
    accepted: state.accepted.data,
    laccepted: state.accepted
});
const mapDispatchToProps = dispatch => {
    return {
        get_Profile: id => dispatch(getProfile(id)),
        get_Aachieve: id => dispatch(getAachieve(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(acceptedScreen);