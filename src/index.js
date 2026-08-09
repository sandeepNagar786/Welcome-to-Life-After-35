export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Worker test
    if (request.method === "GET" && url.pathname === "/") {
      return new Response("Life After 35 Bot is ONLINE ✅");
    }

    // Set Telegram webhook
    if (request.method === "GET" && url.pathname === "/setup") {
      const webhookUrl = `${url.origin}/webhook`;

      const response = await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/setWebhook?url=${encodeURIComponent(webhookUrl)}`
      );

      return new Response(await response.text(), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // Telegram webhook
    if (request.method === "POST" && url.pathname === "/webhook") {
      try {
        const update = await request.json();

        if (update.message) {
          const chatId = update.message.chat.id;
          const text = update.message.text || "";

          const reply =
            text === "/start"
              ? "❤️ Welcome to Life After 35!\n\nBot is working successfully. ✅"
              : "आपका message मिल गया ✅\n\nLife After 35 Bot अभी online है.";

          await fetch(
            `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: reply
              })
            }
          );
        }

        return new Response("OK");
      } catch (error) {
        return new Response("Error", { status: 500 });
      }
    }

    return new Response("Not Found", { status: 404 });
  }
};
