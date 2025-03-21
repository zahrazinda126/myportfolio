import React, { useState } from "react";

const ResultsTable = () => {
  // Initial semester data
  const initialSemesterResults = {
    "Year 1 Semester 1": [
      { code: "ICT1103", title: "Fundamentals of Computing", grade: 5, credits: 4 },
      { code: "ICT1102", title: "Essential Hardware and Software", grade: 5, credits: 4 },
      { code: "LNG1101", title: "Writing and Study Skills", grade: 5, credits: 3 },
      { code: "MTH1102", title: "Discrete Mathematics", grade: 5, credits: 3 },
      { code: "CSC1101", title: "Structured Programming", grade: 4.5, credits: 4 },
      { code: "TBS1103", title: "Understanding the Old Testament", grade: 4.5, credits: 3 },
    ],
    "Year 1 Semester 2": [
      { code: "CSC1203", title: "Data Structures and Algorithms", grade: 4.5, credits: 4 },
      { code: "MTH1203", title: "Probability and Statistics", grade: 4.5, credits: 3 },
      { code: "CSC2212", title: "Computer Organization and Architecture", grade: 4, credits: 3 },
      { code: "ICT1205", title: "Database Design and Applications", grade: 5, credits: 4 },
      { code: "ICT1206", title: "Local Area Computer Networking", grade: 4.5, credits: 3 },
      { code: "TBS1201", title: "Understanding the New Testament", grade: 4.5, credits: 3 },
      { code: "PBH1208", title: "Health and Wholeness", grade: 4.5, credits: 3 },
    ],
    "Year 2 Semester 1": [
      { code: "CSC2105", title: "Object Oriented Programming", grade: 5, credits: 4 },
      { code: "CSC2106", title: "Operating Systems", grade: 5, credits: 3 },
      { code: "CSC2107", title: "Design and Analysis of Algorithm", grade: 4.5, credits: 3 },
      { code: "MTH2104", title: "Calculus", grade: 4.5, credits: 3 },
      { code: "DSC2103", title: "Data Science", grade: 5, credits: 4 },
      { code: "TST2206", title: "Understanding Ethics from a Christian Perspective", grade: 4.5, credits: 3 },
    ],
  };

  const [semesterResults, setSemesterResults] = useState(initialSemesterResults);
  const [selectedSemester, setSelectedSemester] = useState("Year 1 Semester 1");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortedResults, setSortedResults] = useState(semesterResults["Year 1 Semester 1"]);
  const [newCourse, setNewCourse] = useState({ code: "", title: "", grade: "", credits: "" });

  // Handle semester change
  const handleSemesterChange = (event) => {
    const newSemester = event.target.value;
    setSelectedSemester(newSemester);
    setSearchQuery(""); // Reset search query
    setSortBy(null); // Reset sorting
    setSortedResults(semesterResults[newSemester]);
  };

  // Handle search input changes
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredResults = semesterResults[selectedSemester].filter(
      (course) =>
        course.code.toLowerCase().includes(query) ||
        course.title.toLowerCase().includes(query)
    );

    setSortedResults(filteredResults);
  };

  // Sorting function
  const handleSort = (key) => {
    let sortedArray = [...sortedResults];
    if (sortBy === key) {
      sortedArray.reverse(); // Toggle sorting order
    } else {
      sortedArray.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    }

    setSortBy(key);
    setSortedResults(sortedArray);
  };

  // Handle input change for new course
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  // Add new course
  const addCourse = () => {
    if (!newCourse.code || !newCourse.title || !newCourse.grade || !newCourse.credits) {
      alert("Please fill in all fields");
      return;
    }

    const updatedSemesterResults = {
      ...semesterResults,
      [selectedSemester]: [...semesterResults[selectedSemester], newCourse],
    };

    setSemesterResults(updatedSemesterResults);
    setSortedResults(updatedSemesterResults[selectedSemester]);

    // Reset input fields
    setNewCourse({ code: "", title: "", grade: "", credits: "" });
  };

  return (
    <section id="results">
      <h2>Results</h2>

      {/* Semester Selection */}
      <label>Select Semester: </label>
      <select value={selectedSemester} onChange={handleSemesterChange}>
        {Object.keys(semesterResults).map((semester) => (
          <option key={semester} value={semester}>
            {semester}
          </option>
        ))}
      </select>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by course code or title..."
        value={searchQuery}
        onChange={handleSearch}
        style={{ padding: "8px", marginLeft: "10px", width: "50%" }}
      />

      {/* Sort Buttons */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => handleSort("grade")}>Sort by Grade</button>
        <button onClick={() => handleSort("credits")}>Sort by Credit Units</button>
      </div>

      {/* Add Course Form */}
      <h3>Add New Course</h3>
      <input
        type="text"
        name="code"
        placeholder="Course Code"
        value={newCourse.code}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="title"
        placeholder="Course Title"
        value={newCourse.title}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="grade"
        placeholder="Grade"
        value={newCourse.grade}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="credits"
        placeholder="Credit Units"
        value={newCourse.credits}
        onChange={handleInputChange}
      />
      <button onClick={addCourse}>Add Course</button>

      {/* Results Table */}
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Title</th>
            <th>Grade</th>
            <th>Credit Units</th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.length > 0 ? (
            sortedResults.map((course, index) => (
              <tr key={index}>
                <td>{course.code}</td>
                <td>{course.title}</td>
                <td>{course.grade}</td>
                <td>{course.credits}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default ResultsTable;
