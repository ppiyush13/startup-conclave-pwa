import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
	spinnerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
}));

export default () => {
    const classes = useStyles();
    return <Modal 
        open
        aria-labelledby="loader-modal"
        aria-describedby="loader modal with circular progression"
    >
        <div className={classes.spinnerWrapper}>
            <CircularProgress color="secondary"/>
        </div>
    </Modal>
}