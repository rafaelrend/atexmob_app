import React, { Component } from 'react';
import { Container, Content, Spinner } from 'native-base';
import material from '../../../native-base-theme/variables/material';

import { connect } from 'react-redux';
import { userStateRequest } from '../../store/actions';

class AuthLoading extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.userStateRequest();
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner color={material.brandAtex} />
        </Content>
      </Container>
    );
  }
}

export default connect(null, {
  userStateRequest
})(AuthLoading);

