import os
import asyncio
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

TOKEN = os.getenv("TOKEN")

if not TOKEN:
    raise ValueError("TOKEN environment variable is missing")


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "❤️ Welcome to Life After 35!\n\n"
        "Bot is working successfully."
    )


async def main():
    app = Application.builder().token(TOKEN).build()

    app.add_handler(CommandHandler("start", start))

    print("Life After 35 Bot is starting...")

    await app.initialize()
    await app.start()
    await app.updater.start_polling()

    print("✅ Bot is ONLINE")

    await asyncio.Event().wait()


await main()
