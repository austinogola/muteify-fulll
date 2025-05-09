import React from 'react';
import './UserReviews.css';

const UserReviews = () => {
  return (
    <section className="user-reviews">
      <div className="reviews-header">
        <h2>User Reviews</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis cursus venenatis. <br/>Vivamus nec nisi sit amet leo laoreet viverra.</p>
      </div>
      <div className="reviews-cards">
        <div className="review-card">
          <div className="card-image" style={{ backgroundImage: "url('/images/1.png')" }}>
            <div className="quote">“</div>
            <p>Finally, an app that helps me protect my ears and soul. Haram Music Mute is exactly what I needed.</p>
            <button className="play-button">▶</button>
          </div>
        </div>
        <div className="review-card active">
          <div className="card-image" style={{ backgroundImage: "url('/images/2.png')" }}>
            <div className="info">
              <h4>Esther Howard</h4>
              <p>Co-Founder of SOFTIE</p>
            </div>
            <button className="pause-button">⏸</button>
          </div>
        </div>
        <div className="review-card">
          <div className="card-image" style={{ backgroundImage: "url('/images/3.png')" }}>
            <div className="quote">“</div>
            <p>As someone trying to live a more halal lifestyle, I struggled every day with background music in videos …</p>
            <button className="play-button">▶</button>
          </div>
        </div>
      </div>
      <div className="see-all">
        <button>See all reviews ↗</button>
      </div>
    </section>
  );
};

export default UserReviews;
