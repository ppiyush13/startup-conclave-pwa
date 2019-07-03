import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Box } from '@material-ui/core';


import CalendarIcon from '@material-ui/icons/CalendarToday';
import LocationIcon from '@material-ui/icons/LocationOn';
import Logo from '../images/logo.png'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(1, 2),
		margin: theme.spacing(2, 0)
	},
	details: {
		marginLeft: theme.spacing(2)
	},
	logo: {
		margin: theme.spacing(0.5),
		display: 'flex',
		justifyContent: 'center'
	},
}));

const GridRow = ({Icon, label, value}) => {
	const classes = useStyles();
	return <Grid container spacing={1}>
		<Grid item xs sm  container spacing={0}>
			<Icon color={'primary'}/>
			<span className={classes.details}>{label}</span>
		</Grid>
		<Grid item >{value}</Grid>
	</Grid>
}

export default () => {
	const classes = useStyles();
	
	return <div>
		<Box className={classes.logo}>
			<img alt="logo" src={Logo} />
		</Box>
		<Paper className={classes.root}>
			<h3>Startup Conclave</h3>
			<GridRow 
				Icon={CalendarIcon}
				label={'Date'}
				value={'July 4th, 2019'}
			/>
			<GridRow 
				Icon={LocationIcon}
				label={'Location'}
				value={'EON2'}
			/>
			<p>
			Startup conclave is a part of NIPP engagement with NASSCOM, where we plan to engage Startups with some of our key pain areas with their existing solutions with minimal customization.
Also as a part of this event we plan to present our SET framework especially developed for startups.
			</p>
		</Paper>
		<Paper className={classes.root}>
			<h3>App Created by</h3>
			<ul>
				<li>Piyush Lodaya</li>
				<li>Alhad Joshi</li>
				<li>Lay Patel</li>
				<li>Aarohi Jain</li>
			</ul> 
		</Paper>
	</div>
}