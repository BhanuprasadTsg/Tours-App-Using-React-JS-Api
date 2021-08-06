import React ,{useState,useEffect} from 'react';
import Tours from "./components/Tours";
import Loading from "./components/Loading"

const App = () => {
    const[tours,setTours]=useState([]);
    const[loading,setLoading]=useState(true)

    const url = 'https://course-api.com/react-tours-project'

    const removeTour = (id) =>{
        const newTours = tours.filter((tour) => tour.id !== id)
        setTours(newTours)
    }

    const fetchdata = async () =>{
        const response = await fetch(url);
        const tours = await response.json();
        setLoading(false)
        setTours(tours);
    };
    useEffect(() =>{
        fetchdata()
    },[])
    if(loading){
        return (
            <Loading />
        )
    }
    if(tours.length===0){
        return (
            <main>
                <div className='title'>
                    <h2>No tours</h2>
                    <button className='btn' onClick={() => fetchdata()}>Refresh</button>
                </div>
            </main>
        )
    }
    return (
        <div>
            <Tours tours={tours} removeTour={removeTour} />
        </div>
    );
}

export default App;
