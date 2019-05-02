import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

import { connect } from 'react-redux';

import Image from 'react-native-scalable-image';

const { width } = Dimensions.get('window');
const logoImg = require('../../../../assets/imgs/logo.png');

import styles from '../styles';

import LoginForm from '../../../components/forms/login';
import Loader from '../../../components/common/loader';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  navigateTo(page) {
    this.props.navigation.navigate(page);
  }

  renderLoader() {
    const { sending } = this.props;
    if (sending) return (
      <Loader
        visible={sending}
        textContent={'Verificando as suas credenciais...'} />
    );
    return null;
  }

  render() {
    return (
      <Container>

        {this.renderLoader()}

        <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', paddingTop: 30 }}>
            <Image width={width * 0.8} source={logoImg} />
          </View>

          <View style={{ marginVertical: 20 }}>
            <LoginForm />
          </View>

          <View style={[styles.buttonsContainer]}>
            <Button primary transparent style={styles.button}
              onPress={() => { this.navigateTo('Password') }}>
              <Text>Recuperar Senha</Text>
            </Button>
            <Button primary transparent style={styles.button}
              onPress={() => { this.navigateTo('Terms') }}>
              <Text>Termos e Condições</Text>
            </Button>
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

export default connect(mapStateToProps, null)(Login);
