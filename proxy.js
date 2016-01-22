var request = require('request');
var http = require('http');

function proxy(host, port, ipWhitelist) {
  var proxySrv = http.createServer(function(req, res) {
    try {
      var remoteIp = req.connection.remoteAddress;
      if (!ipWhitelist || ipWhitelist.length === 0 || ipWhitelist.indexOf(remoteIp) > -1) {
        var x = request(req.url);

        req.pipe(x);

        x.on("error", function(e) {
          //console.error(e);
        });

        x.pipe(res);
      } else {
        res.socket.emit('end');
        res.socket.emit('close');
        console.log("Unautorized: " + remoteIp);
      }

    } catch (e) {
      console.error(e);
    }
  });

  proxySrv.listen(port, host, function() {
    console.log('Proxy running on port ' + port);
  });
}


module.exports = proxy;