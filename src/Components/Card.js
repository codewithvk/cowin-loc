import React from "react";
import './Card.css'
function CardCom({info}) {
  return (
    <div>
      
        {info.map((x) => (
          <div>
            <div class="courses-container">
              <div class="course">
                <div class="course-preview">
                  <h6>{x.center_id}</h6>
                  <h2>{x.name}</h2>
                  <h5>
                    {x.block_name + " " + x.district_name + " " + x.state_name}{" "}
                  </h5>
                  <h5>{x.pincode}</h5>
                </div>
                <div class="course-info">
                  <div class="progress-container">
                    <span class="progress-text">
                      Time :- {x.from + " - " + x.to}{" "}
                    </span>
                  </div>
                  <h6>Fees : {x.fee}</h6>
                  <h6> Avalables : {x.available_capacity}</h6>

                  {x.slots.map((p) => (
                    <h4>{p}</h4>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      
    </div>
  );
}

export default CardCom;
