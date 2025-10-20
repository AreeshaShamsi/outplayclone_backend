import db from "../config/db.js";

// Get all leads
export const getLeads = (req, res) => {
  db.query("SELECT * FROM leads", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Create new lead
export const createLead = (req, res) => {
  const {
    leadOwner,
    company,
    firstName,
    lastName,
    title,
    email,
    phone,
    fax,
    mobile,
    website,
    leadSource,
    leadStatus,
    industry,
    employees,
    revenue,
    rating,
    description,
    address,
    country,
    houseNo,
    street,
    city,
    state,
    zip
  } = req.body;

  const sql = `
    INSERT INTO leads
    (name, email, phone, company, first_name, last_name, title, website, lead_source,
     lead_status, industry, num_employees, annual_revenue, rating, description, address,
     country, flat_house, street_address, city, state, zip)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    leadOwner, email, phone, company, firstName, lastName, title, website, leadSource,
    leadStatus, industry, employees, revenue, rating, description, address,
    country, houseNo, street, city, state, zip
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, message: "Lead created successfully" });
  });
};

export const updateLead = (req, res) => {
  const { id } = req.params;
  const {
    leadOwner,
    company,
    firstName,
    lastName,
    title,
    email,
    phone,
    fax,
    mobile,
    website,
    leadSource,
    leadStatus,
    industry,
    employees,
    revenue,
    rating,
    description,
    address,
    country,
    houseNo,
    street,
    city,
    state,
    zip,
  } = req.body;

  const sql = `
    UPDATE leads
    SET
      name = ?, email = ?, phone = ?, company = ?, first_name = ?, last_name = ?, title = ?, 
      website = ?, lead_source = ?, lead_status = ?, industry = ?, num_employees = ?, 
      annual_revenue = ?, rating = ?, description = ?, address = ?, country = ?, 
      flat_house = ?, street_address = ?, city = ?, state = ?, zip = ?
    WHERE id = ?
  `;

  const values = [
    leadOwner,
    email,
    phone,
    company,
    firstName,
    lastName,
    title,
    website,
    leadSource,
    leadStatus,
    industry,
    employees,
    revenue,
    rating,
    description,
    address,
    country,
    houseNo,
    street,
    city,
    state,
    zip,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Error updating lead" });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Lead not found" });
    res.json({ message: "Lead updated successfully" });
  });
};

// ============================
// DELETE a lead
// ============================
export const deleteLead = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM leads WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error deleting lead" });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Lead not found" });
    res.json({ message: "Lead deleted successfully" });
  });
};
