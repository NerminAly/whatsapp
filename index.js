const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// استخدام LocalAuth لتخزين الجلسة
const client = new Client({
    authStrategy: new LocalAuth()
});

const startTime = Date.now();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot is ready and session is saved!');
});

client.on('message', async msg => {
    if (msg.timestamp * 1000 < startTime) return;

    console.log(`Received message: ${msg.body}`);

    const salesNumbers = ['201070991338@c.us', '201022989859@c.us'];
    const randomIndex = Math.floor(Math.random() * salesNumbers.length);
    const chosenSalesNumber = salesNumbers[randomIndex];

    const clientWhatsAppLink = `https://wa.me/${msg.from.replace('@c.us', '')}`;

    await client.sendMessage(
        chosenSalesNumber,
        `عميل جديد أرسل الرسالة التالية:\n"${msg.body}"\nيرجى المتابعة مع العميل على الرابط التالي: ${clientWhatsAppLink}`
    );

    await client.sendMessage(msg.from, 'تم استلام رسالتك. سيقوم أحد فريق المبيعات بالرد عليك قريباً.');
});

client.initialize();
