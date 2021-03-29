import database from '@react-native-firebase/database';
import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {connect} from 'react-redux';
import {firebaseApp} from '../Components/FirebaseConfig';
import * as helper from '../database/database-helper';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      productDescription: '',
      productPrice: '',
      productImage1: '',
      productImage2: '',
      productImage3: '',
      productCreateAt: '',
      productCategory: '',
      productStatus: '',
      idUser: '',
      location: '',
      userName: '',
      userAvatar: '',
      idProduct: '',
      comment: '',
      listComment: [],
      isLike: false,
      valueLike: 0,
      selectedImage: '',
      listImage: '',
    };
  }

  postComment() {
    if (this.state.comment != null) {
      firebaseApp.database().ref('Comments').push({
        idProduct: this.state.idProduct,
        idUser: this.props.userId,
        nameUser: this.props.userName,
        content: this.state.comment,
        createAt: new Date().toISOString(),
        avatarUser: this.props.userPhoto,
      });
      this.setState({comment: null});
    }
  }
  componentDidMount() {
    const idProduct = this.props.navigation.getParam('idProduct');
    this.setState({idProduct: idProduct});
    //read info product
    firebaseApp
      .database()
      .ref(`Products/${idProduct}`)
      .once('value', (snapshot) => {
        this.state.productName = snapshot.child('name').val();
        this.state.productDescription = snapshot.child('description').val();
        this.state.productPrice = snapshot.child('price').val();
        this.state.productImage1 = snapshot.child('imageUrl1').val();
        this.state.productImage2 = snapshot.child('imageUrl2').val();
        this.state.productImage3 = snapshot.child('imageUrl3').val();
        this.state.productCreateAt = snapshot.child('createAt').val();
        this.state.productCategory = snapshot.child('description').val();
        this.state.idUser = snapshot.child('idUser').val();
        this.state.userName = snapshot.child('userName').val();
        this.state.location = snapshot.child('location').val();
        this.state.productStatus = snapshot.child('status').val();
        this.state.productCategory = snapshot.child('category').val();
        this.state.userAvatar = snapshot.child('userAvatar').val();
      });

    this._checkLikeState(idProduct, this.props.userId);
    const temp = [];
    temp.push(this.state.productImage1);
    temp.push(this.state.productImage2);
    temp.push(this.state.productImage3);

    this.setState({listImage: temp});
    //load comment
    firebaseApp
      .database()
      .ref('Comments/')
      .orderByChild('idProduct')
      .equalTo(idProduct)
      .on('value', (snapshot) => {
        const temp = [];
        snapshot.forEach((child) => {
          temp.push({
            key: child.key,
            idProduct: child.val().idProduct,
            idUser: child.val().idUser,
            nameUser: child.val().nameUser,
            content: child.val().content,
            createAt: child.val().createAt,
            avatarUser: child.val().avatarUser,
          });
          this.setState({listComment: temp});
        });
      });
  }

  _checkLikeState = (idProduct, userId) => {
    const key = idProduct + '_' + userId;
    database()
      .ref(`Likes/`)
      .orderByChild('idProduct_uid')
      .equalTo(key)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          snapshot.forEach((item) => {
            this.setState({isLike: item.val().isLiked});
          });
        }
      });
  };

  _toggleLikeState = (idProduct, userId) => {
    const key = idProduct + '_' + userId;
    database()
      .ref('Likes')
      .orderByChild('idProduct_uid')
      .equalTo(key)
      .once('value', (snapshot) => {
        if (snapshot.val()) {
          snapshot.forEach((item) => {
            //update isLiked state on realtime database
            database()
              .ref(`Likes/${item.key}/isLiked`)
              .transaction((state) => !state);
          });
        } else {
          database().ref('Likes').push().set({
            idProduct_uid: key,
            idProduct: idProduct,
            uid: userId,
            productName: this.state.productName,
            productDescription: this.state.productDescription,
            productPrice: this.state.productPrice,
            productImage1: this.state.productImage1,
            isLiked: true,
          });
        }
      });
  };

  __setImageSelected = (image) => {
    this.setState({selectedImage: image});
  };

  __renderImages = () => {
    return (
      <View style={styles.smallImagesContainer}>
        {this.state.listImage.map((prop, key) => {
          return (
            <TouchableOpacity
              key={key}
              onPress={() => {
                this.__setImageSelected(prop);
              }}>
              <Image style={styles.smallImage} source={{uri: prop}} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  sendMessage = async () => {
    const myId = this.props.userId;
    const shopId = this.state.idUser;
    const idProduct = this.state.idProduct;
    const chatRoomId = await helper.lookUpChatRoomWithUserIds(myId, shopId);
    this.props.navigation.navigate('ChatRoom', {
      uid: shopId,
      chatRoomId: chatRoomId,
      idProduct: idProduct,
      title: this.state.userName,
    });
  };

  render() {
    // console.log('iumages', this.state.listImage);
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <ScrollView>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text>
                <Text style={styles.name}>{this.state.productName} - </Text>
                <Text style={styles.namePrice}>
                  {this.state.productPrice} VND
                </Text>
              </Text>

              {this.state.idUser !== this.props.userId ? (
                <TouchableOpacity
                  onPress={() =>
                    this._toggleLikeState(
                      this.state.idProduct,
                      this.props.userId,
                    )
                  }>
                  {this.state.isLike ? (
                    <Image
                      style={styles.icon}
                      source={require('../assets/icons/heart(1).png')}
                    />
                  ) : (
                    <Image
                      style={styles.icon}
                      source={require('../assets/icons/icons8-heart.png')}
                    />
                  )}
                </TouchableOpacity>
              ) : null}
            </View>

            <SliderBox
              images={this.state.listImage}
              sliderBoxHeight={300}
              onCurrentImagePressed={(index) =>
                console.warn(`image ${index} pressed`)
              }
              resizeMode="contain"
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              paginationBoxVerticalPadding={20}
              autoplay
              circleLoop
            />
          </View>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              this.props.navigation.navigate('UserProfile', {
                userName: this.state.userName,
                userAvatar: this.state.userAvatar,
                userId: this.state.idUser,
              })
            }>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{uri: this.state.userAvatar}}
                style={styles.image}
              />
              <Text style={styles.username}>{this.state.userName}</Text>
            </View>
          </TouchableOpacity>
          {/* <View style={styles.footer}>
            <Text>Nhắn tin</Text>

            <TouchableOpacity
              style={styles.btnSend}
              onPress={() => this.sendMessage()}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/small/75/ffffff/filled-sent.png',
                }}
                style={styles.iconSend}
              />
            </TouchableOpacity>
          </View> */}
          <View style={styles.card}>
            <View style={styles.cardHeader2}>
              <Text style={styles.cardTitle}>
                Danh mục: {this.state.productCategory}{' '}
              </Text>
              <Text style={styles.cardTitle}>
                Tình trạng: {this.state.productStatus}{' '}
              </Text>
              <Text style={styles.cardTitle}>
                Vị trí: {this.state.location}{' '}
              </Text>
              <Text style={styles.cardTitle}>Mô tả: </Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.description}>
                {this.state.productDescription}
              </Text>
            </View>
          </View>

          <View style={styles.addToCarContainer}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => this.sendMessage()}>
              <Text style={styles.shareButtonText}>Nhắn tin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => this.sendMessage()}>
              <Text style={styles.shareButtonText}>Mua hàng</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <View style={styles.inputContainercmt}>
              <TextInput
                style={styles.inputscmt}
                placeholder="Bình luận..."
                underlineColorAndroid="transparent"
                value={this.state.comment}
                onChangeText={(text) => this.setState({comment: text})}
              />
            </View>

            <TouchableOpacity
              style={styles.btnSend}
              onPress={() => this.postComment()}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/small/75/ffffff/filled-sent.png',
                }}
                style={styles.iconSend}
              />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              style={styles.root}
              data={this.state.listComment}
              extraData={this.state}
              ItemSeparatorComponent={() => {
                return <View style={styles.separatorcmt} />;
              }}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              renderItem={({item}) => {
                return (
                  <View style={styles.containerItem}>
                    <TouchableOpacity onPress={() => {}}>
                      <Image
                        style={styles.image}
                        source={{uri: item.avatarUser}}
                      />
                    </TouchableOpacity>
                    <View style={styles.contentCmt}>
                      <View style={styles.contentHeadercmt}>
                        <Text style={styles.nameusercmt}>{item.nameUser}</Text>
                        <Text style={styles.timecmt}>{item.createAt}</Text>
                      </View>
                      <Text rkType="primary3 mediumLine">{item.content}</Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(ProductDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  shareButton: {
    marginBottom: 10,
    height: 45,
    width: 150,
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  addToCarContainer: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnSend: {
    backgroundColor: '#00BFFF',
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputContainercmt: {
    borderColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputscmt: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  content: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
  },
  mainImage: {
    width: 200,
    height: 200,
  },
  smallImagesContainer: {
    flexDirection: 'column',
    marginLeft: 30,
  },
  smallImage: {
    width: 60,
    height: 60,
    marginTop: 5,
  },
  btnColor: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginHorizontal: 3,
  },
  contentColors: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 20,
    color: '#696969',
    fontWeight: 'bold',
  },
  namePrice: {
    fontSize: 20,
    color: '#696969',
    fontWeight: 'bold',
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    color: '#696969',
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },

  /******** card **************/
  card: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardHeader2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardTitle: {
    color: '#00BFFF',
  },
  image: {
    marginTop: 10,
    marginLeft: 20,
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  username: {
    marginTop: 20,
    marginLeft: 20,
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  root: {
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  containerItem: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contentCmt: {
    marginLeft: 10,
    flex: 1,
  },
  contentHeadercmt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    marginTop: 5,
  },
  separatorcmt: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  imagecmt: {
    width: 45,
    height: 45,
    borderRadius: 20,
  },
  timecmt: {
    fontSize: 11,
    color: '#808080',
  },
  nameusercmt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2f2',
//   },
//   card: {
//     height: 100,
//     backgroundColor: '#ffffff',
//     marginTop: 10,
//   },
//   image: {
//     marginTop: 10,
//     marginLeft: 20,
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//   },
//   title: {
//     marginTop: 20,
//     marginLeft: 20,
//     color: '#000000',
//     fontWeight: 'bold',
//     fontSize: 15,
//   },
//   price: {
//     marginLeft: 20,
//     color: '#000000',
//   },
//   containerCmt: {
//     backgroundColor: '#FFF',
//     paddingTop: 20,

//   },
//   containerInput: {
//     backgroundColor: '#FFF',
//     flexDirection: 'row',
//     borderTopWidth: 1,
//     borderColor: '#EEE',
//     alignItems: 'center',
//     paddingLeft: 15,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     fontSize: 15,
//   },
//   button: {
//     height: 40,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inactive: {
//     color: '#CCC',
//   },
//   text: {
//     color: '#3F51B5',
//     fontWeight: 'bold',
//     fontFamily: 'Avenir',
//     textAlign: 'center',
//   },
//   cmtBox: {
//     flexDirection: 'row',
//   },
//   avatarContainer: {
//     alignItems: 'center',
//     marginLeft: 5,
//     paddingTop: 10,
//     width: 40,
//   },
//   contentContainer: {
//     flex: 1,
//     borderBottomWidth: 1,
//     borderColor: '#EEE',
//     padding: 5,
//     flexDirection: 'column'
//   },
//   avatar: {
//     borderWidth: 1,
//     borderColor: '#EEE',
//     borderRadius: 15,
//     width: 30,
//     height: 30,
//   },
//   text: {
//     color: '#000',
//     fontFamily: 'Avenir',
//     fontSize: 14,
//   },
//   name: {
//     fontWeight: 'bold',
//   },
//   created: {
//     color: '#BBB',

//   },
// });
