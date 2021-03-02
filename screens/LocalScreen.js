import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {firebaseApp} from '../Components/FirebaseConfig';
import isEqual from 'lodash/isEqual';
import {connect} from 'react-redux';

const soundImg = '../assets/icons/heart.png';
const muteImg = '../assets/heart (1).png';
const itemRef = firebaseApp.database();

class LocalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
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
          });
        });
        this.setState({
          data: li,
          isLoading: true,
        });
      });
  }

  componentDidUpdate(prevState) {
    if (!isEqual(this.state, prevState) && this.state.isLoading) {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const {data} = this.state;
    return (
      <>{this.state.isLoading && <ActivityIndicator size="large" />}</>
      //   <ScrollView style={styles.container}>

      //     <Text>{this.props.userName}</Text>
      //     <FlatList
      //       data={data || []}
      //       renderItem={({item, index}) => {
      //         return (
      //           <View style={styles.card}>
      //             {/* <TouchableOpacity onPress={() =>this.setState({
      //   showLikeImg: false
      // })}>
      //               <Image
      //                 source={require('../assets/icons/menu.png')}
      //                 style={{height: 25, width: 25}}></Image>
      //             </TouchableOpacity> */}
      //             <TouchableOpacity
      //               onPress={() =>
      //                 this.props.navigation.navigate('Detail', {
      //                   idProduct: item.key,
      //                 })
      //               }>
      //               <Image source={{uri: item.imageUrl}} style={styles.image} />
      //             </TouchableOpacity>
      //             <AirbnbRating size={15} showRating={false} isDisabled={true} />
      //             <View
      //               style={{
      //                 flexDirection: 'row',
      //                 marginBottom: 10,
      //                 justifyContent: 'center',
      //               }}>
      //               <Text style={styles.title}>{item.name}</Text>
      //               <Text style={styles.price}>{item.price}$</Text>
      //             </View>
      //           </View>
      //         );
      //       }}
      //       keyExtractor={(item) => item.key}
      //       numColumns={2}
      //     />
      //   </ScrollView>
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
    backgroundColor: '#e6e6e6',
  },
  card: {
    flex: 1,
    width: 200,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#d9d9d9',
  },
  image: {
    marginLeft: 50,
    width: 100,
    height: 150,
    justifyContent: 'center',
  },
  title: {
    color: '#000000',
    fontWeight: 'bold',
  },
  price: {
    marginLeft: 20,
    color: 'red',
  },
});

// const LocalScreen = (props) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const userName = useSelector((state) => state.auth.userName);

//   useEffect(() => {
//     const li = [];
//     setTimeout(() => {
//       setLoading(false);
//   }, 1000);
//     firebaseApp
//       .database()
//       .ref('Products')
//       .on('value', (snapshot) => {
//         snapshot.forEach((child) => {
//           li.push({
//             key: child.key,
//             name: child.val().name,
//             description: child.val().description,
//             price: child.val().price,
//             imageUrl: child.val().imageUrl1,
//           });
//         });
//       });
//     setData(li);
//     console.log(li);
//   }, []);

//   if (loading) {
//     return (
//     <View style={{flex: 1, justifyContent: 'center'}}>
//       <ActivityIndicator size="large" color="#0000ff"/>
//     </View> );
//   }
//   return (
//     <ScrollView style={styles.container}>
//       <Text>{userName}</Text>
//       <FlatList
//         data={data}
//         renderItem={({item, index}) => {
//           console.log(item);
//           return (
//             <View style={styles.card}>
//               {/* <TouchableOpacity onPress={() =>this.setState({
//       showLikeImg: false
//     })}>
//                   <Image
//                     source={require('../assets/icons/menu.png')}
//                     style={{height: 25, width: 25}}></Image>
//                 </TouchableOpacity> */}
//               <TouchableOpacity
//                 onPress={() =>
//                   props.navigation.navigate('Detail', {
//                     idProduct: item.key,
//                   })
//                 }>
//                 <Image source={{uri: item.imageUrl}} style={styles.image} />
//               </TouchableOpacity>
//               <AirbnbRating size={15} showRating={false} isDisabled={true} />
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   marginBottom: 10,
//                   justifyContent: 'center',
//                 }}>
//                 <Text style={styles.title}>{item.name}</Text>
//                 <Text style={styles.price}>{item.price}$</Text>
//               </View>
//             </View>
//           );
//         }}
//         keyExtractor={(item) => item.key}
//         numColumns={2}
//       />
//     </ScrollView>
//   );
// };
