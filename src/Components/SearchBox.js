import { Navigation } from "./Navigation";
import { Card } from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const SearchBox = ({
  recentWritings,
  userObj,
  search,
  setSearch,
  isLoggedIn,
}) => {
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearch(value);
  };

  return (
    <div>
      <Navigation isLoggedIn={isLoggedIn} />
      <div className="w-full flex justify-center mt-10 searchBox">
        <div className="relative">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute top-[15px] text-[#9CA3AF]"
          />
          <input
            type="text"
            placeholder="책 제목 / 내용을 검색해주세요"
            value={search}
            className="border-b w-[700px] text-2xl pl-7 p-2 outline-none bg-inherit searchBoxInput"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="mt-20 searchResult">
        {recentWritings.map((item) => {
          if (
            item.title.includes(search) ||
            item.text.includes(search) ||
            search === ""
          ) {
            return (
              <Card
                item={item}
                key={item.id}
                userObj={userObj}
                search={search}
                isLoggedIn={isLoggedIn}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
