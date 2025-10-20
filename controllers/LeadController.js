import db from "../config/db.js";

// ============================
// Get all leads
// ============================
export const getLeads = (req, res) => {
  db.query("SELECT * FROM leads", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// ============================
// Create new lead
// ============================
export const createLead = (req, res) => {
  const {
    name,
    company,
    first_name,
    last_name,
    title,
    email,
    phone,
    website,
    lead_source,
    lead_status,
    industry,
    num_employees,
    annual_revenue,
    rating,
    description,
    address,
    country,
    flat_house,
    street_address,
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
    name, email, phone, company, first_name, last_name, title, website, lead_source,
    lead_status, industry, num_employees, annual_revenue, rating, description, address,
    country, flat_house, street_address, city, state, zip
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, message: "Lead created successfully" });
  });
};

// ============================
// UPDATE a lead (partial updates supported)
// ============================
export const updateLead = (req, res) => {
  const { id } = req.params;
  const updatedData = { ...req.body }; // only the fields sent by frontend

  // If no fields sent, return error
  if (Object.keys(updatedData).length === 0) {
    return res.status(400).json({ error: "No fields provided for update" });
  }

  const sql = "UPDATE leads SET ? WHERE id = ?";
  db.query(sql, [updatedData, id], (err, result) => {
    if (err) {
      console.error("SQL ERROR:", err); // log real error
      return res.status(500).json({ error: "Error updating lead" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Lead not found" });

    res.json({ message: "Lead updated successfully", updatedFields: updatedData });
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
