import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";
import ResultsTable from "./ResultsTable"; // Import the ResultsTable component

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.body.className = savedTheme + "-mode";
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.body.className = newTheme + "-mode";
    localStorage.setItem("theme", newTheme);
  };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div>
      <header>
        <h1>Nankya Zaharah</h1>
        <p>Welcome to my personal portfolio! I am a student at Uganda Christian University pursuing a degree in Computer Science.</p>
      </header>

      <div className="dashboard">
        <button onClick={() => scrollToSection("personal-details")}>Personal Details</button>
        <button onClick={() => scrollToSection("results")}>Results</button>
        <button onClick={() => scrollToSection("contact")}>Contact</button>
        <button onClick={() => scrollToSection("career-goals")}>My Career Goals</button>
      </div>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode "}
      </button>

      <section>
        <h2>Profile Picture</h2>
        <img src="/IMG-20241229-WA0169.jpg" alt="Nankya Zaharah" width="300" height="300" />
      </section>

      <section id="personal-details">
        <h2>Personal Details</h2>
        <ul>
          <li><strong>Full Name:</strong> Nankya Zaharah</li>
          <li><strong>Course:</strong> Computer Science, Year 2</li>
          <li><strong>Hobbies:</strong> Movies, Music, Food, Hanging out with Friends</li>
        </ul>
      </section>

      

      <section>
        <h2>My Hobby: Hanging out With Friends</h2>
        <video controls width="400" height="240">
          <source src="/VID-20241229-WA0191.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Include the ResultsTable component here */}
      <ResultsTable />

      <section id="contact">
        <h2>Contact Information</h2>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:zaharahn126@gmail.com">zaharahn126@gmail.com</a></li>
          <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/nankya-zaharah-534a6b246/" target="_blank">LinkedIn</a></li>
        </ul>
      </section>

      <section id="career-goals">
        <h2>My Career Goals</h2>
        <p>
          As a Computer Science student, I aim to pursue a career in software development,
          specifically in web and mobile application development. I hope to contribute to
          innovative projects that solve real-world problems, with a focus on improving
          accessibility and user experience.
        </p>
      </section>

      <footer>
        <hr />
        <p>&copy; 2025 Nankya Zaharah</p>
      </footer>
    </div>
  );
};

export default App;
