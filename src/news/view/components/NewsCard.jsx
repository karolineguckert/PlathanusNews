import React from 'react';
import {Card, CardContent, makeStyles, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    fontColor: {
        color: '#8a8989',
        fontFamily: 'verdana'
    },
    title:{
        fontStyle:'bold'
    }
}));

function NewsCard({title,text,authorName}) {
    const styles = useStyles();
    return (
        <Card>
            <CardContent>
                <Typography className={styles.title} gutterBottom variant="h5" >
                    {title}
                </Typography>
                <h5 className={styles.fontColor}>Autor: {authorName}</h5>
                <Typography variant="body2" color="textSecondary" component="p">
                    {text}
                </Typography>
            </CardContent>
        </Card>
    );
}
export default NewsCard;
