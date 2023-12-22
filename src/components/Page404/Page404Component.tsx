import page404 from 'assets/images/404.png'
import './style.css'


// This function component takes props as input and returns a JSX element that renders a 404 error page.
export default function Page404Component() {

  // The component returns a JSX element with the following structure:
  return (
    <div className="container-fluid">
      <div className='text-center'>
        <div>
          <img className="page404" src={page404} alt="page404" />
        </div>
        <div className='mt-3'>
          <p className='title-other-page'>Page Not Found</p>

          {/* The following code creates two buttons */}
          <div className="form-group button-style">
            <button
              type="button" onClick={() => window.location.href = '/analyses'}
              className="btn-go-analyese"
            >
              Go To Analyses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}