const server = require('http').createServer();
var twilio = require('twilio');
const io = require('socket.io')(server);

var database = [{account_sid: 'AC69545bf97209c17cacc09c7b58c89133', auth_token: '66d717737dea99ffdadaef94c114120d', number: '+15175283678', trial: "+19523146862"},
				{account_sid: 'AC559e873ef9a5629f721e874a3b455b8e', auth_token: '0158cc48c2af684020d663b730d49245', number: '+15172432773', trial: "+13343198204"},
				{account_sid: 'AC2e03af82eda22dfcc9960e284e5fa74c', auth_token: 'd622bf5ea638178d6bb18b4afe93f7db', number: '+12269720492', trial: "place_holder"}]

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

	for (var i = 0; i < database.length; i++) {
		user = database[i]
		var twilioClient = new twilio(user.account_sid, user.auth_token);
		twilioClient.messages.create({
	  	to: user.number,
	  	from: user.trial,
	  	body: 'Warning, there has been a theft in your neighborhood.'
		});
	}
  });

  client.on('disconnect', () => { console.log("Socket disconnected") });
});
server.listen( process.env.PORT || 5000 );