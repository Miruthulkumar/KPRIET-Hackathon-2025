import Entry from "../models/Entry.js";

// Create a new entry
export const createEntry = async (req, res) => {
  try {
    const { entryType, content, transcript, mood, insight } = req.body;

    if (!entryType || !mood || !insight) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (entryType === "text" && !content) {
      return res
        .status(400)
        .json({ error: "Content is required for text entries" });
    }

    if (entryType === "voice" && !transcript) {
      return res
        .status(400)
        .json({ error: "Transcript is required for voice entries" });
    }

    const entry = new Entry({
      entryType,
      content,
      transcript,
      mood,
      insight,
    });

    await entry.save();

    res.status(201).json(entry);
  } catch (error) {
    console.error("Error creating entry:", error);
    res
      .status(500)
      .json({ error: "Failed to create entry", details: error.message });
  }
};

// Get all entries
export const getEntries = async (req, res) => {
  try {
    const { type, limit = 50 } = req.query;

    const query = type ? { entryType: type } : {};

    const entries = await Entry.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch entries", details: error.message });
  }
};

// Get entry by ID
export const getEntryById = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await Entry.findById(id);

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.json(entry);
  } catch (error) {
    console.error("Error fetching entry:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch entry", details: error.message });
  }
};

// Delete entry
export const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await Entry.findByIdAndDelete(id);

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res
      .status(500)
      .json({ error: "Failed to delete entry", details: error.message });
  }
};
