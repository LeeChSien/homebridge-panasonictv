var Service, Characteristic;
var http = require('http');

module.exports = function(homebridge) {

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-panasonictv", "TV", PanasonicTV);
}

function PanasonicTV(log, config) {
  this.log = log;
  this.name = config.name;
  this.HOST = config.ip;
  this.PORT = 23;

  this.service = new Service.Switch(this.name);
  this.service.getCharacteristic(Characteristic.On)
    .on("set", this.setOn.bind(this))
    .on("get", this.getOn.bind(this));
}

PanasonicTV.prototype.getServices = function() {
  return [this.service];
}

PanasonicTV.prototype.getOn = function(callback) {
  
  //WIP
  
}



PanasonicTV.prototype.setOn = function(on, callback) {

var url = "/nrc/control_0";
var action = "X_SendKey" ;
var command = "<X_KeyEvent>NRC_POWER-ONOFF</X_KeyEvent>";

var body = "<?xml version='1.0' encoding='utf-8'?> \
	   <s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/' s:encodingStyle='http://schemas.xmlsoap.org/soap/encoding/'> \
	    <s:Body> \
	     <u:"+action+" xmlns:u='urn:"+urn+"'> \
	      "+command+" \
	     </u:"+action+"> \
	    </s:Body> \
	   </s:Envelope>";
	   
	 var postRequest = {
	    host: ip,
	    path: url,
	    port: 55000,
	    method: "POST",
	    headers: {
	      'Content-Length': body.length,
	      'Content-Type': 'text/xml; charset="utf-8"',
	      'SOAPACTION': '"urn:'+urn+'#'+action+'"'
	    }
	 };

  var req = http.request(postRequest, function(res) {
	    res.setEncoding('utf8');
	    res.on('data', self.callback);
	  });


  if(on){
    
	  req.write(body);
	  req.end();
	};
    
  } else {
    
  }
  callback();
}
