
import React from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { setMenuCollapse } from '../../redux/actions/ui'

import { 
	Drawer,
	AppBar,
	Toolbar,
	IconButton
} from '@material-ui/core'

import { 
	Menu as MenuIcon,
	
} from '@material-ui/icons'

import FeaturedMenu from './FeaturedMenu'
import MenuContent from './MenuContent'

const drawerWidth = '80%'

const styles = (theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		maxWidth: '460px'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}
})

const MobileMenu = ({ classes, setMenuCollapse, isMenuOpen }) => <>
    <div className={classes.root}>

		<AppBar
			position="fixed"
			className={clsx(classes.appBar, { [classes.appBarShift]: isMenuOpen })}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={() => setMenuCollapse(!isMenuOpen)}
					edge="start"
					className={clsx(classes.menuButton, isMenuOpen && classes.hide)}
				>
					<MenuIcon />
				</IconButton>
			</Toolbar>
      	</AppBar>

		<Drawer
			className={classes.drawer}
			variant="persistent"
			anchor="left"
			open={isMenuOpen}
			classes={{ paper: classes.drawerPaper }}
		>

			<FeaturedMenu />
			<MenuContent />

		</Drawer>

    </div>
</>



const mapStateToProps = ({ isMenuOpen }) => ({ isMenuOpen })
export default withStyles(styles)(connect(mapStateToProps, { setMenuCollapse })(MobileMenu))
