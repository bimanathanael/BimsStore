'use strict';

const Hapi = require('@hapi/hapi');
const controller = require('./controllers')
require('dotenv').config()

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost'
    });

    server.route({
      method: 'GET',
      path: '/',
      handler: controller.welcome
    });

    server.route({
      method: 'POST',
      path: '/products',
      handler: controller.addProd
    });

    server.route({
      method: 'GET',
      path: '/products',
      handler: controller.getProd
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();