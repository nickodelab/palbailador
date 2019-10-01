
import React from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core'

// layout elements
import BottomIcons from './BottomIcons'

const styles = (theme) => ({
	mainContent: {
		padding: theme.spacing(6, 2)
	}
})

const MainLayout = (Component) => withStyles(styles)((props) => <>
	<main className={clsx(props.classes['mainContent'])}>
		<Component {...props} />
	</main>
	<BottomIcons />
</>)
  
export default (MainLayout)
