import Cookies from 'universal-cookie';

export const cookieUtils = {
  bakeCookie: function(name, value) {
    const cookies = new Cookies();
    cookies.set(name, value, { path: '/' });
  },
  getUserCookieData: function() {
    const cookies = new Cookies();
    const user = {
      username: cookies.get("username"),
      password: cookies.get("password"),
      firstname: cookies.get("firstname"),
      lastname: cookies.get("lastname"),
      frontend: cookies.get("frontend"),
      backend: cookies.get("backend"),
      design: cookies.get("design"),
      business: cookies.get("business"),
      loggedIn: cookies.get("loggedIn") === "true",
      myProjects: {
        current: [],
        pending: [],
        past: [],
      }
    }
    return user;
  }
}