
import React from 'react' 
import { withStyles } from '@material-ui/core/styles'

import mainMenuImage from '../../images/mainMenuImage.png'

import { connect } from 'react-redux'
import { setMenuCollapse } from '../../redux/actions/ui'

import { IconButton } from '@material-ui/core/'
import { ChevronLeft as ChevronLeftIcon } from '@material-ui/icons'

const styles = (theme) => ({
	mainMenu: {
		flexGrow: '1.4',
		backgroundSize: 'cover',
		backgroundImage: `url("${mainMenuImage}")`
	},
	drawerHeader: {
		display: 'flex',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	closeMenuButton: {
		cursor: 'pointer'
	}
})

const FeaturedMenu = ({ classes, setMenuCollapse }) => <>

        <div className={classes.mainMenu}>
			<div className={classes.drawerHeader}>
				<IconButton className={classes.closeMenuButton} onClick={() => setMenuCollapse(false)}> 
					<ChevronLeftIcon /> 
				</IconButton>
			</div>
			<div className={classes.featuredMenuContent}>
			</div>
        </div>

</>

export default withStyles(styles)(connect(null, { setMenuCollapse })(FeaturedMenu))
