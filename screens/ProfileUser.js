import {firebaseApp} from '../Components/FirebaseConfig';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

export default class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameProfile: '',
      userAvatarProfile: '',
      userIdProfile: '',
      listProduct: {},
      countProduct: 0,
      selectScreen: '',
    };
  }

  componentDidMount() {
    const userNameProfile = this.props.navigation.getParam('userName');
    const userAvatarProfile = this.props.navigation.getParam('userAvatar');
    const userIdProfile = this.props.navigation.getParam('userId');
    this.setState({
      userNameProfile: userNameProfile,
      userAvatarProfile: userAvatarProfile,
      userIdProfile: userIdProfile,
    });

    firebaseApp
      .database()
      .ref('Products/')
      .orderByChild('idUser')
      .equalTo(userIdProfile)
      .on('value', (snapshot) => {
        const li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            productName: child.val().name,
            productDescription: child.val().description,
            productPrice: child.val().price,
            productImage: child.val().imageUrl1,
            productCategory: child.val().category,
            location: child.val().location,
            createAt: child.val().createAt,
          });
        });
        this.setState({
          listProduct: li,
          countProduct: li.count,
        });
      });
  }


  render() {
    return (
      <View style={{backgroundColor: '#ffffff'}}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{uri: this.state.userAvatarProfile}}
            />
            <Text style={styles.name}>{this.state.userNameProfile}</Text>
            <TouchableOpacity
              style={styles.followButton}
              onPress={() => this._unfollow(item.key)}>
              <Text style={styles.followButtonText}>Unfollow</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.listProduct}
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
                      <Text style={styles.title}>{item.productName}</Text>
                      <Text style={styles.price}>{item.productPrice} VND</Text>
                    </View>
                  </View>
                  <Image
                    style={styles.cardImage}
                    source={{uri: item.productImage}}
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
  },
  headerContent: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 20,
    marginBottom: 10,
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  followButtonText: {
    color: '#ffffff',
  },
  name: {
    fontSize: 15,
    color: '#000000',
    marginLeft: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 130,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  detailContent: {
    margin: 10,
    alignItems: 'center',
  },

  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    marginTop: 40,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: '#696969',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00CED1',
  },
  description: {
    fontSize: 20,
    color: '#00CED1',
    marginTop: 10,
    textAlign: 'center',
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
