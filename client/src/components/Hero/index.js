import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  

  return (
  <section id="hero" className="d-flex align-items-center">

<div class="container">
  <div class="row">
    <div class="col-lg-6 d-flex flex-column justify-content-center pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
      <h1>Better Solutions For Your Business</h1>
      <h2>We are team of talented designers making websites with Bootstrap</h2>
      <div className="d-flex justify-content-center justify-content-lg-start">
        <Link to="/login"> <p className="btn-get-started scrollto">Get Started</p></Link>
      </div>
    </div>
    <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
    <img src={require(`../../img/hero-img.png`).default}
                                alt="hero-img" key="hero-img.png" class="img-fluid animated" />
     
    </div>
  </div>
</div>

</section>

  );
};

export default Hero;
