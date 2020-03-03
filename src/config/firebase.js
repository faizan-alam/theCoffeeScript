import firebase from 'firebase';
import store from '../store/index';
import firebaseAPI from './firebaseApi';

firebase.initializeApp(firebaseAPI);


export function getMeetingList(user) {
    console.log(user);
    firebase.database().ref(`meeting/${user.userId}`).on('child_added', data => {
        const date = data.val();
        store.dispatch({ type: "ADD_ITEM", data: date });
    })

}



export function fixMeeting(user, friend) {
    const { person } = friend;
    // console.log("*******user", user.profile.picture.data.url);
    // console.log("*******", friend);
    firebase.database().ref(`meeting/${user.userId}/${person.userId}`).set({
        place: friend.place,
        userId: person.userId,
        time: friend.time,
        name: person.name,
        confirm: false,
        seen: false,
        invited: false,
        completed: false
    });
    firebase.database().ref(`meeting/${person.userId}/${user.userId}`).set({
        place: friend.place,
        userId: user.userId,
        time: friend.time,
        name: user.name,
        confirm: false,
        seen: false,
        invited: true,
        completed: false
    });
    firebase.database().ref('notifications').push({
        senderId: user.userId,
        reciverId: person.userId,
        senderName: user.name,
        reciverName: person.name,
        senderPicture: user.profile.picture.data.url
    })
}

export function getToken() {
    const messages = firebase.messaging();
    messages.requestPermission().then(x => {
        handleTokenRefresh();
    }).catch(err => {
        console.log(err)
    });
    function handleTokenRefresh() {
        return messages.getToken().then(token => {
            console.log(token);
            firebase.auth().onAuthStateChanged(user => {
                // console.log(user);
                firebase.database().ref(`users/${user.uid}/token`).set(
                    token
                )
            })
        }).catch(err => {
            console.log(err)
        });
    }
}

export function UserList() {
    // console.log("Working");

    firebase.database().ref('users').on('child_added', (data) => {
        let user = data.val()

        console.log("****", user);
        if (user.userId == store.getState().currentUser.userId) {
            console.log("Same user");
            return
        }
        // console.log("from firebase ", store.getState().currentUser);

        let _time = false;

        let _beverages = false

        let time = store.getState().currentUser.time;
        if (time) {
            time.forEach(value => {
                if (user.time.includes(value)) {
                    _time = true;
                    // console.log("Time found");
                }

            })
        }

        let beverages = store.getState().currentUser.beverages;
        console.log("******", beverages)
        if (beverages) {

            beverages.forEach(value => {
                if (user.beverages.includes(value)) {
                    _beverages = true;
                    // console.log("Bevrage found");
                }
            })
            if (_time && _beverages) {
                // console.log("User Match");
                store.dispatch({ type: 'UserList', user });
            }
            // console.log("from firebase", time, beverages);

        }


    })
};


export const checkUser = (data) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref(`users/${data.user.uid}`).on('value', x => {
            let user = x.val();
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user))
                return resolve(user);
            } else {
                return reject({ error: 404, message: "User Not Found in Firebase Database" })
            }
        })
    })

}

export const saveUser = (data) => {
    const currentUser = {
        profile: data.additionalUserInfo.profile,
        userId: data.user.uid
    }
    // firebase.database().ref(`users/${data.user.uid}`).set(currentUser)
    store.dispatch({ type: 'CurrentUser', currentUser })
}
export const saveProfile = (currentUser) => {

    firebase.database().ref(`users/${currentUser.userId}`).set(currentUser)

}
export const firebaseStorage = () => {
    return firebase.storage();

}

export const loginWithFirebase = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            resolve(result)
        }).catch(function (error) {
            console.log(error);

        });
    })
}


export default firebase;