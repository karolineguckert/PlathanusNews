import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import EditModal from "../../edit/EditModal";
import ViewModal from "../../edit/ViewModal";

const useStyles = makeStyles((theme) =>({
    paper:{
        margin: 'auto',
        marginTop:'10%',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        fontFamily: 'arial',
    },
}))

function ModalChanges({open, news, handleOnModalClose, setCanLoad, setIsHidden, isEditNotHidden}) {
    const styles = useStyles();
    const [data,setData] = React.useState({
        oldTitle: news.title,
        oldText: news.text,
        oldAuthorName: news.authorName,
        title: news.title,
        text: news.text,
        authorName: news.authorName
    });

    const handleOnEditClick = () =>{
        setIsHidden(!isEditNotHidden);
        setData({
            oldTitle: news.title,
            oldText: news.text,
            oldAuthorName: news.authorName,
            title: news.title,
            text: news.text,
            authorName: news.authorName
        });
    }

    return (
        <div>
            <Modal open={open}>
                <div className={styles.paper}>
                    <ViewModal handleOnEditClick={handleOnEditClick}
                               handleOnModalClose={handleOnModalClose}
                               isEditNotHidden={isEditNotHidden}
                               news={news}
                               setCanLoad={setCanLoad}
                    />
                    <EditModal handleOnModalClose={handleOnModalClose}
                               isEditNotHidden={isEditNotHidden}
                               news={data}
                               setDataNews={setData}
                               dataNews={data}
                               setCanLoad={setCanLoad}
                    />
                </div>
            </Modal>
        </div>
    );
}
export default ModalChanges;
