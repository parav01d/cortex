import React, { useEffect, useRef } from 'react';
import 'View/Page/House/List/HouseList.css';
import { Button } from "View/Common";
import { Subject } from 'rxjs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Flux';
import { houseSlice } from 'Flux/Slice';

export function HouseList() {
  const loadHouses$ = useRef(new Subject<void>());
  const showHouse$ = useRef(new Subject<void>());
  const dispatch = useDispatch()

  useEffect(() => {
    let subscription = loadHouses$.current.subscribe(() => {
      dispatch(houseSlice.actions.getHouseRequest({ take: 10, page: 0 }));
    })
    return () => subscription.unsubscribe()
  }, [])

  const list = useSelector((state: RootState) => state.house.list);

  return (
    <div className="Container">
      <h1>HouseList</h1>
      <ul>
        {
          [
            { id: "1", name: "Bungalow 1" },
            { id: "2", name: "Bungalow 2" },
            { id: "3", name: "Bungalow 3" },
          ].map((house) => (
            <li key={`${house.id}`}><Button subject$={showHouse$.current} text={house.name} /></li>
          ))
        }
      </ul>
      <Button subject$={loadHouses$.current} text={"Load Houses"} />
    </div>
  );
}
