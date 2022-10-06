export const fetchingFormData = async (data) => {
  try {
    const result = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const parsedResult = await result.json();
    return { ok: parsedResult };
  } catch (err) {
    return { error: err };
  }
};
