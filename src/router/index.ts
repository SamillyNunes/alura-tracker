import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tasks from "@/views/Tasks.vue";

const routes: RouteRecordRaw[] = [{
    path: '/',
    name: 'Tasks',
    component: Tasks,
}];

const router = createRouter({
    // o createWebHashHistory() eh sobre o # que identifica as ancoras da web
    history: createWebHashHistory(),
    routes: routes,
});

export default router;