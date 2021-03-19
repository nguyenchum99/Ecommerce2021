import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard, TextInput, FlatList
} from 'react-native';
import ButtonBuyItem from '../Components/ButtonBuyItem';
import ButtonChat from '../Components/ButtonChat';
import Comments from '../Components/Comments';
import { firebaseApp } from '../Components/FirebaseConfig';
import { connect } from 'react-redux';
class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      productDescription: '',
      productPrice: '',
      productImage1: '',
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
      // key:''
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
        avatarUser: this.props.userPhoto
      });
      this.setState({ comment: null })

    }

  }
  componentDidMount() {
    const idProduct = this.props.navigation.getParam('idProduct');
    // console.log(idProduct);
    this.setState({ idProduct: idProduct });
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
          this.setState({ listComment: temp });
        });
        // this.setState({listComment: temp});
        // console.log('comment' + this.state.listComment)  
      });



  }

  // __setImageSelected = (image) => {
  //   this.setState({ selectedImage: image });
  // }

  // __renderImages = () => {
  //   return (
  //     <View style={styles.smallImagesContainer}>
  //       <TouchableOpacity key={key} onPress={() => { this.__setImageSelected(prop) }}>
  //         <Image style={styles.smallImage} source={{ uri: prop }} />
  //       </TouchableOpacity>
  //       {this.state.product.images.map((prop, key) => {
  //         return (
  //           <TouchableOpacity key={key} onPress={() => { this.__setImageSelected(prop) }}>
  //             <Image style={styles.smallImage} source={{ uri: prop }} />
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   )
  // }

  clickLikeProduct() {
    console.log(" firesr" + this.state.isLike)
    this.setState({ isLike: !this.state.isLike });
    console.log(this.state.isLike)
    if (this.state.isLike) {
      firebaseApp.database().ref('Likes').push({
        name: this.state.productName,
        description: this.state.productDescription,
        price: this.state.productPrice,
        imageUrl1: this.state.productImage1,
        createAt: this.state.productCreateAt,
        location: this.state.location,
        idUserCreate: this.state.idUser,
        userNameCreate: this.state.userName,
        category: this.state.productCategory,
        status: this.state.productStatus,

      });

    }

  }

  render() {

    firebaseApp
      .database()
      .ref(`Products/${this.state.idProduct}`)
      .once('value', (snapshot) => {
        this.state.productName = snapshot.child('name').val();
        this.state.productDescription = snapshot.child('description').val();
        this.state.productPrice = snapshot.child('price').val();
        this.state.productImage1 = snapshot.child('imageUrl1').val();
        this.state.productCreateAt = snapshot.child('createAt').val();
        this.state.productCategory = snapshot.child('description').val();
        this.state.idUser = snapshot.child('idUser').val();
        this.state.userName = snapshot.child('userName').val();
        this.state.location = snapshot.child('location').val();
        this.state.productStatus = snapshot.child('status').val();
        this.state.productCategory = snapshot.child('category').val();
        this.state.userAvatar = snapshot.child('userAvatar').val();
        // console.log(this.state.productName);
      });
    return (

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text>
              <Text style={styles.name}>{this.state.productName}   </Text>
              <Text style={styles.namePrice}>{this.state.productPrice} VND</Text>
            </Text>
            {/* {this.clickLikeProduct} */}
            <TouchableOpacity onPress={() => this.clickLikeProduct()}>
              {
                this.state.isLike ? <Image
                  style={styles.icon}
                  source={require('../assets/icons/heart(1).png')}
                /> : <Image
                  style={styles.icon}
                  source={require('../assets/icons/icons8-heart.png')}
                />
              }
            </TouchableOpacity>

          </View>
          <View style={styles.cardContent}>
            <View style={styles.header}>
              <View style={styles.mainImageContainer}>
                <Image style={styles.mainImage} source={{ uri: this.state.productImage1 }} />
              </View>
              {/* {this.__renderImages()} */}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('UserProfile', {
          userName: this.state.username,
          userAvatar: this.state.userAvatar,
          userId: this.state.idUser
        })}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: this.state.userAvatar }}
              style={styles.image}
            />
            <Text style={styles.username}>{this.state.userName}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginLeft: 60
            }}>
            <Text>Danh sách</Text>
            <Text>Bán</Text>
            <Text>Đánh giá</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Danh mục: {this.state.productCategory} </Text>
            <Text style={styles.cardTitle}>Tình trạng: {this.state.productStatus} </Text>
            <Text style={styles.cardTitle}>Vị trí: {this.state.location} </Text>
            <Text style={styles.cardTitle}>Mô tả:  </Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.description}>{this.state.productDescription}</Text>
          </View>
        </View>

        {/* <View style={styles.card}>
          <View style={styles.cardContent}>
            <TouchableOpacity style={styles.shareButton} onPress={() => alert('add to card')}>
              <Text style={styles.shareButtonText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        <View style={styles.card}>
          <View style={styles.footer}>
            <View style={styles.inputContainercmt}>
              <TextInput style={styles.inputscmt}
                placeholder="Write a message..."
                underlineColorAndroid='transparent'
                value={this.state.comment}
                onChangeText={(text) => this.setState({ comment: text })}/>
            </View>

            <TouchableOpacity style={styles.btnSend} onPress={() => this.postComment()}>
              <Image source={{ uri: "https://img.icons8.com/small/75/ffffff/filled-sent.png" }} style={styles.iconSend} />
            </TouchableOpacity>
          </View>
          {/* <TextInput
            placeholder="Add a comment..."
            //keyboardType="twitter" // keyboard with no return button
            //autoFocus={true} // focus and show the keyboard
            style={styles.input}
            value={this.state.comment}
            onChangeText={(text) => this.setState({ comment: text })} // handle input changes

          />
      
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.postComment()}
          >
         
            <Text >Post</Text>
          </TouchableOpacity> */}
          <FlatList
            style={styles.root}
            data={this.state.listComment}
            extraData={this.state}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separatorcmt} />
              )
            }}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {

              return (
                <View style={styles.containerItem}>
                  <TouchableOpacity onPress={() => { }}>
                    <Image style={styles.image} source={{ uri: item.avatarUser }} />
                  </TouchableOpacity>
                  <View style={styles.contentCmt}>
                    <View style={styles.contentHeadercmt}>
                      <Text style={styles.nameusercmt}>{item.nameUser}</Text>
                      <Text style={styles.timecmt}>
                        {item.createAt}
                      </Text>
                    </View>
                    <Text rkType='primary3 mediumLine'>{item.content}</Text>
                  </View>
                </View>
              );
            }} />
        </View>

      </ScrollView>
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
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: "#00BFFF",
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
    borderBottomColor: '#F5FCFF',
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
    marginLeft: 30
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
    marginHorizontal: 3
  },
  contentColors: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 20,
    color: "#696969",
    fontWeight: 'bold',
  },
  namePrice: {
    fontSize: 20,
    color: "#696969",
    fontWeight: 'bold',
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "green",
    fontWeight: 'bold'
  },
  description: {
    fontSize: 13,
    color: "#696969",
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },

  /******** card **************/
  card: {

    marginVertical: 5,
    backgroundColor: "white",
    marginHorizontal: 5,
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardTitle: {
    color: "#00BFFF"
  },
  image: {
    marginTop: 10,
    marginLeft: 20,
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  username: {
    marginTop: 10,
    marginLeft: 20,
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  containerItem: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  contentCmt: {
    marginLeft: 10,
    flex: 1,
  },
  contentHeadercmt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6, marginTop: 5
  },
  separatorcmt: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  imagecmt: {
    width: 45,
    height: 45,
    borderRadius: 20,

  },
  timecmt: {
    fontSize: 11,
    color: "#808080",
  },
  nameusercmt: {
    fontSize: 16,
    fontWeight: "bold",
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
