import React, { useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import SummaryForm from "./components/summaryForm.jsx";
import SummaryResult from "./components/summaryResult.jsx";

const App = () => {
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async (inputText) => {
    try {
      setLoading(true); // Show loading animation
      const response = await fetch("http://127.0.0.1:5000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_text: inputText }),
      });

      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary);
      } else {
        setSummary("An error occurred while summarizing.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSummary("Unable to connect to the server.");
    } finally {
      setLoading(false); // Hide loading animation
    }
  };

  const handleReset = () => {
    setText("");
    setSummary("");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, fontFamily: "Roboto, sans-serif" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, mb: 4 }}
      >
        Article Summarization Application
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={6}>
            <SummaryForm
              text={text}
              setText={setText}
              onSubmit={handleSummarize}
              onReset={handleReset}
              loading={loading}
            />
          </Grid>
          <Grid item xs={6}>
            <SummaryResult summary={summary} loading={loading} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;


// import React, { useState } from "react";
// import { Container, Grid, Typography, Box } from "@mui/material";
// import SummaryForm from "./components/summaryForm.jsx";
// import SummaryResult from "./components/summaryResult.jsx";

// const App = () => {
//   const [summary, setSummary] = useState("");
//   const [text, setText] = useState("");

//   const handleSummarize = async (inputText) => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/summarize", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ input_text: inputText }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setSummary(data.summary);
//       } else {
//         setSummary("An error occurred while summarizing.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setSummary("Unable to connect to the server.");
//     }
//   };

//   const handleReset = () => {
//     setText("");
//     setSummary("");
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, fontFamily: "Roboto, sans-serif" }}>
//       <Typography
//         variant="h4"
//         align="center"
//         gutterBottom
//         sx={{ fontWeight: 700, mb: 4 }}
//       >
//         Article Summarization Application
//       </Typography>
//       <Box sx={{ flexGrow: 1 }}>
//         <Grid container spacing={4} alignItems="stretch">
//           <Grid item xs={6}>
//             <SummaryForm
//               text={text}
//               setText={setText}
//               onSubmit={handleSummarize}
//               onReset={handleReset}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <SummaryResult summary={summary} />
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default App;


// import React, { useState } from "react";
// import { Container, Typography } from "@mui/material";
// import SummaryForm from "./components/summaryForm.jsx";
// import SummaryResult from "./components/summaryResult.jsx";

// const App = () => {
//   const [summary, setSummary] = useState("");

//   // Fungsi untuk mengirim permintaan ke backend
//   const handleSubmission = async (text) => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/summarize", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ input_text: text }),
//       });

//       if (!response.ok) {
//         throw new Error("Gagal mendapatkan hasil ringkasan.");
//       }

//       const data = await response.json();
//       setSummary(data.summary); // Simpan hasil ringkasan di state
//     } catch (error) {
//       console.error("Error:", error);
//       setSummary("Gagal memproses ringkasan."); // Tangani error
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>
//         Sistem Ringkasan Artikel Berita
//       </Typography>
//       <SummaryForm onSubmit={handleSubmission} />
//       <SummaryResult summary={summary} />
//     </Container>
//   );
// };

// export default App;











// import React, { useState } from "react";
// import { Container, Typography } from "@mui/material";
// import SummaryForm from "./components/summaryForm.jsx";
// import SummaryResult from "./components/summaryResult.jsx";

// const App = () => {
//   const [summary, setSummary] = useState("");

//   const handleSummarize = async (text) => {
//     try {
//       const response = await fetch("http://localhost:5000/summarize", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ input_text: text }),
//       });
//       const data = await response.json();
//       setSummary(data.summary);
//     } catch (error) {
//       console.error("Error fetching summary:", error);
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Abstractive Text Summarization
//       </Typography>
//       <SummaryForm onSubmit={handleSummarize} />
//       <SummaryResult summary={summary} />
//     </Container>
//   );
// };

// export default App;










// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
