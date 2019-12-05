import React, { Component } from 'react';
import { Text, View, TextInput, ToastAndroid, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Content, Form, DatePicker, Picker, Textarea, Item, Icon, Spinner} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import axios from 'axios'
import { getCategory } from '../redux/action/CategoryAction'
import { getMyscholarship } from '../redux/action/MyscholarshipAction'

class addScholarship extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      title: '',
      quota: '',
      description: '',
      total_fund: '',
      start_date: '',
      end_date: '',
      loading: false,
      id_sport_category: '5d92308f2aa35f0017d64838',
      photo: {},
      image: ''
    };
  }

  setStartDate(newDate) {
    this.setState({ chosenDate: newDate });
    const dateObj = this.state.chosenDate
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const date = ('0' + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();
    const fulldate = year + '-' + month + '-' + date;
    this.setState({ start_date: fulldate });
  }
  setEndDate(newDate) {
    this.setState({ chosenDate: newDate });
    const dateObj = this.state.chosenDate
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const date = ('0' + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();
    const fulldate = year + '-' + month + '-' + date;
    this.setState({ end_date: fulldate });
  }
  onChangeCategory(value) {
    this.setState({
      id_sport_category: value
    });
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
          photo: response
        });
        this.setState({
          image: response.name
        });
      }
    });
  };


  foto = async () => {
    const token = await AsyncStorage.getItem('@token');
    if (this.state.image === '') {
      ToastAndroid.show('Please Choose The Picture', ToastAndroid.SHORT)
    }
    else if (this.state.title === '') {
      ToastAndroid.show('Fill the Title', ToastAndroid.SHORT);
    }
    else if (this.state.quota === '') {
      ToastAndroid.show('Fill the Quota', ToastAndroid.SHORT);
    }
    else if (this.state.description === '') {
      ToastAndroid.show('Fill the Description', ToastAndroid.SHORT);
    }
    else if (this.state.total_fund === '') {
      ToastAndroid.show('Fill the Total Fund', ToastAndroid.SHORT);
    }
    else if (this.state.start_date === '') {
      ToastAndroid.show('Select the Start Date', ToastAndroid.SHORT);
    }
    else if (this.state.end_date === '') {
      ToastAndroid.show('Fill the End Date', ToastAndroid.SHORT);
    }
    else {
      this.setState = ({ loading: true })
      try {
        let data = new FormData()
        data.append(
          'image',
          {
            uri: this.state.photo.uri,
            name: this.state.photo.fileName,
            type: this.state.photo.type
          },
          'title', this.state.title
        )
        data.append('title', this.state.title)
        data.append('quota', this.state.quota)
        data.append('description', this.state.description)
        data.append('total_fund', this.state.total_fund)
        data.append('start_date', this.state.start_date)
        data.append('end_date', this.state.end_date)
        data.append('id_sport_category', this.state.id_sport_category)


        const add = async (data) => await axios.post(
          `https://belegend.herokuapp.com/api/v1/scholarship`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': token
            }
          }
        )

        add(data)
          .then(res => {
            this.setState = ({ loading: false })
            ToastAndroid.show('Success add scholarship', ToastAndroid.SHORT)
            this.props.get_Myscholarship(token)
            this.props.navigation.navigate('Home')
          })
          .catch(err => {
          })
      }
      catch (e) {
      }
    }

  }
  componentDidMount() {
    this.props.get_Category()
  }
  render() {
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
            <View style={{
              padding: 10, backgroundColor: 'crimson', flexDirection: 'row', alignItems: 'center',
              alignContent: 'center', justifyContent: 'center',
            }}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Icon type='Ionicons' name='md-arrow-back' style={{ color: 'white' }} />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 17,
                  flex: 2
                }}>
                {' '}Add Scholarship{' '}
              </Text>
            </View>
            <View>
              <Form style={{ marginLeft: 1, marginVertical: 15 }}>
                <Item style={styles.viewPicker}>
                  <Text style={styles.textMargin}>
                    Title <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                    <Text> : </Text>
                  </Text>
                  <TextInput style={{ fontSize: 16, width: '85%' }}
                    placeholder='Input Title'
                    onChangeText={title => this.setState({ title })}
                    value={this.state.title}
                  />
                </Item>
                <Item style={styles.viewPicker}>
                  <Text style={styles.textMargin}>
                    Quota <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                    <Text> : </Text>
                  </Text>
                  <TextInput style={{ fontSize: 16, width: '85%' }}
                    placeholder='Input Quota'
                    keyboardType={"numeric"}
                    onChangeText={quota => this.setState({ quota })}
                    value={this.state.quota}
                  />
                </Item>
                <View>
                  <Text style={styles.textMargin}>
                    Description <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                    <Text> : </Text>
                  </Text>

                  <Textarea
                    placeholder='Input Description'
                    rowSpan={3}
                    bordered
                    style={{
                      marginVertical: 15,
                      marginHorizontal: 5,
                      width: '98%'
                    }}
                    onChangeText={description => this.setState({ description })}
                    value={this.state.description}
                  />
                </View>
                <Item style={styles.viewPicker}>
                  <Text style={styles.textMargin}>
                    Total Fund <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                    <Text> : </Text>
                  </Text>
                  <TextInput style={{ fontSize: 16, width: '85%' }}
                    placeholder='Input Total Fund'
                    keyboardType={"numeric"}
                    onChangeText={total_fund => this.setState({ total_fund })}
                    value={this.state.total_fund}
                  />
                </Item>
                <Item style={styles.viewPicker}>
                  <Text style={styles.textMargin}>
                    Date Start <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                    <Text> : </Text>
                  </Text>
                  <DatePicker
                    defaultDate={new Date(2019, 1, 1)}
                    minimumDate={new Date(2019, 1, 1)}
                    maximumDate={new Date(2045, 12, 31)}
                    androidMode={'default'}
                    placeHolderText="Select Start Date"
                    placeHolderTextStyle={{ color: '#d5d5d5', fontStyle: 'italic' }}
                    textStyle={{ color: 'green', fontStyle: 'italic' }}
                    onDateChange={this.setStartDate.bind(this)}
                    disabled={false}
                  />
                </Item>
                <Item style={styles.viewPicker}>
                  <Text style={styles.textMargin}>
                    Date End <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                    <Text> : </Text>
                  </Text>
                  <DatePicker
                    defaultDate={new Date(2019, 1, 1)}
                    minimumDate={new Date(2019, 1, 1)}
                    maximumDate={new Date(2045, 12, 31)}
                    androidMode={'default'}
                    placeHolderText="Select End Date"
                    placeHolderTextStyle={{ color: '#d5d5d5', fontStyle: 'italic' }}
                    textStyle={{ color: 'green', fontStyle: 'italic' }}
                    onDateChange={this.setEndDate.bind(this)}
                    disabled={false}
                  />
                </Item>
                <Item style={styles.viewPicker}>
                  <Text style={{ fontSize: 15 }}>
                    Category <Text style={{ color: 'red', fontSize: 19 }}>*</Text>
                    <Text> : </Text>
                  </Text>
                  <View style={{ width: 250 }}>
                    <Picker
                      mode="dropdown"

                      style={{ width: 200 }}
                      selectedValue={this.state.id_sport_category}
                      onValueChange={this.onChangeCategory.bind(this)}
                    >
                      {this.props.category.map((item) => {
                        return (<Picker.Item label={item.category} value={item._id} key={item._id} />)
                      })}

                    </Picker>
                  </View>
                </Item>
              </Form>
              <TouchableOpacity
                style={{
                  left: 6,
                  backgroundColor: 'grey',
                  padding: 10,
                  width: 125,
                  borderRadius: 10,
                  bottom: 20,
                  borderWidth: 1,
                  borderColor: 'lightskyblue',
                }}
                onPress={this.chooseFile.bind(this)}>
                <Text style={{ color: 'white', alignSelf: 'center' }}>
                  {' '}
                  Upload Picture{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  left: 6,
                  backgroundColor: 'crimson',
                  padding: 10,
                  width: 150,
                  alignSelf: 'center',
                  borderWidth: 2,
                  borderColor: 'pink',
                  marginTop: 40,
                  borderRadius: 7,
                  marginVertical: 10,
                }}
                onPress={() => this.foto()}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    fontSize: 16,
                  }}>
                  {' '}Add{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Content>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  viewPicker: {
    flexDirection: 'row',
    marginVertical: 15,
    marginLeft: 4,
    bottom: 10,
    width: '100%',
  },
  textMargin: { marginVertical: 5, marginLeft: 4 },
});
const mapStateToProps = state => ({
  category: state.category.data,
  user: state.user.data
});

const mapDispatchToProps = dispatch => {
  return {
    get_Category: () => dispatch(getCategory()),
    get_Myscholarship: (token) => dispatch(getMyscholarship(token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(addScholarship);
