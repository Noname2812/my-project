import { Post } from "../utils/Types";
import CardPost from "./CardPost";

const PostNewsGrid = ({ listPost }: { listPost: Post[] | undefined }) => {
  return (
    <div className="card-post-grid">
      {listPost &&
        listPost.length > 0 &&
        listPost.map((post: Post) => {
          if (post) return <CardPost key={post.id} data={post} />;
        })}
    </div>
  );
};

export default PostNewsGrid;
