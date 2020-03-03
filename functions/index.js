const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotifications = functions.database.ref('/notifications/{notificationId}').onCreate((event) => {

    // Exit if data already created
    console.log(event)

    // Setup notification
    const NOTIFICATION_SNAPSHOT = event._data;


    console.log("New Deployment");


    const payload = {
        notification: {
            title: `Meeting Request From ${NOTIFICATION_SNAPSHOT.senderName}`,
            body: "Hi There Wana Meet :) ",
            icon: NOTIFICATION_SNAPSHOT.senderPicture,
            click_action: `http://localhost:3000/dashboard`
        }
    }

    return admin.database().ref(`/users/${NOTIFICATION_SNAPSHOT.reciverId}`).once('value').then((data) => {
        
        const userinfo = data.val();

        const tokens = [];
        tokens.push(userinfo.token)
        console.log(payload);
        return admin.messaging().sendToDevice(tokens, payload)
            .then((response) => {
                // console.log(response)
            });

    })


    //   // Clean invalid tokens
    //   function cleanInvalidTokens(tokensWithKey, results) {

    //     const invalidTokens = [];

    //     results.forEach((result, i) => {
    //       if ( !result.error ) return;

    //       console.error('Failure sending notification to', tokensWithKey[i].token, result.error);

    //       switch(result.error.code) {
    //         case "messaging/invalid-registration-token":
    //         case "messaging/registration-token-not-registered":
    //           invalidTokens.push( admin.database().ref('/tokens').child(tokensWithKey[i].key).remove() );
    //           break;
    //         default:
    //           break;
    //       }
    //     });

    //     return Promise.all(invalidTokens);
    //   }


    //   return admin.database().ref('/tokens').once('value').then((data) => {

    //     if ( !data.val() ) return;

    //     const snapshot = data.val();
    //     const tokensWithKey = [];
    //     const tokens = [];

    //     for (let key in snapshot) {
    //       tokens.push( snapshot[key].token );
    //       tokensWithKey.push({
    //         token: snapshot[key].token,
    //         key: key
    //       });
    //     }

    //     return admin.messaging().sendToDevice(tokens, payload)
    //       .then((response) => cleanInvalidTokens(tokensWithKey, response.results))
    //       .then(() => admin.database().ref('/notifications').child(NOTIFICATION_SNAPSHOT.key).remove())
    //   });


});