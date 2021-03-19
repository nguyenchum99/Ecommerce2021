
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class ProfileUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userNameProfile: '',
            userAvatarProfile: '',
            userIdProfile: '',
            listProduct: {},
            countProduct: 0,
            selectScreen: '',

        };
    }


    componentDidMount() {
        const userNameProfile = this.props.navigation.getParam('userName');
        const userAvatarProfile = this.props.navigation.getParam('userAvatar');
        const userIdProfile = this.props.navigation.getParam('userId');
        this.setState({
            userNameProfile: userNameProfile,
            userAvatarProfile: userAvatarProfile,
            userIdProfile: userIdProfile
        });

        firebaseApp
            .database()
            .ref('Products/')
            .orderByChild('idUser')
            .equalTo(userIdProfile)
            .on('value', (snapshot) => {
                const li = [];
                snapshot.forEach((child) => {
                    li.push({
                        key: child.key,
                        productName: child.val().name,
                        productDescription: child.val().description,
                        productPrice: child.val().price,
                        productImage: child.val().imageUrl1,
                        productCategory: child.val().category,
                        location: child.val().location,
                        createAt: child.val().createAt,
                    });
                });
                this.setState({
                    listProduct: li,
                    countProduct: li.count
                });

            });
    }


    listProduct(){

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Image style={styles.avatar} source={{ uri: this.state.userAvatarProfile }} />
                        <Text style={styles.name}>
                            {this.state.userNameProfile}
                        </Text>
                    </View>
                </View>

                <View style={styles.profileDetail}>
                    <TouchableOpacity style={styles.detailContent} onPress={() => this.listProduct()}>
                        <Text style={styles.title}>Sản phẩm</Text>
                        <Text style={styles.count}>{this.state.countProduct}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detailContent}>
                        <Text style={styles.title}>Người theo dõi</Text>
                        <Text style={styles.count}>200</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detailContent}>
                        <Text style={styles.title}>Đang theo dõi</Text>
                        <Text style={styles.count}>200</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detailContent}>
                        <Text style={styles.title}>Bán</Text>
                        <Text style={styles.count}>200</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Opcion 1</Text>
                        </TouchableOpacity>
                        <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00CED1",
    },
    headerContent: {
        marginTop: 10,
        marginBottom: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    profileDetail: {
        alignSelf: 'center',
        marginTop: 130,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: "#ffffff"
    },
    detailContent: {
        margin: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 13,
        color: "#00CED1"
    },
    count: {
        fontSize: 12,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
        marginTop: 40
    },
    textInfo: {
        fontSize: 18,
        marginTop: 20,
        color: "#696969",
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00CED1",
    },
    description: {
        fontSize: 20,
        color: "#00CED1",
        marginTop: 10,
        textAlign: 'center'
    },
});
