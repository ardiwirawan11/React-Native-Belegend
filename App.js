import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'native-base';
import loginScreen from './src/components/loginScreen';
import homeScreen from './src/components/homeScreen';
import registerScreen from './src/components/registerScreen';
import fuserScreen from './src/components/fuserScreen';
import detailScreen from './src/components/detailScreen';
import checkLogin from './src/components/checkLogin'
import bioathleteScreen from './src/components/bioathleteScreen'
import achieveScreen from './src/components/achieveScreen'
import bioinvestorScreen from './src/components/bioinvestorScreen'
import addScholarship from './src/components/addScholarship';
import appliedScreen from './src/components/appliedScreen';
import acceptedScreen from './src/components/acceptedScreen';
import profileAthleteScreen from './src/components/profileAthleteScreen';
import editbioathleteScreen from './src/components/editbioathleteScreen';
import faqScreen from './src/components/faqScreen';
import editbioinvestorScreen from './src/components/editbioinvestorScreen';


export default class App extends React.Component {
  static navigationOptions = {
    header: null
  }


  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const LoginStack = createStackNavigator({
  Login: loginScreen,
  Register: registerScreen,
  Foto: fuserScreen,
},
  {
    initialRouteName: 'Login'
  })

const HomeStack = createStackNavigator({
  Home: homeScreen,
  Detail: detailScreen,
  Add: addScholarship,
  Applied: appliedScreen,
  Accepted: acceptedScreen,
  Profilee: profileAthleteScreen
},
  {
    initialRouteName: 'Home'
  }
);

const BioStack = createStackNavigator({
  BioAthlete: bioathleteScreen,
  BioInvest: bioinvestorScreen
})
const BottomNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={30} style={{
            color: tintColor
          }}
          />
        )
      },
    },
    Help: {
      screen: faqScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon type="MaterialCommunityIcons" name="help-circle-outline" size={30} style={{ color: tintColor }}
          />
        )
      },
    },
    Profile: {
      screen: checkLogin,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="person" size={30} style={{ color: tintColor }}
          />
        )
      },
    },
  },
  {
    initialRouteKey: 'Home',
    headerMode: 'none',
    tabBarOptions: {
      activeTintColor: 'crimson',
      inactiveTintColor: '#333333',
      activeBackgroundColor: '#FFF',
      inactiveBackgroundColor: '#FFF'
    }
  }
)

const SwitchNavigator = createSwitchNavigator({
  Home: BottomNavigation,
  Login: LoginStack,
  Bio: BioStack,
  EditBioAthlete: editbioathleteScreen,
  EditBioInvestor: editbioinvestorScreen,
  Achieve: achieveScreen
},
  {
    initialRouteName: 'Home'
  })

const AppContainer = createAppContainer(SwitchNavigator);

