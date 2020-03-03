import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css'

let BASE_URL = "https://api.foursquare.com/v2/venues/search?"
let COORDS;
let INTENT = "browse"
let RADIUS = 5000;
let LIMIT = 5;


class Location extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            keyword: ''
        }
        this.search = this.search.bind(this);
        this.setPlace = this.setPlace.bind(this);
    }


    componentDidMount() {
        COORDS = this.props.currentUser.location;
        console.log(COORDS);
        let USER = '4bf58dd8d48988d11e941735,4bf58dd8d48988d112941735,4bf58dd8d48988d11e941735';
        fetch(`${BASE_URL}&ll=${COORDS.latitude},${COORDS.longitude}&categoryId=${USER}&intent=${INTENT}&radius=${RADIUS}&client_id=MWQCJLC4EO0V45MBDTPPTCEHHKZC0CZDII0OY2LHV2VBOSPL&client_secret=O44YFCFPRSOLSXYFCDGHJV4X1RNUOVWCJOFXQHY34OHQTDEF&v=20180612`)
            .then(x => x.json())
            .then(data => {
                this.setState({ list: data.response.venues })
                console.log(data.response.venues)
            });
    }

    setPlace(place) {
        console.log(place);
        this.props.confirmLocation(place)

    }

    search(e) {
        e.preventDefault();
        const { keyword } = this.state;
        console.log("Searcing");
        fetch(`${BASE_URL}&ll=${COORDS.latitude},${COORDS.longitude}&intent=${INTENT}&radius=${RADIUS}&query=${keyword}&client_id=MWQCJLC4EO0V45MBDTPPTCEHHKZC0CZDII0OY2LHV2VBOSPL&client_secret=O44YFCFPRSOLSXYFCDGHJV4X1RNUOVWCJOFXQHY34OHQTDEF&v=20180612`)
            .then(x => x.json())
            .then(data => {
                this.setState({ list: data.response.venues })
                console.log(data.response.venues)
            });
    }




    render() {
        const { list, keyword } = this.state;
        return (
            <div>
                <div>
                    <h3>
                        Search For Place ...
                    </h3>
                    <form style={{ marginTop: 10 }} onSubmit={this.search}>
                        <div className="form-row align-items-center">
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    value={keyword}
                                    className="form-control mb-2"
                                    placeholder="JUICE SHOP"
                                    onChange={(e) => this.setState({ keyword: e.target.value })}
                                />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary mb-2">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
                <ul className="list-group place">
                    {list.map(place => {
                        return (
                            <li
                                key={place.id} className="list-group-item"
                                onClick={() => this.setPlace(place)}
                            >
                                {place.name}
                            </li>
                        )
                    })}
                    {/* <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Porta ac consectetur ac</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(Location);