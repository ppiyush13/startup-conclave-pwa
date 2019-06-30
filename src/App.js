import React, {lazy, Suspense} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ApplicationHeader from './components/application-header'
import Loader from './components/loader'
import {WidthBreakPoint, routes} from  './constants'
import { CssBaseline, Container } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		flexGrow: 1
	},
});

const Tabs = lazy(() => import('./components/application-tabs'))
const AttendanceView = lazy(() => import('./containers/attendanceContainer'))

export default function IconLabelTabs() {
	const firstRoute = routes[0]
	const theme = useTheme();
	const classes = useStyles();
	const matches = useMediaQuery(theme.breakpoints.up(WidthBreakPoint));

	return <>
		<CssBaseline/>
		{
			matches
			? null
			: <ApplicationHeader/>
		}
		<Container className={classes.root} maxWidth={'sm'}>
			<BrowserRouter>
				<Suspense fallback={<Loader />}>
					<Switch>
						<Route path="/attend" component={AttendanceView}/>
						<Route path="/tabs/:tab" component={Tabs}/>
						<Route render={() => <Redirect to={`/tabs/${firstRoute}`} />} />
					</Switch>
				</Suspense>
			</BrowserRouter>
		</Container>
	</>
}