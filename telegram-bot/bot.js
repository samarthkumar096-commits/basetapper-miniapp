// Telegram Bot Setup for BaseTapper
// This bot will launch your game as a Telegram Mini App

const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token from @BotFather
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';

// Your Vercel app URL
const WEB_APP_URL = 'https://ni-sage.vercel.app';

// Create bot instance
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Welcome message
const WELCOME_MESSAGE = `
🎮 *Welcome to BaseTapper!*

Tap to earn real BTAP cryptocurrency on Base blockchain!

🎯 *Features:*
• Tap to earn gems & BTAP tokens
• 10-tier progression system
• Daily tasks & rewards
• NFT collectibles
• Referral bonuses
• Real crypto withdrawals

💰 *Start earning now!*
`;

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const username = msg.from.username || msg.from.first_name;

  // Send welcome message with game button
  bot.sendMessage(chatId, WELCOME_MESSAGE, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🎮 Play BaseTapper',
            web_app: { url: `${WEB_APP_URL}?userId=${userId}&username=${username}` }
          }
        ],
        [
          { text: '👥 Invite Friends', callback_data: 'invite' },
          { text: '🏆 Leaderboard', callback_data: 'leaderboard' }
        ],
        [
          { text: '💰 Balance', callback_data: 'balance' },
          { text: 'ℹ️ Help', callback_data: 'help' }
        ]
      ]
    }
  });
});

// Help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  const helpText = `
📖 *BaseTapper Help*

*How to Play:*
1. Tap the gem to earn points
2. Complete daily tasks for bonuses
3. Invite friends for rewards
4. Claim BTAP tokens
5. Trade or withdraw your earnings

*Commands:*
/start - Launch the game
/balance - Check your balance
/invite - Get referral link
/leaderboard - View top players
/help - Show this message

*Support:*
Telegram: @BaseTapperSupport
Twitter: @BaseTapper
Website: https://ni-sage.vercel.app
`;

  bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown' });
});

// Balance command
bot.onText(/\/balance/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // TODO: Fetch real balance from database
  const mockBalance = {
    gems: 15420,
    btap: 154.20,
    level: 12
  };

  const balanceText = `
💰 *Your Balance*

💎 Gems: ${mockBalance.gems.toLocaleString()}
🪙 BTAP: ${mockBalance.btap.toFixed(2)}
⭐ Level: ${mockBalance.level}

Tap the button below to play and earn more!
`;

  bot.sendMessage(chatId, balanceText, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [[
        { text: '🎮 Play Now', web_app: { url: `${WEB_APP_URL}?userId=${userId}` } }
      ]]
    }
  });
});

// Invite command
bot.onText(/\/invite/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  const referralLink = `https://t.me/BaseTapperBot?start=ref_${userId}`;
  
  const inviteText = `
👥 *Invite Friends & Earn!*

Share your referral link and earn:
• 500 BTAP per friend
• 10% of their earnings
• Exclusive bonuses

*Your Referral Link:*
\`${referralLink}\`

Tap to copy and share with friends!
`;

  bot.sendMessage(chatId, inviteText, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [[
        { text: '📤 Share Link', url: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Join me on BaseTapper and earn crypto!` }
      ]]
    }
  });
});

// Leaderboard command
bot.onText(/\/leaderboard/, (msg) => {
  const chatId = msg.chat.id;

  // TODO: Fetch real leaderboard from database
  const mockLeaderboard = [
    { rank: 1, username: 'CryptoKing', btap: 50000 },
    { rank: 2, username: 'TapMaster', btap: 45000 },
    { rank: 3, username: 'GemCollector', btap: 40000 },
    { rank: 4, username: 'BaseLegend', btap: 35000 },
    { rank: 5, username: 'TokenHunter', btap: 30000 },
  ];

  let leaderboardText = '🏆 *Top Players*\n\n';
  
  mockLeaderboard.forEach(player => {
    const medal = player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : `${player.rank}.`;
    leaderboardText += `${medal} ${player.username}: ${player.btap.toLocaleString()} BTAP\n`;
  });

  leaderboardText += '\n_Keep tapping to climb the ranks!_';

  bot.sendMessage(chatId, leaderboardText, { parse_mode: 'Markdown' });
});

// Handle callback queries (button clicks)
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  const userId = query.from.id;

  switch(data) {
    case 'invite':
      bot.answerCallbackQuery(query.id);
      bot.sendMessage(chatId, 'Use /invite to get your referral link!');
      break;
    
    case 'leaderboard':
      bot.answerCallbackQuery(query.id);
      bot.sendMessage(chatId, 'Use /leaderboard to see top players!');
      break;
    
    case 'balance':
      bot.answerCallbackQuery(query.id);
      bot.sendMessage(chatId, 'Use /balance to check your earnings!');
      break;
    
    case 'help':
      bot.answerCallbackQuery(query.id);
      bot.sendMessage(chatId, 'Use /help for more information!');
      break;
  }
});

// Handle web app data (when user closes the game)
bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const data = JSON.parse(msg.web_app_data.data);

  // Process game data (save to database, etc.)
  console.log('Game data received:', data);

  bot.sendMessage(chatId, `✅ Progress saved! You earned ${data.gems} gems!`);
});

// Error handling
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

console.log('🤖 BaseTapper Bot is running!');
console.log('📱 Users can start playing at: https://t.me/YourBotUsername');

module.exports = bot;
