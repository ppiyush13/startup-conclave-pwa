import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default () => {
	return <AppBar position="static">
		<Toolbar variant="dense">
			<Grid container spacing={0} justify={'center'}>
				<Typography variant="h6">#CSStartupConclave</Typography>
			</Grid>
		</Toolbar>
	</AppBar>
}