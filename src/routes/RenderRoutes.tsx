import { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { remove } from "store/actions/alert";
import { useAppDispatch } from "hooks";

const ContractHistory = lazy(() => import("pages/Contract/ContractHistory"));
const ListPrompt = lazy(() => import("pages/Prompt/ListPrompt"));
const ListUser = lazy(() => import("pages/User/ListUser"));
const Login = lazy(() => import("pages/Auth/Login"));
const Analysis = lazy(() => import("pages/Analyses/Analysis"));
const Dashboard = lazy(() => import("pages/Dashboard"));
const Configuation = lazy(() => import("pages/Configuation"));
const Utilities = lazy(() => import("pages/Utilities/Utilities"));
const Page404 = lazy(() => import("pages/OtherPage/Page404"));

// Defines a type for individual route objects
type routeItem = {
  path: string; // URL path for the route
  key: string; // Unique identifier for the route
  exact: boolean; // Specifies if the route should match the URL exactly or partially
  component: Function; // Component to be rendered when the route is accessed
  requiredAuth: boolean; // Determines whether the user needs to be authenticated to access the route
  name: string; // Name of the route
  title: string; // Title of the route (will be displayed in the browser tab)
  roles: Array<string>;
};

// Defines a type for nested routes that extends routeItem type
type routes = routeItem & {
  routes?: routeItem[]; // Optional array of routeItems denoting any nested routes.
};

const ROUTES: routes[] = [
  {
    path: "/utilities", // URL pattern for the login route
    key: "ROOT", // Unique identifier for this component instance
    exact: true, // Exact match is required to load the component
    component: Utilities, // Component that will be loaded on this route
    routes: [], // Optional array of child routes if any
    requiredAuth: true, // Indicates whether authentication is required or not
    name: "utilities", // Identifier for this route
    title: "Utilities", // Title that will be displayed in the header
    roles: ["admin", "super-admin"],
  },
  {
    path: "/contracts", // URL pattern for the login route
    key: "ROOT", // Unique identifier for this component instance
    exact: true, // Exact match is required to load the component
    component: ContractHistory, // Component that will be loaded on this route
    routes: [], // Optional array of child routes if any
    requiredAuth: true, // Indicates whether authentication is required or not
    name: "contracts", // Identifier for this route
    title: "Contracts", // Title that will be displayed in the header
    roles: ["admin", "super-admin"],
  },
  {
    path: "/prompts", // URL pattern for the login route
    key: "ROOT", // Unique identifier for this component instance
    exact: true, // Exact match is required to load the component
    component: ListPrompt, // Component that will be loaded on this route
    routes: [], // Optional array of child routes if any
    requiredAuth: true, // Indicates whether authentication is required or not
    name: "prompts", // Identifier for this route
    title: "Prompts", // Title that will be displayed in the header
    roles: ["super-admin"],
  },
  {
    path: "/users", // URL pattern for the login route
    key: "ROOT", // Unique identifier for this component instance
    exact: true, // Exact match is required to load the component
    component: ListUser, // Component that will be loaded on this route
    routes: [], // Optional array of child routes if any
    requiredAuth: true, // Indicates whether authentication is required or not
    name: "users", // Identifier for this route
    title: "Users", // Title that will be displayed in the header
    roles: ["admin", "super-admin"],
  },
  {
    path: "/login", // URL pattern for the login route
    key: "ROOT", // Unique identifier for this component instance
    exact: true, // Exact match is required to load the component
    component: Login, // Component that will be loaded on this route
    routes: [], // Optional array of child routes if any
    requiredAuth: false, // Indicates whether authentication is required or not
    name: "login", // Identifier for this route
    title: "Login", // Title that will be displayed in the header
    roles: ["admin", "super-admin", "member"],
  },
  {
    path: "/analyses", // URL pattern for the dashboard route
    key: "ROOT", // Unique identifier for this component instance
    exact: true, // Exact match is required to load the component
    component: Analysis, // Component that will be loaded on this route
    routes: [], // Optional array of child routes if any
    requiredAuth: true, // Indicates whether authentication is required or not
    name: "analyses", // Identifier for this route
    title: "Analyses", // Title that will be displayed in the header
    roles: ["admin", "super-admin", "member"],
  },
  // Dashboard Route
  {
    path: "/", // URL pattern for the dashboard route
    key: "ROOT", // Unique identifier for this component instance
    exact: true, // Exact match is required to load the component
    component: Dashboard, // Component that will be loaded on this route
    routes: [], // Optional array of child routes if any
    requiredAuth: true, // Indicates whether authentication is required or not
    name: "dashboard", // Identifier for this route
    title: "Ken", // Title that will be displayed in the header
    roles: ["admin", "super-admin"],
  },
  // Config Route
  {
    path: "/configuations", // URL pattern for the dashboard route
    key: "ROOT", // Unique identifier for this component instance
    exact: true, // Exact match is required to load the component
    component: Configuation, // Component that will be loaded on this route
    routes: [], // Optional array of child routes if any
    requiredAuth: true, // Indicates whether authentication is required or not
    name: "configuations", // Identifier for this route
    title: "Ken", // Title that will be displayed in the header
    roles: ["super-admin"],
  },
  // Route for displaying "permission denied" message
  {
    path: "/404", // URL path
    name: "permission-denined", // identifier for this route
    key: "ROOT", // unique identifier for this component instance
    exact: true, // exact match is required to load the component
    component: Page404, // component that will be loaded on this route
    routes: [], // child routes if any
    requiredAuth: true, // only authenticated users can access this route
    title: "Page404", // title that will be displayed in the header
    roles: ["admin", "super-admin", "member"], // array of user roles who can access this route
  },
];

// Exporting an object that contains all the routes for the application
export default ROUTES;

// Exporting a function called RenderRoutes that accepts an object with an array of routes as a parameter
export function RenderRoutes({ routes }: { routes: routes[] }) {
  return (
    // Using a switch statement to render only one route at a time
    <Switch>
      {/* Using the Array.map method to map over each route and create a new RouteWithSubRoutes component for each one */}
      {routes.map((route, i) => {
        return <RouteWithSubRoutes {...route} />;
      })}

      {/* Adding a wildcard (*) route at the end that will be rendered if none of the other routes match */}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

// A function for rendering a route and its sub-routes in the application
function RouteWithSubRoutes(route: routes) {
  // Initialize the Redux dispatch hook
  const dispatch = useAppDispatch();

  // Set the document title to match the title defined in the route object
  document.title = route.title;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // Return a Route component with the given path, exact flag, and rendering function
  // The rendering function checks for authentication status and redirects the user as needed
  return (
    <Route
      key={route.key}
      path={route.path}
      exact={route.exact}
      render={(props) => {
        // Clear any existing Redux state when the page loads
        dispatch(remove());

        // Store the current route name in local storage
        localStorage.setItem("currentRoute", route.name);

        if (!localStorage.getItem("token")) {
          // If the user is not authenticated and the route requires authentication, redirect to the login page
          if (route.requiredAuth) {
            window.location.href =
              "/login?continue=" + encodeURIComponent(window.location.href);
          }
        }

        // Redirect to 403 page if user doesn't have required role for the current route
        if (localStorage.getItem("token") && !route.roles.includes(user.role)) {
          if (user.role === 'member') {
            window.location.href = "/analyses";
          } else {
            window.location.href = "/";
          }
        }

        // Render the given component and pass down the props and sub-routes
        return (
          <route.component
            {...props}
            routes={route.routes}
            routeName={route.name}
          />
        );
      }}
    />
  );
}
