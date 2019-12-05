import React, { Component } from 'react'
import { TouchableOpacity, ToastAndroid, Text, TextInput, View, ScrollView, StyleSheet } from 'react-native'
import { Picker, Item, Form, DatePicker, Textarea } from 'native-base'
import { connect } from 'react-redux'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { getCategory } from '../redux/action/CategoryAction'


class bioathleteScreen extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            phone: '',
            address: '',
            aboutme: '',
            weight: '',
            height: '',
            birthdate: '',
            birthplace: '',
            parent_phonenumber: '',
            parent_job: '',
            education_level: '',
            name_education: '',
            parent_name: '',
            blood_type: 'A',
            gender: 'Male',
            id_sport_category: '5d92308f2aa35f0017d64838'
        };
        this.setDate = this.setDate.bind(this);

    }



    setDate(newDate) {
        this.setState({ chosenDate: newDate });
        const dateObj = this.state.chosenDate
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const date = ('0' + dateObj.getDate()).slice(-2);
        const year = dateObj.getFullYear();
        const fulldate = year + '-' + month + '-' + date;
        this.setState({ birthdate: fulldate });
    }

    Biodata = async () => {
        const { phone, address, aboutme, weight, height, birthdate, birthplace, parent_phonenumber, parent_job, education_level, name_education, parent_name, blood_type, gender, id_sport_category } = this.state;
        const token = await AsyncStorage.getItem('@token');
        if (phone === '') {
            ToastAndroid.show('Fill your Phone', ToastAndroid.SHORT);
        }
        else if (address === '') {
            ToastAndroid.show('Fill your Address', ToastAndroid.SHORT);
        }
        else if (aboutme === '') {
            ToastAndroid.show('Fill About You', ToastAndroid.SHORT);
        }
        else if (weight === '') {
            ToastAndroid.show('Fill your Weight', ToastAndroid.SHORT);
        }
        else if (height === '') {
            ToastAndroid.show('Fill your Height', ToastAndroid.SHORT);
        }
        else if (birthdate === '') {
            ToastAndroid.show('Select your Birth Date', ToastAndroid.SHORT);
        }
        else if (birthplace === '') {
            ToastAndroid.show('Fill your Birth Place', ToastAndroid.SHORT);
        }
        else if (parent_phonenumber === '') {
            ToastAndroid.show('Fill your Parent Phone Number', ToastAndroid.SHORT);
        }
        else if (parent_job === '') {
            ToastAndroid.show('Fill your Parent Job', ToastAndroid.SHORT);
        }
        else if (education_level === '') {
            ToastAndroid.show('Fill your Education Level', ToastAndroid.SHORT);
        }
        else if (name_education === '') {
            ToastAndroid.show('Fill your Education Name', ToastAndroid.SHORT);
        }
        else if (parent_name === '') {
            ToastAndroid.show('Fill your Parent Name', ToastAndroid.SHORT);
        }
        else {
            try {
                const apiBiodata = await axios({
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    url: 'https://belegend.herokuapp.com/api/v1/profile_athlete',
                    data: JSON.stringify({
                        phone: phone,
                        address: address,
                        aboutme: aboutme,
                        weight: weight,
                        height: height,
                        birthdate: birthdate,
                        birthplace: birthplace,
                        parent_phonenumber: parent_phonenumber,
                        parent_job: parent_job,
                        education_level: education_level,
                        name_education: name_education,
                        parent_name: parent_name,
                        blood_type: blood_type,
                        gender: gender,
                        id_sport_category: id_sport_category
                    })
                })
                if (apiBiodata.data) {
                    ToastAndroid.show('Profile Complate ', ToastAndroid.SHORT)
                    this.setState({ phone: '', address: '', aboutme: '', weight: '', height: '', birthdate: '', birthplace: '', parent_phonenumber: '', parent_job: '', education_level: '', name_education: '', parent_name: '', blood_type: 'A', gender: 'Male', id_sport_category: '5d92308f2aa35f0017d64838' })
                    this.props.navigation.navigate('Home')

                }
            }
            catch (e) {
            }
        }
    }

    onChangeCategory(value) {
        this.setState({
            id_sport_category: value
        });
    }
    onChangeGender(value) {
        this.setState({
            gender: value
        });
    }
    onChangeBlood(value) {
        this.setState({
            blood_type: value
        });
    }

    componentDidMount() {
        this.props.get_Category()
    }
    render() {
        return (
            <ScrollView>
                <View
                    style={{
                        padding: 15,
                        backgroundColor: 'crimson',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 17,
                        }}>
                        {' '}Complete the Registration{' '}
                    </Text>
                </View>

                <View style={{ marginTop: 20 }}>
                    <View style={{ marginTop: 10, alignItems: 'center' }}>
                        <Text> Hi {this.props.user.fullname} </Text>
                        <Text style={styles.subTitle}>
                            {' '}
                            Please complete your registration on below{' '}
                        </Text>
                    </View>


                    <Form bordered style={{ marginTop: 25, marginLeft: 4 }}>
                        <View style={{ top: 5 }}>
                            <Item style={styles.viewPicker}>
                                <Text style={{ fontSize: 15, bottom: 2 }}>
                                    Birth Date <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                    <Text> : </Text>
                                </Text>
                                <DatePicker
                                    defaultDate={new Date(2019, 1, 1)}
                                    minimumDate={new Date(1980, 1, 1)}
                                    maximumDate={new Date(2045, 12, 31)}
                                    androidMode={'default'}
                                    placeHolderText="Select Birthdate"
                                    placeHolderTextStyle={{ color: '#d5d5d5', fontStyle: 'italic' }}
                                    textStyle={{ color: 'green', fontStyle: 'italic' }}
                                    onDateChange={this.setDate}
                                    disabled={false}
                                />
                            </Item>
                        </View>

                        <View style={styles.viewTextArea}>
                            <Text style={{ fontSize: 15 }}>
                                Birth Place <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                <Text> : </Text>
                            </Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    width: '99%',
                                    borderRadius: 5,
                                    left: -2,
                                    marginTop: 4,
                                }}
                                onChangeText={birthplace => this.setState({ birthplace })}
                                value={this.state.birthplace}
                            />
                        </View>

                        <View>
                            <Item style={styles.viewPicker}>
                                <Text style={{ fontSize: 15 }}>
                                    Gender <Text style={{ color: 'red', fontSize: 19 }}>*</Text>{' '}
                                    <Text> : </Text>
                                </Text>
                                <View style={styles.picker}>
                                    <Picker
                                        mode="dropdown"
                                        selectedValue={this.state.gender}
                                        onValueChange={this.onChangeGender.bind(this)}>
                                        <Picker.Item label="Male" value="Male" />
                                        <Picker.Item label="Female" value="Female" />
                                    </Picker>
                                </View>
                            </Item>
                        </View>

                        <View style={styles.viewTextArea}>
                            <Text style={{ fontSize: 15 }}>
                                Address <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                <Text> : </Text>
                            </Text>
                            <Textarea rowSpan={3} bordered style={styles.textArea}
                                borderColor='gray'
                                onChangeText={(address) => this.setState({ address })}
                                value={this.state.address} />
                        </View>

                        <View style={styles.viewTextArea}>
                            <Text style={{ fontSize: 15 }}>
                                Phone Number <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                <Text> : </Text>
                            </Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    width: '99%',
                                    borderRadius: 5,
                                    left: -2,
                                    marginTop: 4,
                                }}
                                keyboardType={"numeric"}
                                onChangeText={phone => this.setState({ phone })}
                                value={this.state.phone}
                            />
                        </View>
                        <View style={{ marginTop: 15, marginLeft: 4, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, alignSelf: 'center' }}>
                                Height <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                <Text> : </Text>
                            </Text>
                            <TextInput
                                style={styles.height}
                                keyboardType={"numeric"}
                                onChangeText={height => this.setState({ height })}
                                value={this.state.height}
                            />
                            <Text style={{ alignSelf: 'center' }}> Cm </Text>
                            <Text style={{ fontSize: 15, alignSelf: 'center', marginLeft: 20 }}>
                                Weight <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                <Text> : </Text>
                            </Text>
                            <TextInput
                                style={styles.weight}
                                keyboardType={"numeric"}
                                onChangeText={weight => this.setState({ weight })}
                                value={this.state.weight}
                            />
                            <Text style={{ alignSelf: 'center' }}> Kg </Text>
                        </View>
                        <View style={{ marginTop: 15 }}></View>
                        <Item style={styles.viewPicker}>
                            <Text style={{ fontSize: 15 }}>
                                Blood Type{' '}
                                <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                <Text> : </Text>
                            </Text>
                            <View style={styles.bloodType}>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={this.state.blood_type}
                                    onValueChange={this.onChangeBlood.bind(this)}>
                                    <Picker.Item label="A" value="A" />
                                    <Picker.Item label="B" value="B" />
                                    <Picker.Item label="AB" value="AB" />
                                    <Picker.Item label="O" value="O" />
                                </Picker>
                            </View>
                        </Item>
                        <View style={styles.viewTextArea}>
                            <Text style={{ fontSize: 15 }}>
                                Background Education{' '}
                                <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                <Text> : </Text>
                            </Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    width: '99%',
                                    borderRadius: 5,
                                    left: -2,
                                    marginTop: 4,
                                }}
                                onChangeText={education_level =>
                                    this.setState({ education_level })
                                }
                                value={this.state.education_level}
                            />
                        </View>

                        <View style={styles.viewTextArea}>
                            <Text style={{ fontSize: 15 }}>
                                Education Name{' '}
                                <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                <Text> : </Text>
                            </Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    width: '99%',
                                    borderRadius: 5,
                                    left: -2,
                                    marginTop: 4,
                                }}
                                onChangeText={name_education => this.setState({ name_education })}
                                value={this.state.name_education}
                            />
                        </View>

                        <Item style={styles.viewPicker}>
                            <Text style={{ fontSize: 15 }}>
                                Category <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                <Text> : </Text>
                            </Text>
                            <View style={{ width: 250 }}>
                                <Picker
                                    mode="dropdown"

                                    style={{ width: 300 }}
                                    selectedValue={this.state.id_sport_category}
                                    onValueChange={this.onChangeCategory.bind(this)}
                                >
                                    {this.props.category.map((item) => {
                                        return (<Picker.Item label={item.category} value={item._id} key={item._id} />)
                                    })}

                                </Picker>
                            </View>
                        </Item>

                        <View style={styles.viewTextArea}>
                            <Text style={{ fontSize: 15 }}>
                                Please tell us more about you {' '}
                                <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                <Text> : </Text>
                            </Text>
                            <Textarea
                                rowSpan={5}
                                bordered
                                borderColor='gray'
                                style={styles.textArea}
                                placeholder="you can write your daily do, your exercise, and your barriers here"
                                placeholderTextColor="rgba(0,0,0,0.2)"
                                onChangeText={(aboutme) => this.setState({ aboutme })}
                                value={this.state.aboutme}
                            />
                        </View>
                        <View style={{ marginTop: 15 }}></View>
                    </Form>

                    <View style={styles.viewParentsInfo}>
                        <Text style={styles.textParents}>Parents Information :</Text>
                    </View>

                    <Form bordered style={{ marginTop: 15 }}>

                        <View style={styles.viewTextArea}>
                            <Text style={{ fontSize: 15 }}>
                                Parents Name <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                <Text> : </Text>
                            </Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    width: '99%',
                                    borderRadius: 5,
                                    left: -2,
                                    marginTop: 4,
                                }}
                                onChangeText={parent_name => this.setState({ parent_name })}
                                value={this.state.parent_name}
                            />
                        </View>
                        <View style={styles.viewTextArea}>
                            <Text style={{ fontSize: 15 }}>
                                Parents Job <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                <Text> : </Text>
                            </Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    width: '99%',
                                    borderRadius: 5,
                                    left: -2,
                                    marginTop: 4,
                                }}
                                onChangeText={parent_job => this.setState({ parent_job })}
                                value={this.state.parent_job}
                            />
                        </View>

                        <View style={styles.viewTextArea}>
                            <Text style={{ fontSize: 15 }}>
                                Phone Number <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                                <Text> : </Text>
                            </Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    width: '99%',
                                    borderRadius: 5,
                                    left: -2,
                                    marginTop: 4,
                                }}
                                keyboardType={"numeric"}
                                onChangeText={parent_phonenumber =>
                                    this.setState({ parent_phonenumber })
                                }
                                value={this.state.parent_phonenumber}
                            />
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.subTitle}>
                                Please insert field above correctly
              </Text>
                            <Text style={styles.subTitle}>We'll check it later</Text>
                        </View>
                        <View style={{ marginTop: 25 }}></View>
                    </Form>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => this.Biodata()}
                        style={styles.viewButton}>
                        <Text style={styles.textButton}> Save </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 25 }}></View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    subTitle: {
        fontStyle: 'italic',
        color: 'rgba(0,0,0, 0.4)',
    },
    textButton: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    viewButton: {
        width: 100,
        backgroundColor: 'crimson',
        borderRadius: 5,
        alignSelf: 'center',
        padding: 10,
    },
    textArea: {
        width: '99%',
        borderRadius: 5,
    },
    viewTextArea: {
        marginVertical: 10,
        marginLeft: 4,
    },
    viewPicker: {
        flexDirection: 'row',
        marginVertical: 15,
        marginLeft: 4,
        bottom: 10,
        width: 400,
    },
    picker: {
        width: 129,
        marginLeft: 10,
        marginBottom: 10,
        top: 7,
    },
    viewParentsInfo: {
        marginLeft: 4,
        backgroundColor: 'crimson',
        borderRadius: 5,
        padding: 10,
        width: '98%',
    },
    textParents: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold',
    },
    height: {
        textAlign: 'center',
        width: '20%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    weight: {
        textAlign: 'center',
        width: '20%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    bloodType: {
        width: 100,
        marginLeft: 10,
        marginBottom: 10,
        top: 7,
    },
});


const mapStateToProps = state => ({
    category: state.category.data,
    user: state.user.data
});
const mapDispatchToProps = dispatch => {
    return {
        get_Category: () => dispatch(getCategory())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(bioathleteScreen);