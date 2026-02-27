"use client";

import React from "react";

export default function SocialPlatform() {
  const [leftSide, setLeftSide] = React.useState(false);
  const [rightSide, setRightSide] = React.useState(false);

  return (
    <div className="container">
      <div className={`left-side ${leftSide ? "active" : ""}`}>
        <button
          type="button"
          className="left-side-button"
          onClick={() => setLeftSide((v) => !v)}
          aria-label="Toggle left menu"
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <line x1="3" y1="12" x2="21" y2="12">
              {" "}
            </line>{" "}
            <line x1="3" y1="6" x2="21" y2="6">
              {" "}
            </line>{" "}
            <line x1="3" y1="18" x2="21" y2="18">
              {" "}
            </line>{" "}
          </svg>
          <svg
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"> </path>
          </svg>
        </button>

        <div className="logo">ULTRANET</div>

        <div className="side-wrapper">
          <div className="side-title">MENU</div>
          <div className="side-menu">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                <path d="M9 22V12h6v10"></path>
              </svg>
              Home
            </a>
            <a href="#">
              <svg
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              Latest News
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Explore
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                <path d="M14 2v6h6"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
                <path d="M10 9H8"></path>
              </svg>
              Files
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <path d="M21 15l-5-5L5 21"></path>
              </svg>
              Galery
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <path d="M16 2v4"></path>
                <path d="M8 2v4"></path>
                <path d="M3 10h18"></path>
              </svg>
              Events
            </a>
          </div>
        </div>

        <div className="side-wrapper">
          <div className="side-title">YOUR FAVOURITES</div>
          <div className="side-menu">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M17 21l-5-4-5 4V3h10z"></path>
              </svg>
              Favourites
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
              </svg>
              Messages
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              Like
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              Photo
            </a>
          </div>
        </div>

        <div className="side-wrapper">
          <div className="side-title">DEVELOPER</div>
          <a className="developer" href="#">
            <span className="developer">
              <img
                src="https://pbs.twimg.com/profile_images/1253782473953157124/x56UURmt_400x400.jpg"
                alt=""
              />
              Aysenur Turk — @AysnrTrkk
            </span>
          </a>
        </div>
      </div>

      <div className="main">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button
            type="button"
            className="right-side-button"
            onClick={() => setRightSide((v) => !v)}
            aria-label="Toggle right panel"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </button>
        </div>

        <div className="main-container">
          <div className="profile">
            <img
              src="https://images.unsplash.com/photo-1507120410856-1f35574c3b45?auto=format&fit=crop&w=60&q=60"
              alt=""
            />
            <div className="profile-name">Mike Andrew</div>
          </div>

          <div className="timeline">
            <div className="timeline-left">
              <div className="timeline-left-header">
                <div className="timeline-left-header-user">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=60"
                    alt=""
                  />
                  <div className="user">
                    <div className="username">Jessica Miller</div>
                    <div className="time">8 hours ago</div>
                  </div>
                </div>
                <button className="timeline-left-header-more" type="button">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="1.6"></circle>
                    <circle cx="19" cy="12" r="1.6"></circle>
                    <circle cx="5" cy="12" r="1.6"></circle>
                  </svg>
                </button>
              </div>

              <div className="timeline-left-content">
                <img
                  className="timeline-left-content-image"
                  src="https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1000&q=60"
                  alt=""
                />

                <div className="timeline-left-content-text">
                  <span>
                    It is a long established fact that a reader will be distracted
                    by the readable content of a page when looking at its layout.
                  </span>
                </div>
              </div>

              <div className="timeline-left-footer">
                <button className="timeline-left-footer-button" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>

                <button className="timeline-left-footer-button" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
                  </svg>
                </button>

                <button className="timeline-left-footer-button" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 4v16h16"></path>
                    <path d="M4 12l4-4 4 4 8-8"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="timeline-right">
              <div className="timeline-right-header">
                <div className="timeline-right-header-title">Stories</div>
                <div className="timeline-right-header-settings">
                  <svg
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1v2"></path>
                    <path d="M12 21v2"></path>
                    <path d="M4.22 4.22l1.42 1.42"></path>
                    <path d="M18.36 18.36l1.42 1.42"></path>
                    <path d="M1 12h2"></path>
                    <path d="M21 12h2"></path>
                    <path d="M4.22 19.78l1.42-1.42"></path>
                    <path d="M18.36 5.64l1.42-1.42"></path>
                    <circle cx="12" cy="12" r="5"></circle>
                  </svg>
                </div>
              </div>

              <div className="story">
                <div className="story-card">
                  <img
                    className="story-card-image"
                    src="https://images.unsplash.com/photo-1521898284481-a5ec348cb555?auto=format&fit=crop&w=400&q=60"
                    alt=""
                  />
                  <div className="story-card-author">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=60"
                      alt=""
                    />
                  </div>
                </div>

                <div className="story-card">
                  <img
                    className="story-card-image"
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=60"
                    alt=""
                  />
                  <div className="story-card-author">
                    <img
                      src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=60&q=60"
                      alt=""
                    />
                  </div>
                </div>

                <div className="story-card">
                  <img
                    className="story-card-image"
                    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=60"
                    alt=""
                  />
                  <div className="story-card-author">
                    <img
                      src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=60&q=60"
                      alt=""
                    />
                  </div>
                </div>

                <div className="story-card">
                  <img
                    className="story-card-image"
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=60"
                    alt=""
                  />
                  <div className="story-card-author">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=60&q=60"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="timeline-right-header">
                <div className="timeline-right-header-title">Suggested</div>
              </div>

              <div className="suggested">
                <div className="suggested-user">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=60&q=60"
                    alt=""
                  />
                  <div className="suggested-user-name">
                    <span>Tom Holland</span>
                    <span>Developer</span>
                  </div>
                  <button className="suggested-user-button" type="button">
                    Follow
                  </button>
                </div>

                <div className="suggested-user">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=60"
                    alt=""
                  />
                  <div className="suggested-user-name">
                    <span>Jason Momoa</span>
                    <span>UI Designer</span>
                  </div>
                  <button className="suggested-user-button" type="button">
                    Follow
                  </button>
                </div>

                <div className="suggested-user">
                  <img
                    src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=60&q=60"
                    alt=""
                  />
                  <div className="suggested-user-name">
                    <span>Selena Gomez</span>
                    <span>UX Designer</span>
                  </div>
                  <button className="suggested-user-button" type="button">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`right-side ${rightSide ? "active" : ""}`}>
        <div className="account">
          <button className="account-button" type="button">
            <svg
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
            </svg>
          </button>
          <button className="account-button" type="button">
            <svg
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M18 8A6 6 0 00 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 01-3.46 0"></path>
            </svg>
          </button>

          <span className="account-user">
            <img
              className="account-profile"
              src="https://pbs.twimg.com/profile_images/1253782473953157124/x56UURmt_400x400.jpg"
              alt=""
            />
            <span className="account-username">Aysenur Turk</span>
          </span>
        </div>

        <div className="side-wrapper">
          <div className="side-title">ONLINE FRIENDS</div>
          <div className="side-menu">
            <a href="#">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=60"
                alt=""
              />
              Tom Holland
            </a>
            <a href="#">
              <img
                src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=60&q=60"
                alt=""
              />
              Selena Gomez
            </a>
            <a href="#">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=60&q=60"
                alt=""
              />
              Jack Sparrow
            </a>
            <a href="#">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=60&q=60"
                alt=""
              />
              Aaron Paul
            </a>
          </div>
        </div>

        <div className="side-wrapper">
          <div className="side-title">LATEST UPDATES</div>
          <div className="side-menu">
            <a href="#">
              <div className="activity-dot"></div>
              <span>Tonny posted 1 photo</span>
              <span className="activity-date">2 min ago</span>
            </a>
            <a href="#">
              <div className="activity-dot"></div>
              <span>Mike started following you</span>
              <span className="activity-date">45 min ago</span>
            </a>
            <a href="#">
              <div className="activity-dot"></div>
              <span>Jessica liked your post</span>
              <span className="activity-date">1 hour ago</span>
            </a>
            <a href="#">
              <div className="activity-dot"></div>
              <span>Daniel joined to the group</span>
              <span className="activity-date">4 hour ago</span>
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`overlay ${(rightSide || leftSide) ? "active" : ""}`}
        onClick={() => {
          setRightSide(false);
          setLeftSide(false);
        }}
        aria-label="Close panels"
      />
    </div>
  );
}