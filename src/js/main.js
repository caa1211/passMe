var SonicSocket = require('../../lib/sonic-socket.js');
var SonicServer = require('../../lib/sonic-server.js');
var SonicCoder = require('../../lib/sonic-coder.js');

var audioContext = new webkitAudioContext();
var ALPHABET = '0123456789,';
var MESSAGE = '3141591';
var KeyMaxLen = 3;
var KeyRepeat = 3;
var coder = new SonicCoder({
    freqMin: 440,
    freqMax: 1760
});

var $button = $('#message');
$button.click(onButton);

function genKey(){
    var ary = [];
    var count = 0;
    while(count < KeyMaxLen*5){
        console.log(count);
        count++;
        var n = Math.floor(Math.random() * 9);
        if(ary.length === 0 || (ary.length >= 1 && n !== ary[ary.length - 1])){
            ary.push(n);
        }
        if(ary.length === KeyMaxLen){
            break;
        }
    }
    return ary.join('');
}

console.log("res==", genKey());

function onButton() {
    var msg = genKey();
    var sendMsg = msg;
    var count = 0;
    ssocket = new SonicSocket({
        alphabet: ALPHABET,
        charDuration: 0.4,
        //coder: coder
    });

    while(count < KeyRepeat - 1){
        sendMsg = sendMsg + "," + msg;
        count ++;
    }
    ssocket.send(sendMsg);
    $("#sendMsg").html(msg);
    $("#receiveMsg").html("---");
}

// On some other machine:
sserver = new SonicServer({
    alphabet: ALPHABET,
    //coder: coder
});
sserver.on('message', function(message) {
    console.log(message);
    var msgAry = message.split(",");
    if(msgAry.length !== KeyRepeat){
        $("#receiveMsg").html("failed");
    }else {
        $("#receiveMsg").html(message);
    }
});
sserver.start();