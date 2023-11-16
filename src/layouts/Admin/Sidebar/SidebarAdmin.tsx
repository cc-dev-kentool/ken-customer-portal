import classNames from "classnames";

// Define a function called "Sidebar" which receives a single parameter called "props"
export default function SidebarAdmin(props) {
  // Destructure props to get routeName and isShowFullSidebar
  const { routeName, isShowFullSidebar } = props;

  // Parse user from local storage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Return the following JSX
  return (
    <ul className="sidebar-nav text-left mt-0">
      <li className={classNames('sidebar-item', { 'active-sidebar': routeName === 'dashboard' })}>
        <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href="/">
          <i className="fa-solid fa-house" style={{ color: `${routeName === 'dashboard' ? '#fff' : '#000'}` }}></i>
          {isShowFullSidebar && <span>Dashboard</span>}
        </a>
      </li>
      
      <li className={classNames('sidebar-item', { 'active-sidebar': routeName === 'users' })}>
        <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href="/users">
          <i className="fa-solid fa-user-group" style={{ color: `${routeName === 'users' ? '#fff' : '#000'}` }}></i>
          {isShowFullSidebar && <span>User Management</span>}
        </a>
      </li>

      <li className={classNames('sidebar-item', { 'active-sidebar': routeName === 'contracts' })}>
        <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href="/contracts">
          <i className="fa-solid fa-user-group" style={{ color: `${routeName === 'contracts' ? '#fff' : '#000'}` }}></i>
          {isShowFullSidebar && <span>Contracts History</span>}
        </a>
      </li>

      {/* Check if the user's role is "super-admin" */}
      {user.role == "super-admin" && (
        <li className={classNames('sidebar-item', { 'active-sidebar': routeName === 'prompts' })}>
          <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href="/prompts">
            <i className="fa-regular fa-comment" style={{ color: `${routeName === 'prompts' ? '#fff' : '#000'}` }}></i>
            {isShowFullSidebar && <span>Prompt Management</span>}
          </a>
        </li>
      )}

      {/* Check if the user's role is "super-admin" */}
      {user.role == "super-admin" && (
        <li className={classNames('sidebar-item', { 'active-sidebar': routeName === 'configuations' })}>
          <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href="/configuations">
            <i className="fa-solid fa-cog" style={{ color: `${routeName === 'configuations' ? '#fff' : '#000'}` }}></i>
            {isShowFullSidebar && <span>Configuration</span>}
          </a>
        </li>
      )}

      <li className={classNames('sidebar-item', { 'active-sidebar': routeName === 'analyses' })}>
        <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href="/analyses">
          <i className="fa-solid fa-chart-bar" style={{ color: `${routeName === 'analyses' ? '#fff' : '#000'}` }}></i>
          {isShowFullSidebar && <span>Analyses</span>}
        </a>
      </li>
    </ul>
  );
}
