import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import data from "../projects.json";

const Home = () => {
    const [data, setData] = React.useState([]);

    useEffect(() => {
        // Fetch the data from the backend '/projects' route
        fetch('https://portfolio-express.onrender.com/projects')
        .then((response) => response.json())
        .then((data) => setData(data));

        // console.log(data);
    }, []);

    return (
        <div className="container-fluid">
            <div className="container">
                <h1>Projects</h1>
                <hr />

                <div className="d-flex justify-content-center flex-wrap">
                    {
                        data.map( (item) => {
                            
                            return(
                                <div key={item.id} className="card m-3 p-0 justify-content-between" style={{width: 18+'rem'}}>
                                    {/* Image */}
                                    <img className="card-img-top" src={item.demoUrl} alt="" />
                                    {/* Title */}
                                    <h3 className="card-title">{item.projectName}</h3>
                                    <div className="card-footer d-flex justify-content-end">
                                        {/* View project navigates to view project page */}
                                        <Link to={`/project/${item.id}`} className="btn btn-outline-primary">View</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Home;