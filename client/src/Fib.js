import React,{ useState,useEffect } from 'react';
import axios from 'axios';

const Fib = () => {

    const [indexes,updateIndexes]  = useState([]);
    const [values,updateValues] = useState({});
    const [seenIndexes,UpdateSeenIndexes] = useState([]);
    const API_ENDPOINT_CURRENT = '/api/values/current';
    const API_ENDPOINT_ALL = 'api/api/values';



    const renderValues = () => {
        const entries = [];

        for(let key in values){
            entries.push(
                <div key = {key}>
                    For index {key} I calculated {values[key]}
                </div>
            )
        }
        return entries;
    }

    const handleSubmit = async(event) => {

        event.preventDefault();
        await axios.post('api/values',{
            index : indexes
        })
        updateIndexes('')

    }
    useEffect( () => {
        const fetchValues = async() => {
            const values = await axios.get(API_ENDPOINT_CURRENT);
            updateValues(values.data);
    
        }
    
        const fetchIndexes = async() => {
    
            const seenIndexes = await axios.get(API_ENDPOINT_ALL);
            UpdateSeenIndexes(seenIndexes.data)
    
        }
         fetchValues();
         fetchIndexes();

    },[])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your Index</label>
                <input 
                value={indexes}
                onChange={event => updateIndexes({ indexes : event.target.value })}

                />
                <button>Submit</button>
            </form>

            <h3>Indexes I have seen:</h3>
            {seenIndexes.map(({ number }) => number).join(', ')}

            <h3>Calculated Values:</h3>
            {
                renderValues()
            }
        </div>
    );





};
export default Fib
