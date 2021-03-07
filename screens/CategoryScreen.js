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
} from 'react-native';
import React, {Component} from 'react';
import DropDownItem from 'react-native-drop-down-item';

const data_category = [
  {
    id: 1,
    title: 'Điện thoại - Máy tính bảng',
    list: [
      {
        id_con: 'smart_phone',
        name: 'Điện thoại Smartphone',
      },
      {
        id_con: 'may_tinh_bang',
        name: 'Máy tính bảng',
      },
      {
        id_con: 'may_doc_sach',
        name: 'Máy đọc sách',
      },
    ],
  },
  {
    id: 2,
    title: 'Thời trang nữ',
    list: [
      {
        id_con: 'ao',
        name: 'Áo',
      },
      {
        id_con: 'vay',
        name: 'Váy',
      },
      {
        id_con: 'quan',
        name: 'Quần',
      },
      {
        id_con: 'do_boi',
        name: 'Đồ bơi',
      },
    ],
  },
  {
    id: 3,
    title: 'Giày - dép nữ',
    list: [
      {
        id_con: 'cao_got',
        name: 'Giày cao gót',
      },
      {
        id_con: 'the_thao_nu',
        name: 'Giày thể thao',
      },
      {
        id_con: 'sandal',
        name: 'Sandals nữ',
      },
      {
        id_con: 'bup_be',
        name: 'Giày búp bê',
      },
    ],
  },
];

export default class CategoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_phanLoai: '',
      namePhanLoai: '',
      idCategory: '',
      nameCategory: '',
    };
  }

  chooseCategory(idPL, namePL, id_category, name_category) {
    console.log('category' + idPL + ' ' + id_category + ' ' + name_category);
    // this.props.navigation.setParams({ category: id_category });
    this.props.navigation.navigate('Camera', {category: name_category});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={data_category}
          renderItem={({item, index}) => {
            return (
              <View>
                <Text style={styles.emptyListStyle}>{item.title}</Text>
                {item.list.map((element, key) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.chooseCategory(
                        item.id,
                        item.title,
                        element.id_con,
                        element.name,
                      )
                    }>
                    <Text style={styles.textStyle}> {element.name} </Text>
                    <View
                      style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#cccccc',
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            );
          }}
          keyExtractor={(item) => item.key}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    margin: 5,
  },
  image: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    width: 100,
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
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
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    backgroundColor: '#ff9933',
    color: '#ffffff',
  },
  itemStyle: {
    padding: 10,
  },
  headerFooterStyle: {
    width: '100%',
    height: 45,
    backgroundColor: '#606070',
  },
  textStyle: {
    padding: 7,
  },
});
