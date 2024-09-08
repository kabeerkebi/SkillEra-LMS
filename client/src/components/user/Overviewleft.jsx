import React, { useEffect, useState } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import "./css/Overviewleft.css";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
const Overviewleft = ({ Course, LeftPageRefresh, Description }) => {
  const [result, setResult] = useState({
    ImageUrl: "",
    VideoUrl: "",
    description: "",
    courseTitle: "",
  });
  const { courseId } = useParams();
  useEffect(() => {
    fetchdata();
  }, [LeftPageRefresh]);
  const fetchdata = async () => {
    try {
      const response = await axios.get(`courses/${courseId}`);
      console.log("left page alos w");

      setResult({
        ImageUrl: response.data.thumbnail,
        VideoUrl: response.data.lessons[0].videos,
        description: response.data.lessons[0].description,
        courseTitle: response.data.title,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overview-left">
      <div className="video-container">
        <h2>{result.courseTitle}</h2>
        <Plyr
          source={{
            type: "video",
            sources: [
              {
                src: Course.videos ? Course.videos : result.VideoUrl,
                type: "video/mp4",
              },
            ],
            poster: result.ImageUrl,
          }}
          options={{
            autoplay: true,
            poster:
              "https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg",
          }}
        />
      </div>
      <div className="video-description">
        <p>{Description}</p>
      </div>
    </div>
  );
};

export default Overviewleft;
