import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  TextInput,
} from 'react-native';
import { firebaseApp } from '../Components/FirebaseConfig';
import {connect} from 'react-redux';

class MyComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentCmt: '',
      avatarUser: '',
      createAt: '',
      userName: '',
      idProduct: '',
      productName: '',
      productPrice: '',
      productDescription: '',
      myComment: '',
      productImage: '',
      eventId: ''
    };
  }

  componentDidMount() {
    const avatarUser = this.props.navigation.getParam('avatarUser');
    const createAt = this.props.navigation.getParam('createAt');
    const eventId = this.props.navigation.getParam('eventId');
    const type = this.props.navigation.getParam('type');
    const userName = this.props.navigation.getParam('userName');

    console.log('avatar' + avatarUser);
    console.log('creat' + type);
    console.log('eventId' + eventId);
    console.log('userName' + userName);

    this.setState({
      avatarUser: avatarUser,
      createAt: createAt,
      userName: userName,
      eventId: eventId
    });
    //lay noidung cmt
    firebaseApp
      .database()
      .ref(`Comments/${eventId}`)
      .once('value', (snapshot) => {
        // console.log(snapshot.child('content').val());
        //this.setState({idProduct: snapshot.child('idProduct').val()});
        this.state.idProduct = snapshot.child('idProduct').val();
        this.state.contentCmt = snapshot.child('content').val();
      //  this.state.myComment = snapshot.child('product_cmt').val();

      });

    //lay thong tin san pham
    firebaseApp
      .database()
      .ref(`Products/${this.state.idProduct}`)
      .once('value', (snapshot) => {
        this.state.productName = snapshot.child('name').val();
        this.state.productPrice = snapshot.child('price').val();
        this.state.productDescription = snapshot.child('description').val();
        this.state.productImage = snapshot.child('imageUrl1').val();

      });
      

    // console.log('productName', this.state.productName);
  }

  postComment() {
    if (this.state.myComment != null) {
      firebaseApp
        .database()
        .ref(`Comments/${this.state.eventId}`)
        .update({
          product_cmt: this.state.myComment,
        });
     
      this.setState({myComment: null});
      //this.postNotification('comment', newRef.key);
    }
  }

  render() {
      console.log('testsatfsdyad', this.state.productImage );

    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center', marginHorizontal: 30}}>
          <Image
            style={styles.productImg}
            source={{
              uri: this.state.productImage
            }}
          />
          <Text style={styles.name}>{this.state.productName}</Text>
          <Text style={styles.price}>{this.state.productPrice}</Text>
          <Text style={styles.description}>
            {this.state.productDescription}
          </Text>
        </View>
        <View style={styles.containerItem}>
          <Image
            style={styles.imagecmt}
            source={{uri: this.state.avatarUser}}
          />

          <View style={styles.contentCmt}>
            <View style={styles.contentHeadercmt}>
              <Text style={styles.nameusercmt}>{this.state.userName}</Text>
              <Text style={styles.timecmt}>{this.state.createAt}</Text>
            </View>
            <Text>{this.state.contentCmt}</Text>
          </View>
        </View>
        {/* <View style={styles.containerItem}>
          <Image
            style={styles.imagecmt}
            source={{uri: this.props.userPhoto}}
          />

          <View style={styles.contentCmt}>
            <View style={styles.contentHeadercmt}>
              <Text style={styles.nameusercmt}>{this.props.userName}</Text>         
            </View>
            <Text>{this.state.myComment}</Text>
          </View>
        </View> */}
        <View style={styles.footer}>
          <View style={styles.inputContainercmt}>
            <TextInput
              style={styles.inputscmt}
              placeholder="Bình luận..."
              underlineColorAndroid="transparent"
              value={this.state.comment}
              onChangeText={(text) => this.setState({myComment: text})}
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
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(MyComment);

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
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  btnSend: {
    backgroundColor: '#00BFFF',
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImg: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 28,
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
    textAlign: 'center',
    marginTop: 10,
    color: '#696969',
  },
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
