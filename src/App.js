import "./App.css";
import { AppRouter } from "./Router";
import { useEffect, useState } from "react";
import { authService, dbService } from "./firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

function App() {
  const [init, setInit] = useState(false);
  const [recentWritings, setRecentWritings] = useState([]);
  const [likedWritings, setLikedWritings] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "writings"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const writingArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentWritings(writingArr);
      setInit(true);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(dbService, "writings"), orderBy("like", "desc"));
    onSnapshot(q, (snapshot) => {
      const writingArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLikedWritings(writingArr);
      setInit(true);
    });
  }, []);

  return (
    <div className="font-referi">
      {init ? (
        <AppRouter
          recentWritings={recentWritings}
          likedWritings={likedWritings}
        />
      ) : (
        <div className="w-screen h-screen flex justify-center items-center">
          <img
            src={process.env.PUBLIC_URL + "/images/buffer.png"}
            alt="버퍼링"
            className="w-80 animate-spin"
          />
        </div>
      )}
    </div>
  );
}

export default App;
