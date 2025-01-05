import "./Recommended.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { YtAPI } from "../../Data";
import { view } from "../../Data";
import moment from "moment";
function Recommended() {
  const { category } = useParams();
  const [apiData, setapiData] = useState(null);
  const recommendedfetch = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=US&videoCategoryId=${category}&key=${YtAPI}`
      );
      const data = await response.json();
      setapiData(data.items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    recommendedfetch();
  }, []);
  return (
    <div className="recommended">
      {apiData?.map((items) => {
        return (
          <Link
            className="side-video-list"
            key={items.id}
            to={`/video/${items.snippet.categoryId}/${items.id}`}
          >
            <img src={items.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{items.snippet.title}</h4>
              <p>{items.snippet.channelTitle}</p>
              <p>{view(items.statistics.viewCount)}</p>
              <p>{moment(items.snippet.publishedAt).fromNow()}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Recommended;
