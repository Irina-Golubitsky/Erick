import React from 'react';
import { useParams } from 'react-router-dom';
import { QUERY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/react-hooks';

const Userpage = () => {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: userParam }
    });
    const user = data?.user || {};
    console.log(user);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user?.username) {
        return (
            <h4 class="login-error">
                This page doesn't exist
            </h4>
        );
    }
const emailLink="mailto:"+ user.email;

    return (
        <div>
 
            <section id="hero-user" className="d-flex align-items-center">

                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 d-flex flex-column justify-content-center pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
                            <h1>Hello, I'm </h1>
                            <h2>{user.email}</h2>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
                            <img src={require(`../../img/hero-user.png`).default}
                                alt="hero-user" key="hero-user.png" class="img-fluid animated" />
                        </div>
                    </div>
                </div>

            </section>
            <section id="about" class="about">
      <div class="container" data-aos="fade-up">

        <div class="section-title user-page">
          <h2>{user.title}</h2>
        </div>

        <div class="row content">
          <div class="col-lg-6">
            <p>
              {user.about}
            </p>
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0">
            <p>
             {user.contacts}
            </p>
            
          </div>
        </div>

      </div>
    </section>
            <footer class="footer-user">
                <div class="container ">
                    <div class="row text-center">
                        <div class="col-lg-6 col-sm-12">
                            By Irina Golubitsky
                        </div>
                        <div class="col-lg-6 col-sm-12">
                            <a href={emailLink} target="_blank"><i class="fa fa-envelope fa-2x"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    );
};

export default Userpage;