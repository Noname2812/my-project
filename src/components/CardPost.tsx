import { useAppDispatch } from "../app/hooks";
import { Post } from "../utils/Types";
import { Link } from "react-router-dom";
import { addRecipeToListOfUser } from "../app/reducers/addRecipeToListOfUser";
const CardPost = ({ data }: { data: Post }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="card-post">
        <div className="thumb-ball">
          <a
            href={`/detail/${data.id}`}
            style={{
              backgroundImage: `url(${
                data.urlImage
                  ? data.urlImage
                  : "https://i.pinimg.com/originals/5d/33/a1/5d33a10d3d20c73125e66a1f3cb4a974.jpg"
              })`,
            }}
            className="penci-image-holder"
          ></a>
        </div>
        <div>
          <a href={`/detail/${data.id}`} className="card-post-title">
            {data.name}
          </a>
        </div>
        <div className="card-post-description">
          <h3>
            <span>by </span>
            {data.sourceName}
          </h3>
          <h3>
            <span>$ </span>
            {data.pricePerServing}
          </h3>
        </div>
        <div className="card-post-sumary">
          <p
            dangerouslySetInnerHTML={{ __html: `${data.instructions}` }}
            className="card-post-sumary-text"
          />
          <Link
            target="_blank"
            className="card-post-sumary-detail"
            to={data.recipes}
          >
            Chi tiết &gt;&gt;
          </Link>
        </div>
        <button
          onClick={() => {
            dispatch(addRecipeToListOfUser(data));
          }}
        >
          Add my list
        </button>
      </div>
    </>
  );
};

export default CardPost;
