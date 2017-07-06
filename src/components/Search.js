// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// TO DO:
// 1. Retrieve users from DB by filter/params
// 2. Put in handleSubmit function for saving to DB
// 3. Integrate geolocation/radius logic
// 4. Styling
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

var React = require('react');

const instruments = ['Ajaeng', 'Bag Pipes','Bassoon', 'Beatboxing', 'Baritone', 'Clarinet', 'Disc Jockey','Drums','Electronic Instrument', 
'Flute', 'French Horn', 'Guitar', 'Harmonica', 'Harp', 'Keyboard', 'Oboe', 'Percussion','Piano', 'Piccolo','Pipe Organ', 'Recorder', 
'Saxophone', 'Sousaphone', 'Trombone', 'Trumpet', 'Tuba', 'Ukelele', 'Vibraphone', 'Viola', 'Violin', 'Voice', 'Xylophone', 'Other'];

const states = ["AK","AL","AR","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS",
"KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM",
"NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];

var address;
var latInst;
var lngInst;

import { 
    BrowserRouter as Router, 
    Route, 
    Link 
} from "react-router-dom";
var Helpers = require('./utils/helpers');

var Search = React.createClass({
	getInitialState: function() {
        return {
			user: undefined,
			currentUsers: [],
			usersByRadius: [],
			noResults: ""
        };
  	},
	filterUsersByRadius(fixedGeoLat, fixedGeoLng, radius) {

		var a = parseFloat(fixedGeoLat);
		var b = parseFloat(fixedGeoLng);

		//iterate through the currentUsers array and grab each lat/lng
		for (var i = 0; i < this.state.currentUsers.length; i++) {
			var loc = (this.state.currentUsers[i].city + ", " + this.state.currentUsers[i].state);
			var newUser = this.state.currentUsers[i];

			Helpers.runQuery(loc, newUser)
			.then(function(res) {
				var c = res.lat;
				var d = res.lng;
				console.log(res);

				// get difference (in mi.) between the 2 geolocations
				var from = new google.maps.LatLng(a, b);
				var to = new google.maps.LatLng(c, d);

				var dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
				var distMiles;

				distMiles = (dist / 1609.344);
				// console.log("distMiles: " + distMiles);

				//if difference below the radius, append to this.state.usersByradius array
				if (distMiles <= radius) {
					// console.log("in range")
					
					this.setState({
						usersByRadius: this.state.usersByRadius.concat(res.user)
					})
					
				} else {
					// console.log("not in range") 
				}

				if (this.state.usersByRadius.length > 0) {
					this.setState({noResults : ""})
				} else {
					this.setState({noResults : "No Results Found"})
				}

			}.bind(this))

		}

	},
	getMusicians(inst,city,state,radius,gender) {
			
		//get users in the database
		Helpers.getUsers(inst,gender)
		.then(function(result) {
			console.log(result.data)

			if (result.data.length > 0 ) {
				
				this.setState({noResults : ""}, () => {
					
				})
			} else {
				
				this.setState({noResults : "No Results Found"}, () => {
					console.log('no users')
				})

			} 

			//build new state for each user, concat to currentUsers state array
			for(var i = 0; i < (result.data.length); i++) {
				var newState = {
					firstName: '',
					lastName: '',
					username: '',
					city: '',
					state: '',
					zip: '',
					age: '',
					gender: '',
					instruments: '',
					photo: '',
					specifics: '',
					key: ''
				};

				newState.firstName = result.data[i].firstName;
				newState.lastName = result.data[i].lastName;
				newState.username = result.data[i].username;
				newState.city = result.data[i].city;
				newState.state = result.data[i].state;
				if(result.data[i].zip == undefined) {
					newState.zip = '';
				} else {
					newState.zip = result.data[i].zip;
				}
				newState.age = result.data[i].age;
				newState.gender = result.data[i].gender;
				newState.instruments = result.data[i].instruments;
				if(result.data[i].styles == null) {
					newState.specifics = '';
				} else {
					newState.specifics = result.data[i].styles;
				}
				newState.photo = result.data[i].profilePic;
				newState.key = Date.now() + i;
				
				//set state
				this.setState({
					currentUsers: this.state.currentUsers.concat(newState)
				})
			}
			console.log(this.state.currentUsers)
			

			//declare lat/lng variables here
			var ab;
			var cd;

			//fixed point geolocation saved into 'lat' + 'lng'
			var location1 = (city + ", " + state);
			Helpers.runQuery(location1)
			.then(function(result) {
				ab = result.lat;
				cd = result.lng;
				this.filterUsersByRadius(ab,cd,radius)
				
			}.bind(this))

		}.bind(this))	
	},  	
	handleSubmit: function(event) {
		event.preventDefault();
		
		//clear currentUsers array
		//clear usersByRadius array

		this.setState({
			currentUsers : [],
			usersByRadius: []
		});

		// var prof = this.refs.professionFilt.value;
		var inst = this.refs.instrumentFilt.value;;
		var city = this.refs.cityFilt.value;
		var state = this.refs.stateFilt.value;
		var gender = this.refs.gender.value;
		var radius = this.refs.radiusFilt.value;

		this.getMusicians(inst,city,state,radius,gender);
	},
	componentDidMount: function() {
		console.log('Component Mounted - Search');
		this.setState({user: this.props.theUser});
		console.log(this.state.user);
	},
	render () {

		return (
			<div className ="container contentWrapper">
				{/*BreadCrumb*/}
				<div className="row">
					<h2 style={{fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none'}}>Main > Search</h2>
				</div>

				{/*Search Filter*/}
				<div id="searchForm" className="row">

					<h1 id="searchHeader">Musician Search</h1>
					
					<div className="panel">
					<div className="panel-heading">
                        SEARCH FILTER
                    </div>

					<div className="panel-body">
					<p>Find musicians in your area</p>
					<form name="filter" method="get" onSubmit={this.handleSubmit}>
						
						{/*<div className="form-group">
							
							<label htmlFor="profession">Profession/Role:</label>
							<input placeholder="Musician/Drummer/Singer" type="text" className="form-control" id="professionFilt" name="professionFilt" ref="professionFilt"/>
							
						</div>*/}

						<div className="form-group">
							<label htmlFor="instrumentFilt">Instrument:</label>
							<select className="form-control" defaultValue="Please select an instrument" id="instrumentFilt" name="instrumentFilt" ref="instrumentFilt">
								<option disabled>Please select an instrument</option>
								{
									instruments.map(function(el) {
										return <option key ={el}value={el}>{el}</option>
									})
								}
							</select>
						</div>

						<div className="form-group">
							<div style={{width: '110%'}}>
								<label htmlFor="cityFilt">City:</label>
								<input placeholder="City" type="text" className="form-control" id="cityFilt" name="cityFilt" ref="cityFilt"/>
							</div>
						</div>

						<div className="form-group">
							<div>
								<label htmlFor="stateFilt">State:</label>
								
								<select className="form-control" id="stateFilt" name="stateFilt" ref="stateFilt">
									{
										states.map(function(el) {
											return <option key ={el}value={el}>{el}</option>
										})
									}
								</select>
							</div>
						</div>

						<div className="form-group">
						<label htmlFor="gender">Gender:</label>
						<select className="form-control col-xs-3" id="gender" name="gender" ref="gender">
								<option key="MALE" value="MALE">Male</option>
								<option key="FEMALE" value="FEMALE">Female</option>
						</select>
						</div>

						<div className="form-group">
						<label htmlFor="radius">Radius (mi.):</label>
						<select className="form-control" id="radiusFilt" name="radiusFilt" ref="radiusFilt">
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={15}>15</option>
							<option value={25}>25</option>
							<option value={40}>40</option>
						</select>
						</div>
						
						<button type="submit" className="btn btn-lg" id="musicianBtn">Submit</button>
					</form>
					</div>
					</div>

					<div className="panel">
					<div className="panel-heading">
                        RESULTS
                    </div>
					<div className="panel-body" id="musicianSearchResults">
						{this.state.noResults}
						{/*<Route path="/user/events/search" component={Results}/>*/}
						<div id="loadingImg" style={{display: 'none', margin: '0 auto'}}>
								<img src="http://nyoperafest.com/2017/wp-content/themes/piper/assets/images/loading.GIF" />
						</div>
						{this.state.usersByRadius.map(function(user) {
								return (
								<div className="resultSearch" key={user.key} data-key={user.key} style={{overflow: 'hidden'}}>
									
									<img className="imgResponsive" style={{maxHeight:'200px' , float:'left'}}src={user.photo}/>
									<div style={{display: 'flex', flexDirection: 'column', float: 'left'}}>
										<h3 className="musicName"><Link to={{pathname: "/user/profile/" + user.username, state: {username: user.username}}}><a style={{color: 'black'}} data-username ={user.username}>{user.firstName + " " + user.lastName}</a></Link></h3>
										<p style={{fontSize: '18px'}}>{user.instruments}{user.specifics == null || undefined ? "" : (": " + user.specifics)}</p>
										<p style={{fontSize: '18px'}}>{user.city + " " + user.state}{" " + user.zip}</p>
									</div>
									<div>
									</div>
									{/*<p style={{maxHeight:'200px', overflow: 'scroll', overflowX:'hidden'}}className="userDesc">{user.description}</p>*/}
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

module.exports = Search;