import React, { useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const AddProject  = () => {
    /**
     * projectName {string} : "Demo Project", 
     * projectUrl {url} : "https://www.github.com", 
     * about {string} : "This is what the project is about", 
     * demoUrl {string} : "/this/is/the/path/to/the/image-or-video", 
     * date {string} : "4/5/29", 
     * concepts {string} : [ "concept 1", "concept 2", "concept 3", "concept 4" ], 
     * lessons {string} : "This is how the project works"
     * Screenshot {imagefile}: "imagefile"
     */

    const [projectDetails, setProjectDetails] = React.useState({
        projectName: '',
        projectUrl: '',
        about: '',
        demoUrl: '',
        date: '',
        concepts: '',
        lessons: ''
    });

    const [ projectNameErr, setProjectNameErr ] = React.useState("");
    const [ projectNameValid, setProjectNameValid ] = React.useState(false);

    const [ projectUrlErr, setProjectUrlErr ] = React.useState("");
    const [ projectUrlValid, setProjectUrlValid ] = React.useState(false);

    const [ aboutErr, setAboutErr ] = React.useState("");
    const [ aboutValid, setAboutValid ] = React.useState(false);

    const [ demoUrlErr, setDemoUrlErr ] = React.useState("");
    const [ demoUrlValid, setDemoUrlValid ] = React.useState(false);

    const [ dateErr, setDateErr ] = React.useState("");
    const [ dateValid, setDateValid ] = React.useState(false);

    const [ conceptsErr, setConceptsErr ] = React.useState("");
    const [ conceptsValid, setConceptsValid ] = React.useState(false);

    const [ lessonsErr, setLessonsErr ] = React.useState("");
    const [ lessonsValid, setLessonsValid ] = React.useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectDetails({
            ...projectDetails,
            [name]: value,
        });
    };
    
    const handleConceptsChange = (e) => {
        const concepts = Array.of(e.target.value.split(","));
        // const name = e.target.name;
        // console.log(name, concepts);

        // Update concepts in the state
        setProjectDetails({
        ...projectDetails,
        concepts,
        });
    };

    const checkName = () => {
        // Project Name validation.
        if ( projectDetails.projectName === "" ) {
            setProjectNameErr("Please enter a project name");
        } else if (projectDetails.projectName.length < 3) {
            setProjectNameErr("Project name must be at least 3 characters long");
        } else {
            setProjectNameErr("");
            setProjectNameValid(true);
        }
    }

    const checkProjectUrl = () => {
        // Project URL validation.
        if ( projectDetails.projectUrl === "" ) {
            setProjectUrlErr("Please enter a project URL");
        } 
        else if (projectDetails.projectUrl.length < 6) {
            setProjectUrlErr("Project URL must be at least 6 characters long");
        } 
        else if (!projectDetails.projectUrl.startsWith("https://")) {
            setProjectUrlErr("Please enter a valid project url");
        }
        else {
            setProjectUrlErr("");
            setProjectUrlValid(true);
        }
    }

    const checkDemoUrl = () => {
        // Demo URL validation.
        if ( projectDetails.demoUrl === "" ) {
            setDemoUrlErr("Please enter a demoURL");
        } 
        else if (projectDetails.demoUrl.length < 6) {
            setDemoUrlErr("Demo URL must be at least 6 characters long");
        } 
        else if (!projectDetails.demoUrl.startsWith("https://")) {
            setDemoUrlErr("Please enter a valid demoUrl url");
        }
        else {
            setDemoUrlErr("");
            setDemoUrlValid(true);
        }
    }

    const checkAbout = () => {
        // About validation.
        if ( projectDetails.about === "" ) {
            setAboutErr("Please enter a project about");
        } else if (projectDetails.about.length < 10) {
            setAboutErr("Project about must be at least 10 characters long");
        } else {
            setAboutErr("");
            setAboutValid(true);
        }
    }

    const checkDate = () => {
        // Date validation.
        if ( projectDetails.date === "" ) {
            setDateErr("Please enter a project date");
        } 
        else if (Date.now() < Date.parse(projectDetails.date)) {
            setDateErr("Please enter a valid date");
        } else {
            setDateErr("");
            setDateValid(true);
        }
    }

    const checkConcepts = () => {
        // Concepts validation.
        if ( projectDetails.concepts.length < 1 ) {
            setConceptsErr("Please enter at least one concept");
        } else {
            setConceptsErr("");
            setConceptsValid(true);
        }
    }

    const checkLessons = () => {
        // Lessons validation.
        if ( projectDetails.lessons === "" ) {
            setLessonsErr("Please enter a project lessons");
        } else if (projectDetails.lessons.length < 10) {
            setLessonsErr("Project lessons must be at least 10 characters long");
        } else {
            setLessonsErr("");
            setLessonsValid(true);
        }
    }

    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        checkName(); // Project Name validation.
        checkProjectUrl(); // Project URL validation.
        checkDemoUrl(); // Demo URL validation.
        checkAbout(); // About validation.
        checkDate(); // Date validation.
        checkConcepts(); // Concepts validation.
        checkLessons(); // Lessons validation.

        if (projectNameValid && projectUrlValid && aboutValid && demoUrlValid && dateValid && conceptsValid && lessonsValid) 
        {
            // Create a new FormData object
            // const formData = new FormData();
            // formData.append('projectDetails', JSON.stringify(projectDetails));
            
            try {
                axios.post('https://portfolio-express.onrender.com/projects', {
                    projectName: projectDetails.projectName,
                    projectUrl: projectDetails.projectUrl,
                    about: projectDetails.about,
                    demoUrl: projectDetails.demoUrl,
                    date: projectDetails.date,
                    concepts: projectDetails.concepts,
                    lessons: projectDetails.lessons

                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
                // Handle form submission logic (if needed)
                console.log('Submitted:', projectDetails);

                alert("Project added successfully");
                window.location.href = "/";
            }
            catch (error) {
                console.log(error);
            }
        }
    };
        
    // Get the user from the context
    const { userContext } = React.useContext(UserContext);
    

    return(
        (userContext.loggedIn) 
        ?
            <div className="container-fluid">
                <div className="row">
                    <h1>Add Project</h1>
                    <hr />
                    <div className="col pt-4">
                        <form onSubmit={handleFormSubmit} encType="multipart/form-data" >
                            {/* Project Name */}
                            <div className="mb-3 row text-start">
                                <label htmlFor="projectName" className="col-sm-2 col-form-label">Project Name <span className="text-danger">*</span></label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="projectName" id="projectName" onInput={ checkName } onChange={handleInputChange} />
                                    {/* Error message */}
                                    {
                                        (projectNameErr !== "")
                                        ?
                                            <div>
                                                <p className="text-danger">{projectNameErr}</p>
                                            </div>
                                        :
                                            null
                                    }
                                </div>
                            </div>

                            {/* Project Github URL */}
                            <div className="mb-3 row text-start">
                                <label htmlFor="projectUrl" className="col-sm-2 col-form-label">Project URL <span className="text-danger">*</span></label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="projectUrl" id="projectUrl" onInput={ checkProjectUrl } onChange={handleInputChange} />
                                    {/* Error message */}
                                    {
                                        (projectUrlErr !== "")
                                        ?
                                            <div>
                                                <p className="text-danger">{projectUrlErr}</p>
                                            </div>
                                        :
                                            null
                                    }
                                </div>
                            </div>

                            {/* Project Demo URL */}
                            <div className="mb-3 row text-start">
                                <label htmlFor="demoUrl" className="col-sm-2 col-form-label">Demo URL <span className="text-danger">*</span></label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="demoUrl" id="demoUrl" onInput={ checkDemoUrl } onChange={handleInputChange} />
                                    {/* Error message */}
                                    {
                                        (demoUrlErr !== "")
                                        ?
                                            <div>
                                                <p className="text-danger">{demoUrlErr}</p>
                                            </div>
                                        :
                                            null
                                    }
                                </div>
                            </div>

                            {/* Project About */}
                            <div className="mb-3 row text-start">
                                <label htmlFor="about" className="col-sm-2 col-form-label">About <span className="text-danger">*</span></label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" name="about" id="about" rows="3" onInput={ checkAbout } onChange={handleInputChange}></textarea>
                                    {/* Error message */}
                                    {
                                        (aboutErr !== "")
                                        ?
                                            <div>
                                                <p className="text-danger">{aboutErr}</p>
                                            </div>
                                        :
                                            null
                                    }
                                </div>
                            </div>

                            {/* Project Date */}
                            <div className="mb-3 row text-start">
                                <label htmlFor="date" className="col-sm-2 col-form-label">Date <span className="text-danger">*</span></label>
                                <div className="col-sm-10">
                                    <input type="date" className="form-control" name="date" id="date" onInput={ checkDate } onChange={handleInputChange} />
                                    {/* Error message */}
                                    {
                                        (dateErr !== "")
                                        ?
                                            <div>
                                                <p className="text-danger">{dateErr}</p>
                                            </div>
                                        :
                                            null
                                    }
                                </div>
                            </div>

                            {/* Project Concepts */}
                            <div className="mb-3 row text-start">
                                <label htmlFor="concepts" className="col-sm-2 col-form-label">Concepts <span className="text-danger">*</span></label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="concepts" id="concepts" onInput={ checkConcepts } onChange={handleConceptsChange} />
                                    {/* Error message */}
                                    {
                                        (conceptsErr !== "")
                                        ?
                                            <div>
                                                <p className="text-danger">{conceptsErr}</p>
                                            </div>
                                        :
                                            null
                                    }
                                </div>
                            </div>

                            {/* Project Lessons */}
                            <div className="mb-3 row text-start">
                                <label htmlFor="lessons" className="col-sm-2 col-form-label">Lessons <span className="text-danger">*</span></label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" name="lessons" id="lessons" rows="3" onInput={ checkLessons } onChange={handleInputChange}></textarea>
                                    {/* Error message */}
                                    {
                                        (lessonsErr !== "")
                                        ?
                                            <div>
                                                <p className="text-danger">{lessonsErr}</p>
                                            </div>
                                        :
                                            null
                                    }
                                </div>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" >Submit</button>
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
    )
}

export default AddProject;