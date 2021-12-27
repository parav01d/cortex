export const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
    console.group(action.type)
    console.info('Dispatch: ', action)
    let result = next(action)
    console.log('Next State: ', store.getState())
    console.groupEnd()

    return result
}