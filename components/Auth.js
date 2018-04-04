import React from 'react';
import {
  View,
  Button,
  Text,
  TextInput,
} from 'react-native';

class Auth extends React.Component {
  state = { email: '', password: '', passwordConfirmation: '', error: '' }

  handleSubmit = () => {
    //TODO handle auth
    this.setState({ email: '', password: '', passwordConfirmation: '' })
  }

  canSubmit = () => {
    const { email, password, passwordConfirmation } = this.state;
    let submit = false;
    let error;
    if (email && password)
      submit = true
    if (this.props.type === 'Register') {
      if (!passwordConfirmation) {
        submit = false
      } else if ((passwordConfirmation && password) && passwordConfirmation !== password) {
        error = 'Passwords Must Match'
        submit = false
        if (!this.state.error)
          this.setState({ error })
      } else {
        if (this.state.error)
          this.setState({ error: '' })
        submit = true
      }
    }

    return submit
  }

  render() {
    const { email, password, passwordConfirmation, error } = this.state;
    return (
      <View>
        { error !== '' && <Text style={styles.error}>{error}</Text> }
        <Text>{ this.props.type }</Text>
        <TextInput
          placeholder="Email"
          autofocus
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          keyboardType="email-address"
          onChangeText={(email) => this.setState({ email }) }
        />
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password }) }
        />
        { this.props.type === 'Register' &&
          <TextInput
            placeholder="Password Confirmation"
            autoCapitalize="none"
            autoCorrect={false}
            value={passwordConfirmation}
            secureTextEntry={true}
            onChangeText={(passwordConfirmation) => this.setState({ passwordConfirmation }) }
          />
        }
        { this.canSubmit() &&
            <Button
              onPress={this.handleSubmit}
              title={this.props.type}
              color="green"
            />
        }
      </View>
    )
  }
}

const styles = {
  error: { color: 'red' }
}

export default Auth;
