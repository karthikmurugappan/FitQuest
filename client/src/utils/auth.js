import decode from 'jwt-decode';

class AuthService {
  // Get the user's profile from the JWT token
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    // Return true if a token exists and it's not expired, otherwise return false
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // Check if the token is expired
  isTokenExpired(token) {
    const decoded = decode(token);
    // Compare the token's expiration time (exp) with the current time (Date.now() / 1000)
    if (decoded.exp < Date.now() / 1000) {
      // If the token is expired, remove it from localStorage and return true
      localStorage.removeItem('id_token');
      return true;
    }
    // If the token is not expired, return false
    return false;
  }

  // Get the JWT token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Save the JWT token to localStorage and redirect to the '/profile' route
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/profile');
  }

  // Remove the JWT token from localStorage and redirect to the '/' route
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
