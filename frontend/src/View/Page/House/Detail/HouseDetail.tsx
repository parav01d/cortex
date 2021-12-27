import { RootState } from 'Flux';
import { hasError } from 'Flux/Query';
import { houseSlice } from 'Flux/Slice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import 'View/Page/House/Detail/HouseDetail.css';

export function HouseDetail() {
  const dispatch = useDispatch();
  const { houseId } = useParams();

  useEffect(() => {
    dispatch(houseSlice.actions.findHouseRequest({ id: `${houseId}` }));
  }, []);

  const house = useSelector((state: RootState) => state.house.detail);
  const error = useSelector(hasError(["house/findHouseFailure"]));

  return (
    <div className="Container">
      <h1>HouseDetail {houseId}</h1>
      {
        house ? (
          <p>{house.name}</p>
        ) : null
      }
      {
        error ? (
          <p>Daten konnten nicht geladen werden.</p>
        ) : null
      }
      <Link to="/">zurück</Link>
    </div>
  );
}
