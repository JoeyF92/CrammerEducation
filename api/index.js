require("dotenv").config();
// const port = process.env.PORT;
const url = process.env.db_URL;

const app = require("./app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
