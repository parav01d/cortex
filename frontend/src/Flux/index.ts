import { configureStore } from '@reduxjs/toolkit'
import { houseSlice, HouseState } from "Flux/Slice";
import { createEpicMiddleware } from "redux-observable";
import { Action } from "@reduxjs/toolkit";
import { Observable } from "rxjs";
import { IPerformanceService } from "Service";
import Services from "Service";
import { rootEpic } from "Flux/Epic";
import { $backend } from 'Repository/Socket/Backend';
import { } from "Repository"; // init subscription

/**
 * @Service
 * If you create a new Service then add it here
 */
export type Dependencies = {
  PerformanceService: IPerformanceService,
}

/**
 * @Slice
 * If you create a new Slice then add State, Action-Types and Actions here
 */
export type RootState = {
  [houseSlice.name]: HouseState;
}
export type Actions = typeof houseSlice.actions;
export const epicMiddleware = createEpicMiddleware<
  Action,
  Action,
  RootState,
  Dependencies & Actions>
  ({
    dependencies: {
      PerformanceService: Services.PerformanceService,
      ...houseSlice.actions
    },
  });

export const store = configureStore({
  reducer: { [houseSlice.name]: houseSlice.reducer },
  middleware: [
    epicMiddleware
  ],
})


// Monkey Patching Dispatch Method
// Emit everything on backend$ and use the old dispatch 
// out of an backend$ subscription.
export const dispatch = store.dispatch;
store.dispatch = (action) => {
  console.log("dispatch new", action);
  $backend.next(action);
  return action
}


export type AppDispatch = typeof store.dispatch
export type Epic = (
  actions$: Observable<Action>,
  state$: Observable<RootState>,
  dependencies: Dependencies & Actions
) => (Observable<Action>)

epicMiddleware.run(rootEpic);