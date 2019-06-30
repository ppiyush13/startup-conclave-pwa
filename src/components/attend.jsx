import React, {useState} from 'react'
import {makeStyles, Paper, Grid, Typography, FormControlLabel, Checkbox, AppBar, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import Loader from './loader'
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2, 0.5),
    },
    card: {
        display: 'flex',
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        '&:first-child': {
            marginTop: 0,
            borderTopWidth: 0
        }
    },
    imgWrapper: {
        width: '40%',
        minWidth: theme.spacing(15)
    },
    spacer: {
        width: '10%',
        minWidth: theme.spacing(3)
    },
    cover: {
        width: 120
        //height: 50
    },
    gridItem: {
        display: 'flex',
        alignItems: 'center'
    },
    footer: {
        top: 'auto',
        bottom: 0
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    }
}))

export default ({data, map, doFetch, createMap, updateData}) => {
    const [startupList, setStartupList] = useState(data);
    const [isSaving, updateIsSaving] = useState(false)
    const [message, setMessage] = useState(null)
    const classes = useStyles()
    const handleChange = (event) => {
        const key = event.target.value
        map[key].available = !map[key].available
        const rows = Object.values(map)
        const updatedData = rows.reduce((acc, cur) => {
            const {startup_name, type, ...poc} = cur
            if(!acc[startup_name]) acc[startup_name] = {
                startup_name, type, poc: []
            }
            acc[startup_name].poc.push(poc)
            return acc
        }, {})
        setStartupList(Object.values(updatedData))
    }

    const save = updatedData => {
        const orgMap = createMap(data)
        const updatedMap = createMap(updatedData)
        const updatedPOCAvailability = Object.keys(orgMap).reduce((acc, key)=> {
            const orgAvailability = orgMap[key].available
            const updatedAvailability = updatedMap[key].available
            if(orgAvailability !== updatedAvailability) {
                const {startup_name, name, available} = updatedMap[key]
                acc.push({
                    startup_name, name, available
                })
            }
            return acc
        }, [])
        if(updatedPOCAvailability.length) {
            console.log('Updated data:', updatedPOCAvailability)
            updateIsSaving(true)
            doFetch({
                body: JSON.stringify(updatedPOCAvailability),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(({response, failed}) => {
                if(response.status !== 200 || failed) throw response
                updateData(response.data)
                setStartupList(response.data)
            })
            .catch(response => {
                let ex
                const {data: responseData, statusText} = response

                if(responseData.error) ex = responseData.error
                else if(statusText) ex = statusText
                else ex = 'Some error occurred'
                setMessage(ex)
                updateData(data)
                setStartupList(data)
            })
            .finally(() => {
                updateIsSaving(false)
            })
        }
        else {
            setMessage('Nothing changed !!')
        }
    }

    const onSaveClick = () => {
        save(startupList)
    }

    const handleSnackbarClose = () => {
        setMessage(null)
    }

    return <>
        {
            isSaving
                ? <Loader/>
                : null
        }
        {
            message
                ? <Snackbar
                    open
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{message}</span>}
                />
                : null
        }
        <Paper className={classes.root}>
        {
            startupList.map(({startup_name, poc}) => {
                const src = `${startup_name}.png`
                return <Typography component="div" className={classes.card} key={startup_name}>
                    <div className={classes.imgWrapper}>
                        <img 
                            src={require(`../images/startup-logos/${src}`)} 
                            className={classes.cover} 
                            alt={src}
                        />
                    </div>
                    <span className={classes.spacer}></span>
                    <Grid className={classes.grid} container spacing={0} justify={'center'} direction={'column'}>
                        {
                            poc && poc.map(({name, available}, index) => (
                                <div className={classes.gridItem} key={index}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value={`${startup_name}_${name}`}
                                                checked={available}
                                                onChange={handleChange}
                                            />
                                        }
                                        label={name}
                                    />
                                </div>
                            ))
                        }
                    </Grid>
                </Typography>
            })
        }
        <AppBar position="fixed" color="primary" className={classes.footer}>
            <Button variant="contained" color="primary" className={classes.button} size="large"onClick={onSaveClick}>
                <SaveIcon className={classes.leftIcon} />Save
            </Button>
        </AppBar>
        </Paper>
    </>
}