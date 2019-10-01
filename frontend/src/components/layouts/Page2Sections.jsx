
import React from 'react'
import clsx from 'clsx'
import { 
	withStyles,
	Grid,
	Typography,
	Container,
} from '@material-ui/core'

import BottomIcons from './BottomIcons'

const styles = (theme) => ({
	header: {
		display: 'flex',
    	flexFlow: 'column wrap',
    	// justifyContent: 'center',
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.getContrastText(theme.palette.primary.light),
		padding: theme.spacing(9, 0),
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(6, 0)
		}
	},
	gridContainer: {
		padding: '5px'
	},
	results: {
		marginTop: theme.spacing(6)
	}
})

const Page2Sections = (Component) => withStyles(styles)((props) => <>
		
		<header className={clsx(props.classes['header']) }>
			<Container maxWidth="lg">	
				<Typography variant="h1">¡Comparte tu Figura!</Typography>
				<Typography variant="body1">
					Comparte tu figura con la comunidad, ayuda a que cada vez seamos más
				</Typography>
			</Container>	
		</header>
		
		<Component {...props} />		

		<BottomIcons />
</>)
  
export default Page2Sections
