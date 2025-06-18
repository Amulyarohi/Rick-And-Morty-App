import {
  createRouter,
  createRootRoute,
  createRoute,
} from '@tanstack/react-router';
import App from './App';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';

const rootRoute = createRootRoute({
  component: App,
});

const characterListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CharacterList,
  validateSearch: (search) => {
    return {
      page: search.page ? Number(search.page) : 1,
    };
  },
});

const characterDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/character/$id',
  component: CharacterDetail,
});

const routeTree = rootRoute.addChildren([
  characterListRoute,
  characterDetailRoute,
]);

export const router = createRouter({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
