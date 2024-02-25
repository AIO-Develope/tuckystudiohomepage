import Home from './views/HomeView.vue';
import Projects from './views/ProjectsView.vue';
import LoginView from './views/user/LoginView.vue'
import AccountHome from './views/user/AccountHome.vue'
import RegisterView from './views/user/RegisterView.vue'
import AccountSidebar from './components/user/AccountSidebar'
import StaffView from './views/user/StaffView'
import RolesView from './views/user/RolesView'

const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: Projects },
  { path: '/login', component: LoginView },

  // users
  {
    path: '/account',
    component: AccountSidebar,
    children: [
      { path: '', redirect: 'home' },
      { path: 'home', component: AccountHome },
      { path: 'register', component: RegisterView },
      { path: 'staff', component: StaffView },
      { path: 'roles', component: RolesView }
    ]
  },
];

export default routes;
