import React from 'react';
import {makeStyles, Card, CardContent, Grid, Link} from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';

const useStyles = makeStyles(theme => ({
    card: {
        marginBottom: theme.spacing(1.5)
    },
    content: {
        display: 'flex',
        alignItems: 'center'
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
    }
}))

const data = [
    {
        src: 'techforce.png',
        poc: [
            {
                name: 'Vijay Navaluri',
                contact: '9876543210',
                linkedin: 'https://www.linkedin.com/in/navaluri/'
            }
        ]
    },
    {
        src: 'haptik.svg',
        poc: [
            {
                name: 'Swapan Rajdev',
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
    const classes = useStyles();

    return data.map(({src, poc}) => {
        return <Card key={src} className={classes.card}>
            <CardContent className={classes.content}>
                <img src={require(`../images/startup-logos/${src}`)} className={classes.cover} alt={src}/>
                <Grid container spacing={0} justify={'center'}>
                    {
                        poc && poc.map(({name, contact, linkedin}, index) => <Grid item key={index}>
                            <Link href={linkedin} target="_blank" rel="noreferrer">{name}</Link>
                            <div className={classes.iconParent}>
                                <CallIcon color={'primary'}/>
                                <span className={classes.iconText}>{contact}</span>
                            </div>
                        </Grid>)
                    }
                </Grid>
            </CardContent>
        </Card>
    })
}