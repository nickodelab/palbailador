
import React from 'react' 
import { withStyles } from '@material-ui/core/styles'

import moment from 'moment'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Player from './Player'

const styles = (theme) => ({
    videoItem: {
        marginTop: theme.spacing(3)
    },
    card: {
        maxWidth: 345,
        marginTop: theme.spacing(2)
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    }
})

const VideoItem = ({ classes, video: { id, name, url, category, created } }) => {
    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded)
    }


  return <>
        {console.log(created)}
        <Card className={classes.card} key={id}>
            <CardHeader
                avatar={<Avatar aria-label={`Video Salsa - ${category}`}  className={classes.avatar}>{`${category[0].toUpperCase()}`}</Avatar>}
                title={`${name.replace(/^\w/, c => c.toUpperCase())}`}
                subheader={moment(created).format('DD.MM.YY')}
            />

            <Player videoURL={url}/>
            
            <CardActions disableSpacing>
                <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="Share">
                <ShareIcon />
                </IconButton>
                <IconButton
                    className={classes.expand, {
                        [classes.expandOpen]: expanded,
                    }}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="Show more"
                >
                {/* <ExpandMoreIcon /> */}
                </IconButton>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>

    </>
}  
export default withStyles(styles)(VideoItem)
