
var mqtt = require('mqtt')


var options = {
  port: 17419,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: "IoT_Data",
  password: "dt021a",
};


var client  = mqtt.connect('mqtt://m21.cloudmqtt.com', options)

   client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe('home/kitchen/lightlevel', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });
});
  

setInterval(function() {

var peripheral = "B2:CB:38:AB:4E:E0";
var data = Math.floor((Math.random() * 0xFF) + 1);	

var bcast = JSON.stringify({name: peripheral, lightLevel: data.toString(16), ts: new Date()});

// publish a message to a topic
  client.publish('home/kitchen/lightlevel', bcast, function() {
  console.log("Message is published");
//client.end(); // Close the connection when published
  });
  }, 60000);
