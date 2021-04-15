import React from "react";
import Container from "@material-ui/core/Container";
// import { makeStyles } from "@material-ui/core/styles";
import CommentAuthor from "./CommentAuthor";
import CommentContent from "./CommentContent";
// const useStyles = makeStyles((theme) => ({}));
export default function CommentsPreview(props) {
  // const classes = useStyles();
  const { comments, preview } = props;
  const commentsMap = preview ? comments.slice(comments.length - 2) : comments;
  return (
    <Container>
      {commentsMap.reverse().map((item, index) => (
        <Container key={index} disableGutters>
          <CommentAuthor user={item.userId} time={item.time} />
          <CommentContent content={item.content} />
        </Container>
      ))}
    </Container>
  );
}
