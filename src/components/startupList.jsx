import React from 'react';
import {makeStyles, Card, CardContent, Grid, Link} from '@material-ui/core';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core'
import CheckCircle from '@material-ui/icons/CheckCircleOutline';
import Star from '@material-ui/icons/Star';
import Circle from '@material-ui/icons/Lens';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import LinkedInLogo from '../images/linked-in-icon.png'


const useStyles = makeStyles(theme => ({
    card: {
        '&:first-child': {
            marginTop: 0
        },
        margin: theme.spacing(2, 0)
    },
    content: {
        display: 'flex',
        alignItems: 'center'
    },
    imgWrapper: {
        width: '40%',
        minWidth: theme.spacing(15)
    },
    spacer: {
        width: '20%',
        minWidth: theme.spacing(3)
    },
    cover: {
        width: 120
        //height: 50
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
        flexDirection: 'column'
    },
    additionalItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(1)
    }
}))

const data = [
    {
        src: 'techforce.png',
        poc: [
            {
                available: true,
                name: 'Vijay Navaluri',
                contact: '9876543210',
                linkedin: 'https://www.linkedin.com/in/navaluri/'
            },
            {
                name: 'Alhad Joshi'
            }
        ]
    },
    {
        src: 'haptik.svg',
        poc: [
            {
                available: true,
                name: 'Swapan Rajdev',
                contact: '9876543210',
                linkedin: 'https://www.linkedin.com/in/swapan-rajdev-64a0591a/'
            },
            {
                name: 'Piyush Lodaya',
                contact: '9876543210',
                linkedin: 'https://www.linkedin.com/in/swapan-rajdev-64a0591a/'
            }
        ]
    },
    {
        src: 'cateina.png',
        poc: [
            {
                name: 'Sanachit Mehra',
                contact: '9876543210',
                linkedin: 'https://www.linkedin.com/in/sanachit-mehra-a8147418/'
            },
            {
                available: true,
                name: 'Aarohi Jain'
            }
        ]
    },
    {
        src: 'smokescreen.png',
        poc: [
            {
                name: 'Raviraj Doshi',
                contact: '9876543210',
                linkedin: 'https://www.linkedin.com/in/raviraj-doshi-a6513615/'
            }
        ]
    },
    {
        src: 'vphrase.png',
        poc: [
            {
                name: 'Neerav Parekh',
                contact: '9876543210',
                linkedin: 'https://www.linkedin.com/in/neeravparekh/'
            }
        ]
    }
]

data.sort((left, right)=> left.src.localeCompare(right.src))


export default () => {
    const classes = useStyles()

    return data.map(({src, poc}) => {
        return <ExpansionPanel key={src} className={classes.card}>
            <ExpansionPanelSummary>
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
                poc && poc.map(({name, linkedin}, index) => (
                    <div className={classes.additionalItem} key={index}>
                        <span>{name}</span>
                        <a href={linkedin} target="_blank" rel="noreferrer">
                            <img 
                                src={LinkedInLogo} 
                                height={'32px'} 
                                width={'32px'} 
                                alt={'Linkedin logo'}
                            />
                        </a>
                    </div>
                ))
            }
            </ExpansionPanelDetails>
        </ExpansionPanel>
    })
}