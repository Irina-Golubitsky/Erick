import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../../utils/mutations';
import { Redirect } from 'react-router-dom';

import Auth from '../../utils/auth';

const Login = props => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState }
            });

            Auth.login(data.login.token);

            // window.location.assign(window.location.href.replace("login","")+"profile");
     
        } catch (e) {
            console.error(e);
        }
        // clear form values
        setFormState({
            email: '',
            password: ''
        });

    };

    return (
        <section id="contact" class="contact">
            <div class="container" data-aos="fade-up">
                <div class="row justify-content-center">
                    <div class="col-lg-6 col-m-8 mt-0  d-flex   align-items-stretch">
                        <form onSubmit={handleFormSubmit} class="php-email-form">
                            <h3 class="text-center">Login</h3>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="name">Your Name</label>
                                    <input class="form-control" placeholder="Your email"
                                        name="email"
                                        type="email"
                                        id="email"
                                        value={formState.email}
                                        onChange={handleChange} required />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="name">Your Password</label>
                                    <input class="form-control" placeholder="******"
                                        name="password"
                                        type="password"
                                        id="password"
                                        value={formState.password}
                                        onChange={handleChange}
                                        required />
                                </div></div>
                                {error && <div>Login failed</div>}
                                {Auth.loggedIn() ? <Redirect to="/profile" /> :<> </>}
                                

                            <div class="text-center"><button className="btn  w-50" type="submit">
                                Submit
                            </button></div>
                        </form>
                      

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Login;