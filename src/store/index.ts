import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import {
  ADD_PROJECT,
  ADD_TASK,
  DELETE_PROJECT,
  UPDATE_PROJECT,
} from "./mutations_type";
import ITask from "@/interfaces/ITask";
import { INotification, NotificationType } from "@/interfaces/INotification";

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
    notifications: [
      {
        id: 1,
        title: 'Uma notificação de sucesso',
        text: 'Você conseguiu, parabéns!',
        type: NotificationType.SUCCESS,
      },
      {
        id: 2,
        title: 'Uma notificação de atenção',
        text: 'Cuidado',
        type: NotificationType.WARNING,
      },
      {
        id: 3,
        title: 'Uma notificação de perigo',
        text: 'Você falhou',
        type: NotificationType.FAIL,
      }
    ],
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
  },
});

export function customUseStore(): Store<State> {
  return useStore(storeKey);
}
