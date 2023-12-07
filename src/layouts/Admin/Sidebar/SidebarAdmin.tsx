import classNames from "classnames";
import home from "../../../assets/icon/icon_home.svg";
import home_2 from "../../../assets/icon/icon_home_2.svg";
import icon_user from "../../../assets/icon/icon_users.svg";
import icon_user_2 from "../../../assets/icon/icon_users_2.svg";
import icon_lock from "../../../assets/icon/icon_clock.svg";
import icon_lock_2 from "../../../assets/icon/icon_clock_2.svg";
import icon_chat from "../../../assets/icon/icon_chat.svg";
import icon_chat_2 from "../../../assets/icon/icon_chat_2.svg";
import icon_setting from "../../../assets/icon/icon_setting.svg";
import icon_setting_2 from "../../../assets/icon/icon_setting_2.svg";
import icon_analysis from "../../../assets/icon/icon_analysis.svg";
import icon_analysis_2 from "../../../assets/icon/icon_analysis_2.svg";

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
        <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href={`/?sidebar-full=${isShowFullSidebar}`}>
          <img src={`${routeName === 'dashboard' ? home_2 : home}`} alt="home" className="icon-home" />
          {isShowFullSidebar && <span>Dashboard</span>}
        </a>
      </li>

      <li className={classNames('sidebar-item', { 'active-sidebar': routeName === 'users' })}>
        <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href={`/users?sidebar-full=${isShowFullSidebar}`}>
          <img src={`${routeName === 'users' ? icon_user_2 : icon_user}`} alt="users" className="icon-home" />
          {isShowFullSidebar && <span>User Management</span>}
        </a>
      </li>

      <li className={classNames('sidebar-item', { 'active-sidebar': routeName === 'contracts' })}>
        <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href={`/contracts?sidebar-full=${isShowFullSidebar}`}>
          <img src={`${routeName === 'contracts' ? icon_lock_2 : icon_lock}`} alt="history" className="icon-home" />
          {isShowFullSidebar && <span>Contracts History</span>}
        </a>
      </li>

      {/* Check if the user's role is "super-admin" */}
      {user.role == "super-admin" && (
        <li className={classNames('sidebar-item', { 'active-sidebar': routeName === 'prompts' })}>
          <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href={`/prompts?sidebar-full=${isShowFullSidebar}`}>
            <img src={`${routeName === 'prompts' ? icon_chat_2 : icon_chat}`} alt="prompts" className="icon-home" />
            {isShowFullSidebar && <span>Prompt Management</span>}
          </a>
        </li>
      )}

      {/* Check if the user's role is "super-admin" */}
      {user.role == "super-admin" && (
        <li className={classNames('sidebar-item d-none', { 'active-sidebar': routeName === 'configuations' })}>
          <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href={`/configuations?sidebar-full=${isShowFullSidebar}`}>
            <img src={`${routeName === 'configuations' ? icon_setting_2 : icon_setting}`} alt="prompts" className="icon-home" />
            {isShowFullSidebar && <span>Configuration</span>}
          </a>
        </li>
      )}

      <li className={classNames('sidebar-item d-none', { 'active-sidebar': routeName === 'utilities' })}>
        <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href={`/utilities?sidebar-full=${isShowFullSidebar}`}>
          <i className="fa-solid fa-paperclip" style={{ color: `${routeName === 'utilities' ? '#fff' : '#000'}` }}></i>
          {isShowFullSidebar && <span>Utilities</span>}
        </a>
      </li>

      <li className={classNames('sidebar-item', { 'active-sidebar': routeName === 'analyses' })}>
        <a className={`sidebar-link ${!isShowFullSidebar && 'text-center'}`} href={`/analyses?sidebar-full=${isShowFullSidebar}`}>
        <img src={`${routeName === 'analyses' ? icon_analysis_2 : icon_analysis}`} alt="prompts" className="icon-home" />
          {isShowFullSidebar && <span>Analyses</span>}
        </a>
      </li>
    </ul>
  );
}
