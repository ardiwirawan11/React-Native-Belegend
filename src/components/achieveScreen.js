import React, { Component } from 'react'
import { TouchableOpacity, View, ToastAndroid, Image, Text, ScrollView, StyleSheet, } from 'react-native'
import { Form, Card, CardItem, Textarea, Icon, Left, Body, Spinner } from 'native-base'
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { connect } from 'react-redux'
import { getAchieve } from '../redux/action/AchieveAction'

class achieveScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            filePath: '',
            title: '',
            year: '',
            photo: {},
            loading: false
        }
    }


    chooseFile = () => {
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, response => {

            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
                alert(response.customButton);
            } else {
                let source = response.uri;
                this.setState({
                    filePath: source,
                    photo: response
                });
            }
        });
    };

    foto = async (id) => {
        const token = await AsyncStorage.getItem('@token');
        try {
            let image = new FormData()
            if (this.state.filePath) {
                image.append('image',
                    {
                        uri: this.state.photo.uri,
                        name: this.state.photo.fileName,
                        type: this.state.photo.type
                    }
                )
            } else {
                image.append('image',
                    {
                        uri: 'https://i-love-png.com/images/no-image_7299.png',
                        name: 'noimage.jpeg',
                        type: 'image/jpeg'
                    }
                )
            }


            const add = async (data) => await axios.put(
                `https://belegend.herokuapp.com/api/v1/achievement/update_image/${id}`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': token
                    }
                }
            )

            add(image)
                .then(res => {
                    this.setState({ loading: false })
                    ToastAndroid.show('Add Success ', ToastAndroid.SHORT)
                    this.Getachieve()
                })
                .catch(err => {
                })
        } catch (e) {
        }
    }
    Achieve = async () => {
        const { title, year } = this.state;
        const token = await AsyncStorage.getItem('@token');
        if (title === '') {
            ToastAndroid.show('Fill the Title', ToastAndroid.SHORT);
        }
        else if (year === '') {
            ToastAndroid.show('Fill the Year', ToastAndroid.SHORT);
        }
        else {
            try {
                const apiAchieve = await axios({
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    url: 'https://belegend.herokuapp.com/api/v1/achievement',
                    data: JSON.stringify({
                        title: title,
                        year: year
                    })
                })
                if (apiAchieve.data) {
                    this.setState({ loading: true })
                    this.setState({ title: '', year: '' })
                    this.foto(apiAchieve.data.results._id)
                }
            }
            catch (e) {
                ToastAndroid.show('Cant Add Achievement, Please Check your input again', ToastAndroid.SHORT)
            }
        }
    }
    Getachieve = async () => {
        const token = await AsyncStorage.getItem('@token');
        this.props.get_Achieve(token)
    }
    deleteAchieve = async (id) => {
        const token = await AsyncStorage.getItem('@token');
        try {
            const apiDelete = await axios({
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                url: `https://belegend.herokuapp.com/api/v1/achievement/${id}`,
            })
            if (apiDelete.data) {
                this.Getachieve()
            }
        }
        catch (e) {
            ToastAndroid.show('Cannot Delete Achieve', ToastAndroid.SHORT)
        }

    }
    componentDidMount() {
        this.Getachieve()
    }



    render() {
        if (this.props.user.role === 'athlete') {
            if (this.props.achieve.loading === true) {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner></Spinner>
                    </View>
                )
            }
            else if (this.props.achieve.loading === false) {
                const loops = this.props.achieve.data.map((item) => {
                    return (
                        <Card key={item._id}>
                            <CardItem
                                cardBody
                                style={{
                                    marginVertical: 20,
                                    left: -5,
                                }}>
                                <Left style={{ justifyContent: 'space-around' }}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ width: '80%', height: 100, borderRadius: 15 }}
                                    />
                                </Left>
                                <Body
                                    style={{
                                        justifyContent: 'space-between',
                                        alignContent: 'space-between',
                                        alignItems: 'flex-start',
                                        left: -5,
                                    }}>
                                    <Text style={{ marginVertical: 10 }}>
                                        Title : <Text> {item.title} </Text>
                                    </Text>
                                    <Text style={{ marginBottom: 40 }}>
                                        Year : <Text> {item.year} </Text>
                                    </Text>
                                </Body>
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                    }}
                                    onPress={() => this.deleteAchieve(item._id)}>
                                    <Icon
                                        name={'trash'}
                                        style={{
                                            color: 'gray',
                                            marginRight: 5,
                                        }}
                                    />
                                </TouchableOpacity>
                            </CardItem>
                        </Card>
                    )
                })

                return (
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
                                    flex: 4,
                                }}>
                                {' '}Achievement{' '}
                            </Text>
                        </View>
                        <View>
                            <Form bordered>
                                <View style={styles.viewTextarea}>
                                    <Text style={{ fontSize: 15 }}>Title</Text>
                                    <Textarea
                                        rowSpan={5}
                                        bordered
                                        placeholder="Write your achievement here"
                                        placeholderTextColor="rgba(0,0,0,0.2)"
                                        style={styles.Textarea}
                                        onChangeText={(title) => this.setState({ title })}
                                        value={this.state.title}
                                    />
                                </View>
                                <View style={styles.viewTextarea}>
                                    <Text style={{ fontSize: 15 }}>Year</Text>
                                    <Textarea rowSpan={2} bordered style={styles.Textarea}
                                        keyboardType={"numeric"}
                                        onChangeText={(year) => this.setState({ year })}
                                        value={this.state.year} />
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.buttonIcon}
                                        onPress={this.chooseFile.bind(this)}>
                                        <Icon name='camera' style={{ color: 'white', alignSelf: 'center' }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 25 }}></View>
                            </Form>
                        </View>
                        <View style={styles.viewButton}>
                            <TouchableOpacity style={styles.touchable}
                                onPress={() => this.Achieve()}>
                                <Text style={styles.textButton}>Add</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 25 }}>{loops}</View>
                        {this.state.loading === true ? <Spinner></Spinner> : null}
                    </ScrollView>
                )
            }

        }
        else if (this.props.user.role === 'investor') {
            const loops = this.props.aachieve.map((item) => {
                return (
                    <Card key={item._id}>
                        <CardItem
                            cardBody
                            style={{
                                marginVertical: 20,
                                left: -5,
                            }}>
                            <Left style={{ justifyContent: 'space-around' }}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ width: '80%', height: 100, borderRadius: 15 }}
                                />
                            </Left>
                            <Body
                                style={{
                                    justifyContent: 'space-between',
                                    alignContent: 'space-between',
                                    alignItems: 'flex-start',
                                    left: -5,
                                }}>
                                <Text style={{ marginVertical: 10 }}>
                                    Title : <Text> {item.title} </Text>
                                </Text>
                                <Text style={{ marginBottom: 40 }}>
                                    Year : <Text> {item.year} </Text>
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                )
            })

            return (
                <ScrollView>
                    <View>{loops}</View>
                </ScrollView>
            )
        }

    }
}

const styles = StyleSheet.create({
    header: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 19,
    },
    Subtitle: { fontStyle: 'italic', color: 'rgba(0,0,0,0.2)' },
    Textarea: {
        width: '99%',
        borderRadius: 5,
    },
    viewTextarea: { marginTop: 10, marginLeft: 4 },
    buttonIcon: {
        backgroundColor: 'grey',
        padding: 5,
        width: 50,
        left: 4,
        marginTop: 6,
        borderRadius: 6,
    },
    viewButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    touchable: {
        width: 100,
        backgroundColor: 'crimson',
        borderRadius: 5,
        padding: 10,
    },
    textButton: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const mapStateToProps = state => ({
    user: state.user.data,
    achieve: state.achieve,
    aachieve: state.aachieve.data
});

const mapDispatchToProps = dispatch => {
    return {
        get_Achieve: token => dispatch(getAchieve(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(achieveScreen);