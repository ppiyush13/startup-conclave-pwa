import React, {cloneElement} from 'react';
import { AppBar, Toolbar, Typography, Grid, useScrollTrigger } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Refresh';
import {withRouter} from 'react-router-dom';

const ElevationScroll = ({ children }) => {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0
	});

	return cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

const ApplicationHeader = ({location, history}) => {
	const refreshApp = () => {
		const current = location.pathname
		history.replace('/reload')
		setTimeout(() => {
			history.replace(current)
		})
		//window.location.reload()
	}
	return <ElevationScroll>
		<AppBar>
			<Toolbar variant="dense">
				<Grid container spacing={0} style={{margin: '0px 4px'}}
					justify={'space-between'} alignItems={'center'} >
					<Typography variant="h6">#CSStartupConclave</Typography>
					<InfoIcon color={'secondary'} onClick={refreshApp}/>
				</Grid>
			</Toolbar>
		</AppBar>
	</ElevationScroll>
}

export default withRouter(props => <ApplicationHeader {...props}/>)