// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// TO DO:
// 1. Integrate the routing cleanly
// 2. Passport Integration
// 3. Styling
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

var React = require('react');
var Home = React.createClass({

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
                            <a className="page-scroll" href="#about">About</a>
                        </li>
                        <li>
                            <a className="page-scroll" href="#login">Sign up / Login</a>
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

        {/*Header*/}
        <header>
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
                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fa fa-circle fa-stack-2x text-primary"></i>
                            <i className="fa fa-users fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="service-heading">Socialize</h4>
                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fa fa-circle fa-stack-2x text-primary"></i>
                            <i className="fa fa-calendar fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="service-heading">Live Events & Jams</h4>
                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                    </div>
                </div>
            </div>
        </section>

         {/*Login Grid Section*/}
        <section id="login" className="bg-light-gray">
            <div className="container">
                <div className="row">
                    <div className="text-center">
                        <h2 className="section-heading">Signup or Login</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6 login-item">
                        <div className="container">
							<div className="row">
								{/*Sign up*/}
								<div className="col-lg-8 col-lg-offset-2">
										<h2>Sign Up</h2>
										<p>We just need some info</p>
										<form id="signupForm">
										<div className="form-group col-xs-6">
											<label htmlFor="firstName">First Name: </label>
											<input type="text" className="form-control" placeholder="Your First Name *" id="firstName" required data-validation-required-message="Please enter your first name."/>
											<p className="help-block text-danger"></p>
										</div>
										<div className="form-group col-xs-6">
											<label htmlFor="lastName">Last Name: </label>
											<input type="text" className="form-control" placeholder="Your Last Name *" id="lastName" required data-validation-required-message="Please enter your last name."/>
											<p className="help-block text-danger"></p>
										</div>
										
										<div className="form-group col-xs-12">
											<label htmlFor="email">Email: </label>
											<input type="text" className="form-control" placeholder="Username *" id="email" required data-validation-required-message="Please enter a username."/>
											<p className="help-block text-danger"></p>
										</div>
										<div className="form-group col-xs-6">
											<label htmlFor="password">Password: </label>
											<input type="password" className="form-control" placeholder="Password *" id="password" required data-validation-required-message="Please enter a password."/>
											<p className="help-block text-danger"></p>
										</div>
										<div className="form-group col-xs-6">
											<label htmlFor="confirmpw">Confirm Password: </label>
											<input type="password" className="form-control" placeholder="Confirm Password *" id="confirmpw" required data-validation-required-message="Please confirm/check your password."/>
											<p className="help-block text-danger"></p>
										</div>
										<button type="button" className="btn btn-primary" id="signupBtn">Sign Up</button>
										</form>
								</div>

								{/*Log In*/}
								<div className="col-lg-8 col-lg-offset-2">
									<h2>Login</h2>
									<form id="loginForm">
									<div className="form-group col-xs-12">
										<label htmlFor="username">Username: </label>
										<input type="text" className="form-control" placeholder="Username *" id="username" required data-validation-required-message="Please enter a username."/>
										<p className="help-block text-danger"></p>
									</div>
									<div className="form-group col-xs-12">
										<label htmlFor="userpw">Password: </label>
										<input type="password" className="form-control" placeholder="Password *" id="userpw" required data-validation-required-message="Please enter a password."/>
										<p className="help-block text-danger"></p>
									</div>
									<button type="button" className="btn btn-primary">Login</button>
									</form>
								</div>
							</div>
						</div>
                        
						<div>
							<a href="#signupModal1" className="login-link" data-toggle="modal">

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
        </section>

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
                        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
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
                            <li><a href="#"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-linkedin"></i></a>
                            </li>
                            <li><a href="https://github.com/ajzamojski/Bandmates"><i className="fa fa-github"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul className="list-inline quicklinks">
                            <li><a href="#">Privacy Policy</a>
                            </li>
                            <li><a href="#">Terms of Use</a>
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
                                        <input type="text" className="form-control" placeholder="Your First Name *" id="firstName" required data-validation-required-message="Please enter your first name."/>
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