import PostFormModal from "components/post/PostFormModal";
import PostList from "components/post/PostList";
import TopSubsPanel from "components/menus/TopSubsPanel";
import { Container } from "@material-ui/core/";

import { useMainPaperStyles } from "styles/muiStyles";

const Home = () => {
  const classes = useMainPaperStyles();

  return (
    <Container disableGutters className={classes.homepage}>
      <div className={classes.postsPanel}>
        <PostFormModal />
        <PostList />
      </div>
      <TopSubsPanel />
    </Container>
  );
};

export default Home;
