import React from 'react';

const projects = [
  {
    id: 1,
    projectName: 'Project Alpha',
    user: 'John Doe',
    description: 'A web application for task management.',
    downloadedZipFile: 'project_alpha_v1.0.zip',
  },
  {
    id: 2,
    projectName: 'Project Beta',
    user: 'Jane Smith',
    description: 'A mobile app for fitness tracking.',
    downloadedZipFile: 'project_beta_v2.1.zip',
  },
  {
    id: 3,
    projectName: 'Project Gamma',
    user: 'Alice Lee',
    description: 'A data analysis tool for businesses.',
    downloadedZipFile: 'project_gamma_v3.5.zip',
  },
  {
    id: 4,
    projectName: 'Project Delta',
    user: 'Bob Brown',
    description: 'An e-commerce platform for small shops.',
    downloadedZipFile: 'project_delta_v1.2.zip',
  },
  {
    id: 5,
    projectName: 'Project Epsilon',
    user: 'Carol Green',
    description: 'A machine learning model for image recognition.',
    downloadedZipFile: 'project_epsilon_v0.9.zip',
  },
];

function ProjectsTable() {
  // Function to handle the download
  const handleDownload = (fileName) => {
    // Simulate a download link
    const link = document.createElement('a');
    link.href = `/downloads/${fileName}`; // Path to the file
    link.download = fileName; // Name of the file to be downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Inline styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      margin: '20px',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    tableHeader: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    tableCell: {
      padding: '12px 15px',
      textAlign: 'left',
    },
    tableRow: {
      backgroundColor: '#f9f9f9',
      borderBottom: '1px solid #ddd',
    },
    tableRowEven: {
      backgroundColor: '#fff',
    },
    downloadButton: {
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    downloadButtonHover: {
      backgroundColor: '#218838',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Projects error
      </h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>ID</th> {/* ID Column */}
            <th style={styles.tableCell}>Project Name</th>
            <th style={styles.tableCell}>User Name</th>
            <th style={styles.tableCell}>Description</th>
            <th style={styles.tableCell}>Downloaded Zip File</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr
              key={project.id} // Use project.id as the key
              style={index % 2 === 0 ? styles.tableRow : styles.tableRowEven}
            >
              <td style={styles.tableCell}>{project.id}</td> {/* Display ID */}
              <td style={styles.tableCell}>{project.projectName}</td>
              <td style={styles.tableCell}>{project.user}</td>
              <td style={styles.tableCell}>{project.description}</td>
              <td style={styles.tableCell}>
                <button
                  onClick={() => handleDownload(project.downloadedZipFile)}
                  style={styles.downloadButton}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor =
                      styles.downloadButtonHover.backgroundColor)
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor =
                      styles.downloadButton.backgroundColor)
                  }
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsTable;