import { Navigation } from "./Navigation";
import { Card } from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const SearchBox = ({ recentWritings, userObj, search, setSearch }) => {
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearch(value);
  };

  return (
    <div>
      <Navigation />
      <div className="w-full flex justify-center mt-10 ">
        <div className="relative">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute top-[15px] text-[#9CA3AF]"
          />
          <input
            type="text"
            placeholder="책 제목을 입력해주세요"
            className="border-b w-[700px] text-2xl pl-7 p-2 outline-none "
            onChange={onChange}
          />
        </div>
      </div>
      <div className="mt-20">
        {recentWritings.map((item) => {
          return (
            <Card item={item} key={item.id} userObj={userObj} search={search} />
          );
        })}
      </div>
    </div>
  );
};
