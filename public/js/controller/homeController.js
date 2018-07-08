/**
 * Created by Bruno Clementino on 18/03/2017.
 */
var hash = window.sessionStorage.getItem('hash');
var nick = window.sessionStorage.getItem('nick');
function startGame() {
    socket.emit('end_player_waiting', hash);
}

function sendWord(word_propose) {
    if(word_propose=="Qual é a palavra secreta?"){
        alert(window.sessionStorage.getItem("word_secret"));
    }
    else
        socket.emit('do_play', hash, nick, word_propose);
}

function getWordSize() {
    var word_secret = window.sessionStorage.getItem("word_secret");
    return word_secret.length;
}

function jumpMe(hash, nick) {
    socket.emit('jump_me', hash, nick);
}

function jumpOther(hash, nick, nick_other) {
    socket.emit('jump_other', hash, nick, nick_other);
}

function increaseTimeMe(hash, nick, value) {
    socket.emit('increase_time_me', hash, nick, value);
}

function reduceTimeOther(hash, nick, nick_other, value) {
    socket.emit('reduce_time_other', hash, nick, nick_other, value);
}
//pegar uma dica
function getTrace(hash, nick) {
    socket.emit('get_trace', hash, nick);
}
