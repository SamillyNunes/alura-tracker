import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import {
  ADD_PROJECT,
  ADD_TASK,
  DELETE_PROJECT,
  NOTIFY,
  SET_PROJECTS,
  SET_TASKS,
  UPDATE_PROJECT,
} from "./mutations_type";
import ITask from "@/interfaces/ITask";
import { INotification } from "@/interfaces/INotification";
import {
  DELETE_PROJECT_ACTION,
  GET_PROJECTS_ACTION,
  GET_TASKS_ACTION,
  SEND_PROJECT_ACTION,
  SEND_TASK_ACTION,
  UPDATE_PROJECT_ACTION,
} from "./actions_types";
import clientHttp from "@/services/http";

interface State {
  projects: IProject[];
  tasks: ITask[];
  notifications: INotification[];
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
    [SET_PROJECTS](state, projects: IProject[]): void {
      state.projects = projects;
    },

    // TASKS
    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task);
    },
    [SET_TASKS](state, tasks: ITask[]): void {
      state.tasks = tasks;
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
    [GET_PROJECTS_ACTION]({ commit }) {
      clientHttp
        .get("projects")
        .then((response) => commit(SET_PROJECTS, response.data));
    },
    [SEND_PROJECT_ACTION](context, projectName: string) {
      return clientHttp.post("/projects", {
        name: projectName,
      });
    },
    [UPDATE_PROJECT_ACTION](context, project: IProject) {
      return clientHttp.put(`/projects/${project.id}`, project);
    },
    async [DELETE_PROJECT_ACTION]({ commit }, projectId) {
      await clientHttp.delete(`/projects/${projectId}`);
      return commit(DELETE_PROJECT, projectId);
    },

    //ACOES DAS TAREFAS:
    [GET_TASKS_ACTION]({ commit }) {
      clientHttp
        .get("tasks")
        .then((response) => commit(SET_TASKS, response.data));
    },
    [SEND_TASK_ACTION]({commit}, task: ITask) {
      return clientHttp.post("/tasks", task).then(response => commit(ADD_TASK, response.data));
    },
  },
});

export function customUseStore(): Store<State> {
  return useStore(storeKey);
}
