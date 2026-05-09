/**
 * Corporate enquiry API route.
 * In a real app, this would save to a database or send an email.
 */
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      companyName, industry, monthlyFlights, 
      routes, passengers, 
      contactName, contactEmail, contactPhone 
    } = req.body;

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Received corporate enquiry:', req.body);

    res.status(200).json({ success: true, message: 'Enquiry received successfully' });
  } catch (error) {
    console.error('Corporate enquiry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
