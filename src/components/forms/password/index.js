import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { Item, Input, Label, Body, Button, Text, Card, CardItem } from 'native-base';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { validateEmail, validateRequired } from '../../../utils';

import styles from '../styles';

import { connect } from 'react-redux';
import { recoverPasswordRequest } from '../../../store/actions';

class PasswordForm extends Component {
  constructor(props) {
    super(props);
  }

  send = (values) => {
    Keyboard.dismiss();
    const { recoverPasswordRequest } = this.props;
    const { email } = values;
    recoverPasswordRequest({ email });
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
          <Input {...input}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            returnKeyType="done"
            blurOnSubmit
            onSubmitEditing={() => { }} />
        </Item>
        {hasError ? <Text style={styles.fieldErrorMessage}>{error}</Text> : null}
      </View>
    );
  }

  renderError() {
    const { error } = this.props;
    if (!error || error.where !== 'password') return null;
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
              Digite o seu email abaixo para enviarmos uma nova senha.
            </Text>
            <View style={styles.fieldsContainer}>

              <Field label="Email:" name="email" component={this.renderInput}
                validate={[validateRequired, validateEmail]} />

            </View>

            <View style={styles.buttonsBar}>
              <Button disabled={pristine || submitting} onPress={reset}
                light style={[styles.button, { flex: 1 }]}>
                <Text>Limpar</Text>
              </Button>
              <Button disabled={pristine || submitting} onPress={handleSubmit(this.send)}
                primary style={[styles.button, { flex: 2, marginLeft: 15 }]}>
                <Text>Enviar</Text>
              </Button>
            </View>

            {this.renderError()}

          </Body>
        </CardItem>
      </Card>
    );
  }
}

const selector = formValueSelector('password');

const mapStateToProps = state => {
  const { error } = state.auth;
  return { error }
}

PasswordForm = connect(mapStateToProps, { recoverPasswordRequest })(PasswordForm);
PasswordForm = reduxForm({ form: 'password', touchOnBlur: false })(PasswordForm);

export default PasswordForm;
