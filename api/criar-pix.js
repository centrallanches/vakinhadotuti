
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { amount } = req.body;

    const response = await fetch("https://api.anovapay.com.br/charges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ci": process.env.CLIENT_ID,
        "cs": process.env.CLIENT_SECRET
      },
      body: JSON.stringify({
        amount: Number(amount),
        description: "Doação"
      })
    });

    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Erro ao gerar Pix",
      details: err.message
    });
  }
}
