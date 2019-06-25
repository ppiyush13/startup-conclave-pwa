import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ApplicationHeader from './components/application-header'
import ApplicationTabs from './components/application-tabs'
import {WidthBreakPoint} from  './constants'
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		flexGrow: 1
	},
});

export default function IconLabelTabs() {
	const theme = useTheme();
	const classes = useStyles();
	const matches = useMediaQuery(theme.breakpoints.up(WidthBreakPoint));

	return <>
		<CssBaseline/>
		<div className={classes.root}>
			{
				matches
				? null
				: <ApplicationHeader/>
			}
			<ApplicationTabs />
		</div>
	</>
}