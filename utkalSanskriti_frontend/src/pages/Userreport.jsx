import React, { useState } from 'react';

const UserReport = () => {
    const [reportTitle, setReportTitle] = useState('');
    const [reportType, setReportType] = useState('incident');
    const [submissionDate, setSubmissionDate] = useState('');
    const [reportPeriod, setReportPeriod] = useState('');
    const [executiveSummary, setExecutiveSummary] = useState('');
    const [detailedDescription, setDetailedDescription] = useState('');
    const [keyFindings, setKeyFindings] = useState('');
    const [recommendations, setRecommendations] = useState('');
    const [isChecked, setIsChecked] = useState(false); // for checkbox
    const [image, setImage] = useState(null); // for image handling
    const [buttonStatus, setButtonStatus] = useState(''); // to track the current button status

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // this creates a temporary URL for the selected image
            console.log(file); // to check the file information in the console
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle checkbox state
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isChecked) {
            alert("Please accept the declaration to proceed.");
            return;
        }
        const formData = {
            reportTitle,
            reportType,
            submissionDate,
            reportPeriod,
            executiveSummary,
            detailedDescription,
            keyFindings,
            recommendations,
            isChecked,
            buttonStatus
        };
        console.log(formData); // You can handle the form submission here
    };

    return (
        <div className="Report_Submission_Form_body" style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Report Submission Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: 'auto', border: '1px solid #ddd' }}>
                        <tbody>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4' }}>Full Name</th>
                                <td style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#e9f5e9' }}>John Doe</td>

                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4' }}>Email Address</th>
                                <td style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#e9f5e9' }}>john.doe@example.com</td>

                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4' }}>Department/Team</th>
                                <td style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#e9f5e9' }}>Ui</td>

                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4' }}>Contact Number</th>
                                <td style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#e9f5e9' }}>+1 123-456-7890</td>
                            </tr>
                        </tbody>
                    </table>



                </div>

                <div style={{ width: '100%', borderCollapse: 'collapse', marginTop: '40px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: 'auto' }}>
                        <tbody>
                            <tr>
                                <th>Report Title:</th>
                                <td>
                                    <input
                                        type="text"
                                        value={reportTitle}
                                        onChange={(e) => setReportTitle(e.target.value)}
                                        id="reportTitle"
                                        name="reportTitle"
                                        style={{ width: '100%', padding: '8px', margin: '4px 0', boxSizing: 'border-box' }}
                                    />
                                </td>
                                <th>Report Type:</th>
                                <td>
                                    <select
                                        value={reportType}
                                        onChange={(e) => setReportType(e.target.value)}
                                        id="reportType"
                                        name="reportType"
                                        style={{ width: '100%', padding: '8px', margin: '4px 0', boxSizing: 'border-box' }}
                                    >
                                        <option value="incident">Incident Report</option>
                                        <option value="project">Project Update</option>
                                        <option value="financial">Financial Report</option>
                                        <option value="research">Research Findings</option>
                                        <option value="other">Other</option>
                                    </select>
                                </td>
                                <th>Submission Date:</th>
                                <td>
                                    <input
                                        type="date"
                                        value={submissionDate}
                                        onChange={(e) => setSubmissionDate(e.target.value)}
                                        id="submissionDate"
                                        name="submissionDate"
                                        style={{ width: '100%', padding: '8px', margin: '4px 0', boxSizing: 'border-box' }}
                                    />
                                </td>
                                <th>Report Period:</th>
                                <td>
                                    <input
                                        type="month"
                                        value={reportPeriod}
                                        onChange={(e) => setReportPeriod(e.target.value)}
                                        id="reportPeriod"
                                        name="reportPeriod"
                                        style={{ width: '100%', padding: '8px', margin: '4px 0', boxSizing: 'border-box' }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="report_content">
                    <h2 style={{ textAlign: 'center' }}>Report Content</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: 'auto' }}>
                        <thead>
                            <tr>
                                <th>Executive Summary</th>
                                <th>Detailed Description</th>
                                <th>Key Findings/Results</th>
                                <th>Recommendations</th>
                                <th>Upload Supporting Documents</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ paddingRight: '15px' }}>
                                    <textarea
                                        value={executiveSummary}
                                        onChange={(e) => setExecutiveSummary(e.target.value)}
                                        rows="4"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            margin: '4px 0',
                                            boxSizing: 'border-box',
                                            height: '45px'
                                        }}
                                    />
                                </td>

                                <td style={{ paddingRight: '15px' }}>
                                    <textarea
                                        value={detailedDescription}
                                        onChange={(e) => setDetailedDescription(e.target.value)}
                                        rows="4"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            margin: '4px 0',
                                            boxSizing: 'border-box',
                                            height: '45px'
                                        }}
                                    />
                                </td>

                                <td style={{ paddingRight: '15px' }}>
                                    <textarea
                                        value={keyFindings}
                                        onChange={(e) => setKeyFindings(e.target.value)}
                                        rows="4"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            margin: '4px 0',
                                            boxSizing: 'border-box',
                                            height: '45px'
                                        }}
                                    />
                                </td>

                                <td>
                                    <textarea
                                        value={recommendations}
                                        onChange={(e) => setRecommendations(e.target.value)}
                                        rows="4"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            margin: '4px 0',
                                            boxSizing: 'border-box',
                                            height: '45px'
                                        }}
                                    />
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ padding: '8px', margin: '4px 0' }}
                                    />
                                    {image && <img src={image} alt="Selected" style={{ width: '50px', height: '50px', marginTop: '10px' }} />}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="declaration" style={{ marginTop: '20px', textAlign: 'center' }}>
                    <input
                        type="checkbox"
                        id="declaration"
                        name="declaration"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        required
                    />
                    <label htmlFor="declaration">
                        I hereby declare that the information provided is accurate and complete to the best of my knowledge.
                    </label>
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: 'green',
                            color: 'white',
                            margin: '0 5px',
                            borderRadius: '5px'
                        }}
                        onClick={() => setButtonStatus('Submitted')}
                    >
                        Submit Report
                    </button>

                    <button
                        type="button"
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: 'blue',
                            color: 'white',
                            margin: '0 5px',
                            borderRadius: '5px'
                        }}
                        onClick={() => setButtonStatus('Draft Saved')}
                    >
                        Save as Draft
                    </button>
                </div>

                {buttonStatus && <div style={{ textAlign: 'center', marginTop: '20px' }}>Status: {buttonStatus}</div>}
            </form>
        </div>
    );
};

export default UserReport;