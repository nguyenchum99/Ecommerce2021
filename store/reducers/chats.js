import {SET_CHATROOMS} from '../actions/chats';

const initialState = {
  chatRooms: [],
  buyChatRooms: [],
  sellChatRooms: [],
};

const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHATROOMS:
      return {
        chatRooms: action.chatRooms,
        buyChatRooms: action.chatRooms.filter(
          (chatRoom) => chatRoom.chatRoom.type === 'buy',
        ),
        sellChatRooms: action.chatRooms.filter(
          (chatRoom) => chatRoom.chatRoom.type === 'sell',
        ),
      };
    default:
      return state;
  }
};

export default chatsReducer;
