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
      idProduct: '',
      comment: '',
      listComment: [],
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
        // console.log(this.state.productName);
      });
    return (

        <ScrollView style={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text>
                <Text style={styles.name}>{this.state.productName}   </Text>
                <Text style={styles.name}>{this.state.productPrice} VND</Text>
              </Text>
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
          <TouchableOpacity style={styles.card}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={require('../assets/icons/avatar.png')}
                style={styles.image}
              />
              <Text style={styles.username}>{this.state.userName}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
              }}>
              <Text>List</Text>
              <Text>Sold</Text>
              <Text>Rating</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>#{this.state.productCategory}  #{this.state.productStatus}  Mô tả</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.description}>{this.state.productDescription}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardContent}>
              <TouchableOpacity style={styles.shareButton} onPress={() => alert('add to card')}>
                <Text style={styles.shareButtonText}>Add To Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            placeholder="Add a comment..."
            //keyboardType="twitter" // keyboard with no return button
            //autoFocus={true} // focus and show the keyboard
            style={styles.input}
            value={this.state.comment}
            onChangeText={(text) => this.setState({ comment: text })} // handle input changes
          // onSubmitEditing={this.onSubmitEditing} // handle submit event
          />
          {/* Post button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.postComment()}
          >
            {/* Apply inactive style if no input */}
            <Text >Post</Text>
          </TouchableOpacity>
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
        </ScrollView>

      // <SafeAreaView style={styles.container}>
      //   <ScrollView>
      //     <View style={styles.containerCmt} >
      //       <KeyboardAvoidingView
      //         behavior={Platform.OS === "ios" ? "padding" : "height"}
      //       >
      //         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      //           <View style={styles.containerInput}>

      //             <TextInput
      //               placeholder="Add a comment..."
      //               //keyboardType="twitter" // keyboard with no return button
      //               //autoFocus={true} // focus and show the keyboard
      //               style={styles.input}
      //               value={this.state.comment}
      //               onChangeText={(text) => this.setState({ comment: text })} // handle input changes
      //             // onSubmitEditing={this.onSubmitEditing} // handle submit event
      //             />
      //             {/* Post button */}
      //             <TouchableOpacity
      //               style={styles.button}
      //               onPress={() => this.postComment()}
      //             >
      //               {/* Apply inactive style if no input */}
      //               <Text style={[styles.text, !this.state.text ? styles.inactive : []]}>Post</Text>
      //             </TouchableOpacity>
      //           </View>
      //         </TouchableWithoutFeedback>
      //       </KeyboardAvoidingView>
      //       <FlatList
      //         data={this.state.listComment}
      //         renderItem={({ item }) => {
      //           return (
      //             //  <Comments userAvatar= {item.avatarUser} userName={item.nameUser} comment={item.content} createAt={item.createAt} />
      //             <View style={styles.cmtBox}>
      //               <View style={styles.avatarContainer}>
      //                 <Image
      //                   resizeMode='contain'
      //                   style={styles.avatar}
      //                   source={{ uri: item.avatarUser }}
      //                 />
      //               </View>
      //               <View style={styles.contentContainer}>
      //                 <Text style={[styles.text, styles.name]}>{item.nameUser} </Text>
      //                 <Text style={styles.text}>{item.content}</Text>
      //                 <View style={{ flexDirection: 'row' }}>
      //                   <Text>{item.createAt}</Text>
      //                   <TouchableOpacity   style={{marginLeft: 10}}            
      //                     onPress={() => this.likeComment()}
      //                   >
      //                     <Text>Like</Text>
      //                   </TouchableOpacity>
      //                   <TouchableOpacity style={{ marginLeft: 10 }}
      //                     onPress={() => this.commentChildren()}
      //                   >
      //                     <Text>Comment</Text>
      //                   </TouchableOpacity>
      //                 </View>

      //               </View>
      //             </View>
      //           );
      //         }}
      //         keyExtractor={(item) => item.key}
      //       />

      //     </View>
      //     <Image
      //       style={{ height: 200, width: 200, marginLeft: 20 }}
      //       source={{ uri: this.state.productImage1 }}></Image>
      //     <Text
      //       style={{
      //         fontSize: 20,
      //         fontWeight: 'bold',
      //         marginLeft: 20,
      //         marginTop: 20,
      //         marginBottom: 20,
      //       }}>
      //       {this.state.productName} - {this.state.productPrice} $
      //     </Text>
      //     <View
      //       style={{
      //         flexDirection: 'row',
      //         justifyContent: 'space-between',
      //       }}>
      //     </View>
      //     <View
      //       style={{
      //         marginTop: 10,
      //         marginLeft: 20,
      //         marginRight: 20,
      //         padding: 5,
      //         borderRadius: 10,
      //         backgroundColor: '#ffffff',
      //       }}>
      //       <Text>{this.state.productDescription}</Text>
      //     </View>
      //     <TouchableOpacity style={styles.card}>
      //       <View style={{ flexDirection: 'row' }}>
      //         <Image
      //           source={require('../assets/icons/avatar.png')}
      //           style={styles.image}
      //         />
      //         <Text style={styles.title}>{this.state.userName}</Text>
      //       </View>
      //       <View
      //         style={{
      //           flexDirection: 'row',
      //           justifyContent: 'space-around',
      //           marginTop: 10,
      //         }}>
      //         <Text>List</Text>
      //         <Text>Sold</Text>
      //         <Text>Rating</Text>
      //       </View>
      //     </TouchableOpacity>
      //   </ScrollView>
      // </SafeAreaView>
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
    backgroundColor: "#ebf0f7",
  },
  content: {
    marginLeft: 10,
    marginRight: 10,
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
    fontSize: 22,
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
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: "white",
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
  cardTitle: {
    color: "#00BFFF"
  },
  image: {
    marginTop: 10,
    marginLeft: 20,
    width: 50,
    height: 50,
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
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  containerItem: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  contentCmt: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeadercmt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separatorcmt: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  imagecmt: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
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
