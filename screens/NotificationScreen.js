import moment from 'moment';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';

class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  openComment = (avatarUser, createAt, eventId, type, userName) => {
    console.log('opencmt', avatarUser);
    if (type == 'comment') {
      this.props.navigation.navigate('myCmt', {
        avatarUser: avatarUser,
        createAt: createAt,
        eventId: eventId,
        type: type,
        userName: userName,
      });
    }
  };

  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.props.notifications}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          let attachment = <View />;

          let mainContentStyle;
          if (Notification.attachment) {
            mainContentStyle = styles.mainContent;
            attachment = (
              <Image
                style={styles.attachment}
                source={{uri: Notification.attachment}}
              />
            );
          }
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                this.openComment(
                  Notification.avatarUser,
                  Notification.createAt,
                  Notification.eventId,
                  Notification.type,
                  Notification.userName,
                );
              }}>
              <Image
                source={{uri: Notification.avatarUser}}
                style={styles.avatar}
              />
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <View style={styles.text}>
                    <Text style={styles.name}>{Notification.userName}</Text>
                    <Text>{Notification.content}</Text>
                  </View>
                  <Text style={styles.timeAgo}>
                    {moment(new Date(Notification.createdAt)).fromNow()}
                  </Text>
                </View>
                {attachment}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.notifications,
  };
};

export default connect(mapStateToProps, null)(NotificationScreen);

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
  },
  name: {
    fontSize: 16,
    color: '#1E90FF',
  },
});
