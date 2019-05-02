import React, { Component } from 'react';
import { Container, Content, Button, Text } from 'native-base';
import BaseHeader from '../../../components/baseHeader';

class Mais extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Container>
            <BaseHeader showLogout navigation={this.props.navigation} title="Mais" />
            <Content padder>
            </Content>
        </Container>
    );
  }
}

export default Mais;
