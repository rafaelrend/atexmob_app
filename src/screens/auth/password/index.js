import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content } from 'native-base';

import { connect } from 'react-redux';

import BaseHeader from '../../../components/baseHeader';

import PasswordForm from '../../../components/forms/password';
import Loader from '../../../components/common/loader';

import styles from '../styles';

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLoader() {
    const { sending } = this.props;
    if (sending) return (
      <Loader
        visible={sending}
        textContent={'Enviando...'} />
    );
    return null;
  }

  render() {
    return (
      <Container>
        <BaseHeader back navigation={this.props.navigation} title="Recuperar Senha" />
        {this.renderLoader()}
        <Content padder>
          <View style={{ marginVertical: 20 }}>
            <PasswordForm />
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { sending } = state.auth;
  return { sending };
}

export default connect(mapStateToProps)(Password);