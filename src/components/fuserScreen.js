import React, { Component, Fragment } from 'react'
import {Text, View, Image, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../redux/action/userAction'
import { withNavigation } from 'react-navigation';


class fuserScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filePath: '',
      photo: {}
    }
  }

  static navigationOptions = {
    header: null,
  };

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

  cekfoto = () => {
    if (this.state.filePath !== this.props.user.image) {
      this.foto();
      if (this.props.user.role == 'athlete') {
        this.props.navigation.navigate('BioAthlete')
      } else {
        this.props.navigation.navigate('BioInvest')
      }

    } else if (this.props.user.role == 'athlete') {
      this.props.navigation.navigate('BioAthlete')
    } else {
      this.props.navigation.navigate('BioInvest')
    }
  }
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
          this.props.get_User(token);
        })
        .catch(err => {
        })
    } catch (e) {
    }
  }



  componentDidUpdate() {
    if (this.state.filePath == '') {
      this.setState({
        filePath: this.props.user.image
      });
    }
  }


  render() {
    return (
      <Fragment>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.textHeader}> User Profile </Text>
          </View>
          <View style={styles.viewImage}>
              <TouchableOpacity onPress={this.chooseFile.bind(this)}>
                <Image
                  source={{ uri: this.state.filePath }}
                  style={styles.image}
                />
              </TouchableOpacity>
              <Text style={styles.Name}> {this.props.user.fullname} </Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 19 }}>
              Welcome to{' '}
              <Text style={{ color: 'red', fontWeight: 'bold' }}>Be</Text>
              <Text style={{ fontWeight: 'bold' }}>Legend</Text>
            </Text>
            <Text style={{ fontSize: 16 }}> Registration success </Text>
          </View>
          <Text style={styles.Subtitle}>
            {' '}
            Please complete your process registration{' '}
          </Text>

          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Text style={{ fontStyle: 'italic', color: 'rgba(0,0,0,0.4)' }}>
              {' '}
              You can change your picture by clicking the image above{' '}
            </Text>
          </View>

          <View style={styles.viewButton}>
            <TouchableOpacity
              onPress={() => this.cekfoto()}
              style={styles.touchButton}>
              <Text style={styles.textButton}> Next </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Fragment>

    )
  }
}

const styles = StyleSheet.create({
  textButton: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  touchButton: {
    backgroundColor: 'crimson',
    width: '90%',
    padding: 8,
    alignSelf: 'center',
    borderRadius: 11,
    marginTop: 15,
  },
  viewButton: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    marginTop: 29,
  },
  Subtitle: {
    fontStyle: 'italic',
    color: 'rgba(0,0,0,0.4)',
    alignSelf: 'center',
  },
  Name: {
    color: '#fff',
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 200,
    marginTop: 40,
    alignSelf: 'center',
  },
  viewImage: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 17,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: 'crimson',
    height: 50,
    justifyContent: 'center',
  },
});


const mapStateToProps = state => ({
  user: state.user.data
});

const mapDispatchToProps = dispatch => {
  return {
    get_User: token => dispatch(getUser(token))
  }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(fuserScreen));