import { Switch, Route } from "react-router-dom";
import PostCommentsPage from "pages/PostCommentsPage";
import UserPage from "pages/UserPage";
import SubPage from "pages/SubPage";
import SearchResults from "pages/SearchResults";
import NotFoundPage from "pages/NotFoundPage";
import Home from "pages/Home";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/comments/:id">
        <PostCommentsPage />
      </Route>
      <Route exact path="/u/:username">
        <UserPage />
      </Route>
      <Route exact path="/c/:sub">
        <SubPage />
      </Route>
      <Route exact path="/search/:query">
        <SearchResults />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default Routes;
