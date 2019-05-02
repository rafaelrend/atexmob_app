import React, { Component } from 'react';
import { Dimensions, View, FlatList, StatusBar } from 'react-native';
import { LinearGradient } from 'expo';
import { Container, Content, Header, Footer, Text, ListItem, Icon, Left, Body, Right } from 'native-base';

import Image from 'react-native-scalable-image';

const { width, height } = Dimensions.get('window');
const sidebarWidth = width * 0.8;
const logo = require('../../../assets/imgs/logo.png');

import { gradients } from '../../styles';
import styles from './styles';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { colors, start, end } = gradients.blue;
    return (
      <Container>
        <LinearGradient colors={colors} start={start} end={end}>
          <Header iosBarStyle="light-content"
            style={[styles.drawerHeader, styles.shadow]}>
            <View style={{ paddingVertical: 5, marginTop: 5 }}>
              <Text style={styles.textHeader}>Tatti Vitorino</Text>
              <Text style={styles.textHeader}>tatti@tattivitorino.com</Text>
            </View>
          </Header>
        </LinearGradient>

        <Content contentContainerStyle={[styles.drawerContent]}></Content>

        <LinearGradient colors={colors} start={start} end={end}>
          <Footer style={[styles.drawerFooter]}>
            <Text style={styles.textFooter}>2019@Martucci Melillo</Text>
          </Footer>
        </LinearGradient>

      </Container>
    );
  }
}

export default Sidebar;