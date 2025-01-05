import "./Playvideo.css";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { AiOutlineBell } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { RiDownloadLine } from "react-icons/ri";
import { useParams } from "react-router-dom";

import {
  YtAPI,
  view,
  like as Like,
  comments,
  subcribecount,
} from "../../Data/";
import moment from "moment";
function Playvideo() {
  const [more, setMore] = useState(false);
  const [apiData, setapiData] = useState(null);
  const [otherData, setOtherData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const { id } = useParams();
  const fetchData = async () => {
    const response = await fetch(
      // video fetching data
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${YtAPI}`
    );
    const data = await response.json();
    setapiData(data.items[0]);
  };
  const otherDataFetch = async () => {
    const response = await fetch(
      // channel profile fetching data
      ` https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData?.snippet.channelId}&key=${YtAPI}`
    );
    const data = await response.json();
    setOtherData(data.items[0]);
  };
  const fetchcomments = async () => {
    // commend fetching data
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${id}&key=${YtAPI}`
    );
    const data = await response.json();
    setCommentData(data.items);
  };
  useEffect(() => {
    fetchData();
    fetchcomments();
  }, [id]);
  useEffect(() => {
    otherDataFetch();
  }, [apiData]);
  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
        width="1257"
        height="707"
        frameBorder="none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData && apiData.snippet.title}</h3>
      <div className="play-video-info">
        <div className="play-left">
          <img
            src={
              otherData
                ? otherData.snippet.thumbnails.high.url
                : "https://images.unsplash.com/photo-1639861558729-16fff52bd7c9?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="profile"
            className="sub-profile"
          />
          <div className="channel-name">
            <h4>{apiData?.snippet.channelTitle}</h4>
            <p>{subcribecount(otherData?.statistics.subscriberCount)}</p>
          </div>
          <div className="subcribed-btn">
            <AiOutlineBell className="bell" />
            <p>Subscribed</p>
            <MdOutlineKeyboardArrowDown className="down" />
          </div>
        </div>
        <div className="play-right">
          <div className="like-dislike">
            <BiSolidLike className="like" />
            <p>{Like(apiData?.statistics.likeCount)}</p>
            <BiDislike className="dislike" />
          </div>
          <div className="share-btn">
            <RiShareForwardLine />
            <p>Share</p>
          </div>
          <div className="dot">
            <p>...</p>
          </div>
        </div>
      </div>
      <div className="video-discription">
        <div className="video-info">
          <p>{view(apiData?.statistics.viewCount)}</p>
          <span>{moment(apiData?.snippet.publishedAt).fromNow()}</span>
        </div>
        <h4>{apiData?.snippet.title}</h4>
        {more && <p>{apiData?.snippet.description}</p>}
        <button className="video-btn" onClick={() => setMore(!more)}>
          ...more
        </button>
      </div>
      <h3>{comments(apiData?.statistics.commentCount)} Comments</h3>
      {commentData?.map((item) => {
        return (
          <div className="comment" key={item.id}>
            <img
              src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
              alt="user"
            />
            <div className="comment-info">
              <h3>
                {item.snippet.topLevelComment.snippet.authorDisplayName}
                <span>
                  {moment(
                    item.snippet.topLevelComment.snippet.publishedAt
                  ).fromNow()}
                </span>
              </h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <BiLike />
                <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                <BiDislike />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Playvideo;
