const origin = 'https://travel-best-app.herokuapp.com';

const getRoute = (trailing) => `${origin}/${trailing}`;

export const routes = {
  submitGame: getRoute('submit-game'),
  scores: getRoute('scores'),
  user: {
    status: getUserRoute('status'),
    signup: getUserRoute('signup'),
    login: getUserRoute('login'),
    logout: getUserRoute('logout'),
    refreshToken: getUserRoute('refresh-token'),
    checkToken: getUserRoute('check-token'),
  },
};
