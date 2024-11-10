// import { createServer } from 'miragejs';
import { createServer } from 'miragejs'
export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.namespace = 'api';

      this.get('/movies', () => {
        console.log('GET /api/movies route hit');
        return {
          movies: [
            { id: 1, title: 'Inception', year: 2010 },
            { id: 2, title: 'Interstellar', year: 2014 },
            { id: 3, title: 'The Shawshank Redemption', year: 1994 },
          ],
        };
      });

      this.get('/movies/:id', (schema, request) => {
        const id = request.params.id;
        console.log(`GET /api/movies/${id} route hit`);
        return { id, title: `Movie ${id}`, year: 2023 };
      });
    },
  });

  if (environment === 'development') {
    server.seed();
  }

  return server;
}


// import { createServer } from 'miragejs';
//
// export function makeServer({ environment = 'development' } = {}) {
//   let server = createServer({
//     environment,
//
//     routes() {
//       this.namespace = 'api';
//
//       this.get('/movies', () => {
//         console.log('GET /api/movies route hit');
//         return {
//           movies: [
//             { id: 1, title: 'Inception', year: 2010 },
//             { id: 2, title: 'Interstellar', year: 2014 },
//             { id: 3, title: 'The Shawshank Redemption', year: 1994 },
//           ],
//         };
//       });
//       //
//       // this.post('/movies', (schema, request) => {
//       //   const movie = JSON.parse(request.requestBody);
//       //   console.log('POST /api/movies route hit', movie);
//       //   return { id: Date.now(), ...movie };
//       // });
//
//       this.get('/movies/:id', (schema, request) => {
//         const id = request.params.id;
//         console.log(`GET /api/movies/${id} route hit`);
//         return { id, title: `Movie ${id}`, year: 2023 };
//       });
//     },
//   });
//
//   if (environment === 'development') {
//     server.seed();
//   }
//
//   return server;
// }


// import { createServer } from 'miragejs';
//
// export function makeServer({ environment = 'development' } = {}) {
//   let server = createServer({
//     routes() {
//       this.namespace = 'api';
//       this.get('/movies', () => ({
//         movies: [
//           { id: 1, title: 'Inception', year: 2010 },
//           { id: 2, title: 'Interstellar', year: 2014 },
//           { id: 3, title: 'The Shawshank Redemption', year: 1994 },
//         ],
//       }));
//
//       this.post('/movies', (schema, request) => {
//         const movie = JSON.parse(request.requestBody);
//         return { id: Date.now(), ...movie };
//       });
//
//       this.get('/movies/:id', (schema, request) => {
//         const id = request.params.id;
//         return { id, title: `Movie ${id}`, year: 2023 };
//       });
//     },
//   });
//
//   if (environment === 'development') {
//     server.seed();
//   }
//
//   return server;
// }