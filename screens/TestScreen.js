import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from 'react-native';

export default class TestScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: "Frank Odalthh", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: "John DoeLink", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name: "March SoulLaComa", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name: "Finn DoRemiFaso", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name: "Maria More More", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name: "Clark June Boom!", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name: "The googler", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
            ]
        }
    }

    render() {
        return (
            <FlatList
                style={styles.root}
                data={this.state.data}
                extraData={this.state}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separatorcmt} />
                    )
                }}
                keyExtractor={(item) => {
                    return item.id;
                }}
                renderItem={({item}) => {
                   
                    return (
                        <View style={styles.containerItem}>
                            <TouchableOpacity onPress={() => { }}>
                                <Image style={styles.image} source={{ uri: item.image }} />
                            </TouchableOpacity>
                            <View style={styles.contentCmt}>
                                <View style={styles.contentHeadercmt}>
                                    <Text style={styles.nameusercmt}>{item.name}</Text>
                                    <Text style={styles.timecmt}>
                                        9:58 am
                  </Text>
                                </View>
                                <Text rkType='primary3 mediumLine'>{item.comment}</Text>
                            </View>
                        </View>
                    );
                }} />
        );
    }
}

const styles = StyleSheet.create({
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
});