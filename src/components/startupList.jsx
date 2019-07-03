import React from 'react';
import {makeStyles, Grid} from '@material-ui/core';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core'
import CheckCircle from '@material-ui/icons/CheckCircleOutline';

import LinkedInLogo from '../images/linked-in-icon.png'


const useStyles = makeStyles(theme => ({
    card: {
        '&:first-child': {
            marginTop: 0
        },
        margin: theme.spacing(2, 0)
    },
	panelSummary: {
		padding: theme.spacing(0, 1.5)
	},
    content: {
        display: 'flex',
        alignItems: 'center'
    },
    imgWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
        width: '40%',
        minWidth: theme.spacing(15),
		textAlign: 'center'
    },
    spacer: {
        width: '20%',
        minWidth: theme.spacing(3)
    },
    cover: {
        maxWidth: 120,
		maxHeight: 60
    },
	noLogo: {
		fontWeight: 'bold',
		textAlign: 'center'
	},
    iconParent: {
        display: 'flex',
        marginTop: theme.spacing(0.5)
    },
    iconText: {
        marginLeft: theme.spacing(0.5)
    },
    grid: {
        
    },
    gridItem: {
        display: 'flex',
        alignItems: 'center'
    },
    animate: {
        display: 'inline-block',
        animationName: 'customHeartBeat',
        animationDuration: '5s',
        animationIterationCount: 'infinite',
        animationDelay: '2s'
    },
    icon: {
        fontSize: theme.spacing(2),
        color: 'green',
        marginLeft: theme.spacing(0.5)
    },
    expansionDetails: {
        flexDirection: 'column',
		padding: theme.spacing(1, 3)
    },
    additionalItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(0.5, 0)
    },
	webSiteLink: {
		color: 'inherit'
	}
}))

export default ({data}) => {
    const classes = useStyles()

    return data.map(({startup_name, website, poc}) => {
        const src = `${startup_name}.png`
		let image
		try {
			image = require(`../images/startup-logos/${src}`)
		}
		catch(ex) {
			//image = require('../images/startup-logos/no-logo.png')
		}
		const webSiteClick = evt => {
			if(evt.currentTarget.href)
				evt.stopPropagation()
			else
				evt.preventDefault()
		}
        return <ExpansionPanel key={src} className={classes.card}>
            <ExpansionPanelSummary className={classes.panelSummary}>
                <div className={classes.imgWrapper}>
                    <a href={website} target="_blank" rel="noopener noreferrer" 
						onClick={webSiteClick} className={classes.webSiteLink} >{
						image
							? <img 
								src={image}
								className={classes.cover} 
								alt={startup_name}
							/>
							: <span className={classes.noLogo}>{startup_name}</span>
					}</a>
                </div>
                <span className={classes.spacer}></span>
                <Grid className={classes.grid} container spacing={0} justify={'center'} direction={'column'}>
                    {
                        poc && poc.map(({name, available}, index) => (
                            <div className={classes.gridItem} key={index}>
                                <span>{name}</span>
                                {
                                    available && <CheckCircle className={classes.icon + ' '+ classes.animate}/>
                                }
                            </div>
                        ))
                    }
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionDetails}>
            {
                poc && poc.map(({name, linkedin, contact}, index) => (
                    <div className={classes.additionalItem} key={index}>
                        <div>
							<span>{name}</span>
							{
								contact
									? <span>({contact})</span>
									: null
							}
						</div>
						{
							linkedin
								? <a href={linkedin} target="_blank" rel="noopener noreferrer">
									<img
										src={LinkedInLogo} 
										height={'32px'} 
										width={'32px'} 
										alt={'Linkedin logo'}
									/>
								</a>
								: null
						}
                    </div>
                ))
            }
            </ExpansionPanelDetails>
        </ExpansionPanel>
    })
}