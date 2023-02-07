import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import TimeAgo from "timeago-react";
import { notify } from "../reducers/notificationReducer";
import {
  fetchPostComments,
  toggleDownvote,
  toggleUpvote,
} from "../reducers/postCommentsReducer";
import { fixUrl, prettifyLink, trimLink } from "../utils/formatUrl";
import getErrorMsg from "../utils/getErrorMsg";
import CommentInput from "./CommentInput";
import CommentsDisplay from "./CommentsDisplay";
import EditDeleteMenu from "./EditDeleteMenu";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./LoadingSpinner";
import SortCommentsMenu from "./SortCommentsMenu";
import { DownvoteButton, UpvoteButton } from "./VoteButtons";

import {
  Container,
  Divider,
  Link,
  ListItemIcon,
  MenuItem,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import CommentIcon from "@material-ui/icons/Comment";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { usePostCommentsStyles } from "../styles/muiStyles";

const PostCommentsPage = () => {
  const { id: postId } = useParams();
  const post = useSelector((state) => state.postComments);
  const { user, darkMode } = useSelector((state) => state);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getComments = async () => {
      try {
        await dispatch(fetchPostComments(postId));
        setPageLoading(false);
      } catch (err) {
        setPageError(getErrorMsg(err));
      }
    };
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const classes = usePostCommentsStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  if (pageError) {
    return (
      <Container disableGutters>
        <Paper variant="outlined" className={classes.mainPaper}>
          <ErrorPage errorMsg={pageError} />
        </Paper>
      </Container>
    );
  }

  if (!post || pageLoading) {
    return (
      <Container disableGutters>
        <Paper variant="outlined" className={classes.mainPaper}>
          <LoadingSpinner text={"Fetching post comments..."} />
        </Paper>
      </Container>
    );
  }

  const {
    id,
    title,
    postType,
    textSubmission,
    linkSubmission,
    imageSubmission,
    subreddit,
    author,
    upvotedBy,
    downvotedBy,
    pointsCount,
    comments,
    commentCount,
    createdAt,
    updatedAt,
  } = post;

  const isUpvoted = user && upvotedBy.includes(user.id);
  const isDownvoted = user && downvotedBy.includes(user.id);

  const handleUpvoteToggle = async () => {
    try {
      if (isUpvoted) {
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== user.id);
        dispatch(toggleUpvote(id, updatedUpvotedBy, downvotedBy));
      } else {
        const updatedUpvotedBy = [...upvotedBy, user.id];
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== user.id);
        dispatch(toggleUpvote(id, updatedUpvotedBy, updatedDownvotedBy));
      }
    } catch (err) {
      dispatch(notify(getErrorMsg(err), "error"));
    }
  };

  const handleDownvoteToggle = async () => {
    try {
      if (isDownvoted) {
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== user.id);
        dispatch(toggleDownvote(id, updatedDownvotedBy, upvotedBy));
      } else {
        const updatedDownvotedBy = [...downvotedBy, user.id];
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== user.id);
        dispatch(toggleDownvote(id, updatedDownvotedBy, updatedUpvotedBy));
      }
    } catch (err) {
      dispatch(notify(getErrorMsg(err), "error"));
    }
  };

  const formattedLink =
    postType === "Link" && trimLink(prettifyLink(linkSubmission), 70);

  return (
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <div className={classes.topPortion}>
          <div className={classes.votesWrapper}>
            <UpvoteButton
              user={user}
              body={post}
              handleUpvote={handleUpvoteToggle}
              size={isMobile ? "small" : "medium"}
            />
            <Typography
              variant="body1"
              style={{
                color: isUpvoted
                  ? "#FF8b60"
                  : isDownvoted
                  ? "#9494FF"
                  : darkMode
                  ? "#e4e4e4"
                  : "#333",
                fontWeight: 600,
              }}
            >
              {pointsCount}
            </Typography>
            <DownvoteButton
              user={user}
              body={post}
              handleDownvote={handleDownvoteToggle}
              size={isMobile ? "small" : "medium"}
            />
          </div>
          <div className={classes.postDetails}>
            <Typography variant="subtitle2">
              <Link component={RouterLink} to={`/r/${subreddit.subredditName}`}>
                {`r/${subreddit.subredditName} `}
              </Link>
              <Typography variant="caption" className={classes.userAndDate}>
                • Posted by
                <Link component={RouterLink} to={`/u/${author.username}`}>
                  {` u/${author.username} `}
                </Link>
                • <TimeAgo datetime={new Date(createdAt)} />
                {createdAt !== updatedAt && (
                  <em>
                    {" • edited"} <TimeAgo datetime={new Date(updatedAt)} />
                  </em>
                )}
              </Typography>
            </Typography>
            <Typography variant="h5" className={classes.title}>
              {title}
            </Typography>
            {postType === "Text" ? (
              <div>{ReactHtmlParser(textSubmission)}</div>
            ) : postType === "Image" ? (
              <a
                href={imageSubmission.imageLink}
                alt={title}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.imagePost}
              >
                <img
                  alt={title}
                  src={imageSubmission.imageLink}
                  className={classes.image}
                />
              </a>
            ) : (
              <Link href={fixUrl(linkSubmission)}>
                {formattedLink} <OpenInNewIcon fontSize="inherit" />
              </Link>
            )}
            <div className={classes.bottomBar}>
              <MenuItem className={classes.bottomButton}>
                <ListItemIcon>
                  <CommentIcon className={classes.commentIcon} />
                  <Typography variant="subtitle2">{commentCount}</Typography>
                </ListItemIcon>
              </MenuItem>
              {user && user.id === author.id && (
                <EditDeleteMenu
                  id={id}
                  isMobile={isMobile}
                  title={title}
                  postType={postType}
                  subreddit={subreddit}
                  buttonType="buttonGroup"
                  textSubmission={textSubmission}
                  linkSubmission={linkSubmission}
                />
              )}
            </div>
            <CommentInput user={user} postId={id} isMobile={isMobile} />
            <SortCommentsMenu />
          </div>
        </div>
        <Divider className={classes.divider} />
        <CommentsDisplay comments={comments} postId={id} isMobile={isMobile} />
      </Paper>
    </Container>
  );
};

export default PostCommentsPage;
