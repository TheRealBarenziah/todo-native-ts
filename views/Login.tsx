import React, { Component } from 'react'
import { Form, Item, Input, Button, Text, Toast, Root } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { login } from '../store/actions/auth'

interface loginFormProps {
  navigation?: object;
  login(email: string, password: string): any;
  navigate(location: string): any;
}

interface loginFormState {
}

class LoginForm extends Component<loginFormProps, loginFormState>{
  static navigationOptions = {
    title: 'Connexion',
    headerLeft: null
  };
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    const { navigate } = this.props.navigation;
    const { auth } = this.props;
    if (auth.user.isConnected) {
      navigate('MapMarker')
    }
  }


  loginUser = async () => {
    const response = await this.props.login(this.state.email, this.state.password);
    if (response.status === 'error') {
      Toast.show({
        text: 'Erreur de connexion',
        buttonText: 'Ok'
      })
    } else {
      this.props.navigation.navigate('MapMarker');
    }
  }

  render() {
    return (
      <Root>
        <Form style={styles.formContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('InscriptionForm')} style={styles.form}>
            <Text style={styles.text}>Inscrivez-vous !</Text>
          </TouchableOpacity>
          <Item style={styles.item}>
            <Input
              onChangeText={(value) => this.setState({ email: value })}
              placeholder="Adresse e-mail..." />
          </Item>
          <Item style={styles.item}>
            <Input
              secureTextEntry
              onChangeText={(value) => this.setState({ password: value })}
              placeholder="Mot de passe" />
          </Item>
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPassword')}>
              <Text style={styles.text}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              rounded success onPress={() => this.loginUser()}
            >
              <Text>SE CONNECTER</Text>
            </Button>
          </View>
        </Form>
      </Root>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingRight: 20 },
  form: { flex: 1, marginTop: 40 },
  buttonContainer: { flex: 1, justifyContent: 'flex-end', marginBottom: 40 },
  item: { flex: 0, marginLeft: 30 },
  text: { textDecorationLine: 'underline', fontSize: 12, fontStyle: 'italic', marginTop: 20 },
  button: { width: 300, justifyContent: "center" }
})

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {
  login
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
