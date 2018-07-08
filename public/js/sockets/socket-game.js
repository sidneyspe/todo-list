socket.on('connect', function() {

    socket.emit("reconnected", window.sessionStorage.getItem("hash"), window.sessionStorage.getItem("nick"));

});
socket.on('disconnect', function() {
    $("#jogadorAtual").html("Você está offline, jogará na próxima rodada.");
});

socket.on('new_word', function(word_propose, bollsBlack, bollsWhite, currentPlayerNick) {
    var myNick = window.sessionStorage.getItem("nick");
    if (currentPlayerNick == myNick) {
        unlockSendWord();
    } else {
        lockSendWord();
    }
    var lastPlayer = window.sessionStorage.getItem("lastPlayer");
    var htmlLineTable = "<tr><td><div class='ui blue ribbon label'>" + lastPlayer + "</div></td><td class='center aligned'>" + word_propose + "</td><td><div class='ui orange right ribbon label'>";

    window.sessionStorage.setItem("lastPlayer", currentPlayerNick);
    for (var i = 0; i < bollsBlack; i++) {
        htmlLineTable += "<i class='fa fa-circle'></i>&nbsp;";
    }
    for (var i = 0; i < bollsWhite; i++) {
        htmlLineTable += "<i class='fa fa-circle-o'></i>&nbsp;";
    }
    htmlLineTable += "</div></td></tr>";

    $('#word_propose').prepend(htmlLineTable);
    $("#word_propose").children(":first").fadeOut(200, function() {
        $("#word_propose").children(":first").fadeIn(200);
    });;

    $("#jogadorAtual").html("It's <span class='todo-list-turn-message'>" + currentPlayerNick + "</span> turn");

    //atualiza a lista de palavras propostas e prepara o ambiente para o currentPlayerNick jogar
    console.log("A palavra proposta foi: " + word_propose);
    console.log("Bolas pretas " + bollsBlack);
    console.log("Bolas brancas " + bollsWhite);
    console.log("É a vez de: " + currentPlayerNick);
});
socket.on('new_turn', function(status_room, winner) {
    window.sessionStorage.setItem("word_secret", status_room.word_secret);
    alert(winner + " acertou a palavra secreta.");
    //Informa que o vencedor da partida foi winner(nome do ganhador)
});
socket.on('current_player_off', function(nick, nextPlayer) {
    $("#jogadorAtual").html(nick + " está offline, é a vez de <span class='todo-list-turn-message'>" + nextPlayer + "</span>");
    var myNick = window.sessionStorage.getItem("nick");
    if (nextPlayer == myNick) {
        unlockSendWord();
    } else {
        lockSendWord();
    }
});
socket.on("status_player", function(player, status) {
    console.log(player + " está " + status);
});
socket.on('winner', function(status_room, player) {
    var myNick = player.nick;
    var score = player.score;
    var coin = player.coin;
    window.sessionStorage.setItem("word_secret", status_room.word_secret);
    alert("Você acertou a palavra secreta.");
    //informa a este usuário que ele venceu a partida, atualiza sua pontuação.
    //prepara o ambiente informando quem é o novo jogador. //status_room.currentPlayer.nick
});
socket.on('game_is_start', function(statusRoom) {
    document.getElementById("btn_start_game").style.visibility = "hidden";
    window.sessionStorage.setItem("lastPlayer", statusRoom.currentPlayer.nick);
    var myNick = window.sessionStorage.getItem("nick");
    window.sessionStorage.setItem("word_secret", statusRoom.word_secret);
    if(statusRoom.currentPlayer.nick==myNick){
        unlockSendWord();
    } else {
        lockSendWord();
    }
    $("#jogadorAtual").html("The first player is: <span class='todo-list-turn-message'>" + statusRoom.currentPlayer.nick + "</span>");
    $("#player").html(myNick);
    // console.log("Quem inicia o jogo é:"+ statusRoom.currentPlayer.nick);
    console.log("A palavra secreta é: ahaaa, não vou imprimir.");
    // console.log("Lista de jogadores");
    for (var i = 0; i < statusRoom.players.length; i++) {
        // console.log(statusRoom.players[i].nick);
        var htmlPlayer = "<a class='item'>" + statusRoom.players[i].nick + "</a>";
        $("#players").append(htmlPlayer);
    }
    createABC();

});
socket.on('new_player', function(nick) {
    //atualizar a lista de jogadores com o novo jogador.
    $('.long.leaf.image').transition('pulse');
    console.log(nick+ " entrou na partida.");
});
socket.on('update_status_room', function (status_room) {
    //tem que limpar todos os dados da tela e atualizar com as informações do servidor.
    var myNick = window.sessionStorage.getItem("nick");
    if(myNick==status_room.master) {
        window.sessionStorage.setItem("master", "me");
        if(status_room.is_started==false)
            document.getElementById("btn_start_game").style.visibility="visible";
    }
    if(status_room.is_started==true){
        //atualizar lista de palavras, jogadores, quem é o jogador da vez e tals.
    }
});
socket.on('update_status_room', function(status_room) {
});
socket.on('update_status_room_error', function(error) {
    $("#contentModal").html(error);
    $('.ui.basic.modal').modal('show');
    window.sessionStorage.clear();
    window.location = '/';
});
socket.on('end_player_waiting_error', function(error) {
    $("#contentModal").html(error);
    $('.ui.basic.modal').modal('show');
});


socket.on('current_player_lost_turn', function(nick, nextPlayer) {
    var myNick = window.sessionStorage.getItem("nick");
    if(myNick==nick)
        $("#jogadorAtual").html("Você perdeu a vez, quem joga agora é <span class='todo-list-turn-message'>" + nextPlayer + "</span>");
    else if(nextPlayer==myNick)
        $("#jogadorAtual").html(nick + " perdeu a vez, quem joga agora é <span class='todo-list-turn-message'>" + "você" + "</span>");
    else
        $("#jogadorAtual").html(nick + " perdeu a vez, quem joga agora é <span class='todo-list-turn-message'>" + nextPlayer + "</span>");
    if (nextPlayer == myNick) {
        unlockSendWord();
    } else {
        lockSendWord();
    }
});

//eventos especiais


socket.on('jump_me_success', function( nick, nick_current_player) {
    var my_nick = window.sessionStorage.getItem("nick");
    if(my_nick==nick){
        //Você passou a vez;
        //É a vez de nick_current_player
        //bloquear as coisas (botão de pular, campo para digitar palavra)
    }
    else{
        if(my_nick==nick_current_player){
            //nick passou a vez, agora quem joga é você;
            //desbloquear as coisas (botão de pular, campo para digitar palavra)
        }
        else{
            //nick passou a vez, agora quem joga é nick_current_player;
            //bloquear as coisas (botão de pular, campo para digitar palavra)
        }
    }
});
socket.on('jump_me_error', function(message) {
    //Exibir mensagem
});
socket.on('jump_other_success', function(nick, nick_jumped, nick_current_player) {
    var my_nick = window.sessionStorage.getItem("nick");
    if(my_nick==nick){
        //Você passou a vez de nick_jumped;
        if(my_nick==nick_current_player){
            //Agora é a sua vez de jogar
            //desbloquear as coisas (botão de pular, campo para digitar palavra)
        }else{
            //Agora é a vez de nick_current_player jogar
            //bloquear as coisas (botão de pular, campo para digitar palavra)
        }
    }
    else{
        if(my_nick==nick_jumped){
            //nick passou a sua vez;
            if(nick==nick_current_player){
                //Agora é a vez dele;
            }else{
                //Agora é a vez de nick_current_player;
            }
            //bloquear as coisas (botão de pular, campo para digitar palavra)
        }
        else{
            if(my_nick==nick_current_player){
                //nick passou a vez de nick_jumped, agora quem joga é você;
                //desbloquear as coisas (botão de pular, campo para digitar palavra)
            }
            else {
                //nick passou a vez de nick_jumped, agora quem joga é nick_current_player;
                //bloquear as coisas (botão de pular, campo para digitar palavra)
            }
        }
    }
});
socket.on('jump_other_error', function(message) {
    //Exibir mensagem
    console.log(message);
});
socket.on('get_trace_success', function(nick, dica) {
    var my_nick = window.sessionStorage.getItem("nick");
    if(my_nick==nick){
        //Exibe a dica
        console.log("Dica: "+dica);
    }
    else{
        //Informa que nick pediu uma dica.
        console.log(nick+" pediu uma dica.");
    }
});
socket.on('get_trace_error', function(message) {
    console.log(message);
});
socket.on('increase_time_me_success', function(nick, time) {
    var my_nick = window.sessionStorage.getItem("nick");
    if(my_nick==nick){
        //Informa que o tempo aumentou e atualiza o contador para time
        console.log("Seu tempo foi aumentado para "+time +" segundos.");
    }
    else{
        //Informa que o tempo de nick aumentou e atualiza o contador para time
        console.log("O tempo de "+nick+" foi aumentado para "+time +" segundos.");
    }
});
socket.on('increase_time_me_error', function(message) {
    //Exibe a mensagem
});
socket.on('reduce_time_other_success', function(nick, nick_other, time) {
    var my_nick = window.sessionStorage.getItem("nick");
    if(my_nick==nick){
        //Informa que você reduziu o tempo de nick_other.
        //Atualiza o contador para time
        console.log("Você reduziu o tempo de "+nick_other);
    }
    else if(my_nick==nick_other){
        //Informa que seu tempo foi reduzido por nick.
        //Atualiza o contador para time
        console.log("Seu tempo foi reduzido por "+nick);
    }
    else{
        //informa que nick reduziu o tempo de nick_other
        //Atualiza o contador.
        console.log(nick+" reduziu o tempo de "+nick_other);
    }
});
socket.on('reduce_time_other_error', function(message) {
    //Exibe a mensagem de erro.
    console.log(message);
});







function lockSendWord() {
    document.getElementById("btn_send_word").disabled = true;
    document.getElementById("input_word").disabled = true;
    document.getElementById("input_word").value = "";
    $('#input_word').focus();
}

function unlockSendWord() {
    document.getElementById("btn_send_word").disabled = false;
    document.getElementById("input_word").disabled = false;
    document.getElementById("input_word").value = "";

}

function createABC() {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    var index = 97;
    var button;
    for (var i = 0; i < alphabet.length; i++) {
        button = "<button class='ui button' onclick='changeGreen(this)' ondblclick='changeRed(this)'>" + String.fromCharCode(index++) + "</button>"
        $("#buttonsABC").append(button);
    }

}

function changeRed(elmnt){
elmnt.className = 'ui red button';
// $(element).removeClass( "bgGeen" ).addClass( "bgRed" );
}
function changeGreen(elmnt){
elmnt.className = 'ui green button';
// $(element).removeClass( "bgRed" ).addClass( "bgGreen" );
}
