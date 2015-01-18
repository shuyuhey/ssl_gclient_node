ssl_gclient_node
================

This product is a simple graphical client for RoboCupSoccer Small Size Robot League.

It enables you to capture and view SSL-Vision and RefereeBox packets.

This product uses node.js and a web browser as a viewer.


![demo](https://github.com/BLThunder1991/ssl_gclient_node/blob/master/browser.png?raw=true, "demo")

# INSTALL

First, you need install node.js (`v0.10.28`) and npm (`1.4.13`).

Second, this repository clones and installs enviroment.

```shell
% git clone https://github.com/BLThunder1991/ssl_gclient_node.git
% cd ssl_gclient_node
% npm install
```

# USE

First, boot up servers.

```shell
% cd ssl_gclient_node
% ./bin/www
```

Second, access the servers from a web browser. If you access it via the same machine which booted the servers, access http://localhost:3000/ .
