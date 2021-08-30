import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import EditModal from "./components/EditModal";
import ViewModal from "./components/ViewModal";

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

function ModalChanges({open, notice, handleOnModalClose, setCanLoad, setIsHidden, isEditNotHidden}) {
    const styles = useStyles();
    const [noticeData,setNoticeData] = React.useState({});

    const handleOnEditClick = () =>{
        setIsHidden(!isEditNotHidden);
        setNoticeData({
            oldTitle: notice.title,
            oldText: notice.text,
            oldAuthorName: notice.authorName,
            title: notice.title,
            text: notice.text,
            authorName: notice.authorName
        });
    }

    return (
        <div>
            <Modal open={open}>
                <div className={styles.paper}>
                    <ViewModal handleOnEditClick={handleOnEditClick}
                               handleOnModalClose={handleOnModalClose}
                               isEditNotHidden={isEditNotHidden}
                               notice={notice}
                               setCanLoad={setCanLoad}
                    />
                    <EditModal handleOnModalClose={handleOnModalClose}
                               isEditNotHidden={isEditNotHidden}
                               setNoticeData={setNoticeData}
                               noticeData={noticeData}
                               setCanLoad={setCanLoad}
                    />
                </div>
            </Modal>
        </div>
    );
}
export default ModalChanges;
