
import React from 'react'

// layout elements
import BottomIcons from './BottomIcons'

const MainLayout = (Component) => (props) => <>
	<Component {...props} />
	<BottomIcons />
</>
  
export default MainLayout
