import React, { useState, useEffect } from 'react';
import Searchable from 'react-searchable-dropdown';
import SelectSearch from 'react-select-search';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Select from 'react-select';
import './Home.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import Message from "./Message";
import { Alert } from 'react-bootstrap';
import {
    Card,
    CardText,
    CardLink,
    CardTitle,
    CardSubtitle,
} from 'react-bootstrap';
{
    /* <Message */
}
function Homepage() {
    const [allStatesName, setAllStatesName] = useState([]);
    const [selectState, setSelectState] = useState(null);

    const [selectCity, setSelectCity] = useState(null);
    const [allCityName, setAllCityName] = useState([]);

    const [startDate, setStartDate] = useState(new Date());

    const [info, setInfo] = useState([]);

    //   Convert date formet
    function convert(str) {
        var date = new Date(str),
            mnth = ('0' + (date.getMonth() + 1)).slice(-2),
            day = ('0' + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join('-');
    }

    useEffect(() => {
        // State data fetch
        axios
            .get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
            .then(({ data }) => {
                const { states } = data;
                const temp = states.map((x) => {
                    return { label: x.state_name, value: x.state_id };
                });
                setAllStatesName(temp);
            })
            .catch((error) => {
                console.log(error);
            });

        // For City data fetch
        if (selectState !== null) {
            axios
                .get(
                    `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectState}`
                )
                .then(({ data }) => {
                    const { districts } = data;
                    const temp2 = districts.map((x) => {
                        return { label: x.district_name, value: x.district_id };
                    });
                    setAllCityName(temp2);
                })
                .catch((error) => {
                    console.log(error);
                });

            if (selectCity !== null) {
                const date = convert(startDate);
                axios
                    .get(
                        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${selectCity}&date=${date}`
                    )
                    .then(({ data }) => {
                        const { sessions } = data;
                        setInfo(sessions);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }, [selectState, selectCity, startDate]);

    //   console.log(allStatesName);
    //   console.log(info.length);

    console.log(convert(startDate));
    return (
        <>
            <div class='menu'>
                <Select
                    className='dropdown'
                    options={allStatesName}
                    onChange={(opt) => setSelectState(opt.value)}
                    placeholder='Select your state...'
                />
                <Select
                    className='dropdown'
                    options={allCityName}
                    onChange={(opt) => setSelectCity(opt.value)}
                    placeholder='Select your city...'
                />
                <DatePicker
                    // className='datepicker'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
            </div>
            {info.length > 0 ? (
                <Alert variant='success'>
                    Here is some center for you! You can book your slot on{' '}
                    <a href='https://selfregistration.cowin.gov.in/'>Cowin</a>{' '}
                    Official website
                </Alert>
            ) : selectCity !== null ? (
                <Alert variant='danger'></Alert>
            ) : null}
            <>
                {info.map((x) => (
                    <div>
                        <div class='courses-container'>
                            <div class='course'>
                                <div class='course-preview'>
                                    <h6>{x.center_id}</h6>
                                    <h2>{x.name}</h2>
                                    <h5>
                                        {x.block_name +
                                            ' ' +
                                            x.district_name +
                                            ' ' +
                                            x.state_name}{' '}
                                    </h5>
                                    <h5>{x.pincode}</h5>
                                </div>
                                <div class='course-info'>
                                    <h6>Fees : {x.fee}</h6>
                                    <h6> Avalables : {x.available_capacity}</h6>
                                    {/* <div class='progress-container'> */}
                                    <span class='progress-text'>
                                        Time :- ${x.from + ' - ' + x.to}{' '}
                                    </span>
                                    {/* </div> */}
                                    {x.slots.map((p) => (
                                        <h2>{p}</h2>
                                    ))}
                                    {/* 
                    <h2>Callbacks & Closures</h2> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        </>
    );
}

export default Homepage;
