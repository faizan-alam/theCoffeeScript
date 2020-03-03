import React, { Component } from 'react';




class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            number: ''
        }
    }
    handleNumber(number) {
        if (!number || number.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState({ number })
        }
    }



    render() {
        const { number, name } = this.state;
        const { SubmitInfo } = this.props;
        return (
            <div>
                <div>
                    <h3>
                        Please Input Your Info
                </h3>
                </div>
                <form className="form-group" onSubmit={(e) => { e.preventDefault(); SubmitInfo(this.state) }} >
                    <label  >
                        NikName :
                    <input
                            required
                            value={name}
                            className="form-control"
                            placeholder=""
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        PhoneNumber :
                    <input
                            required
                            value={number}
                            className="form-control"
                            placeholder=""
                            type="text"
                            onChange={(e) => this.handleNumber(e.target.value)}
                        />
                    </label>
                    <br />
                    <button>
                        Next
                    </button>
                </form>
            </div >
        )
    }
}
export default UserInfo;