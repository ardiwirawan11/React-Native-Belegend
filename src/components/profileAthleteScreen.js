import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Icon, Form, Spinner, Label, List, ListItem } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { connect } from 'react-redux'
import { getAthlete } from '../redux/action/AthleteAction'
import { withNavigation } from 'react-navigation';
import Achieve from '../components/achieveScreen'

class profileAthleteScreen extends Component {
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
          this.props.get_Athlete(token);
        })
        .catch(err => {
        })
    } catch (e) {
    }
  }
  Getathlete = async () => {
    const token = await AsyncStorage.getItem('@token');
    this.props.get_Athlete(token)
  }
  Checkedit = async () => {
    this.props.athlete.id_user ? this.props.navigation.navigate('EditBioAthlete') : this.props.navigation.navigate('BioAthlete')
  }
  componentDidMount() {
    if (this.props.user.role === 'athlete') {
      this.Getathlete()
    }
  }
  render() {
    if (this.props.user.role === 'athlete') {
      const birthdate = (this.props.athlete.birthdate ? this.props.athlete.birthdate : '');
      if (this.props.lathlete.loading === true) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner></Spinner>
          </View>
        )
      } else if (this.props.lathlete.loading === false) {
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
                <View style={{ backgroundColor: 'crimson', padding: 15, alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}> Profile </Text>
                </View>
                <View style={{ width: '100%', height: 220, marginVertical: 30, alignItems: 'center' }}>
                  <TouchableOpacity onPress={this.chooseFile.bind(this)}>
                    <Image
                      source={{ uri: (this.props.athlete.id_user ? this.props.athlete.id_user.image : null) }}
                      style={{ width: 120, height: 120, marginBottom: 20, top: 3 }}
                    />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold' }}>{this.props.athlete.id_user ? this.props.athlete.id_user.fullname : ''}</Text>
                </View>

                <Form style={{ bottom: 30 }}>
                  <List>
                    <ListItem>
                      <View style={{ flexDirection: 'column' }}>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 17,
                            fontWeight: '900',
                          }}>
                          Birth Date
                    </Text>
                        <Label
                          style={{
                            fontSize: 16,
                            color: 'gray',
                            marginTop: 10,
                          }}>
                          {birthdate.substring(0, 10)}
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
                          Birth Place
                    </Text>
                        <Label
                          style={{
                            fontSize: 16,
                            color: 'gray',
                            marginTop: 10,
                          }}>
                          {this.props.athlete.birthplace ? this.props.athlete.birthplace : ''}
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
                          Gender
                    </Text>
                        <Label
                          style={{
                            fontSize: 16,
                            color: 'gray',
                            marginTop: 10,
                          }}>
                          {this.props.athlete.gender ? this.props.athlete.gender : ''}
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
                          Address
                    </Text>
                        <Label
                          style={{
                            fontSize: 16,
                            color: 'gray',
                            marginTop: 10,
                          }}>
                          {this.props.athlete.address ? this.props.athlete.address : ''}
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
                          Email
                    </Text>
                        <Label
                          style={{
                            fontSize: 16,
                            color: 'gray',
                            marginTop: 10,
                          }}>
                          {this.props.athlete.id_user ? this.props.athlete.id_user.email : ''}
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
                          Phone Number
                    </Text>
                        <Label
                          style={{
                            fontSize: 16,
                            color: 'gray',
                            marginTop: 10,
                          }}>
                          {this.props.athlete.phone ? this.props.athlete.phone : ''}
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
                          Height
                    </Text>
                        <Label
                          style={{
                            fontSize: 16,
                            color: 'gray',
                            marginTop: 10,
                          }}>
                          {this.props.athlete.height ? this.props.athlete.height : ''} Cm
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
                          Weight
                    </Text>
                        <Label
                          style={{
                            fontSize: 16,
                            color: 'gray',
                            marginTop: 10,
                          }}>
                          {this.props.athlete.weight ? this.props.athlete.weight : ''} Kg
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
                          Blood Type
                    </Text>
                        <Label
                          style={{
                            fontSize: 16,
                            color: 'gray',
                            marginTop: 10,
                          }}>
                          {this.props.athlete.blood_type ? this.props.athlete.blood_type : ''}
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
                          Background Education
                    </Text>
                        <Label
                          style={{
                            fontSize: 16,
                            color: 'gray',
                            marginTop: 10,
                          }}>
                          {this.props.athlete.education_level ? this.props.athlete.education_level : ''}
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
                          Education Name
                    </Text>
                        <Label
                          style={{
                            fontSize: 16,
                            color: 'gray',
                            marginTop: 10,
                          }}>
                          {this.props.athlete.name_education ? this.props.athlete.name_education : ''}
                        </Label>
                      </View>
                    </ListItem>
                  </List>
                </Form>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginVertical: 25 }}>
                  <TouchableOpacity style={{ backgroundColor: 'crimson', borderColor: 'pink', padding: 8, borderWidth: 2, borderRadius: 10 }}
                    onPress={() => this.Checkedit()}>
                    <Icon type="FontAwesome" name="edit" style={{ color: '#fff' }}></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: 'crimson', borderColor: 'pink', padding: 8, borderWidth: 2, borderRadius: 10 }}
                    onPress={() => this.props.navigation.navigate('Achieve')}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, alignSelf: 'center' }}> Achievement </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ borderColor: 'gray', padding: 8, width: 105, borderWidth: 2, borderRadius: 10 }}
                    onPress={async () => {
                      await AsyncStorage.clear();
                      this.props.deleteToken();
                      this.props.navigation.navigate('Home');
                    }}>
                    <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 16, alignSelf: 'center' }}> Logout </Text>
                  </TouchableOpacity>
                </View>
              </Content>
            </Container>
          );
        }
      }
    } else if (this.props.user.role === 'investor') {
      const birthdate = this.props.profile.data.birthdate;
      if (this.props.profile.loading === true) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner></Spinner>
          </View>
        )
      } else if (this.props.profile.loading === false) {
        return (
          <Container>
            <Content>
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
                            {' '}Athlete Profile{' '}
                        </Text>
                    </View>
              <View style={{ width: '100%', height: 220, marginVertical: 30, alignItems: 'center' }}>
                <Image
                  source={{ uri: this.props.profile.data.id_user.image }}
                  style={{ width: 120, height: 120, marginBottom: 20, top: 3 }}
                />
                <Text style={{ fontWeight: 'bold' }}>{this.props.profile.data.id_user.fullname}</Text>
              </View>

              <Form>
                <List>
                  <ListItem>
                    <View style={{ flexDirection: 'column' }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 17,
                          fontWeight: '900',
                        }}>
                        Birth Date
                    </Text>
                      <Label
                        style={{
                          fontSize: 16,
                          color: 'gray',
                          marginTop: 10,
                        }}>
                        {birthdate.substring(0, 10)}
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
                        Birth Place
                    </Text>
                      <Label
                        style={{
                          fontSize: 16,
                          color: 'gray',
                          marginTop: 10,
                        }}>
                        {this.props.profile.data.birthplace}
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
                        Gender
                    </Text>
                      <Label
                        style={{
                          fontSize: 16,
                          color: 'gray',
                          marginTop: 10,
                        }}>
                        {this.props.profile.data.gender}
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
                        Email
                    </Text>
                      <Label
                        style={{
                          fontSize: 16,
                          color: 'gray',
                          marginTop: 10,
                        }}>
                        {this.props.profile.data.id_user.email}
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
                        Address
                    </Text>
                      <Label
                        style={{
                          fontSize: 16,
                          color: 'gray',
                          marginTop: 10,
                        }}>
                        {this.props.profile.data.address}
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
                        Phone Number
                    </Text>
                      <Label
                        style={{
                          fontSize: 16,
                          color: 'gray',
                          marginTop: 10,
                        }}>
                        {this.props.profile.data.phone}
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
                        Height
                    </Text>
                      <Label
                        style={{
                          fontSize: 16,
                          color: 'gray',
                          marginTop: 10,
                        }}>
                        {this.props.profile.data.height} Cm
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
                        Weight
                    </Text>
                      <Label
                        style={{
                          fontSize: 16,
                          color: 'gray',
                          marginTop: 10,
                        }}>
                        {this.props.profile.data.weight} Kg
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
                        Blood Type
                    </Text>
                      <Label
                        style={{
                          fontSize: 16,
                          color: 'gray',
                          marginTop: 10,
                        }}>
                        {this.props.profile.data.blood_type}
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
                        Background Education
                    </Text>
                      <Label
                        style={{
                          fontSize: 16,
                          color: 'gray',
                          marginTop: 10,
                        }}>
                        {this.props.profile.data.education_level}
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
                        Education Name
                    </Text>
                      <Label
                        style={{
                          fontSize: 16,
                          color: 'gray',
                          marginTop: 10,
                        }}>
                        {this.props.profile.data.name_education}
                      </Label>
                    </View>
                  </ListItem>
                </List>
              </Form>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    marginLeft: 20,
                    flex: 1,
                    fontSize: 17,
                    fontWeight: '900',
                  }}>
                  Achievement
                    </Text>
                <Achieve />
              </View>
            </Content>
          </Container>
        );
      }
    }
  }
}


const mapStateToProps = state => ({
  athlete: state.athlete.data,
  lathlete: state.athlete,
  user: state.user.data,
  profile: state.profile
});
const mapDispatchToProps = dispatch => {
  return {
    get_Athlete: token => dispatch(getAthlete(token))
  }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(profileAthleteScreen))