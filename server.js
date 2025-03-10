import { serve } from 'bun';
import axios from 'axios';

const API_KEY = 'sk-3ad4dd92c0e145b585493500cec7f2d9'; // แทนที่ด้วย API key จริงของคุณ
const API_URL = 'https://api.deepseek.com/v1/chat/completions'; // แทนที่ด้วย endpoint จริง

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // ให้บริการไฟล์ index.html
    if (url.pathname === '/') {
      return new Response(Bun.file('index.html'), {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // ให้บริการไฟล์ style.css
    if (url.pathname === '/style.css') {
      return new Response(Bun.file('style.css'), {
        headers: { 'Content-Type': 'text/css' },
      });
    }

    // ให้บริการไฟล์ script.js
    if (url.pathname === '/script.js') {
      return new Response(Bun.file('script.js'), {
        headers: { 'Content-Type': 'application/javascript' },
      });
    }

    // เรียกใช้ API ของ DeepSeek
    if (url.pathname === '/api/deepseek' && req.method === 'POST') {
      try {
        const body = await req.json();
        const response = await axios.post(API_URL, body, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        return new Response(JSON.stringify(response.data), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // หากไม่พบ resource
    return new Response('Not Found', { status: 404 });
  },
});

console.log('Server is running on http://localhost:3000');