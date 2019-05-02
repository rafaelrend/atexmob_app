import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Button, Text, Card, CardItem, Body, Right, Left, Icon, List, ListItem, Badge } from 'native-base';
import { dateFormat } from '../../utils';
import { connect } from 'react-redux';
import { getDashboardNotifications } from '../../store/selectors';
import styles from './styles';

class NotificationsCard extends Component {
  constructor(props) {
    super(props);
  }

  renderItems() {
    const { list } = this.props;
    return list.map(item => {
      const date = dateFormat(item.date_insert, 'fromNow');
      return (
        <ListItem key={item.id}>
          <Body>
            <Text medium>{date}</Text>
            <Text>{item.mensagem}</Text>
          </Body>
          <Right>
            <Button transparent dark>
              <Icon name="notifications" />
            </Button>
          </Right>
        </ListItem>
      )
    })
  }

  renderNotifications() {
    const { list, fetching } = this.props;
    if (fetching) {
      return (
        <ActivityIndicator />
      );
    }
    if (list.length === 0) {
      return (
        <Text>Você não tem novas notificações</Text>
      );
    }
    return (
      <List>
        {this.renderItems()}
      </List>
    );
  }

  renderBadge() {
    const { badgeCount } = this.props;
    if (badgeCount === null || badgeCount === 0) return null;
    return (
      <Badge danger>
        <Text>{badgeCount}</Text>
      </Badge>
    );
  }

  render() {
    const { navigation, type, headerTitle, footerTitle } = this.props;
    return (
      <Card>
        <CardItem header style={{ justifyContent: 'space-between' }}>
          <Text secondary style={[styles.cardHeaderTitle]}>{headerTitle}</Text>
          {this.renderBadge()}
        </CardItem>

        <View style={{ paddingRight: 10 }}>
          {this.renderNotifications()}
        </View>

        <CardItem footer style={{ justifyContent: 'flex-end' }}>
          <Button transparent secondary>
            <Text style={styles.cardFooterTitle}>{footerTitle}</Text>
          </Button>
        </CardItem>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { fetching, error, badgeCount } = state.notifications;
  const list = getDashboardNotifications(state);
  return { fetching, error, list, badgeCount };
}

export default connect(mapStateToProps)(NotificationsCard);
