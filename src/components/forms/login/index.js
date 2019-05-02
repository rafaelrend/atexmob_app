import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { Item, Input, Label, Body, Button, Text, Card, CardItem, Icon } from 'native-base';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { validateEmail, validateRequired } from '../../../utils';

import styles from '../styles';

import { connect } from 'react-redux';
import { loginRequest } from '../../../store/actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.inputs = {};
  }

  login = () => {
    Keyboard.dismiss();
    const { email, password, loginRequest } = this.props;
    loginRequest({ email, password });
  }

  focusNext = (field) => {
    this.inputs[field]._root.focus()
  }

  getInput = (input) => {
    switch (input.name) {
      case 'email':
        return (
          <Input {...input}
            ref={input => this.inputs['email'] = input}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.focusNext('senha');
            }} />
        )

      case 'password':
        return (
          <Input {...input}
            ref={input => this.inputs['senha'] = input}
            keyboardType="default"
            textContentType="none"
            returnKeyType="done"
            secureTextEntry
            blurOnSubmit={true}
            onSubmitEditing={() => {
              this.login()
            }} />
        )

      default:
        return <Input {...input} />
    }
  }

  renderInput = ({ input, label, type, meta: { touched, error } }) => {
    let hasError = false;
    if (touched && error !== undefined) {
      hasError = true;
    }
    return (
      <View style={[styles.field]}>
        <Item underline stackedLabel error={hasError}>
          <Label>{label}</Label>
          {this.getInput(input)}
        </Item>
        {hasError ? <Text style={styles.fieldErrorMessage}>{error}</Text> : null}
      </View>
    );
  }

  renderError() {
    const { error } = this.props;
    if (!error || error.where !== 'login') return null;
    return (
      <View style={styles.errorMessageContainer}>
        <Text style={styles.errorMessage}>{error.message}</Text>
      </View>
    );
  }

  render() {
    const { handleSubmit, reset, pristine, submitting } = this.props;
    return (
      <Card style={styles.card}>
        <CardItem>
          <Body>

            <Text>
              Se você já é cadastrado use o formulário abaixo para entrar.
            </Text>

            <View style={styles.fieldsContainer}>

              <Field label="Email:" name="email"
                component={this.renderInput} validate={[validateRequired, validateEmail]} />

              <Field label="Senha:" name="password"
                component={this.renderInput} validate={validateRequired} />

            </View>

            <View style={styles.buttonsBar}>
              <Button disabled={pristine || submitting} onPress={reset}
                light style={[styles.button, { flex: 1 }]}>
                <Text>Limpar</Text>
              </Button>
              <Button disabled={pristine || submitting} onPress={handleSubmit(this.login)}
                primary style={[styles.button, { flex: 2, marginLeft: 15 }]}>
                <Text>Entrar</Text>
              </Button>
            </View>

            {this.renderError()}

          </Body>
        </CardItem>
      </Card>
    );
  }
}

const selector = formValueSelector('login');
const mapStateToProps = state => {
  const { error } = state.auth;
  const { email, password } = selector(state, 'email', 'password');
  return { error, email, password }
}

LoginForm = connect(mapStateToProps, { loginRequest })(LoginForm);
LoginForm = reduxForm({ form: 'login' })(LoginForm);

export default LoginForm;
