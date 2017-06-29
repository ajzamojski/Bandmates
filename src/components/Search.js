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

var Helpers = require('./utils/helpers');

var Search = React.createClass({
	getInitialState: function() {
        return {
			currentUsers: [],
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
	getMusicians() {
		Helpers.getUsers()
		.then(function(result) {
			console.log(result)
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
				};
				
				newState.firstName = result.data[i].firstName;
				newState.lastName = result.data[i].lastName;
				newState.city = result.data[i].city;
				newState.state = result.data[i].state;
				newState.zip = result.data[i].zip;
				newState.age = result.data[i].age;
				newState.gender = result.data[i].gender;
				newState.instrument = result.data[i].instrument;
				
				this.setState({
					currentUsers: this.state.currentUsers.concat(newState)
				})
			}
			console.log(this.state.currentUsers)
		}.bind(this))
		// console.log(this.state.currentUsers)
	},  	
	handleSubmit: function(event) {
		event.preventDefault();
		this.getMusicians();
		const name = event.target.name;
		const value = event.target.value;
		// this.setState({[name] : value});
	},
	componentDidMount: function() {
		console.log('Component Mounted - Search');
	},
	render () {

		return (
			<div className ="container">
				<div className="row">
					<div id="searchForm" className="jumbotron">

						<h1 id="searchHeader">Musician Search</h1>
							<h2>Find musicians in your area</h2>
							<form style={{width: '50%'}}name="filter" method="get" onSubmit={this.handleSubmit}>
								<div className="form-group">
									<label htmlFor="profession">Profession/Role:</label>
									<input placeholder="Musician/Drummer/Singer" type="text" className="form-control" id="professionFilt" name="professionFilt"/>
									
									<label htmlFor="instrumentFilt">Instrument:</label>
									<select className="form-control" id="instrumentFilt" name="instrumentFilt">
										{
											instruments.map(function(el) {
												return <option key ={el}value={el}>{el}</option>
											})
										}
									</select>
									<div className="row form-group" style={{marginLeft: '1px'}}>
										<div style={{width: '66%', float: 'left'}}>
											<label htmlFor="cityFilt">City:</label>
											<input placeholder="City" type="text" className="form-control" id="cityFilt" name="cityFilt"/>
										</div>
										<div style={{width: '30%', float: 'left', marginLeft: '5px'}}>
											<label htmlFor="state">State:</label>
											<select className="form-control" id="state" name="state" ref="state">
												{
													states.map(function(el) {
														return <option key ={el}value={el}>{el}</option>
													})
												}
											</select>
										</div>
									</div>

									<div className="form-group">
									<label htmlFor="state">Gender:</label>
									<select className="form-control col-xs-3" id="state" name="state" ref="state">
											<option key="MALE" value="MALE">MALE</option>
											<option key="FEMALE" value="FEMALE">FEMALE</option>
									</select>
									</div>

									<div className="form-group">
									<label htmlFor="radius">Radius (mi.):</label>
									<select className="form-control" id="radiusFilt" name="radiusFilt" defaultValue="" value={this.state.radius}>
										<option value={5}>5</option>
										<option value={10}>10</option>
										<option value={20}>15</option>
										<option value={30}>25</option>
										<option value={45}>40</option>
									</select>
									</div>
								</div>
								<button type="submit" className="btn btn-lg" id="musicianBtn">Submit</button>
							</form>
					</div>
				</div>
			</div>

			)
	}
});

module.exports = Search;