
import Home from './views/HomeView.vue';
import Projects from './views/ProjectsView.vue';
import LoginView from './views/admin/LoginView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: Projects },
  { path: '/login', component: LoginView},
];

export default routes;
