import React, {useState} from "react";
import { Grid } from "@material-ui/core";
import NoticeCard from "./components/NoticeCard";
import { makeStyles } from '@material-ui/core/styles';
import ModalChanges from "../edit/ModalChanges";
import  {useLocation} from "react-router-dom";

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
    const [noticeState, setNoticeState] = useState([]);
    const [canLoad, setCanLoad] = useState(true);
    const [open, setOpen] = useState(false);
    const [isEditNotHidden,setIsHidden] = React.useState(false);
    const [modalNotice,setModalNotice] = useState({
        title: '',
        text: '',
        authorName: ''
    })

    const handleOnClickNotices = (notice) => {
        setOpen(!open);
        setModalNotice({title: notice.title, text: notice.text, authorName: notice.author.name})
    }

    const handleOnModalClose = () =>{
        setOpen(!open);
        getNotices();
        if (isEditNotHidden){
            setIsHidden(!isEditNotHidden);
        }
    }

    const getNotices = () => {
        // let search = new URLSearchParams(useLocation().search).get("search");
        // if (!search){
            setCanLoad(false);
            fetch("http://localhost:8080/notice/getnotices", {
                method: "POST",
            }).then(response => {
                return response.json()
            }).then(body => {
                setNoticeState(body)
            });
        // }else{
        //     fetch("http://localhost:8080/notice/search?search=" + search, {
        //         method: "GET",
        //     }).then(response => {
        //         return response.json()
        //     }).then(body => {
        //         console.log(body)
        //         setNoticeState(body)
        //     });
        // }
    }

    if(canLoad){
        getNotices();
    }

    return (
        <div className={styles.div}>
            <Grid container spacing={2}>
                {noticeState.map(notice =>
                    <Grid onClick={() => handleOnClickNotices(notice)} item xs={12} md={6} key={notice.title}>
                        <NoticeCard authorName={notice.author.name} title={notice.title} text={notice.text} className={styles.paper}/>
                    </Grid>
                )}
            </Grid>
            <ModalChanges handleOnModalClose={handleOnModalClose}
                          open={open} notice={modalNotice} setCanLoad={setCanLoad}
                          isEditNotHidden={isEditNotHidden} setIsHidden={setIsHidden}
            />
        </div>
    );
}
export default View;
