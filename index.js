const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.get('/game/game.display.js', function(req, res) { res.sendFile(__dirname + '/game/game.display.js'); });
app.get('/game/game.keycode.js', function(req, res) { res.sendFile(__dirname + '/game/game.keycode.js'); });
app.get('/game/game.control.js', function(req, res) { res.sendFile(__dirname + '/game/game.control.js'); });
app.get('/game/game.js', function(req, res) { res.sendFile(__dirname + '/game/game.js'); });
app.get('/', (req, res) => { res.sendFile(__dirname + '/pong.html'); });

var nbJoueur = 0;

// Creation des parties en fonction des connections, mis en place des joueurs dans les parties
io.on('connection', (socket) => {
    nbJoueur++;

    // Implémentation des joueurs
    switch(nbJoueur){
      case 1:
        socket.emit('JoueurConnect', 'Joueur1');
        break
      case 2:
        socket.emit('JoueurConnect', 'Joueur2');
        break
      case 3:
        socket.emit('JoueurConnect', 'Joueur3');
        break
      case 4:
        socket.emit('JoueurConnect', 'Joueur4');
        nbJoueur = 0;
        break
    }
    
    //Initialisation de la balle
    socket.on('InitBalle', (ballPosX, ballPosY, ballDirX, ballDirY) => {
        io.emit('retourInitBall', ballPosX, ballPosY, ballDirX, ballDirY);
    });

    // Initialisation des joueurs
    socket.on('InitJoueur1', (J1) => {
      io.emit('retourInitJoueur1', J1);
    });
    socket.on('InitJoueur2', (J2) => {
      io.emit('retourInitJoueur2', J2);
    });
    socket.on('InitJoueur3', (J3) => {
      io.emit('retourInitJoueur3', J3);
    });
    socket.on('InitJoueur4', (J4) => {
      io.emit('retourInitJoueur4', J4);
    });
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});