
import Home from './views/HomeView.vue';
import Projects from './views/ProjectsView.vue';
import LoginView from './views/user/LoginView.vue'
import AccountView from './views/user/AccountView.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: Projects },
  { path: '/login', component: LoginView},
  { path: '/account', component: AccountView},

];

export default routes;
