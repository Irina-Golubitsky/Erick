import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../../utils/mutations';
import { Redirect } from 'react-router-dom';

import Auth from '../../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);
  
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
        const { data } = await addUser({
          variables: { ...formState }
        });
  
        // Auth.login(data.addUser.token);
        window.location.replace("/admin");
      } catch (e) {
        console.error(e);
        
      }
    
    };

    return (
        <section id="contact" class="contact">
            <div class="container" data-aos="fade-up">
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-8 col-sm-10 mt-0  d-flex   align-items-stretch">
                        <form onSubmit={handleFormSubmit} class="php-email-form  ">
                            <h3 class="text-center">New User</h3>
                           
                            <div class="form-group ">
                                    <label for="name">Name</label>
                                    <input class="form-control" placeholder="Username"
                                        name="username"
                                        type="text"
                                        id="username"
                                        value={formState.username}
                                        onChange={handleChange} required />
                                </div>
                                <div class="form-group ">
                                    <label for="email">Email</label>
                                    <input class="form-control" placeholder="Email"
                                        name="email"
                                        type="string"
                                        id="email"
                                        value={formState.email}
                                        onChange={handleChange} required />
                                </div>
                                <div class="form-group ">
                                    <label for="name">Password</label>
                                    <input class="form-control" placeholder="******"
                                        name="password"
                                        type="text"
                                        id="password"
                                        value={formState.password}
                                        onChange={handleChange}
                                        required />
                               </div>
                               {error && <div>Signup failed</div>}
                              
                            <div class="text-center"><button className="btn  w-50" type="submit">
                                Add
                            </button></div>
                        </form>

    
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Signup;
