import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import About from './about'
import {WidthBreakPoint} from  '../constants'

import CalendarIcon from '@material-ui/icons/CalendarToday';
import StartupIcon from '../icons/startup';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles({
	appBar: {
		top: 'auto',
		bottom: 0,
	},
});

function TabContainer(props) {
  return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

export default () => {
	const [value, setValue] = React.useState(2);
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up(WidthBreakPoint));

	function handleChange(event, newValue) {
		setValue(newValue);
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
		{value === 0 && <TabContainer>Schedule info</TabContainer>}
		{value === 1 && <TabContainer>Startup lists will go here</TabContainer>}
		{value === 2 && <TabContainer><About/></TabContainer>}
	</>
}