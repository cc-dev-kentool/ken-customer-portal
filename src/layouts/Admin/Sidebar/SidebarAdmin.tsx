import classNames from "classnames";

// Define a function called "Sidebar" which receives a single parameter called "props"
export default function SidebarAdmin(props) {
  const { routeName, isShowFullSidebar } = props;

  // Return the following JSX
  return (
    <ul className="sidebar-nav text-left">
      <li className={classNames('sidebar-item', { 'active-sidebar': routeName === 'users' })}>
        <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href="/users">
          <i className="fa-solid fa-user-group" style={{ color: `${routeName === 'users' ? '#fff' : '#000'}` }}></i>
          {isShowFullSidebar && <span>User Management</span>}
        </a>
      </li>
      <li className={classNames('sidebar-item', { 'active-sidebar': routeName === 'prompts' })}>
        <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href="/prompts">
          <i className="fa-regular fa-comment" style={{ color: `${routeName === 'prompts' ? '#fff' : '#000'}` }}></i>
          {isShowFullSidebar && <span>Prompt Management</span>}
        </a>
      </li>
      <li className={classNames('sidebar-item', { 'active-sidebar': routeName === 'dashboard' })}>
        <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href="/">
          <i className="fa-regular fa-file-lines" style={{ color: `${routeName === 'dashboard' ? '#fff' : '#000'}` }}></i>
          {isShowFullSidebar && <span>Export Data </span>}
        </a>
      </li>
    </ul>
  );
}
