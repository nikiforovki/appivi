export const API_ROUTES = {
  MOVIES: '/api/movies',
  AMEDIATEKA_SERIES: '/api/amediatekaSeries',
  ANIMATED_SERIES: '/api/animatedSeries',
  SUBSCRIPTIONS: 'http://localhost:5100/api/subscriptions',
  USERS: 'http://localhost:5100/api/users',
  UPLOAD_RESOURCE: '/uploads',
  POSTS: '/api/posts',
};

const socketUrl = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000';
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const uploadUrl =
  process.env.REACT_APP_UPLOAD_URL || 'http://localhost:3000/uploads';

export const SOCKET_URL = socketUrl;
export const API_URL = apiUrl;
export const UPLOAD_URL = uploadUrl;
