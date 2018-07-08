/**
 * Created by Bruno on 14/03/2017.
 */
socket.on('game_created', function(hash, nick) {
    socket.close();
    window.sessionStorage.setItem("hash", hash);
    window.sessionStorage.setItem("nick", nick);
    window.sessionStorage.setItem("master", "me");
    window.location='/game';
});
socket.on('game_created_error', function(error) {
    document.getElementById("message-header").innerHTML = "Erro ao criar sala";
    document.getElementById("message-body").innerHTML = error;
    document.getElementById('alert').classList.add('visible');
    document.getElementById('alert').classList.remove('hidden');
});

socket.on('player_join', function(hash, nick) {
    socket.close();
    window.sessionStorage.setItem("hash", hash);
    window.sessionStorage.setItem("nick", nick);
    window.sessionStorage.setItem("master", "other");
    window.location='/game';
});
socket.on('player_join_error', function(error) {
    document.getElementById("message-header").innerHTML = "Erro ao entrar na sala";
    document.getElementById("message-body").innerHTML = error;
    document.getElementById('alert').classList.add('visible');
    document.getElementById('alert').classList.remove('hidden');
});
