import React, { Component } from "react";
import "./index.css";
import firebase from '../../config/firebase';


// const messaging = firebase.messaging();

// messaging.onMessage(payload => {
//   console.log('messagePayload*********',payload);
// });



class NotificationScreen extends Component {
  constructor() {
    super();
    this.state = {
      notificationScr: [],
      friendProfile: null,
      friend:null
    };
    
  }


  componentWillMount() {
    const friend = this.props.friend;
    // localStorage.setItem("notif","false");
    firebase.database().ref(`users/${friend.userId}`).on('value',(data =>{
      const friendProfile = data.val().profile.picture.data.url;
      console.log("pictureData",friendProfile)
      this.setState({friendProfile:friendProfile,friend:this.props.friend});
    })) 
  }

  confirmMeeting(){
      const {friend} = this.state;
      const {currentUser} = this.props;
      firebase.database().ref(`meeting/${friend.userId}/${currentUser.userId}/confirm`)
      .set(true).then(x=>{
          console.log(x);
      })
      firebase.database().ref(`meeting/${currentUser.userId}/${friend.userId}/confirm`)
      .set(true).then(x=>{
          console.log(x);
          this.props.closeScreen();
      })
  }

  closeScreen1(){
    this.props.closeScreen();
  }

  render() {
    const {notificationScr,showNOt} = this.state;
    return (
      <div>


        <div className="bg-modal2" >
        <div className="modal-contents2">
      {/* {notificationScr.length &&
      notificationScr.map(res => {
        return( */}
          
        
          <div className="notifi">
            <div>
              <div className="parentNot">
                <div className="lightCir lightCir1">
                  <div className="lightCirb1" />
                </div>
                <div className="lightCir lightCir2">
                  <div className="lightCirb2" />
                </div>
              </div>

              <div className="childNot">
                <div
                  className="lightCir lightCir1"
                  style={{ backgroundColor: "transparent" }}
                >
                  <div
                    className="lightCirb1"
                    style={{ backgroundColor: "transparent" }}
                  >

                    <div className="imgDivNot imgDivNot2" style={{overflow: "hidden"}}>
                        <img src={this.state.friendProfile}style={{
                          width:"150%"
                        }}/>
                  </div>
                  </div>

                </div>
                <div
                  className="lightCir lightCir2"
                  style={{ backgroundColor: "transparent" }}
                >
                  <div
                    className="lightCirb2"
                    style={{ backgroundColor: "transparent" }}
                  >
                <div className="imgDivNot imgDivNot2" style={{overflow: "hidden"}}>
                        <img src={this.props.currentUser.profile.picture.data.url}style={{
                          width:"150%"
                        }}/>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="notiP">{/*res.userData.nickName*/}</p>
            <div className="infoDivNoti">
              <p>Duration : {525}</p>
              <p>Location : {52}</p>
              <p>Time : 18/5/19 - 05:30</p>
            </div>
            <div className="btnDivNoti">
              <button onClick={() => this.closeScreen1()} >Close</button>
              {
                this.props.name == "Requests" && <button onClick={() =>  this.confirmMeeting()} >Confirm</button>
              }
            </div>
          </div>
        )
      
    
    {/* })
        
    } */}
    </div>
     </div>
      
      </div>
    );
  }
}

export default NotificationScreen;
