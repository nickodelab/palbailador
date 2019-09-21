
import React from 'react' 
import { Switch } from '@material-ui/core'

import { connect } from 'react-redux'
import { setToggleSettings } from '../../redux/actions/settings'

const Toggler = ({ type, settings, setToggleSettings }) => <>
    
        <Switch 
            checked={settings[type]} 
            onChange={() => setToggleSettings(type)} 
            color="primary"
        />

</>

const mapStateToProps = ({ settings }) => ({ settings })
export default (connect(mapStateToProps, { setToggleSettings })(Toggler))
