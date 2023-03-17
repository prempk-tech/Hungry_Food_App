import React from "react";
import "../Styles/header.css";
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { post } from '../service/service'



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'antiquewhite',
    border: 'solid 2px brown'
  },
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: "",
      display: "none",
      loginModalIsOpen: false,
      signupModalIsOpen: false,
      isLoggedIn: false,
      loggedInUser: false
      // componentClicked: false
    };
  }


  componentDidMount() {
    const path = this.props.history.location.pathname;
    this.setAttributes(path);
  }
  setAttributes = (path) => {
    let bg, display;
    if (path === "/") {
      bg = "#000000";
      display = "none";
    } else {
      bg = "#ff0000";
      display = "inline-block";
    }
    this.setState({ backgroundColor: bg, display: display });
  };

  handlelogin = () => {
    this.setState({ loginModalIsOpen: true })
  }

  LoginModal = () => {
    var mail = document.getElementById('emailId').value;
    var password = document.getElementById('password').value;
    var req = {
      "user_email": mail,
      "user_password": password
    }
    post('user/login', req).then((res) => {
      if (!res.error) {
        localStorage.setItem('token', res.data.user_token);
        this.setState({ isLoggedIn: true, loggedInUser: res.data.user_first_name + res.data.user_last_name })
        this.setState({ loginModalIsOpen: false })
      } else {
        console.log(res.message);
      }
    })

  }

  closeModal = () => {
    this.setState({ loginModalIsOpen: false })
  }

  handlesignup = () => {
    this.setState({ signupModalIsOpen: true })
  }

  handleLogout = () => {
    this.setState({ loginModalIsOpen: false, loggedInUser: undefined })

  }

  responseGoogle = (response) => {
    // this.setState = ({ isLoggedIn: true, loggedInUser: response, loginModalIsOpen: false });
  }
  // responseGoogle2 = (response) => {
  //   console.log("error", response);
  // }

  responseFacebook = (response) => {
    this.setState({ isLoggedIn: true, loggedInUser: response.name })
    // this.setState({ isLoggedIn: true, loggedInUser: response.Object.name })
  }
  render() {
    const { backgroundColor, display, loginModalIsOpen, isLoggedIn, loggedInUser, signupModalIsOpen } = this.state; //destructuring the background color
    // const {  } = this.state;
    return (
      <div>
        <div className="redbox" style={{ backgroundColor: backgroundColor }}>
          <div className="icon" style={{ display: display }}>
            e!
          </div>
          {!isLoggedIn ?
            <div className="button1">
              <button className="login" onClick={this.handlelogin}>Log In</button>
              <button className="account" onClick={this.handlesignup}> Create an account</button>
            </div>
            : <div className="button1">
              <button className="login" >{loggedInUser}</button>
              <button className="account" onClick={this.handleLogout}>Logout</button>
            </div>}
        </div>
        <Modal
          isOpen={loginModalIsOpen}
          style={customStyles}
        >
          <div>
            <GoogleLogin
              clientId="792088046122-j7985s92v1mthrcu85jf5ceg17qa530g.apps.googleusercontent.com"
              buttonText="Continue with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          </div>
          <br />
          <div>
            <FacebookLogin
              appId="2331378653693305"
              textButton="continue with Facebook"
              autoLoad={true}
              fields="name,email,picture"
              icon="fa-facebook"
              callback={this.responseFacebook} />
          </div>
          <div>
            <h2>Login</h2>
            <input type="text" id="emailId" placeholder="Email" />
            <br />
            <input type="password" id="password" placeholder="password" />
            <br />
            <div>
              <button onClick={this.LoginModal}>Login</button>
              <button onClick={this.closeModal}>Cancel</button>
              <a href="#" aria-label="if you don't have account please sign-up"></a>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={signupModalIsOpen}
          style={customStyles}
        >
          <div>
            <h2>Sign-Up</h2>
            <input type="text" placeholder="First name" />
            <br />
            <input type="text" placeholder="Last name" />
            <br />
            <input type="text" placeholder="Email" />
            <br />
            <input type="password" placeholder="password" />
            <br />
            <input type="password" placeholder="Re-Enter Password" />
            <div>
              <button>Sign-up</button>
              <button onClick={this.signupmodalclose}>cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Header;
