import React, { Component } from 'react'
import { Text, ScrollView, Image, ToastAndroid, TouchableOpacity } from 'react-native'
import { List, Icon, ListItem, View, Spinner, Textarea } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../redux/action/userAction'
import { getAccepted } from '../redux/action/AcceptedAction'
import { getMyscholarship } from '../redux/action/MyscholarshipAction'
import { getMyapply } from '../redux/action/MyapplyAction'

class detailScreen extends Component {
  state = {
    reason: ''
  }

  static navigationOptions = {
    header: null,
  };

  apply = async () => {
    const { reason } = this.state;
    const token = await AsyncStorage.getItem('@token');
    if (reason === '') {
      ToastAndroid.show('Please Fill The Essay', ToastAndroid.SHORT);
    }
    else {
      try {
        const apiApply = await axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          url: 'https://belegend.herokuapp.com/api/v1/applied',
          data: JSON.stringify({
            reason: reason,
            id_scholarship: this.props.detail._id
          })
        })
        if (apiApply.data) {
          ToastAndroid.show('Success Apply', ToastAndroid.SHORT)
          this.props.get_Myapply(token)
          this.props.navigation.navigate('Home')
        }
      }
      catch (e) {
        ToastAndroid.show('Cant Apply This Scholarship', ToastAndroid.SHORT)
      }
    }
  }
  accepted = async (id) => {
    const token = await AsyncStorage.getItem('@token');
    this.props.get_Accepted(token, id)
    this.props.navigation.navigate('Accepted')
  }
  delete = async (id) => {
    const token = await AsyncStorage.getItem('@token');
    try {
      const apiDelete = await axios({
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        url: `https://belegend.herokuapp.com/api/v1/scholarship/${id}`,
      })
      if (apiDelete.data) {
        this.props.get_Myscholarship(token)
        ToastAndroid.show('Success Delete Scholarship', ToastAndroid.SHORT)
        this.props.navigation.navigate('Home')
      }
    }
    catch (e) {
      ToastAndroid.show('Cant Delete This Scholarship', ToastAndroid.SHORT)
    }
  }
  loginmsg = () => {
    ToastAndroid.show('Please Login to Apply', ToastAndroid.SHORT);
  }
  render() {
    const button = (
      <View>
        <View style={{ marginLeft: 14, marginVertical: 15 }}>
          <Text style={{ fontSize: 17 }}>
            Essay <Text style={{ color: 'rgba(0,0,0,0.2)' }}>*</Text> : </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Textarea
            style={{ borderWidth: 1, width: '96%', borderColor: 'green', borderTopLeftRadius: 10, borderBottomRightRadius: 20 }}
            placeholder={'What is your motivation to Join the Scholarship'}
            underlineColorAndroid={'green'}
            onChangeText={reason => this.setState({ reason })}
            value={this.state.reason}
          />
        </View>

        <View style={{ marginVertical: 25, alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'crimson',
              borderColor: 'pink',
              padding: 8,
              width: 200,
              borderWidth: 2,
              borderRadius: 10,
            }}
            onPress={() => this.apply()}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
                alignSelf: 'center',
              }}>
              {' '}
              Apply{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    const buttonguest = (
      <View style={{ marginVertical: 25, alignItems: 'center' }}>
        <TouchableOpacity style={{ backgroundColor: 'crimson', borderColor: 'pink', padding: 8, width: 200, borderWidth: 2, borderRadius: 10 }}
          onPress={() => this.loginmsg()}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, alignSelf: 'center' }}> Apply </Text>
        </TouchableOpacity>
      </View>
    )
    const btndelete = (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginVertical: 25 }}>
        <TouchableOpacity style={{ backgroundColor: 'crimson', borderColor: 'pink', padding: 8, width: 105, borderWidth: 2, borderRadius: 10 }}
          onPress={() => this.props.navigation.navigate('Applied')}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, alignSelf: 'center' }}> Applied </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'crimson', borderColor: 'pink', padding: 8, width: 105, borderWidth: 2, borderRadius: 10 }}
          onPress={() => this.accepted(this.props.detail._id)}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, alignSelf: 'center' }}> Accepted </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ borderColor: 'rgba(10, 0, 0, 0.1)', padding: 5, width: 40, borderWidth: 2, borderRadius: 10 }}
          onPress={() => this.delete(this.props.detail._id)}>
          <Icon
            name={'trash'}
            style={{
              color: 'gray',
              position: 'absolute',
              alignSelf: 'center',
              marginRight: 5,
              top: 5,
            }}
          />
        </TouchableOpacity>
      </View>
    )

    const startdate = this.props.detail.start_date;
    const enddate = this.props.detail.end_date;
    if (this.props.ldetail.loading == true) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner></Spinner>
        </View>
      )
    }
    else {
      return (
        <ScrollView>
          <View style={{padding: 13, backgroundColor: 'crimson', flexDirection: 'row', alignItems: 'center',
            alignContent: 'center', justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}>
            <Icon type='Ionicons' name='md-arrow-back' style={{color: 'white'}}/> 
          </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 17,
                flex: 2.5
              }}>
              {' '}Detail of Scholarship{' '}
            </Text>
          </View>
          <Image
            source={{uri: this.props.detail.image}}
            style={{width: '100%', height: 200, marginTop: 5}}
          />
          <List>
            <ListItem
              style={{
                flex: 1,
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                marginVertical: 10,
                left: -6,
              }}>
              <Text style={{ fontSize: 17, marginBottom: 5 }}> Title </Text>
              <Text> {this.props.detail.title} </Text>
            </ListItem>
            <ListItem
              style={{
                flex: 1,
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                marginVertical: 10,
                left: -6,
              }}>
              <Text style={{ fontSize: 17, marginBottom: 5 }}>
                {' '}
                Description{' '}
              </Text>
              <Text> {this.props.detail.description} </Text>
            </ListItem>
            <ListItem
              style={{
                flex: 1,
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                marginVertical: 10,
                left: -6,
              }}>
              <Text style={{ fontSize: 17, marginBottom: 5 }}>
                {' '}
                Quota{' '}
              </Text>
              <Text> {this.props.detail.quota} </Text>
            </ListItem>
            <ListItem
              style={{
                flex: 1,
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                marginVertical: 10,
                left: -6,
              }}>
              <Text style={{ fontSize: 17, marginBottom: 5 }}>
                {' '}
                Total fund{' '}
              </Text>
              <Text> Rp. {parseFloat(this.props.detail.total_fund).toLocaleString('id-ID')} </Text>
            </ListItem>
            <ListItem
              style={{
                flex: 1,
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                marginVertical: 10,
                left: -6,
              }}>
              <Text style={{ fontSize: 17, marginBottom: 5 }}>
                {' '}
                Start date{' '}
              </Text>
              <Text> {startdate.substring(0, 10)} </Text>
            </ListItem>
            <ListItem
              style={{
                flex: 1,
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                marginVertical: 10,
                left: -6,
              }}>
              <Text style={{ fontSize: 17, marginBottom: 5 }}> End date </Text>
              <Text> {enddate.substring(0, 10)} </Text>
            </ListItem>
            {this.props.user.role === 'athlete' ? button : (this.props.user.role === 'investor' ? btndelete : buttonguest)}
          </List>
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = state => ({
  detail: state.detail.data,
  ldetail: state.detail,
  user: state.user.data
});

const mapDispatchToProps = dispatch => {
  return {
    get_User: token => dispatch(getUser(token)),
    get_Myscholarship: (token) => dispatch(getMyscholarship(token)),
    get_Accepted: (token, id) => dispatch(getAccepted(token, id)),
    get_Myapply: (token) => dispatch(getMyapply(token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(detailScreen);
