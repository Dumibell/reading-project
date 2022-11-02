import "./App.css";
import { AppRouter } from "./Router";
import { useEffect, useState } from "react";
import { authService } from "./firebase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? (
        <AppRouter userObj={userObj} isLoggedIn={Boolean(userObj)} />
      ) : (
        "Initializing..."
      )}
    </div>
  );
}

export default App;
