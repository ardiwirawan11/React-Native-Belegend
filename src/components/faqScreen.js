import React, { Component } from 'react'
import { Text, View, Linking } from 'react-native';
import { Container, Content, Accordion } from 'native-base';

class faqScreen extends Component {
    state = {
        dataArray: [
            {
                title: '1. What is Be Legend?',
                content:
                    'Be Legend is a CSR application that connects investors (who want to donate funds) with athletes (who need to find scholarships).\n' +
                    'Benefits of this application: Make it easy for investors to provide information about scholarships without using brochures or billboards on the roadside, wall magazines, or information boards.\n' +
                    'Make it easy for athletes to find scholarships. In the home screen there is a list of scholarships that have been uploaded by investors. '
            },
            {
                title: '2. How to use this app?',
                content:
                    'First you must have an account to be able to use this application. Please register by selecting the   profile menu (which is below) then press the registration button.\n' +
                    'There are 2 roles for users: athlete and investor, if you are an athlete, please choose an athlete, if you are an investor, please choose an investor.\n' +
                    'For athlete, you can fill out profile, edit profile, and apply for available scholarships.\n' +
                    'For investor, you can fill out profile, edit a profile, upload a scholarship, view the profile of athletes who apply for scholarship, accept and reject athletes who apply for scholarship, and delete scholarships that have been uploaded. '

            },
            {
                title: '3. What to do after apply the scholarship?',
                content:
                    'After you apply the scholarship, you need to waiting investor decision, if investor accept your apply, you will contacted by investor, you also can check your apply status in home at myapply'

            },
            {
                title: '4. Contact Us!',
                content: 'You can email us if yau have question ,problem, or any suggestion to \n master.magic1111@gmail.com'
            },
            {
                title: '5. Visit our website!',
                content:
                    <Text>Come and visit our website in <Text style={{ color: 'blue' }}
                        onPress={() => Linking.openURL('https://belegend-staging.herokuapp.com')}>
                        https://belegend-staging.herokuapp.com
                        </Text>
                    </Text>
            }
        ]
    };
    render() {
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
                  {' '}Help{' '}
                </Text>
              </View>
                <Content>
                    <Accordion dataArray={this.state.dataArray} />
                </Content>
            </Container>
        )
    }
}

export default (faqScreen)