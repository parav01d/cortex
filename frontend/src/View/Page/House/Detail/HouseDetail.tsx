import { houseSlice } from 'Flux/Slice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import 'View/Page/House/Detail/HouseDetail.css';

export function HouseDetail() {
  const dispatch = useDispatch();
  const { houseId } = useParams();

  useEffect(() => {
    dispatch(houseSlice.actions.findHouseRequest({ id: `${houseId}` }));
  }, []);

  return (
    <div className="Container">
      <h1>HouseDetail {houseId}</h1>
      <Link to="/">zurück</Link>
    </div>
  );
}
