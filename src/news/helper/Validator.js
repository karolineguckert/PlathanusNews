
const validateFields = (data,setAlert) => {
    if (!data.title){
        setAlert({"text":"O Título da notícia não pode ser vazio!","type":"error","hidden": true})
        return false;
    }
    if (!data.text){
        setAlert({"text":"O Texto da notícia não pode ser vazio!","type":"error","hidden": true})
        return false;
    }
    if (!data.authorName) {
        setAlert({"text": "O Nome do autor não pode ser vazio!", "type": "error", "hidden": true})
        return false;
    }

    setAlert({"text":"A notícia foi inserida com sucesso!","type":"success","hidden": true})
    return true;
}

export default validateFields;
