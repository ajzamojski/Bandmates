// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// TO DO:
// 1. User-to-User Messaging with Socket.io
// 2. Save log of messages to mySQL

// PIE IN THE SKY:
// 1. Display messages where 'from:' messages on left side, while 'to:' messages on right side
// 2. Styling
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

var React = require('react');

// auth.onAuthStateChanged(function(user) { 
//     if(user) {
//         $('#btnLogout').removeClass("hide");
//         var queryUrl;
//         queryUrl = "api/buddies/" + user.email;  
//         console.log(queryUrl);

//     var yourName;

//     $.get(queryUrl, function(data) {
//             console.log(data);
//             yourName = data.firstName;
//             console.log(yourName);
//             currentid = data.id;
//             return currentid;

//             return yourName;
            
//         });

//       $(function () {
        
//         var socket = io();
//         $('form').submit(function(){
//           socket.emit('chat message', $('#m').val());
//           $('#m').val('');
//           return false;
//         });
//         socket.on('chat message', function(msg){
//           $('#messages').append($('<li>').text(yourName + ": " +msg));
//           window.scrollTo(0, document.body.scrollHeight);
//         });
//       });

       
//     } else {
//         console.log('Not logged in');
//         $('#btnLogout').addClass("hide");
//     }
 
// });

// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

var Messenger = React.createClass ({
	getInitialState: function() {
        return {
            state: null
        }
  	},
	render: function() {
		return (
			<div className ="container">
				<div className="row">
					<div className="jumbotron">
						<h1>Messenger</h1>
					</div>
				</div>
			</div>
			)
	}
});

module.exports = Messenger;