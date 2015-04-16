var SonicSocket = require('../../lib/sonic-socket.js');
var SonicServer = require('../../lib/sonic-server.js');
var SonicCoder = require('../../lib/sonic-coder.js');

var audioContext = new webkitAudioContext();
var ALPHABET = '0123456789';
var MESSAGE = '3141591';

var $button = $('#message');
$button.click(onButton);

function onButton() {
    ssocket = new SonicSocket({
        alphabet: ALPHABET,
        charDuration: 0.2,
        //coder: new SonicCoder({
        //    freqMin: 440,
        //    freqMax: 1760
        //})
    });
    ssocket.send(MESSAGE);
}

// On some other machine:
sserver = new SonicServer({
    alphabet: ALPHABET,
    //coder: new SonicCoder({
    //    freqMin: 440,
    //    freqMax: 1760
    //})
});
sserver.on('message', function(message) {
    // message is '31415'. Do something with it.
    console.log(message);
});
sserver.start();