import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Spinner, List, ListItem, Label, Icon } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { connect } from 'react-redux'
import { getInvestor } from '../redux/action/InvestorAction'
import { withNavigation } from 'react-navigation';


class profileCompanyScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    photo: {},
    loading: false
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
        this.setState({
          photo: response,
          loading: true
        });
        this.foto()
      }
    });
  };

  foto = async () => {
    const token = await AsyncStorage.getItem('@token');
    try {
      let image = new FormData()
      image.append('image',
        {
          uri: this.state.photo.uri,
          name: this.state.photo.fileName,
          type: this.state.photo.type
        }
      )


      const add = async (data) => await axios.put(
        `https://belegend.herokuapp.com/api/v1/users/update_image/${this.props.user._id}`,
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
          this.setState({ loading: false });
          this.props.get_Investor(token);
        })
        .catch(err => {
        })
    } catch (e) {
    }
  }
  removeToken = async () => {
    await AsyncStorage.clear();
    this.props.deleteToken()
    this.props.navigation.navigate('Home')
  }
  Getinvestor = async () => {
    const token = await AsyncStorage.getItem('@token');
    this.props.get_Investor(token)
  }
  Checkedit = async () => {
    this.props.investor.name ? this.props.navigation.navigate('EditBioInvestor') : this.props.navigation.navigate('BioInvest')
  }
  componentDidMount() {
    this.Getinvestor()
  }
  render() {
    if (this.props.linvestor.loading === true) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner></Spinner>
        </View>
      )
    } else if (this.props.linvestor.loading === false) {
      if (this.state.loading === true) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner></Spinner>
          </View>
        )
      } else if (this.state.loading === false) {
        return (
          <Container>
            <Content>
              <View
                style={{
                  backgroundColor: 'crimson',
                  padding: 15,
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>
                  {' '}Profile{' '}
                </Text>
              </View>
              <View style={{ width: '100%', height: 220, marginVertical: 30, alignItems: 'center' }}>
                <TouchableOpacity onPress={this.chooseFile.bind(this)}>
                  <Image
                    source={{ uri: (this.props.investor.id_user ? this.props.investor.id_user.image : null) }}
                    style={{ width: 120, height: 120, marginBottom: 20, top: 3 }}
                  />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold' }}>{this.props.investor.id_user ? this.props.investor.id_user.fullname : ''}</Text>
              </View>
              <Form style={{ bottom: 40 }}>
                <List>
                  <ListItem>
                    <View style={{ flexDirection: 'column' }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 17,
                          fontWeight: '900',
                        }}>
                        Company Name
                    </Text>
                      <Label
                        style={{
                          fontSize: 16,
                          color: 'gray',
                          marginTop: 10,
                        }}>
                        {this.props.investor.name ? this.props.investor.name : ''}
                      </Label>
                    </View>
                  </ListItem>
                  <ListItem>
                    <View style={{ flexDirection: 'column' }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 17,
                          fontWeight: '900',
                        }}>
                        Company Address
                    </Text>
                      <Label
                        style={{
                          fontSize: 16,
                          color: 'gray',
                          marginTop: 10,
                        }}>
                        {this.props.investor.address ? this.props.investor.address : ''}
                      </Label>
                    </View>
                  </ListItem>
                  <ListItem>
                    <View style={{ flexDirection: 'column' }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 17,
                          fontWeight: '900',
                        }}>
                        Company Phone
                    </Text>
                      <Label
                        style={{
                          fontSize: 16,
                          color: 'gray',
                          marginTop: 10,
                        }}>
                        {this.props.investor.phone ? this.props.investor.phone : ''}
                      </Label>
                    </View>
                  </ListItem>
                </List>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginVertical: 25 }}>
                  <TouchableOpacity style={{ backgroundColor: 'crimson', borderColor: 'pink', padding: 8, borderWidth: 2, borderRadius: 10 }}
                    onPress={() => this.Checkedit()}>
                    <Icon type="FontAwesome" name="edit" style={{ color: '#fff' }}></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ borderColor: 'gray', padding: 8, width: 105, borderWidth: 2, borderRadius: 10 }}
                   onPress={() => this.removeToken()}>
                    <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 16, alignSelf: 'center' }}> Logout </Text>
                  </TouchableOpacity>
                </View>
              </Form>
            </Content>
          </Container>
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  investor: state.investor.data,
  linvestor: state.investor,
  user: state.user.data,

});

const mapDispatchToProps = dispatch => {
  return {
    get_Investor: token => dispatch(getInvestor(token))
  }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(profileCompanyScreen));