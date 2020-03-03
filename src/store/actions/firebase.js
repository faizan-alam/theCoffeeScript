import store from '../index';
import firebase from '../../config/firebase';


export const FirebaseData = (data) => {
    console.log(data);
    return {
        type: 'ADD_USER',
        data: data
    }
};

export const callFirebase = () => {

    firebase.database().ref('users').on('child_added', data => {
        let data1 = data.val()
        store.dispatch({ type: 'ADD_USER', data: data1 })
    })
}


