import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setEmailUser,
  setListRecipeOfUser,
  setToast,
} from "../app/slices/AppSlice";
import { Modal, Pagination } from "antd";
import Loading from "./Loading";
import { removeRecipeFromUserList } from "../app/reducers/removeRecipeFromUserList";
import { Link } from "react-router-dom";
import { UserPost } from "../utils/Types";
const ListRecipeOfUser = () => {
  const { listRecipeOfUser } = useAppSelector(({ app }) => app);
  console.log(listRecipeOfUser);

  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<UserPost[] | undefined>([]);
  const handlePagination = (list: UserPost[], totalPage: number) => {
    if (list && list.length > 0) {
      let temp: UserPost[] = [];
      for (let i = totalPage * 10; i < (totalPage + 1) * 10; i++)
        temp.push(list[i]);
      return temp;
    }
  };
  const handleOk = () => {
    dispatch(setEmailUser(""));
    dispatch(setListRecipeOfUser([]));
    dispatch(setToast("You was logged out success !!!"));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);
  useEffect(() => {
    setData(handlePagination(listRecipeOfUser, pageCurrent - 1));
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, [pageCurrent, listRecipeOfUser]);
  return (
    <>
      {!isLoaded && <Loading />}
      {isLoaded && (
        <div className="container">
          <div className="btn-log-out">
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Log out
            </button>
            <Modal
              title="Ready to leave"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <h4>Do you want log out ?</h4>
            </Modal>
          </div>
          <div className="card-post-grid">
            {data &&
              data.length > 0 &&
              data.map((post: UserPost) => {
                if (post)
                  return (
                    <div key={post.fireBaseID} className="card-post">
                      <div className="thumb-ball">
                        <a
                          href={`/detail/${post.id}`}
                          style={{
                            backgroundImage: `url(${
                              post.urlImage
                                ? post.urlImage
                                : "https://i.pinimg.com/originals/5d/33/a1/5d33a10d3d20c73125e66a1f3cb4a974.jpg"
                            })`,
                          }}
                          className="penci-image-holder"
                        ></a>
                      </div>
                      <div>
                        <a
                          href={`/detail/${post.id}`}
                          className="card-post-title"
                        >
                          {post.name}
                        </a>
                      </div>
                      <div className="card-post-description">
                        <h3>
                          <span>by </span>
                          {post.sourceName}
                        </h3>
                        <h3>
                          <span>$ </span>
                          {post.pricePerServing}
                        </h3>
                      </div>
                      <div className="card-post-sumary">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: `${post.instructions}`,
                          }}
                          className="card-post-sumary-text"
                        />
                        <Link
                          target="_blank"
                          className="card-post-sumary-detail"
                          to={post.recipes}
                        >
                          Chi tiết &gt;&gt;
                        </Link>
                      </div>
                      <button
                        onClick={async () => {
                          await dispatch(
                            removeRecipeFromUserList(post.fireBaseID)
                          );
                          setIsLoaded(false);
                          window.scrollTo(0, 0);
                          dispatch(setToast(`Remove ${post.name} success !!!`));
                        }}
                      >
                        delete
                      </button>
                    </div>
                  );
              })}
          </div>
          <Pagination
            style={!isLoaded ? { display: "none" } : {}}
            className="pagination"
            defaultCurrent={1}
            current={pageCurrent}
            total={listRecipeOfUser ? listRecipeOfUser.length : 0}
            pageSize={10}
            onChange={(page) => {
              window.scrollTo(0, 0);
              setPageCurrent(page);
              setIsLoaded(true);
            }}
          />
        </div>
      )}
    </>
  );
};

export default ListRecipeOfUser;
