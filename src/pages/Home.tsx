import React, { useEffect } from "react";
import CarouselRandom from "../components/CarouselRandom";
import PostNewsGrid from "../components/PostNewsGrid";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getRanDomPost } from "../app/reducers/getRandomPost";
import { Radio, Skeleton } from "antd";
import { useState } from "react";
import HomeFeature from "../components/HomeFeature";
import { getRandomHomeFeatureItems } from "../app/reducers/getRandomHomeFeatureItems";
import { clearPost } from "../app/slices/PostSlice";
import { ItemFeature } from "../utils/Types";
import axios from "axios";
import { BASE_URL, KEY } from "../utils/Constants";
import SideBar from "../components/SideBar";
import Loading from "../components/Loading";
import { setError } from "../app/slices/AppSlice";
import ErrorCallAPI from "../components/ErrorCallAPI";
const Home = () => {
  const cuisines = [
    { label: "Món Việt", value: "Vietnamese" },
    { label: "Món Thái", value: "Thai" },
    { label: "Món Trung", value: "Chinese" },
    { label: "Món Nhật", value: "Japanese" },
    { label: "Món Hàn", value: "Korean" },
    { label: "Món Ý", value: "Italian" },
  ];
  const dispatch = useAppDispatch();
  const { isLoading, listPost, listItemsFeature } = useAppSelector(
    ({ post }) => post
  );
  const { errorCallAPI } = useAppSelector(({ app }) => app);
  const [loading, setLoading] = useState(true);
  const [nation, setNation] = useState<string>("Vietnamese");
  const [loadingHomeFeature, setLoadingHomeFeature] = useState(false);
  const handleSeeMoreClick = async () => {
    // get current position scroll
    let scrollPosition: number =
      window.pageYOffset || document.documentElement.scrollTop;
    await dispatch(getRanDomPost(10));
    window.scrollTo(0, scrollPosition);
  };
  const [dataCarouselRandom, setDataCarouselRandom] = useState<ItemFeature[]>(
    []
  );
  const loadPage = async () => {
    await axios
      .get(
        `${BASE_URL}complexSearch?apiKey=${KEY}&cuisine=Vietnamese&number=13`
      )
      .then(({ data }) => {
        setDataCarouselRandom(data.results);
        dispatch(getRanDomPost(10));
        dispatch(
          getRandomHomeFeatureItems({ number: 6, cuisines: "Vietnamese" })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(setError(true));
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(!isLoading);
        }, 500);
      });
  };
  useEffect(() => {
    dispatch(clearPost());
    loadPage();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoadingHomeFeature(false);
      setLoading(false);
    }, 1000);
  }, [nation, listPost]);
  return (
    <>
      {errorCallAPI && <ErrorCallAPI />}
      {!errorCallAPI && (
        <div>
          {dataCarouselRandom && dataCarouselRandom.length > 0 && (
            <CarouselRandom data={dataCarouselRandom} />
          )}
          <div className="container flex flex-home">
            {loading && <Loading />}
            {!loading && listPost && listPost.length > 0 && (
              <>
                <div className="main">
                  <div className="main-title">
                    <h3>Món ngon ngẫu nhiên</h3>
                  </div>
                  <div>
                    <PostNewsGrid listPost={listPost} />
                    <div className="btn-show-more">
                      <button
                        onClick={() => {
                          handleSeeMoreClick();
                          setLoading(true);
                        }}
                      >
                        See more
                      </button>
                    </div>
                  </div>
                  {listItemsFeature && listItemsFeature.length > 0 && (
                    <div className="main-home-feature">
                      <div className="main-title">
                        <h3>Món ngon theo khu vực</h3>
                      </div>
                      <Radio.Group
                        className="list-nations"
                        onChange={(e) => {
                          dispatch(
                            getRandomHomeFeatureItems({
                              number: 6,
                              cuisines: e.target.value,
                            })
                          );
                          setNation(e.target.value);
                          setLoadingHomeFeature(true);
                        }}
                        options={cuisines}
                        optionType="button"
                        defaultValue={"Vietnamese"}
                      />
                      <Skeleton active loading={loadingHomeFeature} />
                      <Skeleton active loading={loadingHomeFeature} />
                      <Skeleton active loading={loadingHomeFeature} />
                      <Skeleton active loading={loadingHomeFeature} />
                      {!loadingHomeFeature && (
                        <HomeFeature data={listItemsFeature} />
                      )}
                    </div>
                  )}
                </div>
                <div className="sidebar">
                  <SideBar />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
