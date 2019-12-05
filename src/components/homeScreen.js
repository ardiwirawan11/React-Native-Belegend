import React, { Component } from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Card, CardItem, Container, Content, Spinner, Fab, Tabs, Tab, Icon } from 'native-base'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { getScholarship } from '../redux/action/ScholarshipAction'
import { getMyscholarship } from '../redux/action/MyscholarshipAction'
import { getDetail } from '../redux/action/DetailAction'
import { getUser } from '../redux/action/userAction'
import { getAthlete } from '../redux/action/AthleteAction'
import { getInvestor } from '../redux/action/InvestorAction'

import MyapplyScreen from './myapplyScreen'


class homeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  scholarship = async () => {
    const token = await AsyncStorage.getItem('@token');
    this.props.get_Myscholarship(token)
    this.props.get_Scholarship();
  }
  detail = async (id) => {
    const token = await AsyncStorage.getItem('@token');
    this.props.get_Detail(token, id)
    this.props.navigation.navigate('Detail')
  }
  cekuser = async () => {
    const token = await AsyncStorage.getItem('@token');
    this.props.get_User(token)
  }

  componentDidMount() {
    this.scholarship();
    this.cekuser()
  }

  render() {

    if (this.props.luser === true) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner></Spinner>
        </View>
      )
    } else {
      if (this.props.user.role === 'athlete') {
        if (this.props.lscholarship.loading === true) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Spinner></Spinner>
            </View>
          )
        } else {
          const loops = this.props.scholarship.map((item) => {
            return (
              <Card key={item._id}>
                <Image source={{ uri: item.image }} style={{ width: '100%', height: 200 }} />
                <CardItem>
                  <View>
                    <Text style={{ flex: 1, flexWrap: 'wrap' }}>
                      <Text>{item.title}</Text>
                    </Text>
                    <Text style={{ flex: 1, flexWrap: 'wrap' }}>
                      <Text style={{ color: 'grey' }}>{item.description}</Text>
                    </Text>
                    <TouchableOpacity
                      style={{
                        marginVertical: 10,
                        padding: 8,
                        backgroundColor: 'crimson',
                        width: 100,
                        borderBottomStartRadius: 40,
                        borderTopEndRadius: 40,
                      }}
                      onPress={() => {
                        this.detail(item._id);
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 16,
                          alignSelf: 'center',
                        }}>
                        {' '}Detail >>{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </CardItem>
              </Card>
            )
          })
          return (
            <Container style={{ flex: 1 }}>
              <Tabs>
                <Tab
                  tabStyle={{ backgroundColor: 'crimson' }}
                  activeTabStyle={{ backgroundColor: 'crimson' }}
                  heading="Scholarship">
                  <ScrollView>
                    <Content>
                      <View style={{ marginTop: 10 }}>{loops}</View>
                    </Content>
                  </ScrollView>
                </Tab>
                <Tab
                  tabStyle={{ backgroundColor: 'crimson' }}
                  activeTabStyle={{ backgroundColor: 'crimson' }}
                  heading="My Apply">
                  <MyapplyScreen />
                </Tab>
              </Tabs>
            </Container>
          );
        }

      }
      else if (this.props.user.role === 'investor') {
        if (this.props.lmyscholarship.loading === true) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Spinner></Spinner>
            </View>
          )
        }
        else {
          const loops1 = this.props.myscholarship.map((item) => {
            return (
              <Card key={item._id}>
                <Image source={{ uri: item.image }} style={{ width: '100%', height: 200 }} />
                <CardItem>
                  <View>
                    <Text style={{ flex: 1, flexWrap: 'wrap' }}>
                      <Text>{item.title}</Text>
                    </Text>
                    <Text style={{ flex: 1, flexWrap: 'wrap' }}>
                      <Text style={{ color: 'grey' }}>{item.description}</Text>
                    </Text>
                    <TouchableOpacity
                      style={{
                        marginVertical: 10,
                        padding: 8,
                        backgroundColor: 'crimson',
                        width: 100,
                        borderBottomStartRadius: 40,
                        borderTopEndRadius: 40,
                      }}
                      onPress={() => {
                        this.detail(item._id);
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 16,
                          alignSelf: 'center',
                        }}>
                        {' '}
                        Detail >>{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </CardItem>
              </Card>
            )
          })
          return (
            <Container style={{ flex: 1 }}>
              <View style={{ padding: 15, backgroundColor: 'crimson' }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 17,
                  }}>
                  {' '}My Scholarship List{' '}
                </Text>
              </View>
              <Content>
                <View>{loops1}</View>
              </Content >
              <Fab style={{ backgroundColor: 'crimson' }}
                position="bottomRight"
                onPress={() => this.props.navigation.navigate('Add')}>
                <Icon name="add" />
              </Fab>
            </Container >
          );
        }

      }
      else {
        if (this.props.lscholarship.loading === true) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Spinner></Spinner>
            </View>
          )
        }
        const loops = this.props.scholarship.map((item) => {
          return (
            <Card key={item._id}>
              <Image source={{ uri: item.image }} style={{ width: '100%', height: 200 }} />
              <CardItem>
                <View>
                  <Text style={{ flex: 1, flexWrap: 'wrap' }}>
                    <Text>{item.title}</Text>
                  </Text>
                  <Text style={{ flex: 1, flexWrap: 'wrap' }}>
                    <Text style={{ color: 'grey' }}>{item.description}</Text>
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginVertical: 10,
                      padding: 8,
                      backgroundColor: 'crimson',
                      width: 100,
                      borderBottomStartRadius: 40,
                      borderTopEndRadius: 40,
                    }}
                    onPress={() => {
                      this.detail(item._id);
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        alignSelf: 'center',
                      }}>
                      {' '}
                      Detail >>{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              </CardItem>
            </Card>
          )
        })
        return (
          <Container>
            <View style={{ padding: 15, backgroundColor: 'crimson' }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                {' '}Scholarship List{' '}
              </Text>
            </View>
            <Content>
              <View>{loops}</View>
            </Content>
          </Container>
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  scholarship: state.scholarship.data,
  myscholarship: state.myscholarship.data,
  user: state.user.data,
  lscholarship: state.scholarship,
  lmyscholarship: state.myscholarship,
  luser: state.user

});
const mapDispatchToProps = dispatch => {
  return {
    get_Scholarship: () => dispatch(getScholarship()),
    get_Myscholarship: (token) => dispatch(getMyscholarship(token)),
    get_Detail: (token, id) => dispatch(getDetail(token, id)),
    get_User: token => dispatch(getUser(token)),
    get_Athlete: token => dispatch(getAthlete(token)),
    get_Investor: token => dispatch(getInvestor(token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(homeScreen);
