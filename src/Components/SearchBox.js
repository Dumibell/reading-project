import { Navigation } from "./Navigation";

export const SearchBox = () => {
  return (
    <>
      <Navigation />
      <div className="w-full flex justify-center mt-10">
        <input
          type="text"
          placeholder="책 제목을 입력해주세요"
          className="border-b w-1/2 text-2xl p-2 outline-none "
        />
      </div>
    </>
  );
};
