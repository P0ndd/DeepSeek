document.getElementById('fetchData').addEventListener('click', async () => {
    try {
      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: 'Your query here' }),
      });
      const data = await response.json();
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error:', error);
    }
  });