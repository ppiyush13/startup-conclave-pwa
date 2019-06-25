import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import About from './about'
import StartupList from './startupList'
import {WidthBreakPoint} from  '../constants'

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
		<Typography component="div" style={{ padding: 8 * 2 }}>
			{props.children}
		</Typography>
	);
}

export default () => {
	const [value, setValue] = React.useState(1);
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up(WidthBreakPoint));

	function handleChange(event, newValue) {
		setValue(newValue);
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
		<AppBar position="fixed" className={appBarClassName}>
			<Tabs
				{...widthSpecificProps}
				value={value}
				onChange={handleChange}
			>
				<Tab icon={<CalendarIcon />} label="Schedule" />
				<Tab icon={<StartupIcon />} label="Startups" />
				<Tab icon={<InfoIcon />} label="About" />
			</Tabs>
		</AppBar>
		<div className={contentClassName}>
			{value === 0 && <TabContainer>Schedule info</TabContainer>}
			{value === 1 && <TabContainer><StartupList /></TabContainer>}
			{value === 2 && <TabContainer><About/></TabContainer>}
		</div>
	</>
}