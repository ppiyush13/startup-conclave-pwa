import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ApplicationHeader from './components/application-header'
import ApplicationTabs from './components/application-tabs'

const useStyles = makeStyles({
	root: {
		flexGrow: 1
	},
});

export default function IconLabelTabs() {
	const classes = useStyles();

	return <>
		<div className={classes.root}>
			<ApplicationHeader/>
			<ApplicationTabs />
		</div>
	</>
}