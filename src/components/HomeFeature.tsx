import { Link, useNavigate } from "react-router-dom";
import { DEFAULT_IMAGE } from "../utils/Constants";
import { ItemFeature } from "../utils/Types";

const HomeFeature = ({ data }: { data: ItemFeature[] }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="home-feature-grid">
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="home-feature-item"
              style={{
                backgroundImage: `url(${
                  item.image ? item.image : DEFAULT_IMAGE
                })`,
              }}
              onClick={() => navigate(`/detail/${item.id}`)}
            >
              <Link to={`/detail/${item.id}`}>
                <h3 className="home-feature-item-text">{item.title}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomeFeature;
