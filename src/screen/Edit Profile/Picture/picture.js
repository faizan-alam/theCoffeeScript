import React, { Component } from 'react';
import { firebaseStorage } from '../../../config/firebase';



class Picture extends Component {
    constructor(props) {
        super()
        this.state = {
            imageUrl: [],
            images: [],
            count: 0,
            disableButton: true
        }
        this.storege = firebaseStorage();
    }

    pickImage(image, no) {
        const { imageUrl, images } = this.state;
        let { count } = this.state
        const { userId } = this.props;
        console.log(userId.userId);

        let reader = new FileReader();
        console.log(image.target.files[0]);
        const file = image.target.files[0];
        if (image.target.files[0]) {
            this.storege.ref(`images/${userId.userId}/${no}`).put(file)
                .then(snapshot => {
                    return snapshot.ref.getDownloadURL();
                })
                .then(downloadURL => {
                    console.log(downloadURL);
                    images.push(downloadURL);
                    this.setState({ images })
                    console.log(count);

                    if (count == 3) {
                        console.log("working");

                        this.setState({ disableButton: false })
                    }
                });

            count++;

            reader.readAsDataURL(image.target.files[0]);
            reader.onload = (e) => {
                let image64 = e.target.result;
                imageUrl[no] = image64;
                this.setState({ imageUrl, count })
            };
        }
    }
    SubmitInfo(e) {
        e.preventDefault();
        this.props.SubmitInfo({ images: this.state.images });
    }

    render() {
        const { imageUrl, disableButton, count } = this.state;
        const { SubmitInfo } = this.props;
        console.log(disableButton);

        return (

            <form onSubmit={(e) => this.SubmitInfo(e)}>
                <div className="row my-5">
                    <div className="col-md-4 col-sm-6 col-12">
                        <div className="img-div d-flex align-items-center justify-content-center">
                            <div>
                                {imageUrl[0] && <img src={imageUrl[0]} width="230" height="230px" />}
                                {/* {imageUrl.length === 0 && <img src={plusIcon} width="70px" />} */}
                                <input type="file" className="img-upload" onChange={(e) => this.pickImage(e, 0)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12">
                        <div className="img-div d-flex align-items-center justify-content-center">
                            <div>
                                {imageUrl[1] && <img src={imageUrl[1]} width="230" height="230px" />}
                                {/* {imageUrl.length === 0 && <img src={plusIcon} width="70px" />} */}
                                <input type="file" className="img-upload" onChange={(e) => this.pickImage(e, 1)} />
                            </div>
                        </div>
                    </div><div className="col-md-4 col-sm-6 col-12">
                        <div className="img-div d-flex align-items-center justify-content-center">
                            <div>
                                {imageUrl[2] && <img src={imageUrl[2]} width="230" height="230px" />}
                                {/* {imageUrl.length === 0 && <img src={plusIcon} width="70px" />} */}
                                <input type="file" className="img-upload" onChange={(e) => this.pickImage(e, 2)} />
                            </div>
                        </div>
                    </div>
                </div >
                {count == 3 && disableButton ? <h1>Uploading Images Please Wait</h1> : ""}
                <div>
                    <button disabled={disableButton && true} >
                        Next
                    </button>
                </div>
            </form>
        )
    }
}

export default Picture;