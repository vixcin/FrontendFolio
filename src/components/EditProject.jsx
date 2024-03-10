import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";

const EditProject = () => {
    // Get the project id from the URL
    const idParams = useParams();
    const projId = parseInt(idParams.id);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [projectDetails, setProjectDetails] = React.useState({});

    
    useEffect(() => {
        axios.get(`https://portfolio-express.onrender.com/projects/${projId}`)
            .then(response => {
                setProjectDetails({
                    id: projId,
                    projectName: response.data.projectName,
                    projectUrl: response.data.projectUrl,
                    demoUrl: response.data.demoUrl,
                    about: response.data.about,
                    date: response.data.date,
                    concepts: response.data.concepts.join(","),
                    lessons: response.data.lessons,
                    screenshot: response.data.screenshot,
                });
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [projId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectDetails({
        ...projectDetails,
        [name]: value,
        });
    };

    const handleConceptsChange = (e) => {
        const concepts = Array.of(e.target.value.split(","));
        const name = e.target.name;
        console.log(name, concepts);
        setProjectDetails({
        ...projectDetails,
        concepts,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        //send the data to the backend 'projects/:id' put route
        axios.put(`https://portfolio-express.onrender.com/projects/${projId}`, projectDetails)
        .then((response) => {
            console.log(response);
        });

    };

    // Get the user details from the context
    const { userContext } = React.useContext(UserContext);
    console.log(userContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!projectDetails) {
        return (
            <div>
                <h1>Project not found</h1>
                <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
        );
    }

    return (
        (userContext.loggedIn)
        ?
            <div className="container-fluid">
                <div className="row">
                    <h1>Add Project</h1>
                    <hr />
                    <div className="col">
                        <form onSubmit={handleFormSubmit} >
                            {/* Project Name */}
                            <div className="mb-3 row text-start">
                                <label htmlFor="projectName" className="col-sm-2 col-form-label">Project Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="projectName" name="projectName" value={projectDetails.projectName} onChange={handleInputChange} />
                                </div>
                            </div>

                            {/* Project Github URL */}
                            <div className="mb-3 row text-start">
                                <label htmlFor="projectUrl" className="col-sm-2 col-form-label">Project URL</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="projectUrl" name="projectUrl" value={projectDetails.projectUrl} onChange={handleInputChange} />
                                </div>
                            </div>

                            {/* Project Demo URL */}
                            <div className="mb-3 row text-start">
                                <label htmlFor="demoUrl" className="col-sm-2 col-form-label">Demo URL</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="demoUrl" id="demoUrl" value={projectDetails.demoUrl} onChange={handleInputChange} />
                                </div>
                            </div>

                            {/* Project About */}
                            <div className="mb-3 row text-start">
                                <label htmlFor="about" className="col-sm-2 col-form-label">About</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" id="about" rows="3" name="about" value={projectDetails.about} onChange={handleInputChange}></textarea>
                                </div>
                            </div>

                            {/* Project Date */}
                            <div className="mb-3 row text-start">
                                <label htmlFor="date" className="col-sm-2 col-form-label">Date</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="date" name="date" value={projectDetails.date} onChange={handleInputChange} />
                                </div>
                            </div>

                            {/* Project Concepts */}
                            <div className="mb-3 row text-start">
                                <label htmlFor="concepts" className="col-sm-2 col-form-label">Concepts</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="concepts" name="concepts" value={projectDetails.concepts} onChange={handleConceptsChange} />
                                </div>
                            </div>

                            {/* Project Lessons */}
                            <div className="mb-3 row text-start">
                                <label htmlFor="lessons" className="col-sm-2 col-form-label">Lessons</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" id="lessons" rows="3" name="lessons" value={projectDetails.lessons} onChange={handleInputChange}></textarea>
                                </div>
                            </div>
                            
                            <div className="form-group d-flex justify-content-between pt-4">
                                {/* Cancel Button */}
                                <Link to={`/project/${projectDetails.id}`} className="btn btn-outline-warning">Cancel</Link>
                                {/* Save Changes */}
                                <button type="submit" className="btn btn-primary">Update Project</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        :
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h1>Unauthorized</h1>
                        <hr />
                        <p>
                            You are not authorized to view this page. Please login to view this page.
                        </p>
                        <Link className="btn btn-outline-primary" to="/login">Login</Link>
                    </div>
                </div>
            </div>
    );
}

export default EditProject;