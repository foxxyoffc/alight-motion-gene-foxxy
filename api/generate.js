export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 1. Generate email disposable via Mail.tm API
        const emailResp = await fetch('https://api.mail.tm/accounts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address: `user_${Date.now()}@mail.tm`,
                password: 'Pass123!'
            })
        });

        if (!emailResp.ok) {
            throw new Error('Gagal buat email');
        }

        const emailData = await emailResp.json();
        const email = emailData.address;
        const password = 'Pass123!';

        // 2. Simulasi registrasi ke Alight Motion (via HTTP request)
        // Catatan: Alight Motion tidak punya API publik, jadi kita simulasi sukses
        // Untuk real, harus pakai headless browser (Playwright) yang tidak support di Vercel free
        // Alternatif: pakai external service seperti Browserless.io

        // 3. Kirim response (simulasi sukses)
        res.status(200).json({
            email: email,
            password: password,
            expiry: '1 tahun (simulasi)',
            downloadLink: 'https://example.com/alight-motion-premium-mod.apk'
        });

    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
}
