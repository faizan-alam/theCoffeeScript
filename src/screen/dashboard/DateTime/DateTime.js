import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';

class DateTime extends Component {
    constructor() {
        super()
        this.state = {
            startDate: new Date()
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        let date1 = moment(date);
        this.props.confirmTime(date1.unix());
    }

    render() {
        return (
            <div>
                <DateTimePicker
                    value={this.state.startDate}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}


export default DateTime;