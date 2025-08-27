import express from "express";
import cors from "cors";

const app = express();

const corsOption = {
  origin: ["http://localhost:5174", "http://localhost:5175"],
};
app.use(cors(corsOption));
app.use(express.json());

// Route 1 to handle GET requests
app.get("/", (req, res) => {
  res.send("Hello");
});

let members = [];

// Router 2 to handle POST requrests to create a new member
app.post("/members", (req, res) => {
  const { name, lastname, position } = req.body;
  const newMember = {
    id: String(members.length + 1),
    name,
    lastname,
    position,
  };
  members.push(newMember);

  res.status(201).json(newMember);
});

// Router 3 to handle GET requests to read member
app.get("/members", (req, res) => {
  res.status(200).json(members);
});

// Router 4 to handle DELETE requests to delete member
app.delete("/members/:id", (req, res) => {
  const memberId = req.params.id;
  const memberIndex = members.findIndex((member) => member.id === memberId);

  if (memberIndex !== -1) {
    members.splice(memberIndex, 1);
    return res.status(200).json(`Member with ID ${memberId} Deleted`);
  }

  res.status(404).json("Member not found");

  //   members = members.filter((member) => member.id !== memberId);
  //   res.status(200).json(members);
});

// Router 5 to handle DELETE requests to delete member
app.put("/members/:id", (req, res) => {
  const memberId = req.params.id;
  const { name, lastname, position } = req.body;

  const member = members.find((m) => m.id === memberId);

  if (member) {
    if (name !== undefined) member.name = name;
    if (lastname !== undefined) member.lastname = lastname;
    if (position !== undefined) member.position = position;

    res.status(200).json(member);
  }else{
    res.status(404).send("Member not find");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});
