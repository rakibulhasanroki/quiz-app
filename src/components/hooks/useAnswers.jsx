import { useEffect, useState } from "react";
import { getDatabase, ref, query, orderByKey, get } from "firebase/database";

export default function useVideos(videoId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function getAnswers() {
      const db = getDatabase();
      const answerRef = ref(db, "answers/" + videoId + "/questions");
      let answerQuery = query(answerRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(answerQuery);

        setLoading(false);
        const answersArray = Object.values(snapshot.val());
        if (snapshot.exists()) {
          setAnswers([...answersArray]);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    getAnswers();
  }, [videoId]);

  return {
    loading,
    error,
    answers,
  };
}
