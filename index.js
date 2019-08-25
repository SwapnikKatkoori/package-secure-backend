const server = require('http').createServer();
var twilio = require('twilio');
const io = require('socket.io')(server);


io.on('connection', client => {

  client.on('confirm', data => {
	console.log("Package was confirmed")

	var twilioClient = new twilio('AC69545bf97209c17cacc09c7b58c89133', '66d717737dea99ffdadaef94c114120d');

	// Send the text message.
	twilioClient.messages.create({
	  to: '+15175283678',
	  from: '+19523146862',
	  body: 'Thank you for confirming!'
	});
  });

  client.on('deny', data => { 
  	var twilioClient = new twilio('AC69545bf97209c17cacc09c7b58c89133', '66d717737dea99ffdadaef94c114120d');
  	twilioClient.messages.create({
	  to: '+15175283678',
	  from: '+19523146862',
	  body: 'Your package has been stolen. A report has been sent to Amazon.'
	});
  });

  client.on('disconnect', () => { console.log("Socket disconnected") });
});
server.listen( process.env.PORT || 5000 );