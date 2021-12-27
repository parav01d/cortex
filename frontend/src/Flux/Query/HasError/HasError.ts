import { RootState } from "Flux"

export const hasError = (actions: string[]) => (state: RootState) => {
    return state.house.error.filter(
        s => actions.indexOf(s) >= 0
    ).length > 0
}