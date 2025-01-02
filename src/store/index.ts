import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";

interface State{
    projects: IProject[],
}

export const storeKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        projects: [],
    },
    // o convencional eh que o nome da mutacao seja em caixa alta
    mutations: {
        'ADD_PROJECT'(state, projectName:string){
            const project = {
                id: new Date().toISOString(),
                name: projectName,
            } as IProject;

            state.projects.push(project);
        }
    },
});

export function customUseStore(): Store<State>{
    return useStore(storeKey);
}