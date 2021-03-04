import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';

const city = [
  {label: 'Hà Nội', value: 'Hà Nội'},
  {label: 'Hà Giang', value: 'Hà Giang'},
  {label: 'Cao Bằng', value: 'Cao Bằng'},
  {label: 'Bắc Kạn', value: 'Bắc Kạn'},
  {label: 'Tuyên Quang', value: 'Tuyên Quang'},
  {label: 'Lào Cai', value: 'Lào Cai'},
  {label: 'Điện Biên', value: 'Điện Biên'},
  {label: 'Lai Châu', value: 'Lai Châu'},
  {label: 'Sơn La', value: 'Sơn La'},
  {label: 'Yên Bái', value: 'Yên Bái'},
  {label: 'Hoà Bình', value: 'Hoà Bình'},
  {label: 'Thái Nguyên', value: 'Thái Nguyên'},
  {label: 'Lạng Sơn', value: 'Lạng Sơn'},
  {label: 'Quảng Ninh', value: 'Quảng Ninh'},
  {label: 'Bắc Giang', value: 'Bắc Giang'},
  {label: 'Phú Thọ', value: 'Phú Thọ'},
  {label: 'Vĩnh Phúc', value: 'Vĩnh Phúc'},
  {label: 'Bắc Ninh', value: 'Bắc Ninh'},
  {label: 'Hải Dương', value: 'Hải Dương'},
  {label: 'Hải Phòng', value: 'Hải Phòng'},
  {label: 'Hưng Yên', value: 'Hưng Yên'},
  {label: 'Thái Bình', value: 'Thái Bình'},
  {label: 'Hà Nam', value: 'Hà Nam'},
  {label: 'Nam Định', value: 'Nam Định'},
  {label: 'Ninh Bình', value: 'Ninh Bình'},
  {label: 'Thanh Hóa', value: 'Thanh Hóa'},
  {label: 'Nghệ An', value: 'Nghệ An'},
  {label: 'Hà ', value: 'Hà '},
  {label: 'Quảng Bình', value: 'Quảng Bình'},
  {label: 'Quảng Trị', value: 'Quảng Trị'},
  {label: 'Thừa Thiên Huế', value: 'Thừa Thiên Huế'},
  {label: 'Đà Nẵng', value: 'Đà Nẵng'},
  {label: 'Quảng Nam', value: 'Quảng Nam'},
  {label: 'Quảng Ngãi', value: 'Quảng Ngãi'},
  {label: 'Bình Định', value: 'Bình Định'},
  {label: 'Phú Yên', value: 'Phú Yên'},
  {label: 'Khánh Hòa', value: 'Khánh Hòa'},
  {label: 'Ninh Thuận', value: 'Ninh Thuận'},
  {label: 'Bình Thuận', value: 'Bình Thuận'},
  {label: 'Kon Tum', value: 'Kon Tum'},
  {label: 'Gia Lai', value: 'Gia Lai'},
  {label: 'Đắk Lắk', value: 'Đắk Lắk'},
  {label: 'Đắk Nông', value: 'Đắk Nông'},
  {label: 'Lâm Đồng', value: 'Lâm Đồng'},
  {label: 'Bình Phước', value: 'Bình Phước'},
  {label: 'Tây Ninh', value: 'Tây Ninh'},
  {label: 'Bình Dương', value: 'Bình Dương'},
  {label: 'Đồng Nai', value: 'Đồng Nai'},
  {label: 'Bà Rịa - Vũng Tàu', value: 'Bà Rịa - Vũng Tàu'},
  {label: 'Hồ Chí Minh', value: 'Hồ Chí Minh'},
  {label: 'Long An', value: 'Long An'},
  {label: 'Tiền Giang', value: 'Tiền Giang'},
  {label: 'Bến Tre', value: 'Bến Tre'},
  {label: 'Trà Vinh', value: 'Trà Vinh'},
  {label: 'Vĩnh Long', value: 'Vĩnh Long'},
  {label: 'Đồng Tháp', value: 'Đồng Tháp'},
  {label: 'An Giang', value: 'An Giang'},
  {label: 'Kiên Giang', value: 'Kiên Giang'},
  {label: 'Cần Thơ', value: 'Cần Thơ'},
  {label: 'Hậu Giang', value: 'Hậu Giang'},
  {label: 'Sóc Trăng', value: 'Sóc Trăng'},
  {label: 'Bạc Liêu', value: 'Bạc Liêu'},
  {label: 'Cà Mau', value: 'Cà Mau'},
];


class EditInfoProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Full Name</Text>
        <TextInput
          style={styles.input}
          //   onChangeText={(productName) => this.setState({productName})}
          value={this.props.userName}></TextInput>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          //   onChangeText={(productName) => this.setState({productName})}
          value={this.props.userEmail} readonly></TextInput>
        <Text style={styles.title}>Phone</Text>
        <TextInput
          style={styles.input}
          //   onChangeText={(productName) => this.setState({productName})}
          value={this.props.userPhone}></TextInput>
        <Text style={styles.title}>Select location</Text>
        <View style={{marginLeft: 20}}>
          <RNPickerSelect
            onValueChange={(value) => this.setState({location: value})}
            items={city}
            placeholder={{
              label: 'Select a city...',
              value: this.state.location,
            }}
            value={this.state.location}
          />
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

export default connect(mapStateToProps, null)(EditInfoProduct);



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#3399ff',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  card: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  title: {
    marginLeft: 20,
    marginTop: 10
  },
  location: {
    fontSize: 15,
    marginLeft: 25,
  },
  price: {
    marginLeft: 20,
    color: '#000000',
  },
});
