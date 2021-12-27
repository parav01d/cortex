import { configureStore } from '@reduxjs/toolkit'
import { houseSlice, HouseState } from "Flux/Slice";
import { Action } from "@reduxjs/toolkit";
import { Observable } from "rxjs";
import { IPerformanceService } from "Service";
import Services from "Service";
import { rootEpic } from "Flux/Epic";
import { backend$ } from 'Repository';
import { } from "Repository"; // init subscription
import { createEpicMiddleware } from 'Flux/Middleware/Epic/EpicMiddleware';
import { loggerMiddleware } from './Middleware';

export type Dependencies = {
  PerformanceService: IPerformanceService,
}

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
    epicMiddleware,
    loggerMiddleware
  ],
})

export type AppDispatch = typeof store.dispatch
export type Epic = (
  actions$: Observable<Action>,
  state$: Observable<RootState>,
  dependencies: Dependencies & Actions
) => (Observable<Action>)

epicMiddleware.run(rootEpic);
