import React, { Component, Fragment } from 'react'
import { Text, TextInput, View, TouchableOpacity, StyleSheet, ScrollView, Image, ToastAndroid } from 'react-native';
import { Form, Icon, CardItem } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

import logo from '../images/logo.png';


class loginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  async handleLogin() {
    const { email, password } = this.state;
    if (email === '') {
      ToastAndroid.show('Fill your Email', ToastAndroid.SHORT);
    }
    else if (password === '') {
      ToastAndroid.show('Fill your Password', ToastAndroid.SHORT);
    }
    else {
      try {
        const apiLogin = await axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          url: 'https://belegend.herokuapp.com/api/v1/users/auth/',
          data: JSON.stringify({
            email,
            password,
          }),
        });
        if (apiLogin.data) {
          await AsyncStorage.setItem('@token', apiLogin.data.results.token);
          ToastAndroid.show('Success Login', ToastAndroid.SHORT);
          this.setState({ email: '', password: '' });
          this.props.navigation.navigate('Home');
        }
      } catch (e) {
        ToastAndroid.show(
          'Wrong user name & password. Try again!',
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
              this.props.navigation.navigate('Home');
            }}>
            <Icon type='Ionicons' name='md-arrow-back' style={{ color: 'white' }} />
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

          <View style={{ alignItems: 'center', marginVertical: 4 }}>
            <Form style={{ width: '80%' }}>
              <CardItem
                header
                style={{
                  flexDirection: 'column',
                  height: 330,
                  borderRadius: 10,
                }}>
                <View style={{ marginVertical: 20, top: 10 }}>
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
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder={'Email Address'}
                    underlineColorAndroid={'black'}
                    style={{ width: 255, marginLeft: 30 }}
                  />

                  <View style={{ marginVertical: 20 }}>
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
                      value={this.state.password}
                      onChangeText={password => this.setState({ password })}
                      secureTextEntry={true}
                      placeholder={'Password'}
                      underlineColorAndroid={'black'}
                      style={{ width: 255, marginLeft: 25 }}
                    />
                  </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => this.handleLogin()}
                    style={styles.button}>
                    <Text style={styles.textButton}>Login</Text>
                  </TouchableOpacity>
                  <Text style={{ marginTop: 6 }}> Do not have an account? </Text>
                  <View style={{ flexDirection: 'row', marginTop: 4 }}>
                    <Text style={{ fontSize: 16 }} style={styles.text}>
                      {' '}
                      Register{' '}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.push('Register')}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: 'red',
                        }}>
                        Here
                        </Text>
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
    width: 180,
    alignItems: 'center',
    padding: 6,
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


export default (loginScreen);
