import React from 'react';
import { TouchableOpacity } from 'react-native';
import {FlatList, Text, View, Image, TouchableHighlight, StyleSheet} from 'react-native';


const categories = [
  {
    label: 'Thời trang',
    value: 'Thời trang',
    image: 'https://cdn.gumac.vn//image/01/thang-9-2019/bst-thg-9-2019/anhbia060920191601356149.jpg',    
    id: 1,
  },
  {
    label: 'Điện thoại',
    value: 'Điện thoại',
    image: 'https://file1.dangcongsan.vn/data/0/images/2020/09/21/ctvbandoc/dienthoai.jpg',
    id: 2,
  },
  {
    label: 'Đồ gia dụng',
    value: 'Đồ gia dụng',
    image:
      'https://www.sapo.vn/blog/wp-content/uploads/2018/01/the-gioi-do-gia-dung-min.jpg',
    id: 3,
  },
];



export default class CategoryScreen extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View>
        <FlatList
          data={categories}
          renderItem={({item}) => (
            <TouchableOpacity
             
              onPress={() =>
                this.props.navigation.navigate('Listcateogory', {
                  category: item.label,
                })
              }>
              <View style={styles.categoriesItemContainer}>
                <Image
                  style={styles.categoriesPhoto}
                  source={{uri: item.image}}
                />
                <Text style={styles.categoriesName}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 215,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  categoriesPhoto: {
    width: '100%',
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3,
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8,
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5,
  },
});