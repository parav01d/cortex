import React from 'react';
import { useParams } from "react-router-dom";
import 'View/Page/House/Detail/HouseDetail.css';

export function HouseDetail() {

  let { houseId } = useParams();

  return (
    <div className="Container">
      <h1>HouseDetail</h1>
    </div>
  );
}
