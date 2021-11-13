
import React from 'react';
const Info = props => {
  const {user}=props;



  return (

    <div id="why-us" class="why-us section-bg">
      <div class="container-fluid" data-aos="fade-up">

        <div class="row">

          <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">

            <div class="content">
              <h3>Fill out this fields <strong>to create your webpage</strong></h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
              </p>
            </div>

           
                  <div  class="accordion-list" >
                  <h4 > Title</h4>
                    <input  />
                    
                  </div>
             
                  <div  class="accordion-list" >
                  <h4 > About Me</h4>
                    <input  />
                    
                  </div>
                  <div  class="accordion-list" >
                  <h4 > Contacts</h4>
                    <input  />
                    
                  </div>


            
           

          </div>
        </div>

      </div>
    </div>

  );
};

export default Info;
