import React, {useState, useEffect} from "react";
import sbjs from 'sourcebuster';
import './App.css';

function App() {
    sbjs.init();
    const [sources, setSource] = useState(new Set());
    const [nums, setNums] = useState({});
    const [load, setLoad] = useState([]);

    useEffect(() => {
        fetch('./visitors.json')
            .then(response => response.json())
            .then(json => setting(json));
    }, [])

    function setting(json) {
        const dummy = nums;
        for (let source in json) {
            setSource(sources.add(source));
            dummy[source] = dummy[source] ? dummy[source] + 1 : 1;
            console.log(source, dummy[source])
        }
        let newSource = sbjs.get.current.src;
        setSource(sources.add(newSource));
        dummy[newSource] = dummy[newSource] ? nums[newSource] + 1 : 1;
        setNums(dummy);
        setLoad([]);

    }


    return Object.entries(nums).map((key, val) => (
        <div key={key}>
            <p>{key.slice(0, -1)} {val}</p>
        </div>
    ))


}

export default App;
