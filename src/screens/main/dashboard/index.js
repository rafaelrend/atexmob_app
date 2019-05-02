import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Content, Button, Text, Card, CardItem, Body, Right, Left, Icon, List, ListItem } from 'native-base';
import BaseHeader from '../../../components/baseHeader';
import NotificationsCard from '../../../components/notificationsCard';

import { connect } from 'react-redux';
import { fetchNotificationsRequest } from '../../../store/actions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { fetchNotificationsRequest } = this.props;
    fetchNotificationsRequest();
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <BaseHeader showLogout navigation={navigation} title="Dashboard" />
        <Content contentContainerStyle={{ paddingVertical: 15 }}>

          <NotificationsCard
            navigation={navigation}
            type="notifications"
            headerTitle="Notificações"
            footerTitle="Ver Notificações" />

          <Card>
            <CardItem header>
              <Text secondary style={styles.cardHeaderTitle}>Próximos Atendimentos</Text>
            </CardItem>

            <View style={{ paddingRight: 10 }}>
              <List>
                <ListItem>
                  <Body>
                    <Text>25/04/2019 15:30</Text>
                    <Text medium>Rua Diana, 989, Cjto 23, Perdizes, São Paulo, SP</Text>
                    <Text medium>John Doe</Text>
                  </Body>
                  <Right style={{ flexDirection: 'row', }}>
                    <Button transparent secondary>
                      <Icon name="person" />
                    </Button>
                    <Button transparent secondary>
                      <Icon name="pin" />
                    </Button>
                  </Right>
                </ListItem>
              </List>
            </View>

            <CardItem footer style={{ justifyContent: 'flex-end' }}>
              <Button transparent secondary>
                <Text style={styles.cardFooterTitle}>Ver Atendimentos</Text>
              </Button>
            </CardItem>
          </Card>

        </Content>
      </Container >
    );
  }
}

const styles = StyleSheet.create({
  cardHeaderTitle: {
    fontSize: 18,
    fontFamily: 'Roboto_medium',
  },
  cardFooterTitle: {
    fontSize: 16,
    fontFamily: 'Roboto_medium',
  },
  border: {
    borderWidth: 1,
    borderColor: '#000',
  }
});

export default connect(null, {
  fetchNotificationsRequest
})(Dashboard);


