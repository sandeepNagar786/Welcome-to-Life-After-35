export default {
  async fetch(request, env) {
    if (request.method === "GET") {
      return new Response("Life After 35 Bot is ONLINE ✅");
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      const update = await request.json();

      if (update.message) {
        const chatId = update.message.chat.id;
        const text = update.message.text || "";

        let reply;

        if (text === "/start") {
          reply =
            "❤️ Welcome to Life After 35!\n\n" +
            "Bot is working successfully.";
        } else {
          reply =
            "आपका message मिल गया ✅\n\n" +
            "Life After 35 Bot अभी online है.";
        }

        await fetch(
          `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
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
};
