import Home from './views/HomeView.vue';
import Projects from './views/ProjectsView.vue';
import LoginView from './views/user/LoginView.vue'
import AccountHome from './views/user/AccountHome.vue'
import AccountDashboard from './views/user/AccountDashboard.vue'
import AccountSidebar from './components/user/AccountSidebar'

const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: Projects },
  { path: '/login', component: LoginView},
  { path: '/account', component: AccountHome},

  // users
  {
    path: '/account',
    component: AccountSidebar,
    children: [
      { path: '', redirect: 'home' },
      { path: 'home', component: AccountHome },
      { path: 'dashboard', component: AccountDashboard }
    ]
  },
];

export default routes;
