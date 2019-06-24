import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


import CalendarIcon from '@material-ui/icons/CalendarToday';
import LocationIcon from '@material-ui/icons/LocationOn';
import Logo from '../images/logo.jpg'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(1, 2)
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
				value={'** EON2'}
			/>
			<p>
				Startup Conclave is two-day event featuring talks and demonstrations from participating startups. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum blandit nisl id blandit. Etiam et tortor eget lorem viverra lacinia vel eu leo.
			</p>
		</Paper>
	</div>
}