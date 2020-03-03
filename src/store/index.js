import { combineReducers, createStore } from 'redux';
import user from './reducers/userInfo';
import currentUser from './reducers/activeUser';
import location from './reducers/location';
import UserList from './reducers/userList';
import meetingList from './reducers/meetingList';

const store = createStore(combineReducers({
    user: user,
    currentUser,
    geoLocation: location,
    UserList: UserList,
    meetingList:meetingList
}));

export default store