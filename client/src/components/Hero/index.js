import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import background from "../../img/ak_buildings.webp";

const Hero = () => {


    return (
        <section id="hero" className="d-flex align-items-center " style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>

            <div class="container">
                <div class="row">
                    <div class="col-lg-6 d-flex flex-column justify-content-center pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
                        <h1>INTAKES bla bla bla</h1>
                        <h2>AK reports</h2>
                        <div className="d-flex justify-content-center justify-content-lg-start">
                            {Auth.loggedIn() ? (
                                <>
                                </>) : (<> <Link to="/login"> <p className="btn-get-started scrollto">Get Started</p></Link> </>)}
                        </div>
                    </div>
                    <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
                        <img src={require(`../../img/user-hero.png`).default}
                            alt="hero-img" key="user-hero.png" class="img-fluid animated" />

                    </div>
                </div>
            </div>

        </section>

    );
};

export default Hero;
