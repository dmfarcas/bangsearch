//don't forget to add the address on which you use this as a search engine.

'use strict';

import * as Hapi from 'hapi';
import { searchStrings } from './string_stuff'

const server = new Hapi.Server({ debug: { request: ['error'] } });

server.connection({ port: 6969 });

server.route({
    method: 'GET',
    path: '/search',
    handler: searchHandler
});

function searchHandler (request, reply) {  
        if (!request.query.q) { 
            reply("Bang not found"); //TODO offer to add to db.
            return; //fail fast, don't crash pls.'
        }

        searchStrings(request.query.q)
        .then((response) => {
            reply.redirect(response.dataValues.query);
        });
    }


server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});