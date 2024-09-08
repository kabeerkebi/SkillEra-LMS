import React, { useState, useEffect, useRef } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "../css/CourseReview.css";
const CourseReviews = () => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  // Auto-increment states and configurations
  const [downloadCount, setDownloadCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [citiesCount, setCitiesCount] = useState(0);
  const [avgWatchTime, setAvgWatchTime] = useState(0);

  const maxDownloads = 150; // in millions
  const maxRating = 4.7;
  const maxCities = 1701; // cities worldwide
  const maxWatchTime = 71; // minutes

  const incrementStep = 3;
  const incrementSpeed = 20;

  // Effect for Downloads
  useEffect(() => {
    if (isVisible && downloadCount < maxDownloads) {
      const interval = setInterval(() => {
        setDownloadCount((prevCount) =>
          Math.min(prevCount + incrementStep, maxDownloads)
        );
      }, incrementSpeed);
      return () => clearInterval(interval);
    }
  }, [isVisible, downloadCount, maxDownloads]);

  // Effect for Rating
  useEffect(() => {
    if (isVisible && rating < maxRating) {
      const interval = setInterval(() => {
        setRating((prevCount) => Math.min(prevCount + 0.05, maxRating));
      }, incrementSpeed);
      return () => clearInterval(interval);
    }
  }, [isVisible, rating, maxRating]);

  // Effect for Cities
  useEffect(() => {
    if (isVisible && citiesCount < maxCities) {
      const interval = setInterval(() => {
        setCitiesCount((prevCount) => Math.min(prevCount + 10, maxCities));
      }, incrementSpeed);
      return () => clearInterval(interval);
    }
  }, [isVisible, citiesCount, maxCities]);

  // Effect for Avg Watch Time
  useEffect(() => {
    if (isVisible && avgWatchTime < maxWatchTime) {
      const interval = setInterval(() => {
        setAvgWatchTime((prevCount) => Math.min(prevCount + 1, maxWatchTime));
      }, incrementSpeed);
      return () => clearInterval(interval);
    }
  }, [isVisible, avgWatchTime, maxWatchTime]);

  const statsData = [
    {
      icon: <DownloadIcon className="stat-icon" />,
      headline: `${downloadCount}+ Million`,
      subheadline: "downloads",
    },
    {
      icon: <StarIcon className="stat-icon" />,
      headline: `${rating.toFixed(1)}+ Star`,
      subheadline: "app rating",
    },
    {
      icon: <LocationOnIcon className="stat-icon" />,
      headline: `${citiesCount}+ Cities`,
      subheadline: "worldwide",
    },
    {
      icon: <AccessTimeIcon className="stat-icon" />,
      headline: `${avgWatchTime} mins avg.`,
      subheadline: "time spent daily",
    },
  ];

  return (
    <div ref={componentRef} className="stats-container">
      {isVisible &&
        statsData.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-headline">{stat.headline}</div>
            <div className="stat-subheadline">{stat.subheadline}</div>
          </div>
        ))}
    </div>
  );
};

export default CourseReviews;
