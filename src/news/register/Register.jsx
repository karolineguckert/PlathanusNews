import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';

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

    let [data,setData] = useState(
        {
            title: '',
            text: '',
            authorName: ''
        }
    )

    let [alert,setAlert] = useState(
        {
            text: '',
            hidden: false,
            type: ''
        }
    )

    const handleOnChangeData = (attributeName, event) =>{
        setData({...data, [attributeName]: event.target.value});
    }

    const handleOnClick = () => {
        let isValid = validateFields();

        if (isValid){
            fetch("http://localhost:8080/notice/register", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            }).then(response => {
                return response.text()
            });
        }
    }

    const onAlertClose = () =>{
        setAlert({"hidden": false});
    }

    const validateFields = () => {
        if (!data.title){
            setAlert({"text":"O Título da notícia não pode ser vazio!","type":"error","hidden": true})
            return false;
        } else{
            if (!data.text){
                setAlert({"text":"O Texto da notícia não pode ser vazio!","type":"error","hidden": true})
                return false;
            }else {
                if (!data.authorName){
                    setAlert({"text":"O Nome do autor não pode ser vazio!","type":"error","hidden": true})
                    return false;
                } else{
                    setAlert({"text":"A notícia foi inserida com sucesso!","type":"success","hidden": true})
                    return true;
                }
            }
        }
    }

    return (
        <div>
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
        </div>
    );
}
export default Register;
