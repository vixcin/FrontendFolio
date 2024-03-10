import React, { useEffect } from "react";
// Useparams hook to capture teh url parameters
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Project = () => {
    const idParams = useParams();
    const id = parseInt(idParams.id);
    const [datum, setDatum] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    // const datum = data[-1];

    
    useEffect(() => {
        axios.get(`https://portfolio-express.onrender.com/projects/${id}`)
            .then(response => {
                setDatum(response.data);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!datum) {
        return (
            <div>
                <h1>Project not found</h1>
                <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="rounded border p-2">
            {/* Upper Div */}
            <div className="w-100 d-md-flex d-block">
                <div className="col-md-6 p-2">
                    
                    {
                        // Checking if the demoUrl is a video or image
                        (datum.demoUrl.endsWith(".mp4")) 
                        ? <video className="w-100" autoPlay controls loop src={datum.demoUrl}></video>
                        : <img className="w-100" src={datum.demoUrl} alt="demo" />
                        
                    }
                    <h3 className="card-title pt-5">{ datum.projectName }</h3>
                </div>
                <div className="col-md-6 p-2">
                    <div className="card-header d-flex justify-content-between">
                        <div>
                            {
                                datum.concepts.map((concept, index) => {
                                    return (
                                        <span key={index} className="badge bg-success me-2">
                                            {concept}
                                        </span>
                                    )
                                })
                            }
                        </div>
                        <p>
                            {datum.date}
                        </p>
                    </div>
                    <div className="card-body">
                        <div>
                            <h3>About</h3>
                            <hr />
                            <p>
                                { datum.about }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Lower Div */}
            <div className="row pt-3 mt-3">
                <h5>What I Learnt</h5>
                <hr />
                <p>{ datum.lessons }</p>
            </div>
            {/* Footer Div */}
            <div className="card-footer d-flex justify-content-between">
                <span>
                    {/* Link to Homepage */}
                    <Link to="/" className="btn btn-outline-danger me-2">Back</Link>
                    {/* Edit Detials */}
                    <Link to={`/project/edit/${datum.id}`} className="btn btn-outline-warning me-2">Edit</Link>
                </span>
                {/* Go to Projects Link */}
                <Link to={`${datum.projectUrl}`} className="btn btn-primary">GitHub</Link>
            </div>
        </div>
    )
}

export default Project;
