import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL, KEY } from "../utils/Constants";
import { Post } from "../utils/Types";
import { convertPostGet } from "../utils/ConvertPostGet";
import { useAppSelector } from "../app/hooks";
import { Skeleton } from "antd";

const DetailProduct = () => {
  window.scrollTo(0, 0);
  const location = useLocation();
  const idItem = location.pathname.split("/")[2];
  const [dataView, setDataView] = useState<Post | undefined>(undefined);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const urlIcon = "https://spoonacular.com/application/frontend/images/badges/";
  const urlIngredient = "https://spoonacular.com/cdn/ingredients_100x100/";
  const urlSimilarRecipes = "https://webknox.com/recipeImages/";

  useEffect(() => {
    axios
      .get(`${BASE_URL}${idItem}/similar?apiKey=${KEY}&number=6`)
      .then((data) => setSimilarRecipes(data.data))
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${BASE_URL}${idItem}/information?apiKey=${KEY}`)
      .then((data) => {
        let temp: Post[] = [];
        temp.push(data.data);
        setDataView(convertPostGet(temp)[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Skeleton loading={isLoading} />
      <Skeleton loading={isLoading} />
      <Skeleton loading={isLoading} />
      <Skeleton loading={isLoading} />
      <Skeleton loading={isLoading} />
      <Skeleton loading={isLoading} />
      {!isLoading && dataView && (
        <div className="container detail">
          <h2 className="detail-title">{dataView.name}</h2>
          <img
            className="detail-image"
            src={dataView.urlImage}
            alt="image-item"
          />
          <div className="row-under-image">
            <div className="row-under-image-item">
              <img src={`${urlIcon}cheap.svg`} alt="" />
              <h4>{dataView.pricePerServing}</h4>
            </div>
            <div className="row-under-image-item">
              <img src={`${urlIcon}popular.svg`} alt="" />
              <h4>{dataView.healthScore}</h4>
            </div>
            <div className="row-under-image-item">
              <img src={`${urlIcon}fast.svg`} alt="" />
              <h4>{dataView.readyInMinutes}</h4>
            </div>
            <div className="row-under-image-item">
              <img src={`${urlIcon}spoonacular-score-100.svg`} alt="" />
              <h4>{dataView.spoonacularScore}</h4>
            </div>
          </div>
          <div className="detail-ingredients">
            <h2 className="detail-title">Ingredients</h2>
            <div className="detail-ingredients-grid">
              {dataView.extendedIngredients.map((item) => {
                return (
                  <div
                    key={`${item.id}${item.name}`}
                    className="detail-ingredients-item"
                  >
                    <h4>
                      <span>{item.amount}</span> {item.unit}
                    </h4>
                    <img src={`${urlIngredient}${item.image}`} alt="" />
                    <h4 className="detail-ingredients-item-name">
                      {item.name}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="detail-instructions">
            <p
              className="detail-text"
              dangerouslySetInnerHTML={{ __html: `${dataView.instructions}` }}
            />
          </div>
          <div className="detail-summary">
            <p
              className="detail-text"
              dangerouslySetInnerHTML={{ __html: `${dataView.summary}` }}
            />
          </div>
          <div className="detail-similar">
            <h2 className="detail-title">Similar recipes</h2>
            <div className="detail-similar-grid">
              {similarRecipes &&
                similarRecipes.length &&
                similarRecipes.map(({ id, title, sourceUrl }) => {
                  return (
                    <div key={id} className="detail-similar-item">
                      <h3>{title}</h3>
                      <Link to={`/detail/${id}`}>
                        <img
                          src={`${urlSimilarRecipes}${id}-312x231.jpg`}
                          alt=""
                        />
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailProduct;
