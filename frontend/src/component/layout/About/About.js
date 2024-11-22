import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import abhi from "./meprofile.jpg"

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/abhinavsinghal791";
  };

  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <img
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={abhi}
              alt="Founder"
            />
            <Typography>Abhinav Singhal</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              I am Abhinav Singhal .
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>

            <a
              href="https://instagram.com/abhinavsinghal791"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
            >
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
