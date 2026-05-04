import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app-wrapper">
      <header>
        <h1>Pomodoro</h1>
        <nav>
          <ul>
            <li>
              <button type="button" className="btn btn-p">
                pomodoro
              </button>
            </li>
            <li>
              <button type="button" className="btn btn-s">
                short Break
              </button>
            </li>
            <li>
              <button type="button" className="btn btn-l">
                long Break
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Your Home or NotFound pages will render here */}
        <Outlet />
      </main>

      <footer>
        <p>© 2026 My SPA</p>
      </footer>
    </div>
  );
};

export default Layout;
