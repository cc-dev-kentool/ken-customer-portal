import { lazy } from "react"
import { Route, Switch } from "react-router-dom"
import { remove } from "store/actions/alert"
import { useAppDispatch } from "hooks"

const Login = lazy(() => import("pages/Auth/Login"))
const Dashboard = lazy(() => import("pages/Dashboard"))

// Defines a type for individual route objects
type routeItem = {
  path: string, // URL path for the route
  key: string, // Unique identifier for the route
  exact: boolean, // Specifies if the route should match the URL exactly or partially
  component: Function, // Component to be rendered when the route is accessed
  requiredAuth: boolean, // Determines whether the user needs to be authenticated to access the route
  name: string, // Name of the route
  title: string, // Title of the route (will be displayed in the browser tab)
}

// Defines a type for nested routes that extends routeItem type
type routes = routeItem & {
  routes?: routeItem[] // Optional array of routeItems denoting any nested routes.
}


const ROUTES: routes[] = [
  {
    path: "/login", // URL pattern for the login route
    key: "ROOT", // Unique identifier for this component instance
    exact: true, // Exact match is required to load the component
    component: Login, // Component that will be loaded on this route
    routes: [], // Optional array of child routes if any
    requiredAuth: false, // Indicates whether authentication is required or not
    name: "login", // Identifier for this route
    title: "Login", // Title that will be displayed in the header
  },
  // Dashboard Route
  {
    path: "/", // URL pattern for the dashboard route
    key: "ROOT", // Unique identifier for this component instance
    exact: true, // Exact match is required to load the component
    component: Dashboard, // Component that will be loaded on this route
    routes: [], // Optional array of child routes if any
    requiredAuth: false, // Indicates whether authentication is required or not
    name: "dashboard", // Identifier for this route
    title: "Ken", // Title that will be displayed in the header
  }
];

// Exporting an object that contains all the routes for the application
export default ROUTES

// Exporting a function called RenderRoutes that accepts an object with an array of routes as a parameter
export function RenderRoutes({ routes }: { routes: routes[] }) {
  return (
    // Using a switch statement to render only one route at a time
    <Switch>
      {/* Using the Array.map method to map over each route and create a new RouteWithSubRoutes component for each one */}
      {routes.map((route, i) => {
        return <RouteWithSubRoutes {...route} />
      })}

      {/* Adding a wildcard (*) route at the end that will be rendered if none of the other routes match */}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  )
}

// A function for rendering a route and its sub-routes in the application
function RouteWithSubRoutes(route: routes) {
  // Initialize the Redux dispatch hook
  const dispatch = useAppDispatch()

  // Set the document title to match the title defined in the route object
  document.title = route.title

  // Return a Route component with the given path, exact flag, and rendering function
  // The rendering function checks for authentication status and redirects the user as needed
  return (
    <Route
      key={route.key}
      path={route.path}
      exact={route.exact}
      render={(props) => {
        // Clear any existing Redux state when the page loads
        dispatch(remove())

        // Store the current route name in local storage
        localStorage.setItem("currentRoute", route.name);

        if (!localStorage.getItem("token")) {
          // If the user is not authenticated and the route requires authentication, redirect to the login page
          if (route.requiredAuth) {
            window.location.href = "/login?continue=" + encodeURIComponent(window.location.href);
          }
        } else {
          // If the user is authenticated and the route does not require authentication, redirect to the dashboard
          if (["/login", "/register", "/forgot-password"].includes(route.path)) {
            window.location.href = "/dashboard"
          }
        }

        // Render the given component and pass down the props and sub-routes
        return <route.component {...props} routes={route.routes} routeName={route.name} />
      }}
    />
  );
}