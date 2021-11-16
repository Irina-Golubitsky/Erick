import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { UPDATE_USER } from '../../utils/mutations';
import {  useMutation } from '@apollo/react-hooks';


const Info =props => {
   
    const [updateUser] = useMutation(UPDATE_USER);
    const [queryMe] = useMutation(UPDATE_USER);
    const [formState, setFormState] = useState({ title: "", about :"", contacts:"", fullname: "", nb:""});


    // const [updateUser, { error }] = useMutation( UPDATE_USER, {
    //     update(cache, { data: { updateUser } }) {
    //         try {
    //         const { me } = cache.readQuery({ query: QUERY_ME  });
    //         cache.writeQuery({
    //           query: QUERY_ME,
    //           data: { me: { ...me, updateUser } }
    //         });
    //      console.log ("cache title " +data.me.title);
    //     } catch (e) {
    //         console.error(e);
    //       }
    //     }
    //   });


    const { loading, data } = useQuery( QUERY_ME, {    
      });
      const user = data?.me || {};
      if (loading) {
        return <div>Loading...</div>;
      }
      
      console.log ("my user " + user.username);
      console.log ("my user title " + user.title);
 console.log(formState);
      if (!user?.username) {
        return (
          <h4 class="login-error">
            You need to be logged in to see this. Use the navigation links above to sign up or log in!
          </h4>
        );
      } 

    //  
      
   const handleChange = event => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

   
    const handleClick = async () => {
        console.log ("formstate "+ formState);
         let variablesfs={};
        if (formState.title!=""){variablesfs.title=formState.title};
        if (formState.about!=""){variablesfs.about=formState.about};
        if (formState.contacts!=""){variablesfs.contacts=formState.contacts};
        if (formState.fullname!=""){variablesfs.fullname=formState.fullname};
        if (formState.nb!=""){variablesfs.nb=formState.nb};
        console.log(variablesfs);
        try {
            await updateUser({
              variables: variablesfs
            });
          } catch (e) {
            console.error(e);
          }
     
    //   const user2 = useQuery( QUERY_ME, {  username:user.username  
    //   });
    //         console.log("user2 title after updateUser" + user2.title);
    //         user=user2;
    //       console.log("user title after updateUser" + user.title);
       
        };
          //  const [formState, setFormState] = useState({ title: user.title, about : user.about, contacts: user.contacts, fullname: user.fullname, nb: user.nb });


      return (

        <div id="info" class="section-bg">
            <div class="container-fluid" data-aos="fade-up">

                <div class="row">

                    <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1 infobox">

                        <div class="content">
                            <h3>Fill out this fields <strong>to create your webpage</strong></h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                            </p>
                        </div>

                        <div class="row info-list">
                        <div class="col-md-6" >
                            <h4 > Full Name</h4>
                            <textarea id = "full-info" value={formState.fullname}  name="fullname"  placeholder={user.fullname} onChange={handleChange} />
                        </div>
                        <div class="col-md-6 " >
                            <h4 > Title</h4>
                            <textarea id = "title-info" value={formState.title}  name="title"  placeholder={user.title} onChange={handleChange} />

                        </div>
                        </div>

                        <div class="info-list" >
                            <h4 > About Me</h4>
                            <textarea  id = "about-info" name="about"  class="contabout" value={formState.about} placeholder={user.about}  onChange={handleChange} />

                        </div>
                        <div class="row info-list">
                        <div class="col-md-6" >
                            <h4 > Contacts</h4>
                            <textarea id = "contacts-info" name="contacts" class="contabout" value={formState.contacts} placeholder={user.contacts} onChange={handleChange} />
                        </div>
                        <div  class="col-md-6">
                            <h4 > Announcement</h4>
                            <textarea id = "nb-info" name="nb" class="contabout" value={formState.nb} placeholder={user.nb} onChange={handleChange} />
                        </div>
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
