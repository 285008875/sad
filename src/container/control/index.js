import React, { memo, useState, useEffect,  } from 'react';
import { Chart, Tooltip, Axis, Line, Point } from 'viser-react';
import { connect } from 'react-redux'
import Axios from '../../axios.config';
function MonitorVisible(props) {
    const [data,setData] = useState([{}])
    const scale = [{
        dataKey: 'time',
        // min: 0,
    }, {
        dataKey: 'count',
        min: 0,
        max: 4000,
    }];
    useEffect(()=>{
        Axios.get('./monitor').then((res)=>{
        const {result ,code,succeed} =res.data
        if (code===200&&succeed===1) {
            // console.log(result)
                setData(result)
            }
        })
    }, [setData])
    

    
    return(
        <Chart forceFit height={400} data={data} scale={scale}>
            <Tooltip />
            <Axis />
            <Line position="time*count" />
            <Point position="time*count" shape="circle" />
        </Chart>
    )
}

function isEmpty(){}
export default memo(MonitorVisible, isEmpty)