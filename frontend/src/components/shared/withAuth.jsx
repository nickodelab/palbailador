import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import { pushState } from 'redux-router'
import { withRouter } from 'react-router-dom'

export const withAuth = (Component) => {
    const AuthComponent = ({ isAuthenticated = true, location, dispatch, ...props }) => {
        useEffect(() => {

        }, [])

        const checkAuth = () => {
            if (!isAuthenticated) {
                // let redirectAfterLogin = location.pathname
                // dispatch(pushState(null, `/login?next=${redirectAfterLogin}`))
            }
        }

        return (
            <div>
                {isAuthenticated === true
                    ? <Component {...props} />
                    : null
                }
            </div>
        )
    }

    const mapStateToProps = ({ auth: { token, userName, isAuthenticated } }) => ({
        token,
        userName,
        isAuthenticated
    })

    return connect(undefined)(withRouter(AuthComponent))
}
