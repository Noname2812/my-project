import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import HomeFeature from "./HomeFeature";
import { Pagination } from "antd";
import Loading from "./Loading";
import { getResultSearch } from "../app/reducers/getResultSearch";
import Search from "./Search";

const SearchResult = () => {
  const dispatch = useAppDispatch();
  const { resultSearch, query, isLoading } = useAppSelector(({ post }) => post);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    dispatch(getResultSearch({ query: query, offset: (pageCurrent - 1) * 10 }));
    setIsLoaded(isLoading);
  }, [pageCurrent]);
  useEffect(() => {
    setPageCurrent(1);
  }, [query]);
  return (
    <div className="container">
      {isLoading && <Loading />}
      {!isLoaded && (
        <>
          <Search />
          {resultSearch?.result && resultSearch.result.length <= 0 && (
            <div>
              <h3>Không tìm thấy kết quả !!!</h3>
            </div>
          )}
          {resultSearch && resultSearch.totalResult > 0 && (
            <>
              <h3>{`Đã tìm thấy ${resultSearch.totalResult}`}</h3>
              <HomeFeature data={resultSearch.result!} />
            </>
          )}
        </>
      )}
      <Pagination
        style={isLoaded ? { display: "none" } : {}}
        className="pagination"
        defaultCurrent={1}
        current={pageCurrent}
        total={resultSearch?.totalResult}
        pageSize={10}
        onChange={(page) => {
          window.scrollTo(0, 0);
          setPageCurrent(page);
          setIsLoaded(true);
        }}
      />
    </div>
  );
};

export default SearchResult;
