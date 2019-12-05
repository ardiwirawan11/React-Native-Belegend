import React, { Component, Fragment } from 'react'
import { Text, TextInput, View, Image, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { Form, CardItem, Icon, Item, Picker } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../redux/action/userAction'

import logo from '../images/logo.png';

class registerScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      role: 'athlete',
    };
  }

  onValueChange(value) {
    this.setState({
      role: value,
    });
  }

  async handleRegister() {
    const { email, name, password, role } = this.state;
    if (email === '') {
      ToastAndroid.show('Fill your Email', ToastAndroid.SHORT);
    }
    else if (name === '') {
      ToastAndroid.show('Fill your Name', ToastAndroid.SHORT);
    }
    else if (password === '') {
      ToastAndroid.show('Fill your Password', ToastAndroid.SHORT);
    }
    else {
    try {
      const apiRegister = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        url: 'https://belegend.herokuapp.com/api/v1/users/',
        data: JSON.stringify({
          email: email,
          fullname: name,
          password: password,
          role: role,
        }),
      });
      if (apiRegister.data) {
        await AsyncStorage.setItem('@token', apiRegister.data.results.token);
        const token = await AsyncStorage.getItem('@token');
        await this.props.get_User(token);
        ToastAndroid.show('Success Register', ToastAndroid.SHORT);
        this.setState({ email: '', password: '', name: '' });
        this.props.navigation.push('Foto');
      }
    } catch (e) {
      ToastAndroid.show(
        'Your Email is Already Registered',
        ToastAndroid.SHORT,
      );
    }
  }
}

  render() {
    return (
      <Fragment>
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
              style={{color: 'white'}}
            />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 17,
              flex: 3.3,
            }}>
            {' '}
            Be Legend{' '}
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40,
              right: 6,
            }}>
            <Image source={logo} style={{ width: 150, height: 150 }} />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Form style={{ alignItems: 'center', width: '80%' }}>
              <CardItem
                header
                style={{
                  flexDirection: 'column',
                  height: 380,
                  borderRadius: 10,
                }}>
                <View style={{ marginTop: 10 }}>
                  <Icon
                    name={'person'}
                    style={{
                      color: 'black',
                      position: 'absolute',
                      marginRight: 5,
                      top: 15,
                    }}
                  />
                  <TextInput
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                    placeholder={'Full Name'}
                    underlineColorAndroid={'black'}
                    style={{ width: 255, marginLeft: 30 }}
                  />
                </View>
                <View style={{ marginTop: 15 }}>
                  <Icon
                    name={'mail'}
                    style={{
                      color: 'black',
                      position: 'absolute',
                      marginRight: 5,
                      top: 15,
                    }}
                  />
                  <TextInput
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    placeholder={'Email Address'}
                    underlineColorAndroid={'black'}
                    style={{ width: 255, marginLeft: 30 }}
                  />
                </View>
                <View style={{ marginVertical: 15 }}>
                  <Icon
                    name={'lock'}
                    style={{
                      color: 'black',
                      position: 'absolute',
                      marginRight: 5,
                      top: 15,
                    }}
                  />
                  <TextInput
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={'Password'}
                    underlineColorAndroid={'black'}
                    style={{ width: 255, marginLeft: 25 }}
                  />
                  <Item style={{ top: 5 }}>
                    <Picker
                      mode="dropdown"
                      style={styles.text}
                      selectedValue={this.state.role}
                      onValueChange={this.onValueChange.bind(this)}>
                      <Picker.Item label="Athlete" value="athlete" />
                      <Picker.Item label="Investor" value="investor" />
                    </Picker>
                  </Item>

                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => this.handleRegister()}
                      style={styles.button}>
                      <Text style={styles.textButton}> Register </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </CardItem>
            </Form>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  button: {
    backgroundColor: 'crimson',
    width: 275,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 45,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'center',
  },
});


const mapDispatchToProps = dispatch => {
  return {
    get_User: token => dispatch(getUser(token))
  }
};

export default connect(null, mapDispatchToProps)(registerScreen);
