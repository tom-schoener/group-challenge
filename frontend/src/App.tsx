import './App.css';
import Navigation from './navigation/Navigation';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import EditParty from './party/edit/EditParty';
import ViewParty from './party/view/ViewParty';
import PostPartyItem from './party/post/PostPartyItem';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useSession } from './user/session';
import { SignIn, SignUp } from './user/SignInAndSignUp';
import Home from './home/Home';
import EditProfile from './user/EditProfile';
import CreateParty from './party/create/CreateParty';

function WithUser() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/party/create">
        <CreateParty />
      </Route>
      <Route path="/party/view/:id">
        <ViewParty />
      </Route>
      <Route path="/party/post/:id">
        <PostPartyItem />
      </Route>
      <Route path="/party/edit/:id">
        <EditParty />
      </Route>
      <Route path="/profile">
        <EditProfile />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

function WithoutUser() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

const queryClient = new QueryClient();

function App() {
  const [session] = useSession();

  return (
    <div className="App">
      <Router>
        <QueryClientProvider client={queryClient}>
          <Navigation />
          <div className="container mx-auto">{session ? <WithUser /> : <WithoutUser />}</div>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
