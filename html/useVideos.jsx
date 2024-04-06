import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  query,
  orderByKey,
  get,
  startAt,
  limitToFirst,
} from "firebase/database";

export default function useVideos(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [initialFetch, setInitialFetch] = useState(false);

  const LIMIT = 20;

  useEffect(() => {
    async function getVideos() {
      const db = getDatabase();
      const videoRef = ref(db, "videos");
      let videoQuery;

      if (page === 0 && initialFetch) {
        videoQuery = query(videoRef, orderByKey(), limitToFirst(LIMIT));
      } else {
        // Fetch subsequent pages
        videoQuery = query(
          videoRef,
          orderByKey(),
          startAt(String(page * LIMIT)),
          limitToFirst(LIMIT)
        );
      }

      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(videoQuery);
        setLoading(false);
        if (snapshot.exists()) {
          const videoObject = snapshot.val();
          const videoArray = Object.values(videoObject);
          if (page === 0 && !initialFetch) {
            // For the first fetch, replace the videos
            setVideos(videoArray);
            setInitialFetch(true);
          } else {
            // For subsequent fetches, append to existing videos
            setVideos((prevVideos) => [...prevVideos, ...videoArray]);
          }
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    getVideos();
  }, [page]);

  return {
    loading,
    error,
    videos,
    hasMore,
  };
}
