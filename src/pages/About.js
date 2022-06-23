import React, { Component } from 'react';
import "./About.css";
import picture from "../assets/Picture.jpg";
  
export default class About extends Component {
  render() {
    return (
      <div>
          <div>
            <div class="split left">
              <div className="centered">
                <img 
                  className="profile_image"
                  src={picture}
                  alt="Profile Pic"
                ></img>
              </div>
            </div>
          <div className="split right">
            <div className="centered">
              <div className="name_title">Joshua Holdridge</div>
              <div className="brief_description">
                My name is Joshua Holdridge, I usually go by Josh. I am a Computer Science student at the University of Nevada, Las Vegas. I love to play fighting games and learn about programming.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}