import React from "react";
import Modal from "@material-ui/core/Modal";
import {Grid} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>({
    fontColor: {
        color: '#8a8989',
        fontFamily: 'verdana'
    },
}))

function ViewModal({handleOnEditClick, handleOnModalClose, news, isEditNotHidden,setCanLoad}) {
    const styles = useStyles();

    const handleOnDelete = () =>{
        fetch("http://localhost:8080/notice/delete", {
            method: "POST",
            body: JSON.stringify(news),
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            return response.text()
        });
        setCanLoad(true);
    }

    return (
        <div>
            {
                !isEditNotHidden && <Grid container>
                    <Grid item xs={12}>
                        <h2>{news.title}</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <h5 className={styles.fontColor}>Autor: {news.authorName}</h5>
                    </Grid>
                    <Grid item xs={12}>
                        <p>
                            {news.text}
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonGroup variant="outlined" aria-label="contained primary button group">
                            <Button onClick={handleOnEditClick} color="primary" startIcon={<EditIcon/>}>Editar</Button>
                            <Button onClick={handleOnDelete} color="secondary" startIcon={<DeleteIcon/>}>Excluir</Button>
                            <Button onClick={handleOnModalClose}>Fechar</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            }
        </div>
    );
}
export default ViewModal;
