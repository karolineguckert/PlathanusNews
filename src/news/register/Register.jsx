import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import Validator from "../helper/Validator";

const useStyles = makeStyles((theme) =>({
    paper:{
        padding: theme.spacing(4),
    },
    div:{
        margin: '5px',
        width: '50%',
        marginLeft: '25%',
    },
    fields:{
        width: '80%'
    },
    fontColor: {
        color: '#8a8989',
        fontFamily: 'arial'
    },

}))

function Register() {
    const styles = useStyles();

    let [noticeData,setNoticeData] = useState(
        {
            title: '',
            text: '',
            authorName: ''
        }
    )

    const handleOnChangeData = (attributeName, event) =>{
        setNoticeData({...noticeData, [attributeName]: event.target.value});
    }

    let [alert,setAlert] = useState(
        {
            text: '',
            hidden: false,
            type: ''
        }
    )
    const onAlertClose = () =>{
        setAlert({"hidden": false});
    }

    const handleOnClick = () => {
        let isValid = Validator(noticeData,setAlert);

        if (isValid){
            fetch("http://localhost:8080/notice/register", {
                method: "POST",
                body: JSON.stringify(noticeData),
                headers: { "Content-Type": "application/json" }
            }).then(response => {
                return response.text()
            });
        }
    }

    return (
        <React.Fragment>
            {alert.hidden && <Alert onClose={onAlertClose} severity={alert.type}>{alert.text}</Alert>}
            <div className={styles.div}>
                <Paper className={styles.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <h2 className={styles.fontColor}>Cadastro de Noticias</h2>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField label="Título"
                                       variant="outlined"
                                       size={"small"}
                                       onChange={(event)=> handleOnChangeData("title",event)}
                                       className={styles.fields}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                label="Texto da notícia"
                                multiline
                                rows={4}
                                variant="outlined"
                                size={"small"}
                                onChange={(event)=> handleOnChangeData("text",event)}
                                className={styles.fields}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField label="Nome do Autor"
                                       variant="outlined"
                                       size={"small"}
                                       onChange={(event)=> handleOnChangeData("authorName",event)}
                                       className={styles.fields}
                            />
                        </Grid>
                        <Grid item>
                            <Button onClick={handleOnClick} variant="contained" color="primary">
                                Cadastrar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </React.Fragment>
    );
}
export default Register;
