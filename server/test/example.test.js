import assert from 'assert';
import http from 'http';

import server from '../src/server.js';

describe('Example Node Server', () => {
  it('should return 200', (done) => {
    http.get(`http://127.0.0.1:${process.env.HTTP_PORT}`, (res) => {
      assert.equal(200, res.statusCode);
      server.close();
      done();
    });
  });
});
