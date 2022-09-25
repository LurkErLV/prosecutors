'use strict';

const http = require('http');
const https = require('https');
const app = require('../app');

const httpServer = http.createServer(app);

httpServer.listen(8080);
