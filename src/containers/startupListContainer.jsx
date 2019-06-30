import React from 'react';
import { Fetch } from 'react-request';
import Loader from '../components/loader'
import StartupList from '../components/startupList'
import {StartupsUrl} from '../constants'

export default () => {
    return <Fetch url={StartupsUrl} fetchPolicy={'network-only'}>
    {({ fetching, failed, data }) => {
        if (fetching) return <Loader />
        else if (failed) return <div>The request did not succeed.</div>
        else if(data) {
            return <StartupList data={data}/>
        }
    }}
    </Fetch>
}