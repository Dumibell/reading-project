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
      <AppRouter
        recentWritings={recentWritings}
        likedWritings={likedWritings}
        init={init}
      />
    </div>
  );
}

export default App;
