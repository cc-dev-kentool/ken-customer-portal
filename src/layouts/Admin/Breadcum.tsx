import { useHistory, useParams } from "react-router-dom"

export default function Breadcrumb(props) {
    const { routeName } = props
    const history = useHistory()
    const { id } = useParams();
    const queryStr = window.location.search

    const onNavigate = () => {
        switch (routeName) {
            case "project-schedule":
                window.location.href = queryStr.includes("project_edit") ? `/projects/${id}/edit` : `/project/${id}/testing-requests`
                break;
            case "testing-detail":
                window.location.href = queryStr.includes("project_edit") ? `/projects/${id}/edit` : `/project/${id}/testing-requests`
                break
            default:
                break;
        }
    }

    return (
        <h4 className="admin-breadcum">
            {routeName === "users-list" && (
                <div>
                    <a href="/dashboard">Dashboard</a> / <strong>Account Management</strong>
                </div>
            )}
            {routeName === "user-add" && (
                <div>
                    <a href="/dashboard">Dashboard</a>/ <a href="/users">Account Management</a> / <strong>Add New Account</strong>
                </div>
            )}
            {routeName === "project-list" && (
                <div>
                    <a href="/dashboard">Dashboard</a> / <strong>Project Management</strong>
                </div>
            )}
            {routeName === "project/add" && (
                <div>
                    <a href="/dashboard">Dashboard</a> / <a href="/projects">Project Management</a> / <strong>Project Request Form</strong>
                </div>
            )}
            {routeName === "tracking" && (
                <div>
                    <a href="/dashboard">Dashboard</a> / <strong>Tracking</strong>
                </div>
            )}
            {routeName === "dashboard" && (
                <div>
                    <a href="/dashboard">Dashboard</a> / <strong>Customer Dashboard</strong>
                </div>
            )}
            {routeName === "project-edit" && (
                <div>
                    <a href="/dashboard">Dashboard</a> / <a href="/projects">Project Management</a> / <strong>Update Project Information</strong>
                </div>
            )}
            {routeName === "project-schedule" && (
                <div>
                    <a href="/dashboard">Dashboard</a> / <a href="/projects">Project Management</a> / <span className="breadcum-item" onClick={() => onNavigate()}>{queryStr.includes("project_edit") ? "Update Project Information" : "Testing Requests"}</span> / <strong>Create Testing Request</strong>
                </div>
            )}
            {routeName === "testing-requests" && (
                <div>
                    <a href="/dashboard">Dashboard</a> / <a href="/projects">Project Management</a> / <strong>Testing Requests</strong>
                </div>
            )}
            {routeName === "testing-detail" && (
                <div>
                    <a href="/dashboard">Dashboard</a> / <a href="/projects">Project Management</a> / <span className="breadcum-item" onClick={() => onNavigate()}>{queryStr.includes("project_edit") ? "Update Project Information" : "Testing Requests"}</span> / <strong>Testing Request Detail</strong>
                </div>
            )}
            {routeName === "testing-report-upload" && (
                <div>
                    <a href="/dashboard">Dashboard</a> / <a href="/projects">Project Management</a> / <span className="breadcum-item" onClick={history.goBack}>Testing Requests</span> / <strong>Testing Reports</strong>
                </div>
            )}
            {routeName === "enquiries" && (
                <div>
                    <a href="/dashboard">Dashboard</a> / <strong>Enquiries</strong>
                </div>
            )}
            {routeName === "enquiry" && (
                <div>
                    <a href="/dashboard">Dashboard</a> / <a href="/enquiries">Enquiries</a> / <strong>Ticket #{id}</strong>
                </div>
            )}
            {routeName === "enquiry-add" && (
                <div>
                    <a href="/dashboard">Dashboard</a> / <a href="/enquiries">Enquiries</a> / <strong>New Support Ticket</strong>
                </div>
            )}
            {routeName === "business-edit" && (
                <div>
                    <a href="/dashboard">Dashboard</a> / <strong>Update Business Information</strong>
                </div>
            )}
        </h4>
    );
}