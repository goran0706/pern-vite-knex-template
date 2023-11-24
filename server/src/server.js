import fs from 'fs';
import http from 'http';
import https from 'https';
import app from './app';
import config from './config';
import log from './modules/logger';

const { sslKeyPath, sslCertPath, httpPort, httpsPort, hostname } = config;

const readCredentials = () => {
  const privateKey = fs.readFileSync(sslKeyPath, 'utf8');
  const certificate = fs.readFileSync(sslCertPath, 'utf8');
  return { key: privateKey, cert: certificate };
};

const startServer = (server, port, protocol) => {
  server.listen(port, () =>
    log.info(`${protocol.toUpperCase()} server running on ${hostname}:${port}`)
  );
};

const startHttpServer = () => {
  const httpServer = http.createServer(app);
  startServer(httpServer, httpPort, 'http');
};

const startHttpsServer = () => {
  const credentials = readCredentials();
  const httpsServer = https.createServer(credentials /* options object */, app);
  startServer(httpsServer, httpsPort, 'https');
};

startHttpServer();
startHttpsServer();
