import React, {lazy, Suspense} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ApplicationHeader from './components/application-header'
import Loader from './components/loader'
import {WidthBreakPoint, routes} from  './constants'
import { CssBaseline, Container } from '@material-ui/core';

const commonContentStyles = theme => {
	return {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	}
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	contentMaxWidthUp: {
		...commonContentStyles(theme),
		marginTop: theme.spacing(9)
	},
	contentMaxWidthDown: {
		...commonContentStyles(theme),
		marginTop: theme.spacing(6),
		marginBottom: theme.spacing(9)
	}
}));

const Tabs = lazy(() => import('./components/application-tabs'))
const AttendanceView = lazy(() => import('./containers/attendanceContainer'))

export default function IconLabelTabs() {
	const firstRoute = routes[0]
	const theme = useTheme();
	const {contentMaxWidthUp, contentMaxWidthDown} = useStyles();
	const matches = useMediaQuery(theme.breakpoints.up(WidthBreakPoint));
	const containerClass = matches ? contentMaxWidthUp : contentMaxWidthDown

	return <>
		<CssBaseline/>
		
		<Container className={containerClass} maxWidth={'sm'}>
			<BrowserRouter>
				{
			matches
			? null
			: <ApplicationHeader/>
		}
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