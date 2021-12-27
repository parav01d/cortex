import React, { useEffect, useRef } from 'react';
import 'View/Page/House/List/HouseList.css';
import { Button } from "View/Common";
import { BehaviorSubject, startWith, Subject } from 'rxjs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Flux';
import { houseSlice } from 'Flux/Slice';
import { useNavigate } from "react-router-dom";
import { hasError } from 'Flux/Query';
import { Pagination } from 'View/Component';

export function HouseList() {
  const loadHouses$ = useRef(new BehaviorSubject<string | undefined>("1"));
  const showHouse$ = useRef(new Subject<string | undefined>());

  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    let subscription = loadHouses$.current.pipe(
      startWith("1")
    ).subscribe((page) => {
      dispatch(houseSlice.actions.getHouseRequest({ take: 10, page: parseInt(page!, 10) }));
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    let subscription = showHouse$.current.subscribe((houseId) => {
      navigate(`/${houseId}`)
    })
    return () => subscription.unsubscribe()
  }, [])

  const list = useSelector((state: RootState) => state.house.list);
  const error = useSelector(hasError([houseSlice.actions.getHouseFailure.type]));
  const total = useSelector((state: RootState) => state.house.total);

  return (
    <div className="Container">
      <h1>HouseList</h1>
      <ul className="Container__List">
        {
          list.map((house) => (
            <li
              className="Container__List__Element"
              key={`${house.id}`}>
              <Button subject$={showHouse$.current} text={house.name} value={`${house.id}`} />
            </li>
          ))
        }
        {
          error ? (
            <li
              className="Container__List__Element"
              key={"error"}>
              <p>Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut</p>
            </li>
          ) : null
        }
      </ul>
      <Pagination subject$={loadHouses$.current} take={10} total={total} page={parseInt(loadHouses$.current.value!, 10)} />
    </div>
  );
}
