import React, {useState} from 'react';
import { Redirect } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import About from './about'
import StartupList from '../containers/startupListContainer'
import ScheduleList from './schedule'

import {WidthBreakPoint, routes, startup, schedule, about} from  '../constants'

import CalendarIcon from '@material-ui/icons/CalendarToday';
import StartupIcon from '../icons/startup';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
	appBar: {
		top: 'auto',
		bottom: 0,
	},
	contentTopMargin: {
		margin: theme.spacing(9, 0, 0, 0)
	},
	contentBottomMargin: {
		margin: theme.spacing(0, 0, 9, 0)
	}
}));

function TabContainer(props) {
  return (
		<Typography component="div" style={{ padding: '16px 4px' }}>
			{props.children}
		</Typography>
	);
}

export default ({match}) => {
	const [redirectTo, setRedirectTo] = useState()
	const value = match.params.tab
	const index = routes.indexOf(value)
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up(WidthBreakPoint));

	function handleChange(event, newValue) {
		setRedirectTo(routes[newValue])
	}
	
	let widthSpecificProps, appBarClassName, contentClassName
	if(matches) {
		appBarClassName = ''
		contentClassName = classes.contentTopMargin
		widthSpecificProps = {
			centered: true
		}
	}
	else {
		appBarClassName = classes.appBar
		contentClassName = classes.contentBottomMargin
		widthSpecificProps = {
			variant: 'fullWidth'
		}
	}
	
	
	return <>
		{
			redirectTo 
				? <Redirect to={`/tabs/${redirectTo}`} />
				: null
		}
		<AppBar position="fixed" className={appBarClassName}>
			<Tabs
				{...widthSpecificProps}
				value={index}
				onChange={handleChange}
			>
				<Tab icon={<StartupIcon />} label="Startups" />
				<Tab icon={<CalendarIcon />} label="Schedule" />
				<Tab icon={<InfoIcon />} label="About" />
			</Tabs>
		</AppBar>
		<div className={contentClassName}>
			{value === startup && <TabContainer><StartupList /></TabContainer>}
			{value === schedule && <TabContainer><ScheduleList /></TabContainer>}
			{value === about && <TabContainer><About/></TabContainer>}
		</div>
	</>
}