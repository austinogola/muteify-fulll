import React from 'react';
import './UserReviews.css';

const UserReviews = () => {
  return (
    <section className="user-reviews">
      <div className="reviews-header">
        <h2>User Reviews</h2>
        <p>
          “Mutify has changed the way I watch videos. It allows me to enjoy content without worrying about the music. As a Muslim, this is a huge relief” - Abdullah AK
        </p>
      </div>
      <div className="reviews-cards">
        <div className="review-card">
          <div className='cardOverlay'>
          </div>
          <div className="card-image" style={{ backgroundImage: "url('/images/happy-black-man.webp')" }}>
            <div >

            </div>
            <div className="quote">“</div>
            <p>Finally, an app that helps me protect my ears and soul. Muteify is exactly what I needed.</p>
            {/* <button className="play-button">▶</button> */}
          </div>
        </div>
        <div className="review-card active">
          <div className='cardOverlay'>
          </div>
          <div className="card-image" style={{ backgroundImage: "url('/images/man-in-suit1.jpg')" }}>
            <div className="info">
              <h4>Esther Howard</h4>
              <p>Co-Founder of SOFTIE</p>
            </div>
            {/* <button className="pause-button">⏸</button> */}
          </div>
        </div>
        <div className="review-card">
        <div className='cardOverlay'>
          </div>
          <div className="card-image" style={{ backgroundImage: "url('/images/white-man-cap.jpg')" }}>
            <div className="quote">“</div>
            <p>As someone trying to live a more halal lifestyle, I struggled every day with background music in videos …</p>
            {/* <button className="play-button">▶</button> */}
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
