import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {AirbnbRating} from 'react-native-ratings';
import {connect} from 'react-redux';
import {firebaseApp} from '../Components/FirebaseConfig';
import {RecipeCard} from './AppStyles';

class LocalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      clickLikeItem: false,
      searchKey: '',
    };
  }

  componentDidMount() {
    firebaseApp
      .database()
      .ref('Products')
      .on('value', (snapshot) => {
        const li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            name: child.val().name,
            description: child.val().description,
            price: child.val().price,
            imageUrl: child.val().imageUrl1,
            isLike: false,
          });
        });
        this.setState({
          data: li,
          isLoading: false,
        });
      });
  }

  filterProduct() {
    const list = this.state.data.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(this.state.searchKey.toLowerCase()) !==
        -1
      );
    });
    return list;
  }

  render() {
    return (
      <>
        <>
          {this.state.isLoading && (
            <ActivityIndicator size="large" color="#000" />
          )}
        </>
        <View style={styles.container}>
          <View style={styles.formContent}>
            <View style={styles.inputContainer}>
              <Icon name="search" style={styles.inputIcon} />
              <TextInput
                style={styles.inputs}
                placeholder="Search"
                underlineColorAndroid="transparent"
                onChangeText={(text) => this.setState({searchKey: text})}
              />
            </View>
          </View>
          {/* <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.filterProduct()}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item) => {
              return item.key;
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            renderItem={(post) => {
              const item = post.item;
              return (
                <View style={styles.card}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Detail', {
                        idProduct: item.key,
                      })
                    }>
                    <View style={styles.cardHeader}>
                      <View>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.price}>{item.price} VND</Text>
                      </View>
                    </View>
                    <Image
                      style={styles.cardImage}
                      source={{uri: item.imageUrl}}
                    />
                  </TouchableOpacity>

                  <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                      <View style={styles.socialBarSection}>
                        <TouchableOpacity
                          style={styles.socialBarButton}
                          onPress={() => this.addProductToCart()}>
                          <Image
                            style={styles.icon}
                            source={{
                              uri:
                                'https://img.icons8.com/nolan/96/3498db/add-shopping-cart.png',
                            }}
                          />
                          <Text style={[styles.socialBarLabel, styles.buyNow]}>
                            Buy Now
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.socialBarSection}>
                        <TouchableOpacity style={styles.socialBarButton}>
                          <Image
                            style={styles.icon}
                            source={{
                              uri:
                                'https://img.icons8.com/color/50/000000/hearts.png',
                            }}
                          />
                          <Text style={styles.socialBarLabel}>25</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          /> */}
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.filterProduct()}
            renderItem={({item}) => (
              <TouchableOpacity
                underlayColor="rgba(73,182,77,0.9)"
                onPress={() =>
                  this.props.navigation.navigate('Detail', {
                    idProduct: item.key,
                  })
                }>
                <View style={styles.containerCard}>
                  <Image
                    style={styles.photoCard}
                    source={{uri: item.imageUrl}}
                  />
                  <Text style={styles.titleCard}>{item.name}</Text>
                  <Text style={styles.categoryCard}>{item.price} VND</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => `${item.key}`}
          />
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(LocalScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCard: RecipeCard.container,
  photoCard: RecipeCard.photo,
  titleCard: RecipeCard.title,
  categoryCard: RecipeCard.category,
  formContent: {
    flexDirection: 'row',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: 5,
  },
  listContainer: {
    alignItems: 'center',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: 'white',
    flexBasis: '47%',
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
  buyNow: {
    color: 'purple',
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
