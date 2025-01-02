import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tasks from "@/views/Tasks.vue";
import Projects from "@/views/Projects.vue";

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
];

const router = createRouter({
    // o createWebHashHistory() eh sobre o # que identifica as ancoras da web
    history: createWebHashHistory(),
    routes: routes,
});

export default router;