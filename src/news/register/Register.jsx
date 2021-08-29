import React from "react";
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

function Register() {
    const styles = useStyles();
    return (
        <div className={styles.div}>

        </div>
    );
}
export default Register;
