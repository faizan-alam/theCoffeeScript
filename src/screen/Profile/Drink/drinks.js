import React, { Component } from 'react';
import coffee from '../../../images/coffee.svg';
import juice from '../../../images/juice.png';
import cocktail from '../../../images/cocktail.png';


class Drinks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            beverages: [],
            time: []
        }

    }
    submitData() {
        this.props.SubmitInfo(this.state);
    }
    selectBeverages(name) {
        const { beverages } = this.state;
        if (!beverages.includes(name)) {
            beverages.push(name);
            console.log(beverages);
            this.setState({ beverages });
        } else {

            let number = beverages.indexOf(name);
            beverages.splice(number, 1);
            console.log(beverages);
            this.setState({ beverages });
        }
    }
    selectTime(time1) {
        const { time } = this.state;
        if (!time.includes(time1)) {
            time.push(time1);
            console.log(time);
            this.setState({ time });
        } else {
            let number = time.indexOf(time1);
            time.splice(number, 1);
            console.log(time);
            this.setState({ time });
        }

    }

    render() {
        const { beverages,time } = this.state;
        return (
            <div>

                <div className="container-fluid  my-5" >
                    <div className="row">
                        <div className="col-md-4 col-sm-6 my-3" >

                            <img width="200px" className={beverages.includes('coffee') ? "img-select img-bev" : 'img-bev'} onClick={() => this.selectBeverages('coffee')} height="200px" src={coffee} />

                        </div>
                        <div className="col-md-4 col-sm-6 my-3"  >

                            <img width="200px" className={beverages.includes('juice') ? "img-select img-bev" : 'img-bev'} onClick={() => this.selectBeverages('juice')} height="200px" src={juice} />

                        </div>
                        <div className="col-md-4 col-sm-6 my-3" >

                            <img width="200px" className={beverages.includes('cocktail') ? "img-select img-bev" : 'img-bev'} height="200px" onClick={() => this.selectBeverages('cocktail')} src={cocktail} />

                        </div>
                    </div>
                    <div className="row timeDiv my-5" >
                        <div
                            className={time.includes('30') ? "time min  col-md-3 col-sm-6" : 'min  col-md-3 col-sm-6'}
                            onClick={() => this.selectTime('30')}
                        >
                            <h1>30</h1><p>Minutes</p>
                        </div>
                        <div
                            className={time.includes('60') ? "time min  col-md-3 col-sm-6" : 'min  col-md-3 col-sm-6'}                           
                            onClick={() => this.selectTime('60')}
                        ><h1>60</h1><p>Minutes</p></div>
                        <div
                            className={time.includes('120') ? "time min  col-md-3 col-sm-6" : 'min  col-md-3 col-sm-6'}                            
                            onClick={() => this.selectTime('120')}
                        ><h1>120</h1><p>Minutes</p></div>
                    </div>
                </div>
                <button onClick={() => this.submitData()}>
                    Next
                </button>
            </div>
        )
    }
}

export default Drinks;