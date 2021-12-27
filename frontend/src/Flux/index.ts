import { configureStore } from '@reduxjs/toolkit'
import { houseSlice, HouseState } from "Flux/Slice";
import { Action } from "@reduxjs/toolkit";
import { Observable } from "rxjs";
import { IPerformanceService } from "Service";
import Services from "Service";
import { rootEpic } from "Flux/Epic";
import { backend$ } from 'Repository';
import { } from "Repository"; // init subscription
import { createEpicMiddleware } from 'Service/Epic/EpicMiddleware';

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
    action$: backend$
  });

export const store = configureStore({
  reducer: { [houseSlice.name]: houseSlice.reducer },
  middleware: [
    epicMiddleware
  ],
})

export type AppDispatch = typeof store.dispatch
export type Epic = (
  actions$: Observable<Action>,
  state$: Observable<RootState>,
  dependencies: Dependencies & Actions
) => (Observable<Action>)

epicMiddleware.run(rootEpic);
