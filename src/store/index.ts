import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT } from "./mutations_type";

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
        [ADD_PROJECT](state, projectName:string){
            const project = {
                id: new Date().toISOString(),
                name: projectName,
            } as IProject;

            state.projects.push(project);
        },
        [UPDATE_PROJECT](state, project: IProject): void {
            const projectIndex = state.projects.findIndex(p=> p.id === project.id);
            state.projects[projectIndex]= project;
        },
        [DELETE_PROJECT](state, id: string): void{
            state.projects = state.projects.filter(p => p.id!==id);
        }
    },
});

export function customUseStore(): Store<State>{
    return useStore(storeKey);
}