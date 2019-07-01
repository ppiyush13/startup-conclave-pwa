import React, {useState} from 'react';
import { Redirect } from "react-router-dom";
import { AppBar, Tabs, Tab, Typography, useMediaQuery }from '@material-ui/core';
import { makeStyles, useTheme  } from '@material-ui/core/styles';

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
	}
}));

function TabContainer(props) {
  return (
		<Typography component="div" style={{ padding: '0px 4px' }}>
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
	
	let widthSpecificProps, appBarClassName
	if(matches) {
		appBarClassName = ''
		widthSpecificProps = {
			centered: true
		}
	}
	else {
		appBarClassName = classes.appBar
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
		<div>
			{value === startup && <TabContainer><StartupList /></TabContainer>}
			{value === schedule && <TabContainer><ScheduleList /></TabContainer>}
			{value === about && <TabContainer><About/></TabContainer>}
		</div>
	</>
}