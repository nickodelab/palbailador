
import React from 'react' 
import { Switch } from '@material-ui/core'

import { connect } from 'react-redux'
import { setToggleSettings } from '../../redux/actions/user'

const Toggler = ({ type, settings, setToggleSettings }) => <>
    <Switch 
        checked={settings[type]} 
        onChange={() => setToggleSettings(type)} 
        color="primary"
    />
</>

const mapStateToProps = ({ loggedInUser: { settings } }) => ({ settings })
export default (connect(mapStateToProps, { setToggleSettings })(Toggler))
