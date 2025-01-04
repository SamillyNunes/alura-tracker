import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import { ADD_TASK, CHANGE_TASK, NOTIFY, SET_TASKS } from "./mutations_type";
import ITask from "@/interfaces/ITask";
import { INotification } from "@/interfaces/INotification";
import {
  GET_TASKS_ACTION,
  SEND_TASK_ACTION,
  UPDATE_TASK_ACTION,
} from "./actions_types";
import clientHttp from "@/services/http";
import { project, ProjectState } from "./modules/project";

export interface State {
  tasks: ITask[];
  notifications: INotification[];
  project: ProjectState;
}

export const storeKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    tasks: [],
    notifications: [],
    project: {
      projects: [], // iniciando de forma global
    },
  },
  // o convencional eh que o nome da mutacao seja em caixa alta
  mutations: {
    // TASKS
    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task);
    },
    [SET_TASKS](state, tasks: ITask[]): void {
      state.tasks = tasks;
    },
    [CHANGE_TASK](state, task: ITask): void {
      const taskIndex = state.tasks.findIndex((t) => t.id === task.id);
      state.tasks[taskIndex] = task;
    },

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
  actions: {
    //ACOES DAS TAREFAS:
    [GET_TASKS_ACTION]({ commit }) {
      clientHttp
        .get("tasks")
        .then((response) => commit(SET_TASKS, response.data));
    },
    async [SEND_TASK_ACTION]({ commit }, task: ITask) {
      const response = await clientHttp.post("/tasks", task);
      return commit(ADD_TASK, response.data);
    },
    async [UPDATE_TASK_ACTION]({ commit }, task: ITask) {
      await clientHttp.put(`/tasks/${task.id}`, task);
      return commit(CHANGE_TASK, task);
    },
  },
  modules: {
    project,
  },
});

export function customUseStore(): Store<State> {
  return useStore(storeKey);
}
