const Airtable = require("airtable");

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const studentsTable = base("Students");
const classesTable = base("Classes");

export { studentsTable, classesTable, base };
