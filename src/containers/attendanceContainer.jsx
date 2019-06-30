import React, {useState} from 'react';
import { Fetch } from 'react-request';
import Loader from '../components/loader'
import AttendanceView from '../components/attend'
import {StartupsUrl} from '../constants'

const createMap = data => {
    return data.reduce((acc, cur) => {
        const {poc, ...detail} = cur
        poc.forEach(person => {
            acc[`${detail.startup_name}_${person.name}`] = {...detail, ...person}
        })
        return acc
    }, {})
}

const DataManager = ({initialData, doFetch}) => {
    const [data, updateData] = useState(initialData)
    const map = createMap(data)
    
    return <AttendanceView
        doFetch={doFetch}
        data={data}
        map={map}
        createMap={createMap}
        updateData={updateData}
    />
}

export default () => {
    return <Fetch url={StartupsUrl}>
    {({ fetching, failed, data }) => {
        if (fetching) return <Loader />
        else if (failed) return <div>The request did not succeed.</div>
        else if(data) {
            return <Fetch url={StartupsUrl} method={'POST'}>
            {
                ({ doFetch }) => {
                    return <DataManager
                        doFetch={doFetch}
                        initialData={data}
                    />
                }
            }
            </Fetch>
        }
    }}
    </Fetch>
}