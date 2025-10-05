import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Test endpoint
app.get('/api/test', async (req, res) => {
  try {
    const { data, error } = await supabase.from('hotwheels').select('*').limit(1);
    res.json({ 
      message: 'Backend is working!',
      database: error ? 'Connection failed' : 'Connected successfully',
      hotwheelsCount: data?.length || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all hotwheels
app.get('/api/hotwheels', async (req, res) => {
  try {
    const { search, sort = 'name', order = 'asc' } = req.query;
    
    let query = supabase.from('hotwheels').select('*');
    
    // Search functionality
    if (search && search.trim() !== '') {
      query = query.or(`name.ilike.%${search}%,series.ilike.%${search}%,color.ilike.%${search}%`);
    }
    
    // Sort functionality
    query = query.order(sort, { ascending: order === 'asc' });
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single hotwheel
app.get('/api/hotwheels/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('hotwheels')
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});