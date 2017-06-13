import React, { Component } from 'react'
import { render } from 'react-dom'

class UserLogin extends Component {

	constructor(props) {
	    super(props);
        this.handleUserLogin = this.handleUserLogin.bind(this);

	    this.state = {
            user: this.props.store.database.user,
            loginData: this.props.store.database.loginData
	    };
    }

    componentWillReceiveProps(nextProps) {
        const user = nextProps.store.database.user,
              loginData = nextProps.store.database.loginData;

        this.setState({
            user,
            loginData
        });
    }

    handleUserLogin (event) {
        event.preventDefault();

        let loginData = {
            username: this.refs.admin_username.value,
            password: this.refs.admin_password.value
        }

        this.props.processLoginData(loginData);
    }

    render() {
        let condition = !this.state.user && this.state.loginData !== false;

    	return (
    		<div id="userlogin-div-e1">
                <div id="userlogin-div-e2" className="col-sm-12">Enter login data for admin access</div>
    			<form onSubmit={(event) => this.handleUserLogin(event)}>
                    <div className="col-sm-4"></div>
                    <div id="userlogin-div-form-e1" className="col-sm-4 inputlist" >
                        <div id="userlogin-div-form-e2">
                            <label htmlFor="admin_username" className="inputlist-label">
                                <span className="inputlist-span">
                                    Username
                                </span>
                                <input type="text" title="Enter username" ref="admin_username"
                                       className="inputlist-field extraInput" id="admin_username" name="admin_username" placeholder="Username"/>
                            </label>
                            <label htmlFor="admin_password" className="inputlist-label">
                                <span className="inputlist-span">
                                    Password
                                </span>
                                <input ref="admin_password" type="password"  title="Enter password"
                                       className="inputlist-field extraInput" id="admin_password" name="admin_password" placeholder="Password" />
                            </label>
                        </div>                 
                    </div>
                    <div className="col-sm-4"></div>
                    {condition && 
                        <div id="userlogin-wrong-data" className="col-sm-12" ref="error_msg">
                            Oops! Username or password is wrong.
                        </div>
                    }
                    <div className="col-sm-12" id="submitLoginWrapper">
                        <button id="btnSubmitLoginData" type="submit" className="btn btn-primary">Einloggen</button>
                    </div>
                </form>
    		</div>
		);
    }
}

export default UserLogin;