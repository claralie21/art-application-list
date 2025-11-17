import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Link from 'react-router-dom'

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(()=>{
    const fetchData = async (page) => {
      try {
        const apiEndpointBaseURL = `https://api.harvardartmuseums.org/object?apikey=032e4658-bf6e-48a8-8137-7fe660811fb0&page=${page}`;

        const response = await fetch(apiEndpointBaseURL)
        if(!response.ok) {
          throw new Error(`Http Error! Status : ${response.status}`)
        }
        const result = await response.json();
        setData(result)
      }
      catch (error) {
        setError(error)
      }
      finally { 
        setLoading(false)
      }
    };
    fetchData(currentPage)
    window.scrollTo(0,0)
  },[currentPage])

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage => currentPage - 1)
  }

  return (
    <div className="App">
      <h1>Art Exhibition List</h1>
      {loading && <p>Loading data...</p>}
      {error && <p>Error : {error.message}</p>}
      {
        !loading && !error && ( 
        <ui>
          {data.records.map(item => (
            <li key={item.id}>
              <div>
                <h3>{item.title}</h3>
              </div>
              <div> 
                <img
                  src={(item.images && item.images.length > 0) ? item.images[0].baseimageurl : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/224px-Picture_icon_BLACK.svg.png?20180309172929'}
                  style={{width:'200px'}}
                />
              </div>
              <b>Artist</b>
              <div>
                {item.people[0].name}
              </div>
              <b>Medium</b>
              <div>
                {item.medium ? item.medium : 'Not informed'}
              </div>
              <b>Date : </b>
              <div>
                {item.dated}
              </div>
              <b>Classification</b>
              <div>
                {item.division}
              </div>
              <b>Department</b>
              <div>
                {item.department}
              </div>
              <div>
                {item.url}
              </div>
              <b>Contact</b>
              <div>
                {item.contact}
              </div>
              <div>
                {item.copyright}
              </div>
              {/* <b>See Also : </b>
              <div>
              <a href={item.seeAlso[0].id}>Click here</a>
              </div> */}
            </li>
          ))}
          {data.info.prev &&
            <button onClick={handlePrevPage}>Prev</button>
          }
          {data.info.next &&
            <button onClick={handleNextPage}>Next</button>
          } 
        </ui>
      )
      }
    </div>
  );
}

export default App;
