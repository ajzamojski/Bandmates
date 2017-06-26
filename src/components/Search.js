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

var Search = React.createClass({
	getInitialState: function() {
        return {
			firstName: 'Kevin',
			lastName: 'Lee',
			email: 'zapetou@gmail.com',
			city: 'Edison',
			stateLocation: 'NJ',
			zip: '08854',
			age: '25',
			gender: 'Male',
			instrument: 'Trumpet',
			education: 'Rutgers U.',
			radius: undefined
        };
  	},
	handleSubmit: function(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name] : value});
		
	},
	componentDidMount: function() {
		console.log('Component Mounted - Search');
	},
	render () {

		return (
			<div className ="container">
				<div className="row">
					<div className="jumbotron">

						<h1>Musician Search</h1>
							<h2 className="text-center">What type of musician are you looking for?</h2>
							<form name="filter" method="get" onSubmit={this.handleSubmit}>
								<div className="form-group">
									<label htmlFor="profession">Profession/Role:</label>
									<input placeholder="Musician/Drummer/Singer" type="text" className="form-control" id="professionFilt" name="professionFilt"/>
									
									<label htmlFor="instrument">Instrument/Tool:</label>
									<select className="form-control" id="instrumentFilt" name="instrumentFilt"></select>

									<div className="form-group">
										<label htmlFor="cityFilter">City:</label>
										<input placeholder="City" type="text" className="form-control" id="cityFilt" name="cityFilt"/>
										<label htmlFor="state">State:</label>
										<select className="form-control" id="stateFilt" name="stateFilt"></select>
									</div>

									<input placeholder="Gender" type="text" className="form-control" id="genderFilt" name="genderFilt"/>

									<label htmlFor="radius">Radius:</label>
									<select className="form-control" id="radiusFilt" name="radiusFilt" defaultValue="" value={this.state.radius}>
										<option value={5}>5</option>
										<option value={10}>10</option>
										<option value={20}>15</option>
										<option value={30}>25</option>
										<option value={45}>40</option>
									</select>
								</div>
								<button type="submit" className="btn btn-lg" id="SearchBtn">Submit</button>
							</form>
					</div>
				</div>
			</div>

			)
	}
});

module.exports = Search;