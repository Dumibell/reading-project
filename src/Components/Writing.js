import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Writing = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const cancelWriting = () => {
    if (window.confirm("글 작성을 취소하시겠습니까?")) {
      navigate("/");
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "title") {
      setTitle(value);
    } else if (name === "text") {
      setText(value);
    }
  };

  console.log("title: " + title + " text: " + text);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border w-4/5 h-4/5 m-10 flex flex-col">
        <div className="text-2xl">
          책 제목
          <input type="text" name="title" required onChange={onChange} />
        </div>
        <div>
          내용
          <input type="text" name="text" required onChange={onChange} />
        </div>
        <div onClick={cancelWriting}>취소</div>
      </div>
    </div>
  );
};
