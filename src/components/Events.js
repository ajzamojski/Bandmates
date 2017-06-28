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
import { 
    BrowserRouter as Router, 
    Route, 
    Link 
} from "react-router-dom";
var Events = React.createClass({
	getInitialState: function() {
        return {
			currentEvents: [],
			searchParams:{},
			resultsFound: ""
        }
  	},
	componentDidMount: function() {
		console.log('component mounted - events');
		// Syntax to reference props *******************************************
		var a = "yes"
		this.props.something(a)
		this.setState({currentEvents: []});
	},
	postEvents: function(data) {
		Helpers.postQueryEvents(data);
	},
	handleSearch: function(e) {
		e.preventDefault();

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

				for(var i = 0; i < (res.length/2); i++) {
					var newState = {
						eventName: '',
						url: '',
						key: '',
						img: '',
					};
					
					newState.eventName = res[i].name.text;
					newState.description = res[i].description.text;
					newState.url = res[i].url;
					newState.key = res[i].id;
					newState.isFree = res[i].is_free;
					console.log(res[i].logo);

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

		
		
	},
	render: function() {
		return (
			<div className ="container jumbotron" style={{paddingLeft: '50px', paddingRight:'50px'}}>
				
				<div id="eventFilter" className="row">
					
					<h1 id="eventHeader">Events</h1>
					
					<div className="panel panel-primary">
						<div className="panel-heading">
                            SEARCH FILTER
                        </div>
						<div className="panel-body">
						<form id="eventSearch" onSubmit={this.handleSearch} style={{padding: '10px'}}>
							<div className = "container">
								<div className="md-form container col-xs-2">
									
									<input type="text" name="query" ref="query" className="form-control"/>
									<label htmlFor="query">  Type of Event:</label>
									
								</div>

								<div className="md-form container col-xs-2">
									<input type="text" name="city" ref="city" className="form-control"/>
									<label htmlFor="city">  City:</label>
									
								</div>

								<div className="md-form container col-xs-2">
									
									<label htmlFor="state">State:</label>
									<br />
									<select style={{marginLeft:'35px', width: '80%'}} className="form-control" id="state" name="state" ref="state">
										{
											states.map(function(el) {
												return <option key ={el}value={el}>{el}</option>
											})
										}
									</select>
								</div>
								
								
								<div className="md-form container col-xs-3">	
									<label htmlFor="startDate">Event Start Date Range:</label>				
									<input className="form-control" type="text" placeholder="2017-01-01" name="startDate" ref="startDate"/>
									{/*<label htmlFor="startDate">Event Start Date Range:</label>*/}
									<p className="col text-center">to</p>
									<input className="col" type="text" placeholder="2017-02-01" name="endDate" ref="endDate"/>
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

							<button className="btn btn-yellow waves-effect" value="Search" id="searchBtn" onSubmit={this.handleSearch}>
								<Link to="/user/events/search"></Link> <i className="fa fa-search left" />Search</button>
						</form>
						</div>
					</div>
				</div>
				<div id="eventResults" className="row">
					<div className="panel panel-primary">
                        <div className="panel-heading">
                            SEARCH RESULTS
                        </div>
                        <div className="panel-body" id="results">
                            <Route path="/user/events/search" component={Results}/>
								<div><p>{this.state.resultsFound}</p></div>
								{this.state.currentEvents.map(function(event) {
									return (
									<div className="resultEvents" key={event.key} data-key={event.key} style={{overflow: 'hidden'}}>
										<h2 className="eventTitle">{event.eventName}</h2>
										<img className="imgResponsive col-xs-4" style={{height:'180px' , float:'left'}}src={event.img}/>
										<p className="eventDesc col-xs-7">{event.description}</p>
										<br />
										<a className="eventLink" href={event.url} target="_blank" alt="buy-tickets" style={{float: 'right'}}>{event.isFree == true ? "This Event is Free!" : "Buy Tickets Here"}</a>
										
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