import React from  'react'
import { Paper, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const TimeHalves = ['AM', 'PM']

const sideColors = ['turquoise', 'mediumpurple', 'deepskyblue', 'yellowgreen', 'sandybrown', '#f50057']

const schedule = [
    {
        start: 9,
        end: 10,
        agenda: 'Registrations'
    },
    {
        start: 10,
        end: [10, 10],
        agenda: 'Welcome note',
        addtional: 'By John Burns - Managing Director, Head of IT India and Senior Franchise Office, Pune'
    },
    {
        start: [10, 10],
        end: [10, 20],
        agenda: 'Overview of partnership with NASSCOM',
        addtional: 'By Rajiv Ramachandran - Managing Director, Head of Risk and Finance IT India'
    },
    {
        start: [10, 20],
        end: [10, 30],
        agenda: 'About NIPP',
        addtional: 'By Kritika Murugesan - Director, 10,000 Startups, NASSCOM'
    },
    {
        start: [10, 30],
        end: [10, 40],
        agenda: 'Introduction to SET program',
        addtional: 'By Pritesh Johar - Director, COO IT India'
    },
    {
        start: [10, 40],
        end: [11, 40],
        agenda: 'Address by Credit Suisse Divisional leads'
    },
    {
        start: [11, 40],
        end: [12, 10],
        agenda: 'Panel Discussion',
        addtional: 'With Founders & Credit Suisse Leadership: Addressing Current Business Challenges'
    },
    {
        start: [12, 10],
        end: [12, 40],
        agenda: 'Demonstration',
        addtional: 'Innovative Startups\' Stage Demo'
    },
    {
        start: [12, 10],
        end: 14,
        agenda: 'Lunch & Networking'
    }
]

const useStyles = makeStyles(theme => ({
    card: {
        padding: theme.spacing(2),
    },
	content: {
        padding: theme.spacing(0.5, 0)
    },
    leftBorder: {
        borderLeft: '3px solid',
        paddingLeft: theme.spacing(2)
    },
    additional: {
        fontSize: '0.8rem',
        color: 'gray'
    }
}));

const timePadding = time => time.toString().padStart(2, 0)

const formatTime = time => {
    if(!Array.isArray(time)) time = [time, 0]
    
    let [hour, min] = time
    let timeHalf = TimeHalves[Math.floor(hour / 12)]
    hour = hour % 12
    hour = hour === 0 ? 12 : hour
    return `${timePadding(hour)}:${timePadding(min)} ${timeHalf}`
}

export default () => {
    const classes = useStyles();

    return <Paper>
        {
            schedule.map(({start, end, agenda, addtional}, index) => {
                return <div className={classes.card} key={index}>
                    <div className={classes.leftBorder} style={{borderColor: sideColors[index % sideColors.length]}}>
                        <div className={classes.content}>{formatTime(start)} - {formatTime(end)}</div>
                        <Divider/>
                        <div className={classes.content}>
                                <div>{agenda}</div>
                                {
                                    addtional
                                        ? <div className={classes.additional}>{addtional}</div>
                                        : null
                                }
                        </div>
                    </div>
                </div>
            })
        }
        
    </Paper>

}