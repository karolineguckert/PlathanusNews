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
    }
}));

function NewsCard({title,text,authorName}) {
    const styles = useStyles();
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
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
