import { Carousel } from "antd";
import { ItemFeature } from "../utils/Types";
import { DEFAULT_IMAGE } from "../utils/Constants";
import { useNavigate } from "react-router-dom";
const CarouselRandom = ({ data }: { data: ItemFeature[] }) => {
  const listItem = [
    [...data.slice(0, 3)],
    [...data.slice(3, 6)],
    [...data.slice(6, 9)],
    [...data.slice(9, 12)],
  ];
  const navigate = useNavigate();
  return (
    <Carousel autoplay>
      {listItem.map((item, index) => {
        return (
          <div key={item[0].id + index} className="carousel-item">
            <div className="carousel-item-wrap">
              {item.map((i) => {
                if (i.image === undefined) i.image = DEFAULT_IMAGE;
                return (
                  <div
                    key={i.id}
                    className="carousel-item-wrap-item"
                    style={{
                      backgroundImage: `url(${i.image})`,
                    }}
                    onClick={() => navigate(`/detail/${i.id}`)}
                  >
                    <h3>{i.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselRandom;
