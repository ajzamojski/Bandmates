import React, { Component } from 'react';

class Home extends Component {

	render () {

		return (
		<div>
         {/*Navigation*/}
        <nav id="mainNav" class="navbar navbar-default navbar-custom navbar-fixed-top">
            <div class="container">
                 {/*Brand and toggle get grouped for better mobile display*/}
                <div class="navbar-header page-scroll">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
                    </button>
                    <a class="navbar-brand page-scroll" href="#page-top">Bandmates</a>
                </div>

                 {/*Collect the nav links, forms, and other content for toggling*/}
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="hidden">
                            <a href="#page-top"></a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#about">About</a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#login">Sign up / Login</a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#team">Team</a>
                        </li>
                        <li>
                            <a class="page-scroll" href="#contact">Contact Us</a>
                        </li>
                    </ul>
                </div>
                {/*/.navbar-collapse*/}
            </div>
            {/*/.container-fluid*/}
        </nav>

        {/*Header*/}
        <header>
            <div class="container">
                <div class="intro-text">
                    <div class="intro-lead-in">Welcome To</div>
                    <div class="intro-heading">Bandmates</div>
                    <div class="intro-lead-out">Your hub for musicians, everywhere.</div>
                    <a href="#about" class="page-scroll btn btn-xl">About Us</a>
                </div>
            </div>
        </header>

        {/*Services Section*/}
        <section id="about">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h2 class="section-heading">WE KNOW THE STRUGGLE</h2>
                        <h3 class="section-subheading text-muted">Looking for a gig? Need a new voice for your hot mixtape? Want to promote a jam session?
                            Do it through here. Bandmates is your social platform specifically for connecting musicians, singers and producers alike. 
                            Our aim is to help people find & distribute talent both locally & globally.
                        </h3>
                    </div>
                </div>
                <div class="row text-center">
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <i class="fa fa-circle fa-stack-2x text-primary"></i>
                            <i class="fa fa-search fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 class="service-heading">Find Musicians</h4>
                        <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                    </div>
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <i class="fa fa-circle fa-stack-2x text-primary"></i>
                            <i class="fa fa-users fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 class="service-heading">Socialize</h4>
                        <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                    </div>
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <i class="fa fa-circle fa-stack-2x text-primary"></i>
                            <i class="fa fa-calendar fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 class="service-heading">Live Events & Jams</h4>
                        <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                    </div>
                </div>
            </div>
        </section>

         {/*Login Grid Section*/}
        <section id="login" class="bg-light-gray">
            <div class="container">
                <div class="row">
                    <div class="text-center">
                        <h2 class="section-heading">Signup or Login</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6 login-item">
                        <div class="container">
							<div class="row">
								{/*Sign up*/}
								<div class="col-lg-8 col-lg-offset-2">
										<h2>Sign Up</h2>
										<p>We just need some info</p>
										<form id="signupForm">
										<div class="form-group col-xs-6">
											<label for="firstName">First Name: </label>
											<input type="text" class="form-control" placeholder="Your First Name *" id="firstName" required data-validation-required-message="Please enter your first name."/>
											<p class="help-block text-danger"></p>
										</div>
										<div class="form-group col-xs-6">
											<label for="lastName">Last Name: </label>
											<input type="text" class="form-control" placeholder="Your Last Name *" id="lastName" required data-validation-required-message="Please enter your last name."/>
											<p class="help-block text-danger"></p>
										</div>
										
										<div class="form-group col-xs-12">
											<label for="email">Email: </label>
											<input type="text" class="form-control" placeholder="Username *" id="email" required data-validation-required-message="Please enter a username."/>
											<p class="help-block text-danger"></p>
										</div>
										<div class="form-group col-xs-6">
											<label for="password">Password: </label>
											<input type="text" class="form-control" placeholder="Password *" id="password" required data-validation-required-message="Please enter a password."/>
											<p class="help-block text-danger"></p>
										</div>
										<div class="form-group col-xs-6">
											<label for="confirmpw">Confirm Password: </label>
											<input type="text" class="form-control" placeholder="Confirm Password *" id="confirmpw" required data-validation-required-message="Please confirm/check your password."/>
											<p class="help-block text-danger"></p>
										</div>
										<button type="button" class="btn btn-primary" id="signupBtn">Sign Up</button>
										</form>
								</div>

								{/*Log In*/}
								<div class="col-lg-8 col-lg-offset-2">
									<h2>Login</h2>
									<form id="loginForm">
									<div class="form-group col-xs-12">
										<label for="username">Username: </label>
										<input type="text" class="form-control" placeholder="Username *" id="username" required data-validation-required-message="Please enter a username."/>
										<p class="help-block text-danger"></p>
									</div>
									<div class="form-group col-xs-12">
										<label for="userpw">Password: </label>
										<input type="text" class="form-control" placeholder="Password *" id="userpw" required data-validation-required-message="Please enter a password."/>
										<p class="help-block text-danger"></p>
									</div>
									<button type="button" class="btn btn-primary">Login</button>
									</form>
								</div>
							</div>
						</div>
					
						<div>
							<a href="#signupModal1" class="login-link" data-toggle="modal">

								<div class="login-hover">
									<div class="login-hover-content">
										<i class="fa fa-plus fa-3x"></i>
									</div>
								</div>
								<img src="img/portfolio/roundicons.png" class="img-responsive" alt=""/>
							</a>
							<div class="login-caption">
								<h4>Round Icons</h4>
								<p class="text-muted">Graphic Design</p>
							</div>
						</div>
                	</div>
            	</div>
			</div>
        </section>

        {/*Team Section*/}
        <section id="team" class="bg-light-gray">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h2 class="section-heading">Our Amazing Team</h2>
                        <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="team-member">
                            <img src="#" class="img-responsive img-circle" alt=""/>
                            <h4>Kevin Lee</h4>
                            <p class="text-muted">Web Developer</p>
                            <ul class="list-inline social-buttons">
                                <li><a href="#"><i class="fa fa-twitter"></i></a>
                                </li>
                                <li><a href="#"><i class="fa fa-facebook"></i></a>
                                </li>
                                <li><a href="#"><i class="fa fa-linkedin"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="team-member">
                            <img src="#" class="img-responsive img-circle" alt=""/>
                            <h4>Ralph Manlapig</h4>
                            <p class="text-muted">Web Developer</p>
                            <ul class="list-inline social-buttons">
                                <li><a href="#"><i class="fa fa-twitter"></i></a>
                                </li>
                                <li><a href="#"><i class="fa fa-facebook"></i></a>
                                </li>
                                <li><a href="#"><i class="fa fa-linkedin"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="team-member">
                            <img src="#" class="img-responsive img-circle" alt=""/>
                            <h4>Adam Zamojski</h4>
                            <p class="text-muted">Web Developer</p>
                            <ul class="list-inline social-buttons">
                                <li><a href="#"><i class="fa fa-twitter"></i></a>
                                </li>
                                <li><a href="#"><i class="fa fa-facebook"></i></a>
                                </li>
                                <li><a href="#"><i class="fa fa-linkedin"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2 text-center">
                        <p class="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
                    </div>
                </div>
            </div>
        </section>

        {/*Clients Aside*/}
        <aside class="clients">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 col-sm-6">
                        <a href="#">
                            <img src="#" class="img-responsive img-centered" alt=""/>
                        </a>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <a href="#">
                            <img src="#" class="img-responsive img-centered" alt=""/>
                        </a>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <a href="#">
                            <img src="#" class="img-responsive img-centered" alt=""/>
                        </a>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <a href="#">
                            <img src="#" class="img-responsive img-centered" alt=""/>
                        </a>
                    </div>
                </div>
            </div>
        </aside>

        {/*Contact Section*/}
        <section id="contact">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h2 class="section-heading">Contact Us</h2>
                        <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <form name="sentMessage" id="contactForm" novalidate>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Your Name *" id="name" required data-validation-required-message="Please enter your name."/>
                                        <p class="help-block text-danger"></p>
                                    </div>
                                    <div class="form-group">
                                        <input type="email" class="form-control" placeholder="Your Email *" id="email" required data-validation-required-message="Please enter your email address."/>
                                        <p class="help-block text-danger"></p>
                                    </div>
                                    <div class="form-group">
                                        <input type="tel" class="form-control" placeholder="Your Phone *" id="phone" required data-validation-required-message="Please enter your phone number."/>
                                        <p class="help-block text-danger"></p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <textarea class="form-control" placeholder="Your Message *" id="message" required data-validation-required-message="Please enter a message."></textarea>
                                        <p class="help-block text-danger"></p>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="col-lg-12 text-center">
                                    <div id="success"></div>
                                    <button type="submit" class="btn btn-xl">Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <span class="copyright">Copyright &copy; Bandmates 2017</span>
                    </div>
                    <div class="col-md-4">
                        <ul class="list-inline social-buttons">
                            <li><a href="#"><i class="fa fa-twitter"></i></a>
                            </li>
                            <li><a href="#"><i class="fa fa-facebook"></i></a>
                            </li>
                            <li><a href="#"><i class="fa fa-linkedin"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <ul class="list-inline quicklinks">
                            <li><a href="#">Privacy Policy</a>
                            </li>
                            <li><a href="#">Terms of Use</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

        <div class="login-modal modal fade" id="signupModal1" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-dismiss="modal">
                        <div class="lr">
                            <div class="rl">
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 col-lg-offset-2">
                                <div class="modal-body">
                                    <h2>Sign Up</h2>
                                    <p>We just need some info</p>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Your First Name *" id="firstName" required data-validation-required-message="Please enter your first name."/>
                                        <input type="text" class="form-control" placeholder="Your Last Name *" id="lastName" required data-validation-required-message="Please enter your last name."/>
                                        <p class="help-block text-danger"></p>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Username *" id="username" required data-validation-required-message="Please enter a username."/>
                                        <p class="help-block text-danger"></p>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Password *" id="password" required data-validation-required-message="Please enter a password." />
                                        <input type="text" class="form-control" placeholder="Confirm Password *" id="confirmpw" required data-validation-required-message="Please confirm/check your password." />
                                        <p class="help-block text-danger"></p>
                                    </div>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-times"></i> Sign Up</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-times"></i> Close </button>
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
}

module.exports = Home;