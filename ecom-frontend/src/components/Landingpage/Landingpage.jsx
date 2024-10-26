import React from 'react';
import '../Landingpage/landingpage.css';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import phopneImg from '../../assets/phone3.jpg';
import laptopImg from '../../assets/laptop4.jpg';
import HeadphoneImg from '../../assets/headphone2.jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    navigate('/feedback');
    toast('Navigated to Feedback Page!', {
      type: 'success',
      autoClose: 3000,
    });
    console.log('working');
  };

  return (
    <div className="landing-page">
      <ToastContainer />

      <Helmet>
        <link
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.bundle.min.js"></script>
      </Helmet>

      {/* Carousel Section */}
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="2000"> {/* Changed interval to 1000 */}
        <div className="carousel-inner">
          <Link to="/shop" className="carousel-item active no-underline" style={{ backgroundImage: `url(${HeadphoneImg})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px' }}>
            <div className="carousel-content">
              <h2 className="carousel-title">Wireless HeadPhones</h2>
            </div>
          </Link>
          <Link to="/shop" className="carousel-item" style={{ backgroundImage:  `url(${laptopImg})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px' }}>
            <div className="carousel-content">
              <h2 className="carousel-title">Laptops</h2>
            </div>
          </Link>
          <Link to="/shop" className="carousel-item" style={{ backgroundImage:  `url(${phopneImg})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px' }}>
            <div className="carousel-content">
              <h2 className="carousel-title">Phones</h2>
            </div>
          </Link>
        </div>

        {/* Carousel Controls */}
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="row">
            <Link to="/shop" className="col-md-4 mb-4">
              <div className="category-card" style={{ backgroundColor: "#FAD02C" }}>
                <img className="category-image-large" src="/images/ep3.png" alt="Earphones" />
              </div>
            </Link>
            <Link to="/shop" className="col-md-4 mb-4">
              <div className="category-card" style={{ backgroundColor: "#FFB74D" }}>
                <img className="category-image-large" src="/images/w2.png" alt="Wearables" />
              </div>
            </Link>
            <Link to="/shop" className="col-md-4 mb-4">
              <div className="category-card" style={{ backgroundColor: "#81D4FA" }}>
                <img className="category-image-large" src="/images/l2.png" alt="Laptops" />
              </div>
            </Link>
            <Link to="/shop" className="col-md-6 mb-4">
              <div className="category-card" style={{ backgroundColor: "#80CBC4" }}>
                <img className="category-image-large" src="/images/gc2.png" alt="Gaming Console" />
              </div>
            </Link>
            <Link to="/shop" className="col-md-6 mb-4">
              <div className="category-card" style={{ backgroundColor: "#FFABAB" }}>
                <img className="category-image-large" src="/images/p2.png" alt="Phones" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>Email: support@techcart.com | Location: 123 Tech Street, TPLS | &copy; 2024 Tech Cart. All rights reserved.</p>
        </div>
      </footer>

      {/* Feedback Button */}
      <div className="feedback-section">
        <button className="btn-feedback" onClick={handleFeedbackClick}>Feedback</button>
      </div>
    </div>
  );
};

export default LandingPage;
