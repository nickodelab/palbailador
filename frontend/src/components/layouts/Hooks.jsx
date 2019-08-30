
// import React from 'react' 
// import { withStyles } from '@material-ui/core/styles'

// const styles = {}

// const Hooks = ({ classes }) => <>


// </>
  
// export default withStyles(styles)(Hooks)


// // super-basic
// export default Hooks

import React, { useState, useEffect } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'

import MailIcon from '@material-ui/icons/Mail'
import SendIcon from '@material-ui/icons/Send'

//JSS
const styles =  (theme) => ({
    myClassCSS: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(3)
    }     
})

const Hooks = ({ classes }) => {
    // state variables declaration
    const [mails, setMails] = useState(50) 
    const [sent, setSent] = useState(100)
    
    // only 1 time => [] 2nd argument (empty array) from useEffect
    // 1º => always the component is mounted without useEffect
    useEffect(() => {
            // perfect API calls moment
            console.log('useEffect - mails:', mails)
            setMails(55) // asyncronous
            console.log('useEffect - sent:', sent)
    }, [])

    // // always
    // useEffect(() => {
    //     console.log('mails:', mails)
    //     console.log('sent:', sent)
    // })

    // // only when mails change
    // useEffect(() => {
    //     console.log('mails:', mails)
    //     console.log('sent:', sent)
    // }, [mails])

    // setMails(51) // with useEffect
    
    
    console.log('mails:', mails)
    console.log('sent:', sent)

    return <>

        <Badge 
            className={classes.myClassCSS} 
            badgeContent={mails} 
            color="primary"
        >

            <MailIcon />

        </Badge>

        <Badge 
            className={classes.myClassCSS} 
            badgeContent={sent} 
            max={5}
            color="primary"
        >

            <SendIcon />
      </Badge>

</>

}


export default withStyles(styles)(Hooks)