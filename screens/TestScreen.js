import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';


const {width, height} = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 3;
// item size
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGIN = RECIPE_ITEM_OFFSET * 2;

export default class TestScreen extends React.Component {
  // static navigationOptions = ({navigation}) => {
  //   return {
  //     title: navigation.getParam('name'),
  //   };
  // };

  // constructor(props) {
  //   super(props);
  // }

  // onPressRecipe = (item) => {
  //   this.props.navigation.navigate('Recipe', {item});
  // };

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          image: 'https://img.icons8.com/color/70/000000/cottage.png',
          title: 'Order',
        },
        {
          id: 2,
          image:
            'https://img.icons8.com/color/70/000000/administrator-male.png',
          title: 'Like',
        },
        {
          id: 3,
          image: 'https://img.icons8.com/color/70/000000/filled-like.png',
          title: 'Comment',
        },
        {
          id: 4,
          image: 'https://img.icons8.com/color/70/000000/facebook-like.png',
          title: 'Download',
        },
        {
          id: 5,
          image: 'https://img.icons8.com/color/70/000000/shutdown.png',
          title: 'Edit',
        },
      ],
    };
  }

 

  render() {
  
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={this.state.data}
          renderItem={({item}) => (
            <TouchableHighlight underlayColor="rgba(73,182,77,0.9)">
              <View style={styles.container}>
                <Image style={styles.photo} source={{uri: item.image}} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={{color: 'grey'}}>{item.title}</Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: RECIPE_ITEM_OFFSET,
    marginTop: 30,
    width:
      (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT + 60,
  },
  title: {
    margin: 10,
    marginBottom: 5,
    color: 'black',
    fontSize: 13,
    textAlign: 'center',
  },
  photo: {
    width:
      (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 60,
  },
});
