
import React, { useState, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'

/** Swich between two icons  [Material UI Icon directory](https://material.io/resources/icons/?icon=visibility&style=baseline) */
const ToggleIcon = ({ onClick, isActive, iconOn, iconOff, textOn, textOff }) => {
    const [active, setActive] = useState(isActive)

    useEffect(() => {
        setActive(isActive)
    }, [isActive])

    return <IconButton
        area-label={isActive ? textOn : textOff}
        title={active ? textOn : textOff}
        onClick={() => { setActive(!active) ; onClick && onClick() }}
        size="small"
        color="primary"
    >
        <i className="material-icons">
            {active ? iconOn : iconOff}
        </i>
    </IconButton>


}
ToggleIcon.propTypes = {
    onClick: PropTypes.func,
    /** set the initialStatus of the icon  */
    initialStatus: PropTypes.bool,
    /** material ui icon */
    iconOn: PropTypes.string,
    /** material ui icon */
    iconOff: PropTypes.string
}

ToggleIcon.defaultProps = {
    iconOn: 'done',
    iconOff: 'clear',
}

export default ToggleIcon
