import React, {useState} from "react";
import { Grid } from "@material-ui/core";
import NewsCard from "./components/NewsCard";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    paper:{
        padding: theme.spacing(5),
    },
    div:{
        margin: '5px',
        width: '80%',
        marginLeft: '10%'
    }
}))

function View() {
    const styles = useStyles();
    const [newsState, setNewsState] = useState([]);
    const [canLoad, setCanLoad] = useState(true);
    const getNews = () => {
        setCanLoad(false);
        fetch("http://localhost:8080/notice/getnotices", {
            method: "POST",
        }).then(response => {
            return response.json()
        }).then(body => {
            setNewsState(body)
        });
    }

    if(canLoad){
        getNews();
    }

    return (
        <div className={styles.div}>
            <Grid container spacing={2}>
                {newsState.map(news =>
                    <Grid item xs={12} md={6} key={news.title}>
                        <NewsCard authorName={news.author.name} title={news.title} text={news.text} className={styles.paper}/>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}
export default View;
