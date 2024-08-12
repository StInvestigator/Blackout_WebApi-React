import '../App.css';
import { initAxios } from "../services/axiosClient";
import { useEffect, useState } from 'react';
import { api } from "../services/apiService";

export default function Schedule() {


    const [data,setData] = useState([])

    useEffect( ()=>{
         initAxios();
         api.groups.schedule()
            .then(result => {
                setData(result)
            })
    },[])

    return <>
        <div className="row fs-4">
            {data.map((group) =>
                <div className="card col" key={group.id} style={{padding:"0"}}>
                    <h1 className="card-header fs-3">
                        {group.name}
                    </h1>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Hour</th>
                                    <th scope="col">State</th>
                                </tr>
                            </thead>
                            {group.schedule.map((schedule) =>
                                <tbody key={schedule.id}>
                                    <tr>
                                        <td scope="row">{schedule.date}</td>
                                        <td>{schedule.hour}</td>
                                        <td style={{
                                            color: schedule.state === "On"
                                                ? "green" : schedule.state === "Off"
                                                    ? "red" : "darkgoldenrod"
                                        }}>{schedule.state}</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            )}
        </div>
    </>
}