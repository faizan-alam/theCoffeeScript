import React, { Component } from 'react';
import MyMapComponent from './googlemap';
import {connect} from 'react-redux';


class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            location: {},
            completed:true
        }
        this.updateCoords = this.updateCoords.bind(this);
    }
    componentDidMount() {
            this.setState({ location: this.props.location.coords });       
    }
    updateCoords({ latitude, longitude }) {
        this.setState({ location: { latitude, longitude },completed:true })
    }
    
    SubmitLocation(){
        this.props.SubmitInfo(this.state);
    }
    
    render() {
        const { location } = this.state;
        return (
            <div>
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `80vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    coords={location}
                    updateCoords={this.updateCoords}
                />
                <div>
                    <button onClick={() => this.SubmitLocation()} >
                        Finish
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        location:state.geoLocation
    }
}
export default connect(mapStateToProps)(Map);