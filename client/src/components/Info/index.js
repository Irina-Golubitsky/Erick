import { UPDATE_USER } from '../../utils/mutations';
import {  useMutation } from '@apollo/react-hooks';

import React, { useState } from 'react';
const Info =props => {
    
    const [updateUser] = useMutation(UPDATE_USER);
   const {user}=props;
   const [formState, setFormState] = useState({ title: user.me.title, about : user.me.about, contacts: user.me.contacts });
   const handleChange = event => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

    console.log(user.me.email);
//     console.log(props);
//     console.log(props.user);
    // const user = data?.me|| {};
    console.log(user);
    const handleClick = async () => {
        try {
          await updateUser({
            variables: { ...formState }
          });
        } catch (e) {
          console.error(e);
        }
      };



    return (

        <div id="info" class="section-bg">
            <div class="container-fluid" data-aos="fade-up">

                <div class="row">

                    <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">

                        <div class="content">
                            <h3>Fill out this fields <strong>to create your webpage</strong></h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                            </p>
                        </div>


                        <div class="info-list" >
                            <h4 > Title</h4>
                            <textarea name="title" value={formState.title} placeholder={user.me.title} onChange={handleChange} />

                        </div>

                        <div class="info-list" >
                            <h4 > About Me</h4>
                            <textarea  name="about" value={formState.about} class="contabout" placeholder={user.me.about}  onChange={handleChange} />

                        </div>
                        <div class="info-list" >
                            <h4 > Contacts</h4>
                            <textarea name="contacts" value={formState.contacts}  placeholder={user.me.contacts} onChange={handleChange} />

                        </div>
                        <div class="infosend text-center"><button class=" " type="submit" onClick={handleClick} >
                            Save
                        </button></div>





                    </div>

                    <div class="col-lg-5  d-flex justify-content-center order-2 order-lg-2 img bgimg  " data-aos="zoom-in" data-aos-delay="150">
                        <div class="h-100 d-flex align-items-end infosend  text-center"><button class="" type="submit">
                            Go next
                        </button></div></div>



                </div>
            </div>
        </div>

    );
};

export default Info;
