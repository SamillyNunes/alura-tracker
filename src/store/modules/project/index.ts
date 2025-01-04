import { Module } from "vuex";

import IProject from "@/interfaces/IProject";
import clientHttp from "@/services/http";
import { State } from "@/store";
import { GET_PROJECTS_ACTION, SEND_PROJECT_ACTION, UPDATE_PROJECT_ACTION, DELETE_PROJECT_ACTION } from "@/store/actions_types";
import { ADD_PROJECT, DELETE_PROJECT, SET_PROJECTS, UPDATE_PROJECT } from "@/store/mutations_type";

export interface ProjectState {
  projects: IProject[];
}

export const project: Module<ProjectState, State> = {
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
  },
};
