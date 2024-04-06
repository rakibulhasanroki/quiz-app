import Video from "./Video";
import { Link } from "react-router-dom";
import useVideos from "../components/hooks/useVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export default function Videos() {
  const [page, setPage] = useState(0);
  const { loading, error, videos, hasMore } = useVideos(page);
  const loadMoreVideos = () => {
    if (!loading && hasMore) {
      setPage(page + 1);
    }
  };
  // Mehedi here i use filter for videos insted of using videos  because again its render double time
  const uniqueVideos = videos.filter(
    (video, index, self) =>
      index === self.findIndex((v) => v.youtubeID === video.youtubeID)
  );

  return (
    <div>
      {uniqueVideos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          next={loadMoreVideos}
          hasMore={hasMore}
        >
          {uniqueVideos.map((video, index) =>
            video.noq > 0 ? (
              <Link to={`quiz/${video.youtubeID}`} key={video.youtubeID}>
                <Video
                  title={`${index + 1}-${video.title}`}
                  id={video.youtubeID}
                  noq={video.noq}
                />
              </Link>
            ) : (
              // eslint-disable-next-line react/jsx-key
              <Video
                title={`${index + 1}-${video.title}`}
                id={video.youtubeID}
                noq={video.noq}
                key={video.youtubeID}
              />
            )
          )}
        </InfiniteScroll>
      )}
      {!loading && uniqueVideos.length === 0 && <div>Videos not found</div>}
      {error && <div>There is an error</div>}
      {loading && <div>Wait Loading</div>}
    </div>
  );
}
