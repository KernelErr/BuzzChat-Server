# BuzzChat-Server
BuzzChat Server是一款基于Node.js的开源聊天室服务器，BuzzChat Client是其客户端。

## 程序简介
本程序主体是基于Javascript编写。因为初学了Photoshop、Node.js以及HTML，想巩固一下自己的能力，于是写出了Buzz Chat。
软件作者是北邮大一新生Kevin Li，Twitter主页是[@ChinaKevinLi](https://twitter.com/ChinaKevinLi "@ChinaKevinLi")。

## 使用说明
从GitHub下载源码后，你需要在电脑上安装Node.js，并支持npm。首先需要安装依赖，切换到源码根目录下运行：
```bash
npm install
```
此时会安装所需要的依赖，然后只需要运行：
```bash
node server.js
```
软件有以下参数：
- -p, --chatport [port] 即为Socket.io监听端口
- -P, --panelport [port] 即为Web管理监听端口，访问localhost:port/[Panel Tocken]即可进入控制面板
- -n, --chatroomname [chatroomname] 聊天室的名字，会作为客户端的窗口标题
软件运行后会输出以下参数：
- Panel Tocken，即进入控制面板需要跟上的参数
- Chat Tocken，即客户端输入的密匙

## 开源协议
本程序完全按照Apache 2.0协议开源，基于本程序开发请遵循协议，并标明我的名字和所属学校。