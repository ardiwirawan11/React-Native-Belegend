import React, { Component } from 'react'
import { withNavigation } from 'react-navigation';
import { Text, View, Image } from 'react-native'
import { Card, CardItem, Body, Left, Spinner, Button, Content } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { getMyapply } from '../redux/action/MyapplyAction'

class myapplyScreen extends Component {
    static navigationOptions = {
        header: null,
    };
    myapply = async () => {
        const token = await AsyncStorage.getItem('@token');
        this.props.get_Myapply(token)
    }
    componentDidMount() {
        this.myapply()
    }
    render() {
        const loops = this.props.myapply.map((item) => {
            return (
                <Card key={item._id}>
                    <CardItem
                        cardBody
                        style={{
                            marginVertical: 20,
                            left: -5,
                        }}>
                        <Left
                            style={{
                                justifyContent: 'space-around'
                            }}>
                            <Image
                                source={{ uri: item.id_scholarship.image }}
                                style={{ width: 135, height: 200, borderRadius: 15 }}
                            />
                        </Left>

                        <Body
                            style={{
                                left: -5,
                                marginTop: 10,
                                alignContent: 'center'
                            }}>
                            <Text style={{ marginVertical: 5 }}>
                                Title : <Text> {item.id_scholarship.title} </Text>
                            </Text>
                            <Text style={{ marginVertical: 5 }}>
                                Description : <Text> {item.id_scholarship.description} </Text>
                            </Text>
                            <Text style={{ marginVertical: 5 }}>
                                Status
                            </Text>
                            {item.status === 'applied' ? <Button primary><Text> Applied </Text></Button> :
                                (item.status === 'accept' ? <Button success><Text> Accepted </Text></Button> : <Button danger><Text> Rejected </Text></Button>)}
                        </Body>
                    </CardItem>
                </Card>
            )
        })
        if (this.props.lmyapply.loading == true) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner></Spinner>
                </View>
            )
        }
        else {
            return (
                <Content>
                    {loops}
                </Content>
            )
        }
    }
}

const mapStateToProps = state => ({
    myapply: state.myapply.data,
    lmyapply: state.myapply
});

const mapDispatchToProps = dispatch => {
    return {
        get_Myapply: (token) => dispatch(getMyapply(token))
    }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(myapplyScreen));