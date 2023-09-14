import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { clearQuery, setQuery } from "../app/slices/PostSlice";

const Search = () => {
  const dispatch = useAppDispatch();
  const [valueSearch, setValueSearch] = useState<string>("");
  const navigate = useNavigate();
  const handleSearch = (query: string) => {
    if (valueSearch === "") {
      dispatch(clearQuery());
    } else {
      navigate("/search");
      dispatch(setQuery(query));
    }
  };
  return (
    <div className="wrap-search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(valueSearch);
        }}
      >
        <div className="form-search">
          <div className="form-search-input">
            <AiOutlineSearch className="form-search-input-icon" />
            <input
              type="text"
              className="form-search-input-text"
              placeholder="Nhập tên món ăn"
              value={valueSearch}
              onChange={(e) => {
                setValueSearch(e.target.value);
              }}
            />
            <AiOutlineClose
              className={`form-search-input-icon ${
                !valueSearch ? "invisible" : "visible"
              }`}
              onClick={() => {
                setValueSearch("");
                dispatch(clearQuery());
              }}
            />
          </div>
          <button className="form-search-button">
            <AiOutlineSearch className="form-search-input-icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
