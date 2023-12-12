import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const Summary = ({ handleBack }) => {
  const user = useSelector((state) => state.user);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://webhook.site/96546619-8cc2-483a-964b-221d26211c52",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        console.log("Submission successful");
      } else {
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Summary</h2>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      {/* Display other user details */}
      <Button onClick={handleBack}>Back</Button>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default Summary;
