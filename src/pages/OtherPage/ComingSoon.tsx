import AdminLayout from "layouts/Admin"
import comingSoon from 'assets/images/coming-soon.png'
import { useHistory } from "react-router-dom"
import './style.css'


// This function component takes props as input and returns a JSX element that renders a "Coming Soon" page.
export default function ComingSoon(props) {
  // The useHistory hook provides access to the browser's history, allowing the user to navigate back to the previous page when clicking on the "Go Back" button.
  const history = useHistory()

  // The component returns a JSX element with the following structure:
  return (
    <AdminLayout routeName={props.routeName}>
      <div className="container-fluid-padding-default">
        <div className='other-page text-center'>
          <div>
            <img className="coming-soon" src={comingSoon} alt="comingSoon" />
          </div>
          <div className='mt-3'>
            <p className='title-other-page'>Coming Soon</p>

            {/* The following code creates two buttons */}
            <div className="form-group button-style">
              <button
                type="button" onClick={history.goBack}
                className="btn submit-btn rounded-0 back-btn"
              >
                Go Back
              </button>
              <button
                type="button" onClick={() => window.location.href = "/dashboard"}
                className="btn btn-danger submit-btn rounded-0 not-hover"
              >
                Go To Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
