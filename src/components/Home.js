// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// TO DO:
// 1. Integrate the routing cleanly
// 2. Passport Integration
// 3. Styling
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
var Helpers = require('./utils/helpers');
var React = require('react');
import Modal from 'react-modal';

var signupModal = document.getElementById('signupModal');
var loginModal = document.getElementById('loginModal')
const customStyles = {
  content : {
    top                   : '17%',
    outline               : 'none',
    borderRadius          : '7px',
    backgroundColor       : '#f2f2f2',
    boxShadow             : '3px 3px 8px #333333',
  }
};

// var SimpleSlider = require('./Slider.js');
const currentURL = window.location.origin;

var Home = React.createClass({
    getInitialState: function() {
    return {
      inputNameFirst: "",
      inputNameLast: "",
      inputUserName: "",
      inputEmail: "",
      inputPassword: "",
      inputLogInUser: "",
      inputLogInPassword: "",
      inputConfirm: "",
      isLogged: false,
      modalIsOpen: false
        };
    },
    //------------------- MODAL FUNCTIONS -------------------
    openModal: function() {
        this.setState({modalIsOpen: true});
    },
    afterOpenModal: function() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#393939';
    },

    closeModal: function() {
        this.setState({modalIsOpen: false});
    },
//--------------------------------------------------------
    handleChange: function(event) {
        console.log("TEXT CHANGED");

        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    },
    validFields: function(event) {
        event.preventDefault();
        console.log("CLICKED");
        document.getElementById("registerSuccess").style.display = "none";
        document.getElementById("firstNameNotFilled").style.display = "none";
        document.getElementById("lastNameNotFilled").style.display = "none";
        document.getElementById("userNameNotFilled").style.display = "none";
        document.getElementById("emailNotFilled").style.display = "none";
        document.getElementById("passwordNotFilled").style.display = "none";
        document.getElementById("passwordNotMatched").style.display = "none";
        document.getElementById("emailTaken").style.display = "none";

        var inputState = true;
        // console.log(this.state.inputNameFirst);
        if (this.state.inputNameFirst == "") {
            document.getElementById("firstNameNotFilled").style.display = "block";
            inputState = false;
        }

        if (this.state.inputNameLast == "") {
            document.getElementById("lastNameNotFilled").style.display = "block";
            inputState = false;
        }
        if (this.state.inputUserName == "") {
            document.getElementById("userNameNotFilled").style.display = "block";
            inputState = false;
        }

        if (this.state.inputEmail == "") {
            document.getElementById("emailNotFilled").style.display = "block";
            inputState = false;
        }

        if (this.state.inputPassword == "") {
            document.getElementById("passwordNotFilled").style.display = "block";
            inputState = false;
        }

        if (this.state.inputPassword != this.state.inputConfirm) {
            document.getElementById("passwordNotMatched").style.display = "block";
            inputState = false;
        }

        console.log(inputState);
        if (inputState) {


            var userRegData = {
                firstName: this.state.inputNameFirst,
                lastName: this.state.inputNameLast,
                userName: this.state.inputUserName,
                email: this.state.inputEmail,
                password: this.state.inputPassword
            }

            console.log(userRegData);

            this.setState({         
                inputNameFirst: "",
                inputNameLast: "",
                inputUserName: "",
                inputEmail: "",
                inputPassword: "",
                inputConfirm: ""})

            Helpers.submitNewUser(userRegData).then(function (result) {

                if (result.data.registerError) {
                    document.getElementById("emailTaken").style.display = "block";
                    this.setState({isLogged: false});
                }
                else {
                    console.log(result);
                    document.getElementById("registerSuccess").style.display = "block";
                    this.setState({isLogged: result.data});
                    console.log("success");
                    console.log(this.state.isLogged);
                }
            }.bind(this));
        }
    },

    logInUser: function(event) {

        event.preventDefault();
        console.log("CLICKED");
        document.getElementById("logInUserNotFound").style.display = "none";
        document.getElementById("logInPassIncorrect").style.display = "none";
        document.getElementById("logInUserNotFilled").style.display = "none";
        document.getElementById("logInPassNotFilled").style.display = "none";

        var inputState = true;
        // console.log(this.state.inputNameFirst);
        if (this.state.inputLogInUser == "") {
            document.getElementById("logInUserNotFilled").style.display = "block";
            inputState = false;
        }

        if (this.state.inputLogInPassword == "") {
            document.getElementById("logInPassNotFilled").style.display = "block";
            inputState = false;
        }

        if (inputState) {
            this.setState({
                inputLogInUser: "",
                inputLogInPassword: ""
            });

            var userRegData = {
                email: this.state.inputLogInUser,
                password: this.state.inputLogInPassword
            }
            Helpers.logInUser(userRegData).then(function(result){

                if (result.data.loginError) {
                    if (result.data.loginError[0] === 'User not found') {
                        document.getElementById("logInUserNotFound").style.display = "block";
                    }

                    if (result.data.loginError[0] === 'Password is incorrect') {
                        document.getElementById("logInPassIncorrect").style.display = "block";
                    }  
                }
                else {
                
                console.log(result);
                document.getElementById("logInSuccess").style.display = "block";
                }

            }.bind(this));
        }
    },

    handleLogChange: function() {

    },

    handleSubmit: function() {


    },
	render: function() {

        return (
		<div>
        <nav id="mainNav" className="navbar navbar-default navbar-custom navbar-fixed-top" style={{backgroundColor: 'black'}}>
            <div className="container">
                
                <div className="navbar-header page-scroll">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
                    </button>
                    <a className="navbar-brand page-scroll" href="#page-top">Bandmates</a>
                </div>
                
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="hidden">
                            <a href="#page-top"></a>
                        </li>

                        <li>
                            <a className="page-scroll" data-toggle="modal" data-target="#signupModal">Sign up / Login</a>
                        </li>              
                        <li>
                            <a className="page-scroll" href="#about">About</a>
                        </li>
                        <li>
                            <a className="page-scroll" href="#team">Team</a>
                        </li>
                        <li>
                            <a className="page-scroll" href="#contact">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="modal fade" id="signupModal" role="dialog">
        <div className="modal-dialog" style={{width:'800px',fontFamily:'Roboto', backgroundColor: 'white', borderRadius: '10px', boxShadow:'0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)'}}>
            
            <div className="col-xs-12">
                <h2 className="text-center">Sign Up</h2>
                <p className="text-center">We just need some info</p>
                <form id="signupForm" onSubmit={this.validFields} action="/somewhere">
                    <div className="alert alert-success" id="registerSuccess" style={{display: 'none'}}>"Registration Successful"</div>
                    <div className="form-group col-xs-6">
                        <label htmlFor="firstName">First Name: </label>
                        <input type="text" className="form-control" value={this.state.inputNameFirst} onChange={this.handleChange} placeholder="Your First Name *" id="inputNameFirst"  data-validation-required-message="Please enter your first name."/>
                        <p className="help-block text-danger"></p>
                        <div className="alert alert-danger" id="firstNameNotFilled" style={{display: 'none'}}>"Please fill out your first name"</div>
                    </div>

                    <div className="form-group col-xs-6">
                        <label htmlFor="lastName">Last Name: </label>
                        <input type="text" className="form-control" value={this.state.inputNameLast} onChange={this.handleChange} placeholder="Your Last Name *" id="inputNameLast"  data-validation-required-message="Please enter your last name."/>
                        <p className="help-block text-danger"></p>
                            <div className="alert alert-danger" id="lastNameNotFilled" style={{display: 'none'}}>"Please fill out your last name"</div>
                    </div>
                    <div className="form-group col-xs-6">
                        <label htmlFor="lastName">Username: </label>
                        <input type="text" className="form-control" value={this.state.inputUserName} onChange={this.handleChange} placeholder="Your Username *" id="inputUserName"  data-validation-required-message="Please enter your Username."/>
                        <p className="help-block text-danger"></p>
                        <div className="alert alert-danger" id="userNameNotFilled" style={{display: 'none'}}>"Please fill out your username"</div>
                    </div>
                    <div className="form-group col-xs-6">
                        <label htmlFor="email">Email: </label>
                        <input type="email" className="form-control" value={this.state.inputEmail} onChange={this.handleChange} placeholder="Enter Email *" id="inputEmail"  data-validation-required-message="Please enter a username."/>
                        <p className="help-block text-danger"></p>
                        <div className="alert alert-danger" id="emailNotFilled" style={{display: 'none'}}>"Please fill out your email"</div>
                    </div>
                    <div className="form-group col-xs-6">
                        <label htmlFor="password">Password: </label>
                        <input type="password" className="form-control" value={this.state.inputPassword} onChange={this.handleChange} placeholder="Password *" id="inputPassword"  data-validation-required-message="Please enter a password."/>
                        <p className="help-block text-danger"></p>
                        <div className="alert alert-danger" id="passwordNotFilled" style={{display: 'none'}}>"Please fill out your password"</div>
                    </div>
                    <div className="form-group col-xs-6">
                        <label htmlFor="confirmpw">Confirm Password: </label>

                        <input type="password" className="form-control" value={this.state.inputConfirm} onChange={this.handleChange} placeholder="Confirm Password *" id="inputConfirm"  data-validation-required-message="Please confirm/check your password."/>

                        <p className="help-block text-danger"></p>
                    </div>
                    <button type="submit" className="btn btn-lg" id="signUpBtn">SIGN UP</button>
                    <br></br>
                        <div className="alert alert-danger" id="passwordNotMatched" style={{display: 'none'}}>"Passwords must match"</div>                                   
                    <div className="alert alert-danger" id="emailTaken" style={{display: 'none'}}>"Email is already taken, Pick another"</div>
                </form>
                <hr />
            </div>
            
            <div className="col-xs-12">
                <h2 className="text-center">Login</h2>
                <p className="text-center">Welcome back!</p>
                <form id="loginForm" onSubmit={this.logInUser} >
                    <div className="alert alert-success" id="logInSuccess" style={{display: 'none'}}>"User successfully logged in"</div>
                    <div className="form-group col-xs-12">
                        <label htmlFor="email">Email: </label>
                        <input type="email" value={this.state.inputLogInUser} onChange={this.handleChange} className="form-control" placeholder="Email *" id="inputLogInUser" data-validation-required-message="Please enter a username."/>
                        <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group col-xs-12">
                        <label htmlFor="userpw">Password: </label>
                        <input type="password" value={this.state.inputLogInPassword} onChange={this.handleChange} className="form-control" placeholder="Password *" id="inputLogInPassword" data-validation-required-message="Please enter a password."/>
                        <p className="help-block text-danger"></p>
                    </div>
                    <button type="submit" className="btn btn-lg" id="logInBtn">LOGIN</button>
                        <div className="alert alert-danger" id="logInUserNotFilled" style={{display: 'none'}}>"Please fill out your first name"</div>
                        <div className="alert alert-danger" id="logInPassNotFilled" style={{display: 'none'}}>"Please fill out your password"</div>
                        <div className="alert alert-danger" id="logInUserNotFound" style={{display: 'none'}}>"User Not Found"</div>
                        <div className="alert alert-danger" id="logInPassIncorrect" style={{display: 'none'}}>"Password was incorrect"</div>
                </form>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-lg" id="modalCloseBtn" data-dismiss="modal">CLOSE</button>
            </div>
        </div>
        </div>


        {/*Header*/}
        <header>
            {/*<SimpleSlider />*/}
            <div className="container">
                <div className="intro-text">
                    <div className="intro-lead-in">Welcome To</div>
                    <div className="intro-heading">Bandmates</div>
                    <div className="intro-lead-out">Your hub for musicians, everywhere.</div>
                    <a href="#about" className="page-scroll btn btn-xl">About Us</a>
                </div>
            </div>
            
        </header>

        {/*Services Section*/}
        <section id="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading">WE KNOW THE STRUGGLE</h2>
                        <h3 className="section-subheading text-muted">Looking for a gig? Need a new voice for your hot mixtape? Want to promote a jam session?
                            Do it through here. Bandmates is your social platform specifically for connecting musicians, singers and producers alike. 
                            Our aim is to help people find & distribute talent both locally & globally.
                        </h3>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fa fa-circle fa-stack-2x text-primary"></i>
                            <i className="fa fa-search fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="service-heading">Find Musicians</h4>
                        <p className="text-muted">Search for musicians of all sorts through our growing network.</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fa fa-circle fa-stack-2x text-primary"></i>
                            <i className="fa fa-users fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="service-heading">Socialize</h4>
                        <p className="text-muted">Get connected and friendly, with our messaging feature.</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fa fa-circle fa-stack-2x text-primary"></i>
                            <i className="fa fa-calendar fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="service-heading">Live Events & Jams</h4>
                        <p className="text-muted">Look for local music events via <i>Eventbrite</i>, right here on this platform. </p>
                    </div>
                </div>
            </div>
        </section>

         {/*Login Grid Section*/}
        {/*<section id="login" className="bg-light-gray">
            <div className="container">*/}
                {/*<div className="row">
                    <div className="text-center">
                        <h2 className="section-heading">Signup or Login</h2>
                    </div>
                </div>*/}
                {/*<div className="row">
                    <div className="col-xs-6 login-item">
                        <div className="container">
							<div className="row">
								{/*Sign up*/}
								{/*<div className="col-lg-8 col-lg-offset-2">
										<h2>Sign Up</h2>
										<p>We just need some info</p>
										<form id="signupForm" onSubmit={this.validFields} action="/somewhere">
                                        <div className="alert alert-success" id="registerSuccess" style={{display: 'none'}}>"Registration Successful"</div>
										<div className="form-group col-xs-6">
											<label htmlFor="firstName">First Name: </label>
											<input type="text" className="form-control" value={this.state.inputNameFirst} onChange={this.handleChange} placeholder="Your First Name *" id="inputNameFirst"  data-validation-required-message="Please enter your first name."/>
											<p className="help-block text-danger"></p>
										</div>
										<div className="form-group col-xs-6">
											<label htmlFor="lastName">Last Name: </label>
											<input type="text" className="form-control" value={this.state.inputNameLast} onChange={this.handleChange} placeholder="Your Last Name *" id="inputNameLast"  data-validation-required-message="Please enter your last name."/>
											<p className="help-block text-danger"></p>
										</div>
                                        <div className="form-group col-xs-6">
                                            <label htmlFor="lastName">Username: </label>
                                            <input type="text" className="form-control" value={this.state.inputUserName} onChange={this.handleChange} placeholder="Your Last Name *" id="inputUserName"  data-validation-required-message="Please enter your Username."/>
                                            <p className="help-block text-danger"></p>
                                        </div>
										<div className="form-group col-xs-6">
											<label htmlFor="email">Email: </label>
											<input type="email" className="form-control" value={this.state.inputEmail} onChange={this.handleChange} placeholder="Username *" id="inputEmail"  data-validation-required-message="Please enter a username."/>
											<p className="help-block text-danger"></p>
										</div>
										<div className="form-group col-xs-6">
											<label htmlFor="password">Password: </label>

											<input type="password" className="form-control" value={this.state.inputPassword} onChange={this.handleChange} placeholder="Password *" id="inputPassword"  data-validation-required-message="Please enter a password."/>

											<p className="help-block text-danger"></p>
										</div>
										<div className="form-group col-xs-6">
											<label htmlFor="confirmpw">Confirm Password: </label>

											<input type="password" className="form-control" value={this.state.inputConfirm} onChange={this.handleChange} placeholder="Confirm Password *" id="inputConfirm"  data-validation-required-message="Please confirm/check your password."/>

											<p className="help-block text-danger"></p>
										</div>
										<button type="submit" className="btn btn-primary" id="signUpBtn">Sign Up</button>
                                        <br></br>
                                        <div className="alert alert-danger" id="firstNameNotFilled" style={{display: 'none'}}>"Please fill out your first name"</div>
                                        <div className="alert alert-danger" id="lastNameNotFilled" style={{display: 'none'}}>"Please fill out your last name"</div>
                                        <div className="alert alert-danger" id="userNameNotFilled" style={{display: 'none'}}>"Please fill out your username"</div>
                                        <div className="alert alert-danger" id="emailNotFilled" style={{display: 'none'}}>"Please fill out your email"</div>
                                        <div className="alert alert-danger" id="passwordNotFilled" style={{display: 'none'}}>"Please fill out your password"</div>
                                        <div className="alert alert-danger" id="passwordNotMatched" style={{display: 'none'}}>"Passwords must match"</div>
                                        <div className="alert alert-danger" id="emailTaken" style={{display: 'none'}}>"Email is already taken, Pick another"</div>
										</form>
								</div>*/}

								{/*Log In*/}
								{/*<div className="col-lg-8 col-lg-offset-2">
									<h2>Login</h2>
									<form id="loginForm" onSubmit={this.logInUser} >
                                        <div className="alert alert-success" id="logInSuccess" style={{display: 'none'}}>"User successfully logged in"</div>
    									<div className="form-group col-xs-12">
    										<label htmlFor="email">Email: </label>
    										<input type="email" value={this.state.inputLogInUser} onChange={this.handleChange} className="form-control" placeholder="Email *" id="inputLogInUser" data-validation-required-message="Please enter a username."/>
    										<p className="help-block text-danger"></p>
    									</div>
    									<div className="form-group col-xs-12">
    										<label htmlFor="userpw">Password: </label>
    										<input type="password" value={this.state.inputLogInPassword} onChange={this.handleChange} className="form-control" placeholder="Password *" id="inputLogInPassword" data-validation-required-message="Please enter a password."/>
    										<p className="help-block text-danger"></p>
    									</div>
    									<button type="submit" className="btn btn-primary" id="logInBtn">Login</button>
                                         <div className="alert alert-danger" id="logInUserNotFilled" style={{display: 'none'}}>"Please fill out your first name"</div>
                                         <div className="alert alert-danger" id="logInPassNotFilled" style={{display: 'none'}}>"Please fill out your last name"</div>
                                         <div className="alert alert-danger" id="logInUserNotFound" style={{display: 'none'}}>"User Not Found"</div>
                                         <div className="alert alert-danger" id="logInPassIncorrect" style={{display: 'none'}}>"Password was incorrect"</div>
                                         
									</form>
								</div>
							</div>
						</div>*/}
                        
						{/*<div>
							<a href="#signupModal" className="login-link" data-toggle="modal">

								<div className="login-hover">
									<div className="login-hover-content">
										<i className="fa fa-plus fa-3x"></i>
									</div>
								</div>
							</a>
						</div>
                	</div>
            	</div>
			</div>
        </section>*/}

        {/*Team Section*/}
        <section id="team" className="bg-light-gray">
            <div className="container">
                 <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading">Our Amazing Team</h2>
                        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="team-member">
                           <figure className="snip1543">
                              <img src="https://avatars0.githubusercontent.com/u/19822314?v=3&s=400" alt="sample108" />
                              <figcaption>
                                <h3>Kevin Lee</h3>
                                <p>The only skills I have the patience to learn are those that have no real application in life.</p>
                              </figcaption>
                              <a href="#"></a>
                            </figure>
                            <ul className="list-inline social-buttons">
                                <li><a href="#"><i className="fa fa-twitter"></i></a>
                                </li>
                                <li><a href="#"><i className="fa fa-facebook"></i></a>
                                </li>
                                <li><a href="#"><i className="fa fa-linkedin"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="team-member">
                            <figure className="snip1543"><img src="https://avatars3.githubusercontent.com/u/23372535?v=3&s=400" alt="sample100" />
                              <figcaption>
                                <h3>Adam Zamojski</h3>
                                <p>The real fun of living wisely is that you get to be smug about it.</p>
                              </figcaption>
                              <a href="#"></a>
                            </figure>
                            <ul className="list-inline social-buttons">
                                <li><a href="#"><i className="fa fa-twitter"></i></a>
                                </li>
                                <li><a href="#"><i className="fa fa-facebook"></i></a>
                                </li>
                                <li><a href="#"><i className="fa fa-linkedin"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="team-member">
                            <figure className="snip1543"><img src="http://i.imgur.com/V56f3Uv.jpg" alt="sample101" />
                              <figcaption>
                                <h3>Ralph Manlapig</h3>
                                <p>But Calvin is no kind and loving god! He's one of the old gods! He demands sacrifice! </p>
                              </figcaption>
                              <a href="#"></a>
                            </figure>
                            <ul className="list-inline social-buttons">
                                <li><a href="#"><i className="fa fa-twitter"></i></a>
                                </li>
                                <li><a href="#"><i className="fa fa-facebook"></i></a>
                                </li>
                                <li><a href="#"><i className="fa fa-linkedin"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 text-center">
                        <p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
                    </div>
                </div>
            </div>
        </section>

        {/*Clients Aside*/}
        <aside className="clients">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6">
                        <a href="#">
                            <img src="#" className="img-responsive img-centered" alt=""/>
                        </a>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <a href="#">
                            <img src="#" className="img-responsive img-centered" alt=""/>
                        </a>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <a href="#">
                            <img src="#" className="img-responsive img-centered" alt=""/>
                        </a>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <a href="#">
                            <img src="#" className="img-responsive img-centered" alt=""/>
                        </a>
                    </div>
                </div>
            </div>
        </aside>

        {/*Contact Section*/}
        <section id="contact">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading">Contact Us</h2>
                        <h3 className="section-subheading text-muted">If you have any feedback, questions or concerns, please feel free to contact us below.</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <form name="sentMessage" id="contactForm" noValidate>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Your Name *" id="name" required data-validation-required-message="Please enter your name."/>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Your Email *" id="email" required data-validation-required-message="Please enter your email address."/>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="form-group">
                                        <input type="tel" className="form-control" placeholder="Your Phone *" id="phone" required data-validation-required-message="Please enter your phone number."/>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <textarea className="form-control" placeholder="Your Message *" id="message" required data-validation-required-message="Please enter a message."></textarea>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-lg-12 text-center">
                                    <div id="success"></div>
                                    <button type="submit" className="btn btn-xl">Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <span className="copyright">Copyright &copy; Bandmates 2017</span>
                    </div>
                    <div className="col-md-4">
                        <ul className="list-inline social-buttons">
                            <li><a href="http://www.twitter.com"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li><a href="http://www.facebook.com"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li><a href="http://www.linkedin.com"><i className="fa fa-linkedin"></i></a>
                            </li>
                            <li><a href="https://github.com/ajzamojski/Bandmates"><i className="fa fa-github"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul className="list-inline quicklinks">
                            <li><a href="#" style={{color: 'black'}}>Privacy Policy</a>
                            </li>
                            <li><a href="#" style={{color: 'black'}}>Terms of Use</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

        <div className="login-modal modal fade" id="signupModal1" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="close-modal" data-dismiss="modal">
                        <div className="lr">
                            <div className="rl">
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2">
                                <div className="modal-body">
                                    <h2>Sign Up</h2>
                                    <p>We just need some info</p>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Your FFirst Name *" id="firstName" required data-validation-required-message="Please enter your first name."/>
                                        <input type="text" className="form-control" placeholder="Your Last Name *" id="lastName" required data-validation-required-message="Please enter your last name."/>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Username *" id="username" required data-validation-required-message="Please enter a username."/>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Password *" id="password" required data-validation-required-message="Please enter a password." />
                                        <input type="text" className="form-control" placeholder="Confirm Password *" id="confirmpw" required data-validation-required-message="Please confirm/check your password." />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal"><i className="fa fa-times"></i> Sign Up</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal"><i className="fa fa-times"></i> Close </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
			)
	}
})

module.exports = Home;