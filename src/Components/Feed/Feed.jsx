import "./Feed.css";
import { Link } from "react-router-dom";
import { view, YtAPI } from "../../Data";
import { Auth } from "../../UseContext/AuthContext";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
function Feed() {
  const { category } = useContext(Auth);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${YtAPI}`
        );
        const data = await response.json();
        setData(data.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [category]);
  return (
    <div className="feed">
      {data.map((item) => {
        return (
          <Link
            to={`video/${item.snippet.categoryId}/${item.id}`}
            className="card"
            key={item.id}
          >
            <img src={item.snippet.thumbnails.medium.url} alt="post" />
            <h1>{item.snippet.title}</h1>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {view(item.statistics.viewCount)} &bull;{" "}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export default Feed;
