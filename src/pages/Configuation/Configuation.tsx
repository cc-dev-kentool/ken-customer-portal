import AdminLayout from "layouts/Admin";
import "./style.css";

// Define a function component named "Dashboard" which does not receive any parameters.
export function Configuation(props) {
  // Return JSX elements to render the dashboard.
  return (
    <AdminLayout routeName={props.routeName}>
      <div className="dashboard"></div>
    </AdminLayout>
  );
}
