import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

const Error404 = history => {
    return (
        <div>
        <br />
        <label>Oops!</label>
        <section className="goToHome">
            <div><p>We don't have a page called { history.location.pathname }!</p></div>
            <NavLink to="/">
                <button className='submitButtons'>Go to homepage</button>
            </NavLink>
        </section>
        </div>
    )
}
export default withRouter(Error404);