import React from "react";
import { Card, Button } from "react-bootstrap";
function Card2({ info }) {
  return (
    <div>
      {info.map((x) => {
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{x.name}</Card.Title>
              <Card.Text>
                {x.block_name + " " + x.district_name + " " + x.state_name}{" "}
              </Card.Text>
              <Card.Text>{x.pincode}</Card.Text>
              <Card.Text>
                <h6>Fees : {x.fee}</h6>
                <h6> Avalables : {x.available_capacity}</h6>
              </Card.Text>
              {x.slots.map((p)=>{
                <h4>{p}</h4>
              }) }
            </Card.Body>
          </Card>
        </div>;
      })}
    </div>
  );
}

export default Card2;
