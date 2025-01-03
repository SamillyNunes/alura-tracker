import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import {
  ADD_PROJECT,
  ADD_TASK,
  DELETE_PROJECT,
  NOTIFY,
  UPDATE_PROJECT,
} from "./mutations_type";
import ITask from "@/interfaces/ITask";
import { INotification } from "@/interfaces/INotification";

interface State {
  projects: IProject[];
  tasks: ITask[];
  notifications: INotification[],
}

export const storeKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
    tasks: [],
    notifications: [],
  },
  // o convencional eh que o nome da mutacao seja em caixa alta
  mutations: {
    [ADD_PROJECT](state, projectName: string) {
      const project = {
        id: new Date().toISOString(),
        name: projectName,
      } as IProject;

      state.projects.push(project);
    },
    [UPDATE_PROJECT](state, project: IProject): void {
      const projectIndex = state.projects.findIndex((p) => p.id === project.id);
      state.projects[projectIndex] = project;
    },
    [DELETE_PROJECT](state, id: string): void {
      state.projects = state.projects.filter((p) => p.id !== id);
    },
    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task);
    },
    [NOTIFY](state, newNotification: INotification): void{
      newNotification.id = new Date().getTime();
      state.notifications.push(newNotification);

      setTimeout(() => {
        state.notifications = state.notifications.filter(n => n.id !== newNotification.id);
      }, 3000);
    }
  },
});

export function customUseStore(): Store<State> {
  return useStore(storeKey);
}
