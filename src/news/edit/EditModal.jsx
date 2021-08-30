import {Grid} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import React from "react";

function EditModal({handleOnModalClose, isEditNotHidden,setIsHidden, setDataNews, dataNews, setCanLoad}) {
    const [alert,setAlert] = React.useState({
        text: '',
        hidden: false,
        type: '',
    });

    const onAlertClose = () =>{
        setAlert({"hidden": false});
    }

    const [disableSave,setDisableSave] = React.useState(false);

    const handleOnChangeData = (attributeName, event) =>{
        setDataNews({...dataNews, [attributeName]: event.target.value});
    }

    const handleOnUpdateClick = () =>{
        let isValid = validateFields();
        if (isValid){
            fetch("http://localhost:8080/notice/update", {
                method: "POST",
                body: JSON.stringify(dataNews),
                headers: { "Content-Type": "application/json" }
            }).then(response => {
                return response.text()
            });
            setDisableSave(!disableSave);
            setCanLoad(true);
        }
    };

    const validateFields = () => {
        if (!dataNews.title){
            setAlert({"text":"O Título da notícia não pode ser vazio!","type":"error","hidden": true})
            return false;
        } else{
            if (!dataNews.text){
                setAlert({"text":"O Texto da notícia não pode ser vazio!","type":"error","hidden": true})
                return false;
            }else {
                if (!dataNews.authorName){
                    setAlert({"text":"O Nome do autor não pode ser vazio!","type":"error","hidden": true})
                    return false;
                } else{
                    setAlert({"text":"A notícia foi editada com sucesso!","type":"success","hidden": true})
                    return true;
                }
            }
        }
    };

    return(
        <div>
            {
                isEditNotHidden && <Grid container spacing={2}>
                    <Grid item xs={12}>
                        { alert.hidden && <Alert onClose={onAlertClose} severity={alert.type}>{alert.text}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <h2>Editar</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Título"
                                   variant="outlined"
                                   size={"small"}
                                   defaultValue={dataNews.title}
                                   onChange={(event)=> handleOnChangeData("title",event)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Texto da notícia"
                                   multiline
                                   rows={4}
                                   variant="outlined"
                                   size={"small"}
                                   defaultValue={dataNews.text}
                                   onChange={(event)=> handleOnChangeData("text",event)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Nome do Autor"
                                   variant="outlined"
                                   size={"small"}
                                   defaultValue={dataNews.authorName}
                                   onChange={(event)=> handleOnChangeData("authorName",event)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonGroup variant="outlined" aria-label="contained primary button group">
                            <Button disabled={disableSave} color="primary" onClick={handleOnUpdateClick} startIcon={<SaveIcon/>}>Salvar</Button>
                            <Button onClick={handleOnModalClose}>Fechar</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            }
        </div>
    )
}
export default EditModal;
