const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Mock Data - สถานที่ท่องเที่ยว
const mockAttractions = [
  {
    id: 1,
    name: 'วัดพระแก้ว',
    description: 'วัดที่สำคัญที่สุดในประเทศไทย ตั้งอยู่ในพระบรมมหาราชวัง',
    location: 'กรุงเทพมหานคร',
    category: 'วัด',
    rating: 4.8,
    image_url: 'https://example.com/wat-phra-kaew.jpg'
  },
  {
    id: 2,
    name: 'เขาใหญ่',
    description: 'อุทยานแห่งชาติที่มีความหลากหลายทางชีวภาพสูง',
    location: 'นครราชสีมา',
    category: 'ธรรมชาติ',
    rating: 4.6,
    image_url: 'https://example.com/khao-yai.jpg'
  },
  {
    id: 3,
    name: 'พระนครศรีอยุธยา',
    description: 'เมืองเก่าที่เป็นมหาวิทยาลัยโลก',
    location: 'พระนครศรีอยุธยา',
    category: 'ประวัติศาสตร์',
    rating: 4.7,
    image_url: 'https://example.com/ayutthaya.jpg'
  },
  {
    id: 4,
    name: 'เกาะพีพี',
    description: 'เกาะสวยงามในทะเลอันดามัน',
    location: 'กระบี่',
    category: 'ทะเล',
    rating: 4.5,
    image_url: 'https://example.com/phi-phi.jpg'
  },
  {
    id: 5,
    name: 'ดอยอินทนนท์',
    description: 'ยอดเขาสูงสุดในประเทศไทย',
    location: 'เชียงใหม่',
    category: 'ภูเขา',
    rating: 4.7,
    image_url: 'https://example.com/doi-inthanon.jpg'
  }
];

// Health Check Endpoint
app.get('/health', async (req, res) => {
  try {
    res.json({ 
      status: 'ok', 
      mode: 'mock',
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// Get All Attractions
app.get('/attractions', async (req, res) => {
  try {
    // จำลองความล่าช้าของ database (optional)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    res.json(mockAttractions);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Single Attraction by ID
app.get('/attractions/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const attraction = mockAttractions.find(a => a.id === id);
    
    if (!attraction) {
      return res.status(404).json({ error: 'Attraction not found' });
    }
    
    res.json(attraction);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create New Attraction (mock)
app.post('/attractions', async (req, res) => {
  try {
    const newAttraction = {
      id: mockAttractions.length + 1,
      ...req.body,
      rating: req.body.rating || 0
    };
    
    mockAttractions.push(newAttraction);
    res.status(201).json(newAttraction);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Attraction (mock)
app.put('/attractions/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = mockAttractions.findIndex(a => a.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Attraction not found' });
    }
    
    mockAttractions[index] = {
      ...mockAttractions[index],
      ...req.body,
      id // ป้องกันการเปลี่ยน id
    };
    
    res.json(mockAttractions[index]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Attraction (mock)
app.delete('/attractions/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = mockAttractions.findIndex(a => a.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Attraction not found' });
    }
    
    const deleted = mockAttractions.splice(index, 1);
    res.json({ message: 'Deleted successfully', data: deleted[0] });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`🚀 API listening on http://localhost:${port}`);
  console.log(`📦 Running in MOCK MODE (no database connection)`);
});