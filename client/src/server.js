import {
  createServer,
  Model,
  Factory,
  belongsTo,
  hasMany,
  trait,
} from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      movie: Model,
      newmovies: Model,
      amediatekaSeries: Model,
      animatedSeries: Model,
      watchingNow: Model,
      user: Model,
    },

    factories: {
      user: Factory.extend({
        subscription: 'free',
      }),
    },

    seeds(server) {
      server.create('movie', {
        id: 1,
        title: '1',
        subscription: 'Бесплатно',
        img: '/img/movies/image1.jpg',
      });
      server.create('movie', {
        id: 2,
        title: '2',
        subscription: 'Бесплатно',
        img: '/img/movies/image2.jpg',
      });
      server.create('movie', {
        id: 3,
        title: '3',
        subscription: 'Бесплатно',
        img: '/img/movies/image3.jpg',
      });
      server.create('movie', {
        id: 4,
        title: '4',
        subscription: 'Бесплатно',
        img: '/img/movies/image4.jpg',
      });
      server.create('movie', {
        id: 5,
        title: '5',
        subscription: 'Бесплатно',
        img: '/img/movies/image5.jpg',
      });
      server.create('movie', {
        id: 6,
        title: '6',
        subscription: 'Бесплатно',
        img: '/img/movies/image6.jpg',
      });
      server.create('movie', {
        id: 7,
        title: '7',
        subscription: 'Бесплатно',
        img: '/img/movies/image7.webp',
      });
      server.create('movie', {
        id: 11,
        title: 'Highway',
        subscription: 'Бесплатно',
        img: '/img/newmovies/1_150x250.webp',
      });
      server.create('movie', {
        id: 12,
        title: 'Equalizer',
        subscription: 'Бесплатно',
        img: '/img/newmovies/2_150x250.webp',
      });
      server.create('movie', {
        id: 13,
        title: 'Live die repeat',
        subscription: 'Бесплатно',
        img: '/img/newmovies/3_150x250.webp',
      });
      server.create('movie', {
        id: 14,
        title: 'Август восьмого',
        subscription: 'Бесплатно',
        img: '/img/newmovies/4_150x250.webp',
      });
      server.create('movie', {
        id: 15,
        title: 'Lewless',
        subscription: 'Бесплатно',
        img: '/img/newmovies/5_150x250.webp',
      });
      server.create('movie', {
        id: 16,
        title: 'Буря',
        subscription: 'Бесплатно',
        img: '/img/newmovies/6_150x250.webp',
      });
      server.create('movie', {
        id: 17,
        title: 'Paani',
        subscription: 'Подписка',
        img: '/img/newmovies/7_150x250.webp',
      });
      server.create('movie', {
        id: 18,
        title: 'Buddha',
        subscription: 'Бесплатно',
        img: '/img/newmovies/8_150x250.webp',
      });
      server.create('movie', {
        id: 21,
        title: 'Kaanch',
        subscription: 'Подписка',
        img: '/img/amediatekaSeries/1_150x250.webp',
      });
      server.create('movie', {
        id: 22,
        title: 'Autism',
        subscription: 'Бесплатно',
        img: '/img/amediatekaSeries/2_150x250.webp',
      });
      server.create('movie', {
        id: 23,
        title: 'Sel8nne',
        subscription: 'Подписка',
        img: '/img/amediatekaSeries/3_150x250.webp',
      });
      server.create('movie', {
        id: 24,
        title: 'Aatma',
        subscription: 'Бесплатно',
        img: '/img/amediatekaSeries/4_150x250.webp',
      });
      server.create('movie', {
        id: 25,
        title: 'Super nani',
        subscription: 'Подписка',
        img: '/img/amediatekaSeries/5_150x250.webp',
      });
      server.create('movie', {
        id: 26,
        title: 'Narcos',
        subscription: 'Подписка',
        img: '/img/amediatekaSeries/6_150x250.webp',
      });
      server.create('movie', {
        id: 27,
        title: 'Без права выбора',
        subscription: 'Подписка',
        img: '/img/amediatekaSeries/7_150x250.webp',
      });
      server.create('movie', {
        id: 28,
        title: 'Лимб аскет',
        subscription: 'Подписка',
        img: '/img/amediatekaSeries/8_150x250.webp',
      });

      server.create('movie', {
        id: 31,
        title: 'Due date',
        subscription: 'Подписка',
        img: '/img/animatedSeries/1_150x250.webp',
      });
      server.create('movie', {
        id: 32,
        title: 'Сон в летнию ночь',
        subscription: 'Подписка',
        img: '/img/animatedSeries/2_150x250.webp',
      });
      server.create('movie', {
        id: 33,
        title: 'Zokkomon',
        subscription: 'Подписка',
        img: '/img/animatedSeries/3_150x250.webp',
      });
      server.create('movie', {
        id: 34,
        title: 'Paul blart',
        subscription: 'Подписка',
        img: '/img/animatedSeries/4_150x250.webp',
      });
      server.create('movie', {
        id: 35,
        title: 'Live die repeat',
        subscription: 'Подписка',
        img: '/img/animatedSeries/5_150x250.webp',
      });
      server.create('movie', {
        id: 36,
        title: 'Jackass',
        subscription: 'Подписка',
        img: '/img/animatedSeries/6_150x250.webp',
      });
      server.create('movie', {
        id: 37,
        title: 'Heartkess',
        subscription: 'Подписка',
        img: '/img/animatedSeries/7_150x250.webp',
      });
      server.create('movie', {
        id: 38,
        title: 'Southpaw',
        subscription: 'Подписка',
        img: '/img/animatedSeries/8_150x250.webp',
      });

      server.create('movie', {
        id: 41,
        title: 'La peur',
        subscription: 'Подписка',
        img: '/img/watchingNow/1_150x250.webp',
      });
      server.create('movie', {
        id: 42,
        title: 'Allegiant',
        subscription: 'Подписка',
        img: '/img/watchingNow/2_150x250.webp',
      });
      server.create('movie', {
        id: 43,
        title: 'Unlimited',
        subscription: 'Подписка',
        img: '/img/watchingNow/3_150x250.webp',
      });
      server.create('movie', {
        id: 44,
        title: 'Красная галактика',
        subscription: 'Подписка',
        img: '/img/watchingNow/4_150x250.webp',
      });
      server.create('movie', {
        id: 45,
        title: 'City gold',
        subscription: 'Подписка',
        img: '/img/watchingNow/5_150x250.webp',
      });
      server.create('movie', {
        id: 46,
        title: 'Releasing today',
        subscription: 'Подписка',
        img: '/img/watchingNow/6_150x250.webp',
      });
      server.create('movie', {
        id: 47,
        title: 'Demolition',
        subscription: 'Подписка',
        img: '/img/watchingNow/7_150x250.webp',
      });
      server.create('movie', {
        id: 48,
        title: 'Hp7',
        subscription: 'Подписка',
        img: '/img/watchingNow/8_150x250.webp',
      });
      server.create('newmovie', {
        id: 1,
        title: 'Highway',
        subscription: 'Подписка',
        img: '/img/newmovies/1_150x250.webp',
      });
      server.create('newmovie', {
        id: 2,
        title: 'Equalizer',
        subscription: 'Подписка',
        img: '/img/newmovies/2_150x250.webp',
      });
      server.create('newmovie', {
        id: 3,
        title: 'Live die repeat',
        subscription: 'Подписка',
        img: '/img/newmovies/3_150x250.webp',
      });
      server.create('newmovie', {
        id: 4,
        title: 'Август восьмого',
        subscription: 'Подписка',
        img: '/img/newmovies/4_150x250.webp',
      });
      server.create('newmovie', {
        id: 5,
        title: 'Lewless',
        subscription: 'Подписка',
        img: '/img/newmovies/5_150x250.webp',
      });
      server.create('newmovie', {
        id: 6,
        title: 'Буря',
        subscription: 'Подписка',
        img: '/img/newmovies/6_150x250.webp',
      });
      server.create('newmovie', {
        id: 7,
        title: 'Paani',
        subscription: 'Подписка',
        img: '/img/newmovies/7_150x250.webp',
      });
      server.create('newmovie', {
        id: 8,
        title: 'Buddha',
        subscription: 'Подписка',
        img: '/img/newmovies/8_150x250.webp',
      });
      server.create('amediatekaSeries', {
        id: 1,
        title: 'Kaanch',
        subscription: 'Подписка',
        img: '/img/amediatekaSeries/1_150x250.webp',
      });
      server.create('amediatekaSeries', {
        id: 2,
        title: 'Autism',
        subscription: 'Подписка',
        img: '/img/amediatekaSeries/2_150x250.webp',
      });
      server.create('amediatekaSeries', {
        id: 3,
        title: 'Sel8nne',
        subscription: 'Подписка',
        img: '/img/amediatekaSeries/3_150x250.webp',
      });
      server.create('amediatekaSeries', {
        id: 4,
        title: 'Aatma',
        subscription: 'Подписка',
        img: '/img/amediatekaSeries/4_150x250.webp',
      });
      server.create('amediatekaSeries', {
        id: 5,
        title: 'Super nani',
        subscription: 'Подписка',
        img: '/img/amediatekaSeries/5_150x250.webp',
      });
      server.create('amediatekaSeries', {
        id: 6,
        title: 'Narcos',
        subscription: 'Подписка',
        img: '/img/amediatekaSeries/6_150x250.webp',
      });
      server.create('amediatekaSeries', {
        id: 7,
        title: 'Без права выбора',
        subscription: 'Подписка',
        img: '/img/amediatekaSeries/7_150x250.webp',
      });
      server.create('amediatekaSeries', {
        id: 8,
        title: 'Лимб аскет',
        subscription: 'Подписка',
        img: '/img/amediatekaSeries/8_150x250.webp',
      });

      server.create('animatedSeries', {
        id: 1,
        title: 'Due date',
        subscription: 'Подписка',
        img: '/img/animatedSeries/1_150x250.webp',
      });
      server.create('animatedSeries', {
        id: 2,
        title: 'Сон ',
        subscription: 'Подписка',
        img: '/img/animatedSeries/2_150x250.webp',
      });
      server.create('animatedSeries', {
        id: 3,
        title: 'Zokkomon',
        subscription: 'Подписка',
        img: '/img/animatedSeries/3_150x250.webp',
      });
      server.create('animatedSeries', {
        id: 4,
        title: 'Paul blart',
        subscription: 'Подписка',
        img: '/img/animatedSeries/4_150x250.webp',
      });
      server.create('animatedSeries', {
        id: 5,
        title: 'Live die repeat',
        subscription: 'Подписка',
        img: '/img/animatedSeries/5_150x250.webp',
      });
      server.create('animatedSeries', {
        id: 6,
        title: 'Jackass',
        subscription: 'Подписка',
        img: '/img/animatedSeries/6_150x250.webp',
      });
      server.create('animatedSeries', {
        id: 7,
        title: 'Heartkess',
        subscription: 'Подписка',
        img: '/img/animatedSeries/7_150x250.webp',
      });
      server.create('animatedSeries', {
        id: 8,
        title: 'Southpaw',
        subscription: 'Подписка',
        img: '/img/animatedSeries/8_150x250.webp',
      });

      server.create('watchingNow', {
        id: 1,
        title: 'La peur',
        subscription: 'Подписка',
        img: '/img/watchingNow/1_150x250.webp',
      });
      server.create('watchingNow', {
        id: 2,
        title: 'Allegiant',
        subscription: 'Подписка',
        img: '/img/watchingNow/2_150x250.webp',
      });
      server.create('watchingNow', {
        id: 3,
        title: 'Unlimited',
        subscription: 'Подписка',
        img: '/img/watchingNow/3_150x250.webp',
      });
      server.create('watchingNow', {
        id: 4,
        title: 'Красная ',
        subscription: 'Подписка',
        img: '/img/watchingNow/4_150x250.webp',
      });
      server.create('watchingNow', {
        id: 5,
        title: 'City gold',
        subscription: 'Подписка',
        img: '/img/watchingNow/5_150x250.webp',
      });
      server.create('watchingNow', {
        id: 6,
        title: 'Releasing today',
        subscription: 'Подписка',
        img: '/img/watchingNow/6_150x250.webp',
      });
      server.create('watchingNow', {
        id: 7,
        title: 'Demolition',
        subscription: 'Подписка',
        img: '/img/watchingNow/7_150x250.webp',
      });
      server.create('watchingNow', {
        id: 8,
        title: 'Hp7',
        subscription: 'Подписка',
        img: '/img/watchingNow/8_150x250.webp',
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/movies', (schema, request) => {
        const { page = 1, perPage = 10 } = request.queryParams;
        const movies = schema.movies.all();
        const start = (page - 1) * perPage;
        const end = start + parseInt(perPage);
        const paginatedMovies = movies.models.slice(start, end);

        return {
          movies: paginatedMovies,
          nextPage: movies.models.length > end ? parseInt(page) + 1 : null,
        };
      });

      this.get('/newmovies', (schema, request) => {
        return schema.newmovies.all();
      });
      this.get('/amediatekaSeries', (schema, request) => {
        return schema.amediatekaSeries.all();
      });
      this.get('/animatedSeries', (schema, request) => {
        return schema.animatedSeries.all();
      });
      this.get('/watchingNow', (schema, request) => {
        return schema.watchingNow.all();
      });

      this.get('/all-movies', (schema) => {
        const movies = schema.movies.all();
        const newmovies = schema.newmovies.all();
        const amediatekaSeries = schema.amediatekaSeries.all();
        const animatedSeries = schema.animatedSeries.all();
        const watchingNow = schema.watchingNow.all();

        console.log('Фильмы:', movies.models);
        console.log('Новые фильмы:', newmovies.models);
        console.log('Сериалы Amediateka:', amediatekaSeries.models);
        console.log('Анимационные сериалы:', animatedSeries.models);
        console.log('Смотрят сейчас:', watchingNow.models);

        const allMovies = [
          ...movies.models,
          ...newmovies.models,
          ...amediatekaSeries.models,
          ...animatedSeries.models,
          ...watchingNow.models,
        ];

        return {
          movies: allMovies,
        };
      });

      this.post('/users', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.users.create(attrs);
      });

      this.get('/users/:id', (schema, request) => {
        let id = request.params.id;
        return schema.users.find(id);
      });

      this.patch('/users/:id', (schema, request) => {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);
        let user = schema.users.find(id);
        return user.update(attrs);
      });

      this.passthrough('https://identitytoolkit.googleapis.com/**');
      this.passthrough('https://securetoken.googleapis.com/**');
      this.passthrough('https://firestore.googleapis.com/**');
      this.passthrough('http://127.0.0.1:5100/socket.io/**');
      this.passthrough('/chat');
      this.passthrough('/user');
      this.passthrough('/api/save-subscription');
      this.passthrough('/api/subscriptions');
      this.passthrough('http://127.0.0.1:5100/api/subscriptions');
      this.passthrough('http://localhost:5100/subscriptions');
      this.passthrough('http://localhost:5100/api/subscriptions');
      this.passthrough('http://127.0.0.1:5100/api/chat');
      this.passthrough('http://127.0.0.1:5100//api/connect');
      this.passthrough('http://localhost:5100/api/chat');
      this.passthrough('http://127.0.0.1:5100/api/upload');

      this.passthrough('http://127.0.0.1:5100/**');

      this.pretender.handledRequest = (verb, path, request) => {
        console.log(`MirageJS обработал запрос: ${verb} ${path}`);
      };

      this.pretender.passthroughRequest = (verb, path, request) => {
        console.log(`MirageJS пропустил запрос: ${verb} ${path}`);
      };
    },
  });

  return server;
}
