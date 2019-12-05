import React, { Component } from 'react'
import { View } from 'react-native'
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import { getUser } from '../redux/action/userAction'
import AsyncStorage from '@react-native-community/async-storage'
import ProfileAthleteScreen from './profileAthleteScreen'
import ProfileCompanyScreen from './profileCompanyScreen'

class checkLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: '',
            loading: true
        }
    }

    deleteToken = () => {
        this.setState({ token: null })
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('@token');
        this.setState({ token: token })
        this.setState({ loading: false })
        this.props.get_User(token)
    }

    render() {
        if (this.state.loading === true) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner></Spinner>
                </View>
            )
        } else {
            if (this.state.token) {
                if (this.props.luser.loading === true) {
                    return (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Spinner></Spinner>
                        </View>
                    )
                } else if (this.props.luser.loading === false)
                    if (this.props.user.role === 'athlete') {
                        return (
                            <ProfileAthleteScreen
                                deleteToken={this.deleteToken}
                            />
                        )
                    }
                    else if (this.props.user.role === 'investor') {
                        return (
                            <ProfileCompanyScreen deleteToken={this.deleteToken}
                            />
                        )
                    }
                    else {
                        return (
                                this.props.navigation.navigate('Login')
                        )
                    }
            } else {
                return (
                        this.props.navigation.navigate('Login')
                )
            }
        }

    }
}
const mapStateToProps = state => ({
    user: state.user.data,
    luser: state.user
});
const mapDispatchToProps = dispatch => {
    return {
        get_User: token => dispatch(getUser(token))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(checkLogin);