import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tasks from "@/views/Tasks.vue";
import Projects from "@/views/Projects.vue";
import ProjectForms from "@/views/Projects/ProjectForms.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tasks',
        component: Tasks,
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects,
    },
    {
        path: '/projects/new',
        name: 'New Project',
        component: ProjectForms,
    },
    {
        path: '/projects/:id',
        name: 'Update Project',
        component: ProjectForms,
        // esse props: true diz que esse :id definido no path
        // vai ser injetado como uma propriedade do componente
        props: true,
    },
];

const router = createRouter({
    // o createWebHashHistory() eh sobre o # que identifica as ancoras da web
    history: createWebHashHistory(),
    routes: routes,
});

export default router;