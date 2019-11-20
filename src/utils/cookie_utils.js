import Cookies from 'universal-cookie';

export const cookieUtils = {
  bakeCookie: function(name, value) {
    const cookies = new Cookies();
    cookies.set(name, value, { path: '/' });
  },
  deleteUserCookieData: function() {
    const cookies = new Cookies();
    cookies.remove("username");
    cookies.remove("password");
    cookies.remove("firstname");
    cookies.remove("lastname");
    cookies.remove("frontend");
    cookies.remove("backend");
    cookies.remove("design");
    cookies.remove("business");
    cookies.remove("loggedIn");
  },
  getUserCookieData: function() {
    const cookies = new Cookies();
    const user = {
      username: cookies.get("username"),
      password: cookies.get("password"),
      firstname: cookies.get("firstname"),
      lastname: cookies.get("lastname"),
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