import React, {useState} from 'react'
import {makeStyles, Paper, Grid, Typography, FormControlLabel, Checkbox, AppBar, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import Loader from './loader'
import Snackbar from '@material-ui/core/Snackbar';
import ApplicationHeader from './application-header'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0, 0.5, 7, 0.5),
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
        display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
        width: '40%',
        minWidth: theme.spacing(15)
    },
	noLogo: {
		fontWeight: 'bold',
		textAlign: 'center'
	},
    spacer: {
        width: '10%',
        minWidth: theme.spacing(3)
    },
    cover: {
        maxWidth: 120,
		maxHeight: 60
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
    const orgMap = createMap(data)
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
		<ApplicationHeader/>
        <Paper className={classes.root}>
			{
				startupList.map(({startup_name, poc}) => {
					let image
					const src = `${startup_name}.png`
					try {
						image = require(`../images/startup-logos/${src}`)
					}
					catch(ex) {/***/}
					return <Typography component="div" className={classes.card} key={startup_name}>
						<div className={classes.imgWrapper}>
							{
								image
									? <img 
										src={image}
										className={classes.cover} 
										alt={src}
									/>
									: <span className={classes.noLogo}>{startup_name}</span>
							}
							
						</div>
						<span className={classes.spacer}></span>
						<Grid className={classes.grid} container spacing={0} justify={'center'} direction={'column'}>
							{
								poc && poc.map(({name, available}, index) => {
									const key = `${startup_name}_${name}`
									return <div className={classes.gridItem} key={index}>
										<FormControlLabel
											control={
												<Checkbox
													value={key}
													disabled={orgMap[key].available}
													checked={available}
													onChange={handleChange}
												/>
											}
											label={name}
										/>
									</div>
								})
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