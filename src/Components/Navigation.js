import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { userObjAtom } from "../atom";

export const Navigation = ({ setLoginModal, setSearch }) => {
  const navigate = useNavigate();

  const userObj = useRecoilValue(userObjAtom);

  const goToHome = () => {
    navigate("/");
  };

  const goToMyPage = () => {
    navigate("/mypage");
  };

  const goToSearchBox = () => {
    navigate("/searchbox");
  };

  return (
    <div className="w-full font-referi">
      <div className="flex justify-end items-end h-20 mr-10 pb-3">
        <div
          className="mr-8 hover:cursor-pointer hover:translate-y-[-2px]"
          onClick={goToHome}
        >
          Home
        </div>
        {!!userObj ? (
          <div
            onClick={goToMyPage}
            className="hover:cursor-pointer hover:translate-y-[-2px]"
          >
            My Page
          </div>
        ) : (
          <div
            onClick={() => setLoginModal(true)}
            className="hover:cursor-pointer hover:translate-y-[-2px]"
          >
            Login
          </div>
        )}
        <div>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="ml-10 hover:cursor-pointer hover:translate-y-[-2px]"
            onClick={goToSearchBox}
          />
        </div>
      </div>
    </div>
  );
};
