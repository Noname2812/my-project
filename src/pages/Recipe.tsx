import { Pagination, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getRanDomPost } from "../app/reducers/getRandomPost";
import { splitArrayForPagination } from "../utils/SplitArrayForPagination";
import PostNewsGrid from "../components/PostNewsGrid";
import Loading from "../components/Loading";
import Author from "../components/SideBar";
import {
  fillterItem,
  resetresultFillter,
  sortItem,
} from "../app/slices/PostSlice";
import Search from "../components/Search";
export interface inputSearch {
  options: string;
  optionsType: string;
}
const Recipe = () => {
  const dispatch = useAppDispatch();
  const [pageCurrent, setPageCurrent] = useState(1);
  const { resultFillter } = useAppSelector(({ post }) => post);
  const [isLoading, setIsLoading] = useState(false);
  const [valueSearch, setValueSearch] = useState<inputSearch>({
    options: "",
    optionsType: "",
  });
  const options = [
    { label: "Loại món ăn", value: "" },
    { label: "Món chính", value: "main course" },
    { label: "Món ăn phụ", value: "side dish" },
    { label: "Món tráng miệng", value: "dessert" },
    { label: "Món khai vị", value: "appetizer" },
  ];
  const optionsType = [
    { label: "Các món ăn", value: "" },
    { label: "Bánh mỳ", value: "bread" },
    { label: "Súp", value: "soup" },
    { label: "Đồ ăn vặt", value: "snack" },
    { label: "Đồ uống", value: "beverage" },
  ];
  const sort = [
    { label: "Giá: Cao-Thấp", value: "decrease" },
    { label: "Giá: Thấp-Cao", value: "increase" },
  ];
  const handleSearch = async () => {
    await dispatch(resetresultFillter());
    await dispatch(fillterItem(valueSearch));
    setIsLoading(true);
    setPageCurrent(1);
  };
  useEffect(() => {
    const loadPage = async () => {
      await dispatch(getRanDomPost(500));
      await dispatch(fillterItem(valueSearch));
    };
    loadPage();
  }, []);
  useEffect(() => {
    handleSearch();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [valueSearch]);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [pageCurrent]);
  return (
    <div className="container flex flex-home">
      {isLoading && <Loading />}
      <div className="main">
        <div
          className="block-fillter"
          style={isLoading ? { display: "none" } : {}}
        >
          <Search />
          <div className="block-fillter-fillter">
            <h3>Lọc theo tiêu chí</h3>
            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={(value: string) => {
                let temp: inputSearch = { ...valueSearch };
                temp.optionsType = value;
                setValueSearch(temp);
              }}
              options={optionsType}
            />
            <Select
              defaultValue=""
              style={{ width: 200 }}
              onChange={(value: string) => {
                let temp: inputSearch = { ...valueSearch };
                temp.options = value;
                setValueSearch(temp);
              }}
              options={options}
            />
          </div>
          <div className="block-sort">
            <h3>Sắp xếp theo</h3>
            <Radio.Group
              onChange={(e) => {
                dispatch(sortItem(e.target.value));
              }}
              options={sort}
              optionType="button"
            />
          </div>
        </div>
        {!isLoading && resultFillter && resultFillter.length > 0 && (
          <div>
            <div className="main-title">
              <h3>Category</h3>
            </div>
            <PostNewsGrid
              listPost={splitArrayForPagination(resultFillter, pageCurrent - 1)}
            />
          </div>
        )}
        {!isLoading && (!resultFillter || !resultFillter.length) && (
          <div>
            <h3>Không tìm thấy sản phẩm phù hợp</h3>
          </div>
        )}
        <Pagination
          style={isLoading ? { display: "none" } : {}}
          className="pagination"
          defaultCurrent={1}
          current={pageCurrent}
          total={resultFillter?.length}
          pageSize={10}
          onChange={(page) => {
            window.scrollTo(0, 0);
            setPageCurrent(page);
            setIsLoading(true);
          }}
        />
      </div>
      <div className="sidebar">
        <Author />
      </div>
    </div>
  );
};

export default Recipe;
