import React, {useState} from "react";
import { Grid } from "@material-ui/core";
import NewsCard from "./components/NewsCard";
import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import ModalChanges from "./components/ModalChanges";

const useStyles = makeStyles((theme) =>({
    paper:{
        padding: theme.spacing(5),
    },
    div:{
        margin: '5px',
        width: '80%',
        marginLeft: '10%'
    },
    fontColor: {
        color: '#8a8989',
        fontFamily: 'verdana'
    },
}))

function View() {
    const styles = useStyles();
    const [newsState, setNewsState] = useState([]);
    const [canLoad, setCanLoad] = useState(true);
    const [open, setOpen] = useState(false);
    const [isEditNotHidden,setIsHidden] = React.useState(false);


    const [modalNews,setModalNews] = useState({
        title: '',
        text: '',
        authorName: ''
    })

    const handleOnClickNews = (news) => {
        setOpen(!open);
        setModalNews({title: news.title, text: news.text, authorName: news.author.name})
    }

    const handleOnModalClose = () =>{
        setOpen(!open);
        getNews();
        setIsHidden(!isEditNotHidden);
    }

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
                    <Grid onClick={() => handleOnClickNews(news)} item xs={12} md={6} key={news.title}>
                        <NewsCard authorName={news.author.name} title={news.title} text={news.text} className={styles.paper}/>
                    </Grid>
                )}
            </Grid>
            <ModalChanges handleOnModalClose={handleOnModalClose}
                          open={open} news={modalNews} setCanLoad={setCanLoad}
                          isEditNotHidden={isEditNotHidden} setIsHidden={setIsHidden}
            />
        </div>
    );
}
export default View;
