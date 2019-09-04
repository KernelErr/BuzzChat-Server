//初始化库
const express = require('express');
const webpanel = express();
const commander = require('commander');
const crypto = require('crypto');
const stringrandom = require('string-random');
const chatserver = require('http').createServer();
const chatio = require('socket.io')(chatserver,{
    path: '/',
    serveClient: false
});

//声明状态
var panelport = 3000;
var chatport = 3001;
var usercount = 0;
var msgdata = 0;
var paneltoken = stringrandom(32);
var chattoken = stringrandom(32);
var users = [];
var chatroomname = ""
var encipher = crypto.createCipheriv('aes-256-ecb', chattoken, null);
var decipher = crypto.createDecipheriv('aes-256-ecb', chattoken, null);

//初始化交互
console.log('[*] Panel Tocken:' + paneltoken);
console.log('[*] Chat Tocken:' + chattoken);
commander
    .option('-p, --chatport [port]','The port that chat service listens on.')
    .option('-P, --panelport [port]','The port that panel listens on.')
    .option('-n, --chatroomname [chatroomname]','The name of this chatroom.')
    .parse(process.argv);

if (commander.chatport) chatport = commander.chatport;
if (commander.panelport) panelport = commander.panelport;
if (commander.chatroomname) chatroomname = commander.chatroomname;

//控制面板网页
webpanel.get('/' + paneltoken,function (req, res) {
  var webcontent = '<title>聊天室控制面板</title>' + '当前在线人数：' + usercount + '</br>' + '聊天数据总量：' + msgdata + '字节'  + '</br></br>用户列表：' + '<ul>'
  for (var i = 0; i < usercount; i++) {
    webcontent += '<li>' + users[i] + '</li>';
  }
  webcontent += '</ul>'
  res.send(webcontent);
});
webpanel.listen(panelport, () => console.log('[*] Webpanel listening on port ' + panelport +'.'));

//聊天服务
chatserver.listen(chatport, () => console.log('[*] Chat service listening on port ' + chatport + '.'));
chatio.on('connection', function(socket){
    usercount += 1;
    console.log('[+] A user connected, ' + usercount + ' users in total now.');

    socket.on('join', function (name){
      encipher = crypto.createCipheriv('aes-256-ecb', chattoken, null);
      decipher = crypto.createDecipheriv('aes-256-ecb', chattoken, null);
      encipher.update('ohayou','utf8','base64');
      checkkey_flag = encipher.final('base64');
      chatio.emit('checkkey', checkkey_flag);
      users[usercount - 1] = name;
      chatio.emit('join', name);
    });

    chatio.emit('chatroomname', chatroomname);

    socket.on('message', function (msg){
      msgdata += msg.length;
      chatio.emit('message', msg);
    });

    socket.on('disconnecting', function (reason) {
      usercount -= 1;
      console.log('[-] A user left, ' + usercount + ' users in total now.');
  });
});
