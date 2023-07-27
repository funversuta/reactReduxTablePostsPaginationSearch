import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import arrow from "../../Icons/arrow.svg";
import Pagination from "../Pagination/Pagination";
import "./Tables.css";
import Search from "../Search/Search";
import { useDispatch } from "react-redux";
import { PostActionTypes } from "../../types/post";

const Tables: React.FC = () => {
  const { page, error, loading, Posts, limit, StandartPosts } =
    useTypedSelector((state: { post: any }) => state.post);
  const { fetchPosts, setPostPage } = useActions();
  const pages = [1, 2, 3, 4, 5];
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [actived, setActived] = useState(false);

  useEffect(() => {
    if (searchValue) {
      setTimeout(() => {
        fetchPosts(page, limit, searchValue);
      }, 1000);
    } else {
      fetchPosts(page, limit, searchValue);
      window.history.pushState(null, "", "/page=" + page);
    }
  }, [page, searchValue]);

  if (error) {
    return <h1>{error}</h1>;
  }

  const filterID = () => {
    document.querySelector(".arrow2")?.classList.remove("active");
    document.querySelector(".arrow3")?.classList.remove("active");
    actived ? setActived(false) : setActived(true);

    dispatch({
      type: PostActionTypes.FILTER_POSTS_REVERSE,
      payload: Posts.reverse(),
    });
  };

  const filterTexts = (filterValue: string, arrow: string) => {
    setActived(false);

    document
      .querySelector(arrow === ".arrow2" ? ".arrow3" : ".arrow2")
      ?.classList.remove("active");

    document.querySelector(arrow)?.classList.toggle("active");

    let mapped = Posts.map(function (el: any, i: number) {
      return { index: i, value: el[filterValue].toLowerCase() };
    });

    mapped.sort(function (a: { value: number }, b: { value: number }) {
      if (a.value > b.value) {
        return 1;
      }
      if (a.value < b.value) {
        return -1;
      }
      return 0;
    });

    let result = mapped.map(function (el: any) {
      return Posts[el.index];
    });

    dispatch({
      type: PostActionTypes.FILTER_POSTS,
      payload:
        JSON.stringify(Posts) === JSON.stringify(StandartPosts)
          ? result
          : StandartPosts,
      StandartPosts: JSON.parse(JSON.stringify(StandartPosts)),
    });
  };

  return (
    <div>
      <div className="Main">
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <table className="Table">
          <thead>
            <tr className="Header">
              <th onClick={() => filterID()}>
                <div className="Header_id">
                  ID
                  <img
                    alt="arrow"
                    className={`arrow ${actived ? "active" : ""}`}
                    src={arrow}
                  />
                </div>
              </th>
              <th onClick={() => filterTexts("title", ".arrow2")}>
                <div className="Header_title">
                  Заголовок <img className={`arrow2`} alt="arrow" src={arrow} />
                </div>
              </th>
              <th onClick={() => filterTexts("body", ".arrow3")}>
                <div className="Header_body">
                  Описание <img className={`arrow3`} alt="arrow" src={arrow} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <h1>Идет загрузка...</h1>
            ) : !!Posts.length ? (
              Posts.map(
                (post: {
                  id: number | null | undefined;
                  title: string | null | undefined;
                  body: string | null | undefined;
                }) => (
                  <tr className="Line" key={post.id}>
                    <td className="id">{post.id}</td>
                    <td className="title">{post.title}</td>
                    <td className="body">{post.body}</td>
                  </tr>
                )
              )
            ) : (
              <h2>По вашему запросу ничего не найдено</h2>
            )}
          </tbody>
        </table>
        {!loading && Posts.length >= 10 && (
          <Pagination setPostPage={setPostPage} pages={pages} page={page} />
        )}
      </div>
    </div>
  );
};

export default Tables;
