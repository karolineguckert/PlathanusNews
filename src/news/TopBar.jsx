import React from "react";
import { AppBar, Toolbar, Typography, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {  makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        display: "block",
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        //backgroundColor: alpha(theme.palette.common.white, 0.15),
        marginRight: 0,
        width: "50%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto"
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputColor: {
        color: "inherit"
    },
    input: {
        paddingLeft: theme.spacing(6),
        width: "50%",
    }
}));

function TopBar() {
    const styles = useStyles();
    return (
        <div className={styles.root}>
            <AppBar>
                <Toolbar>
                    <Typography className={styles.title} variant="h6" noWrap>
                        News
                    </Typography>
                    <div className={styles.search}>
                        <div className={styles.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Pesquisar…"
                            classes={{
                                root: styles.inputColor,
                                input: styles.input
                            }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default TopBar;
