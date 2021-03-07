import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class LikeScreen extends React.Component {
  data = [
    {
      id: 1,
      label: 'Label 01',
      price: '12$',
    },
    {
      id: 2,
      label: 'Label 02',
      price: '12$',
    },
    {
      id: 3,
      label: 'Label 03',
      price: '12$',
    },
    {
      id: 4,
      label: 'Label 04',
      price: '12$',
    },
    {
      id: 5,
      label: 'Label 05',
      price: '12$',
    },
    {
      id: 6,
      label: 'Label 06',
      price: '12$',
    },
    {
      id: 7,
      label: 'Label 07',
      price: '12$',
    },
    {
      id: 8,
      label: 'Label 08',
      price: '12$',
    },
  ];
  _keyExtractor = (item, index) => item.id;

  //   renderItem = ({ item }) => {
  //     return <CardItem id={item.id} nameItem={item.label} />;
  //   };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.data}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => this.props.navigation.navigate('Detail')}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Image
                    source={require('../assets/icons/iphonex.jpg')}
                    style={styles.image}
                  />
                  <View style={{marginTop: 20}}>
                    <Text style={styles.title}>{item.label}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6e6e6',
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    margin: 10,
  },
  title: {
    marginLeft: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  price: {
    marginLeft: 20,
    color: '#000000',
  },
});
