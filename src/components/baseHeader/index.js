import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import { Header, Left, Body, Right, Icon, Title, Button } from 'native-base';

import NavigationService from '../../services/NavigationService';
import { connect } from 'react-redux';
import { logoutRequest } from '../../store/actions';

import { gradients } from '../../styles';

class BaseHeader extends Component {
  constructor(props) {
    super(props);
  }

  renderLeft() {
    const { navigation, back } = this.props;
    if (back) {
      return (
        <Left>
          <Button transparent onPress={() => navigation.goBack(null)}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
      );
    }

    return (
      <Left>
        <Button transparent onPress={() => NavigationService.openDrawer()}>
          <Icon name="menu" />
        </Button>
      </Left>
    );
  }

  renderRight() {
    const { showLogout } = this.props;
    if (showLogout) {
      return (
        <Right>
          <Button transparent onPress={() => {
            this.props.logoutRequest()
          }}>
            <Icon name="md-exit" />
          </Button>
        </Right>
      );
    }
    return <Right />;
  }

  render() {
    const { title } = this.props;
    const { colors, start, end } = gradients.blue;
    return (
      <LinearGradient colors={colors} start={start} end={end}>
        <Header iosBarStyle="light-content" style={{ backgroundColor: 'transparent' }}>
          {this.renderLeft()}

          <Body>
            <Title>{title ? title : 'ATEX'}</Title>
          </Body>

          {this.renderRight()}

        </Header>
      </LinearGradient>
    );
  }
}

export default connect(null, { logoutRequest })(BaseHeader);
