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

const instruments = ['Ajaeng', 'Clarinet', 'Disc Jockey','Guitar','Flute', 'Harp', 'Keyboard', 'Percussion','Piano', 
'Trombone', 'Trumpet', 'Tuba', 'Ukelele', 'Violin', 'Voice', 'Xylophone'];

const states = ["AK","AL","AR","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS",
"KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM",
"NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];
var address;
var latInst;
var lngInst;

var Helpers = require('./utils/helpers');

var Search = React.createClass({
	getInitialState: function() {
        return {
			user: undefined,
			currentUsers: [],
			usersByRadius: []
			// firstName: '',
			// lastName: '',
			// city: '',
			// stateLocation: '',
			// zip: '',
			// age: '',
			// gender: '',
			// instrument: '',
			// education: '',
			// radius: ''
        };
  	},
	filterUsersByRadius(fixedGeoLat, fixedGeoLng, radius) {

		var a = parseFloat(fixedGeoLat);
		var b = parseFloat(fixedGeoLng);

		//iterate through the currentUsers array and grab each lat/lng
		for (var i = 0; i < this.state.currentUsers.length; i++) {
			var loc = (this.state.currentUsers[i].city + ", " + this.state.currentUsers[i].state);
			var newUser = this.state.currentUsers[i];

			Helpers.runQuery(loc)
			.then(function(res) {
				console.log(res)
				var c = res.lat;
				var d = res.lng;

				console.log("a: " + a);
				console.log("b: " + b);
				console.log("c: " + c);
				console.log("d: " + d);

				// get difference (in mi.) between the 2 geolocations
				var from = new google.maps.LatLng(a, b);
				var to = new google.maps.LatLng(c, d);

				var dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
				var distMiles;

				distMiles = (dist / 1609.344);
				console.log("distMiles: " + distMiles);

				console.log(newUser)
				//if difference below the radius, append to this.state.usersByradius array
				if (distMiles <= radius) {
					console.log("in range")
					
					this.setState({
						usersByRadius: this.state.usersByRadius.concat(newUser)
					})
					console.log(this.state.usersByRadius[0]);
				} else {
					console.log("not in range") 
				}

			}.bind(this))

		}
		
		//append to results div the usersByRadius array state

	},
	getMusicians(prof,inst,city,state,radius) {
			
		//get users in the database
		Helpers.getUsers()
		.then(function(result) {
			console.log(result)
			
			//build new state for each user, concat to currentUsers state array
			for(var i = 0; i < (result.data.length); i++) {
				var newState = {
					firstName: '',
					lastName: '',
					city: '',
					state: '',
					zip: '',
					age: '',
					gender: '',
					instrument: '',
					photo: '',
					key: ''
				};

				newState.firstName = result.data[i].firstName;
				newState.lastName = result.data[i].lastName;
				newState.city = result.data[i].city;
				newState.state = result.data[i].state;
				newState.zip = result.data[i].zip;
				newState.age = result.data[i].age;
				newState.gender = result.data[i].gender;
				newState.instrument = result.data[i].instruments;
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
			console.log('85: ' + location1);
			Helpers.runQuery(location1)
			.then(function(result) {
				console.log("88: " + result)
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

		var prof = this.refs.professionFilt.value;
		var inst = this.refs.instrumentFilt.value;;
		var city = this.refs.cityFilt.value;
		var state = this.refs.stateFilt.value;
		var gender = this.refs.gender.value;
		var radius = this.refs.radiusFilt.value;

		this.getMusicians(prof,inst,city,state,radius);
	},
	componentDidMount: function() {
		console.log('Component Mounted - Search');
		this.setState({user: this.props.theUser});
	},
	render () {

		return (
			<div className ="container contentWrapper">
				<div className="row">
					<h2 style={{fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none'}}>Main > Search</h2>
				</div>
				<div className="row">
					<div id="searchForm" className="jumbotron">

						<h1 id="searchHeader">Musician Search</h1>
						<h2>Find musicians in your area</h2>
						<form style={{width: '50%'}}name="filter" method="get" onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label htmlFor="profession">Profession/Role:</label>
								<input placeholder="Musician/Drummer/Singer" type="text" className="form-control" id="professionFilt" name="professionFilt" ref="professionFilt"/>
								
								<label htmlFor="instrumentFilt">Instrument:</label>
								<select className="form-control" id="instrumentFilt" name="instrumentFilt" ref="instrumentFilt">
									{
										instruments.map(function(el) {
											return <option key ={el}value={el}>{el}</option>
										})
									}
								</select>
								<div className="row form-group" style={{marginLeft: '1px'}}>
									<div style={{width: '66%', float: 'left'}}>
										<label htmlFor="cityFilt">City:</label>
										<input placeholder="City" type="text" className="form-control" id="cityFilt" name="cityFilt" ref="cityFilt"/>
									</div>
									<div style={{width: '30%', float: 'left', marginLeft: '5px'}}>
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
							</div>
							<button type="submit" className="btn btn-lg" id="musicianBtn">Submit</button>
						</form>

						<div className="panel-body" id="musicianSearchResults">
							{/*<Route path="/user/events/search" component={Results}/>*/}
							<div id="loadingImg" style={{display: 'none', margin: '0 auto'}}>
									<img src="http://nyoperafest.com/2017/wp-content/themes/piper/assets/images/loading.GIF" />
							</div>
							{this.state.usersByRadius.map(function(user) {
									return (
									<div className="resultSearch" key={user.key} data-key={user.key} style={{overflow: 'hidden'}}>
										<h3 className="eventTitle">{user.firstName + " " + user.lastName}</h3>
										<img className="imgResponsive col-xs-2" style={{maxHeight:'200px' , float:'left'}}src={user.photo}/>
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