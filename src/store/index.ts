import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

interface State{
    projects: IProject[],
}

export const storeKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        projects: [
            {
                id: new Date().toISOString(),
                name: 'Typescript',
            },
            {
                id: new Date().toISOString(),
                name: 'Vue',
            },
            {
                id: new Date().toISOString(),
                name: 'Vuex',
            },
        ],
    },
});