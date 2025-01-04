import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import { NOTIFY } from "./mutations_type";
import { INotification } from "@/interfaces/INotification";
import { project, ProjectState } from "./modules/project";
import { task, TaskState } from "./modules/task";

export interface State {
  notifications: INotification[];
  project: ProjectState;
  task: TaskState;
}

export const storeKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    notifications: [],
    project: {
      projects: [], // iniciando de forma global
    },
    task: {
      tasks: [],
    }
  },
  // o convencional eh que o nome da mutacao seja em caixa alta
  mutations: {

    // NOTIFICATIONS
    [NOTIFY](state, newNotification: INotification): void {
      newNotification.id = new Date().getTime();
      state.notifications.push(newNotification);

      setTimeout(() => {
        state.notifications = state.notifications.filter(
          (n) => n.id !== newNotification.id
        );
      }, 3000);
    },
  },
  modules: {
    project,
    task
  },
});

export function customUseStore(): Store<State> {
  return useStore(storeKey);
}
