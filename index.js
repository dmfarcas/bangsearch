//don't forget to add the address on which you use this as a search engine.

'use strict';

import * as Hapi from 'hapi';
import { searchStrings } from './search_strings'

const server = new Hapi.Server({ debug: { request: ['error'] } });

server.connection({ port: 6969 });

server.route({
    method: 'GET',
    path: '/search',
    handler: searchHandler
});

function searchHandler (request, reply) {  
        const query = request.query.q;
        const search = searchStrings(query);

        if (!search) {
            reply("Bang not found"); //TODO offer to add to db.
            return;
        }

        reply.redirect(search);
    }


server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});