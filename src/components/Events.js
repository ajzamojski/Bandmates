// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// TO DO:
// 1. Styling

// PIE IN THE SKY:
// 1. Be able to create user's own events
// 2. Show users that are going
// 3. validation
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const Results = ({match}) => {
	return <div>
				<h1></h1>
		   </div>
}

const states = ["AK","AL","AR","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS",
"KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM",
"NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];

const radius = ["5mi","10mi","15mi","25mi","40mi"];
var noResults;

var React = require('react');
// Including the Link component from React Router to navigate within our application without full page reloads
var Helpers = require('./utils/helpers');
import Validation, {Validator} from 'rc-form-validation';

import { 
    BrowserRouter as Router, 
    Route, 
    Link 
} from "react-router-dom";
var Events = React.createClass({
	getInitialState: function() {
        return {
			user: undefined,
			currentEvents: [],
			searchParams:{},
			resultsFound: ""
        }
  	},
	componentDidMount: function() {
		console.log('component mounted - events');
		// Syntax to reference props *******************************************
		var a = "yes"
		this.setState({user: this.props.theUser});
		this.setState({currentEvents: []});
	},
	postEvents: function(data) {
		Helpers.postQueryEvents(data);
	},
	showLoading: function() {
		var loading = document.getElementById('loadingImg');
		loading.show();
	},
	handleSearch: function(e) {
		e.preventDefault();

		//if statement to validate all fields are inputted
		const validation = this.refs.validation;
		validation.validate((valid) => {
		if (!valid) {
			window.alert("Please fill all required fields.")
			console.log('error in form');
			return;
		}
		console.log('submit');
		$('#loadingImg').fadeIn( "slow");
		
	
		var a = this.refs.query.value;
		var b = this.refs.city.value;
		var c = this.refs.state.value;
		var d = this.refs.startDate.value;
		var e = this.refs.endDate.value;
		var f = this.refs.radius.value;
		var lat;
		var lng;

		var loc = b + ", " + c;

		Helpers.runQuery(loc)
		.then(function(result) {
			lat = result.lat;
			lng = result.lng;

			Helpers.runQueryEvents(a,lat,lng,d,e,f)
			.then(function(result) {
				this.setState({currentEvents: []});
				//GET Eventbrite object shorthand
				var res = result.data.events;

				console.log(res);
				
				$('#loadingImg').css('display', 'none');
				
				for(var i = 0; i < (res.length); i++) {
					var newState = {
						eventName: '',
						url: '',
						key: '',
						img: '',
						start: '',
						end: ''
					};
					
					newState.eventName = res[i].name.text;
					newState.description = res[i].description.text;
					newState.url = res[i].url;
					newState.key = res[i].id;
					newState.isFree = res[i].is_free;
					var dateslice1 = res[i].start.local
					var dateslice2 = res[i].end.local
					newState.start = dateslice1.slice(0,10);
					newState.end = dateslice2.slice(0,10);

					if(res[i].logo == null) {
						newState.img = "";
					} else {
						newState.img = res[i].logo.url;
					}
					
					this.setState({
						currentEvents: this.state.currentEvents.concat(newState)
					})
				}
				if(this.state.currentEvents.length == 0) {
					this.setState({
						resultsFound : "No events were found, please try again."
					}) 
				} else {
					this.setState({
						resultsFound : ""
					}) 
				}
			}.bind(this));

		}.bind(this))
		});
	},
	render: function() {
		return (
			<div className ="container contentWrapper">
				
				{/*BreadCrumb*/}
				<div className="row">
					<h2 style={{fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none'}}>Main > Events</h2>
				</div>

				<div id="eventFilter" className="row">
					
					<h1 id="eventHeader">Events</h1>
					
					<div className="panel">
						<div className="panel-heading">
                            SEARCH FILTER
                        </div>
						<div className="panel-body">
						<p>Find events in your area</p>
						<form id="eventSearch" onSubmit={this.handleSearch} style={{padding: '10px'}}>
							<Validation ref="validation" onValidate={this.onValidate}>
							<div className = "container">
								<div className="md-form container col-xs-2">
									<label htmlFor="query">  Type of Event:</label>
									<Validator rules={[{required: true}]}>
									<input type="text" name="query" ref="query" className="form-control"/>
									</Validator>
								</div>

								<div className="md-form container col-xs-2">
									<label htmlFor="city">  City:</label>
									<Validator rules={[{required: true}]}>
									<input type="text" name="city" ref="city" className="form-control"/>
									</Validator>
								</div>

								<div className="md-form container col-xs-2">
									
									<label htmlFor="state">State:</label>
									<br />
									<Validator rules={[{required: true}]}>
									<select style={{marginLeft:'35px', width: '80%'}} className="form-control" id="state" name="state" ref="state">
										{
											states.map(function(el) {
												return <option key ={el}value={el}>{el}</option>
											})
										}
									</select>
									</Validator>
								</div>
								
								
								<div className="container col-xs-3">	
									<label htmlFor="startDate">Event Start Date Range:</label>				
									<input className="form-control" type="text" placeholder="2017-01-01" name="startDate" ref="startDate"/>
									
									<p style={{fontSize: '15px'}}className="col text-center">to</p>
									<input className="form-control" type="text" placeholder="2017-02-01" name="endDate" ref="endDate"/>
								</div>

								<div className="md-form container col-xs-2">
									<label htmlFor="radius">Radius (mi.):</label>
									<br />
									<select style={{marginLeft:'85px', width: '50%'}} className="form-control" id="radius" name="radius" ref="radius">
										{
											radius.map(function(el) {
												return <option key ={el}value={el}>{el}</option>
											})
										}
									</select>
								</div>

							</div>

							<button style={{color: 'white',backgroundColor: '#FED136'}}className="btn btn-lg" value="Search" id="eventsBtn" onSubmit={this.handleSearch}>
								<Link to="/user/events/search"></Link> <i className="fa fa-search left" />&nbsp;SEARCH</button>
						</Validation>
						</form>
						</div>
					</div>
				</div>
				<div id="eventResults" className="row">
					<div className="panel">
                        <div className="panel-heading">
                            RESULTS
                        </div>
                        <div className="panel-body" id="results">
                            <Route path="/user/events/search" component={Results}/>
								<div id="loadingImg" style={{display: 'none'}}>
									<img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src="http://nyoperafest.com/2017/wp-content/themes/piper/assets/images/loading.GIF" />
								</div>
								<div><p>{this.state.resultsFound}</p></div>
								{this.state.currentEvents.map(function(event) {
									return (
									<div className="resultEvents" key={event.key} data-key={event.key} style={{overflow: 'hidden'}}>
										<h3 className="eventTitle">{event.eventName}</h3>
										<p>Start Date: {event.start}  |  End Date: {event.end}</p>
										<img className="imgResponsive col-xs-4" style={{height:'180px' , float:'left'}}src={event.img}/>
										<p style={{maxHeight:'200px', overflow: 'scroll', overflowX:'hidden'}}className="eventDesc col-xs-7">{event.description}</p>
										<br />
										<a className="eventLink" href={event.url} target="_blank" alt="buy-tickets" style={{width: '200px',float: 'right'}}>{event.isFree == true ? "THIS EVENT IS FREE!" : "BUY TICKETS HERE"}</a>
									</div>
								);
								},this)}
                        </div>
                    </div>
				</div>
			</div>
		)
	}
});

module.exports = Events;