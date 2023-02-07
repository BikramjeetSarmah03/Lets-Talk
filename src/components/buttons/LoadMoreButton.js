import { Button } from "@material-ui/core";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { usePostListStyles } from "styles/muiStyles";

const LoadMoreButton = ({ handleLoadPosts, loading }) => {
  const classes = usePostListStyles();

  return (
    <div className={classes.loadBtnWrapper}>
      <Button
        color="primary"
        variant="outlined"
        size="large"
        onClick={handleLoadPosts}
        startIcon={<AutorenewIcon />}
        className={classes.loadBtn}
        disabled={loading}
      >
        {loading ? "Loading..." : "Load more"}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
