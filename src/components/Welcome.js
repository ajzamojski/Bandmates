var React = require('react');
var Helpers = require('./utils/helpers');

var Welcome = React.createClass ({
    getInitialState: function() {
        return({
            user: undefined
        })
    },
    componentDidMount: function() {

    },
    render: function() {
        return (
            <div>
                {/*BreadCrumb*/}
				<div className="row breadcrumb">
					<h2 style={{fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none', fontWeight: '300'}}>Main</h2>
				</div>
                <div className="contentBanner">
                    <h1 style={{fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none'}}>Welcome to the Bandmates Main Hub!</h1>
                    <p>Here you can find the latest news & updates!</p>
                </div>
                <div id="updateDiv">
                    <h1 style={{fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none'}}>Thanks for joining in on Bandmates 1.0.0!</h1>
                    <p> We appreciate you for signing up and stopping by! Bandmates is still in its early stages, but we hope you follow along on our journey.
                        Make sure to tune in on future updates and extra featues to bring you a seamless experience. 
                        <br/><br/>
                        -Sincerely,
                        <br />
                        The Bandmates Team
                    </p>
                </div>
            </div>
        );
    }

});

module.exports = Welcome;