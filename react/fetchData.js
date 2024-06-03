fetch("https://api.sirmatafarm.com/api/accommodation")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    return response.json();
  })
  .then(data => {
    console.log("Data:", data);
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });