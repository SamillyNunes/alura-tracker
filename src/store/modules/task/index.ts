import ITask from "@/interfaces/ITask";
import clientHttp from "@/services/http";
import { State } from "@/store";
import {
  GET_TASKS_ACTION,
  SEND_TASK_ACTION,
  UPDATE_TASK_ACTION,
} from "@/store/actions_types";
import { ADD_TASK, SET_TASKS, CHANGE_TASK } from "@/store/mutations_type";
import { Module } from "vuex";

export interface TaskState {
  tasks: ITask[];
}

export const task: Module<TaskState, State> = {
  mutations: {
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
  },
  actions: {
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
};
