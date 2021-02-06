import { SearchBar } from 'react-native-elements';
import React, { Component } from "react";


export default class SearchItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
      }

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Search item..."
        onChangeText={this.updateSearch}
        value={search}
        lightTheme
        round
        containerStyle={Platform.OS==="android"? {backgroundColor: '#ffffff'}: {backgroundColor: '#ffffff'} }
        inputStyle={{color: '#000000'}}
       
      />
    );
  }
}