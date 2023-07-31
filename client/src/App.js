import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import './App.css';
// import './styles/app.scss';
import NavBar from './components/header.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/homepage.js';
import SignUp  from './pages/signup.js';
// import Profile from './pages/profile.js';
import Login from './pages/login.js';

const httpLink = createHttpLink({
  uri: '/graphql',
});


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div className= "rpgui-container framed backgound-container">
      <Router>
      {/* <NavBar/> */}
      <div>
        <Routes>
        <Route exact path="/" element={<LandingPage />} />

        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/login" element={<Login />} />

      </Routes>
      </div>
      </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
