import { createStore, createHook } from 'react-sweet-state';

const ls = require('local-storage');

const Store = createStore({
    // value of the store on initialisation
    initialState: {
        count: 0,
    },
    // actions that trigger store mutation
    actions: {
        increment:
            () =>
                ({ setState, getState }) => {
                    setState({
                        count: getState().count + 1,
                    });
                },

        save:
            () =>
                ({ setState, getState }) => {
                    ls.set('timelinesave', JSON.stringify(getState()))
                },

        load:
            () =>
                ({ setState, getState }) => {
                    setState(JSON.parse(ls.get('timelinesave')));
                },

    },
    name: 'store',
});

export const useStore = createHook(Store);