const axios = require("axios");
const chalk = require("chalk");
const fs = require("fs").promises;
let questions = [
  {
    question: "Top movers today",
    answer:
      "Top movers today:1. Bittensor (TAO): +11.68% 2. Celestia (TIA): +10.49% 3. Immutable (IMX): +9.72% 4. FLOKI (FLOKI): +9.24% 5. Jupiter (JUP): +8.61% 6. Tezos (XTZ): +8.21% 7. Injective (INJ): +7.60% 8. Marinade Staked SOL (MSOL): +7.60% 9. Binance Staked SOL (BNSOL): +7.37% 10. Render (RENDER): +7.31%",
  },
  {
    question: "What is proof of AI?",
    answer:
      "Proof of AI, specifically referred to as Proof of Attributed Intelligence (PoAI) in the context of Kite AI, is a consensus mechanism designed to enable a fair, transparent, and secure AI ecosystem. It ensures that all contributions across data, models, and agents are accurately attributed and rewarded, addressing the challenges of attribution and value distribution in AI development. Unlike traditional consensus models like Proof of Work or Proof of Stake, PoAI focuses on equitable reward distribution based on the impact of contributions, fostering collaboration and mitigating malicious actions.",
  },
  {
    question: "What is Kite AI?",
    answer:
      "Kite AI is a purpose-built Layer 1 blockchain platform designed for AI applications, utilizing a unique consensus mechanism called Proof of AI (PoAI). It aims to democratize AI by enabling ownership and control over AI models and data, fostering collaboration among developers, researchers, and businesses. Kite AI features a modular architecture with specialized subnets for data, models, and intelligent agents, ensuring high performance, scalability, and transparency in AI innovation.",
  },
  {
    question: "Price of bitcoin",
    answer: "The current price of bitcoin is $96,943.00.",
  },
  {
    question:
      "What do you think of this transaction? 0x252c02bded9a24426219248c9c1b065b752d3cf8bedf4902ed62245ab950895b",
    answer:
      "Extracted transaction hash: 0x252c02bded9a24426219248c9c1b065b752d3cf8bedf4902ed62245ab950895b Fraud analysis complete. Score: 0.9963699579238892 The Ethereum transaction with hash 0x252c02bded9a24426219248c9c1b065b752d3cf8bedf4902ed62245ab950895b has been flagged as potentially fraudulent by the fraud detector, receiving a 'POSITIVE' label and a high score of 0.996, indicating a strong likelihood of fraudulent activity.",
  },
];

async function status(x_token) {
  try {
    const response = await axios.get(
      "https://api-kiteai.bonusblock.io/api/kite-ai/get-status",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          Referer: "https://agents.testnet.gokite.ai/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "x-auth-token": x_token,
        },
      }
    );
    console.log(
      chalk.yellow(
        "dailyAgentActionsXp :",
        response.data.payload.dailyAgentActionsXp
      )
    );
    console.log(
      chalk.yellow(
        "totalAgentActionsXp :",
        response.data.payload.totalAgentActionsXp
      )
    );
    return response.data.payload.dailyAgentActionsXp;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error(chalk.red("failed get status data."));
    } else if (error.response && error.response.status === 403) {
      console.error(chalk.red("403 Forbidden: failed get user data."));
    } else {
      console.error(chalk.red(`Error get status  data: ${error.message}`));
    }
  }
}

// Function to User
async function user(wallet) {
  try {
    const response = await axios.get(
      "https://quests-usage-dev.prod.zettablock.com/api/user/" +
        wallet +
        "/stats",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          Referer: "https://agents.testnet.gokite.ai/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
      }
    );
    console.log(chalk.yellow("Wallet :", response.data.wallet_address));
    console.log(
      chalk.yellow("Total Interactions :", response.data.total_interactions)
    );
    return response.data.total_interactions;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error(chalk.red("failed get user data: "+error.message));
    } else if (error.response && error.response.status === 403) {
      console.error(chalk.red("403 Forbidden: failed get user data."));
    } else {
      console.error(chalk.red(`Error get user  data: ${error.message}`));
    }
  }
}

async function chat(questions_random, agent_id,wallet) {
  try {
    const response = await axios.post(
      "https://" + agent_id + ".stag-vxzy.zettablock.com/main",
      { message: questions_random.question, stream: true },
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          Referer: "https://agents.testnet.gokite.ai/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
      }
    );
    // console.log(chalk.yellow("Chat :", JSON.stringify(response.data)));
    report(questions_random,wallet);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error(chalk.red("failed get user chat."));
    } else if (error.response && error.response.status === 403) {
      console.error(chalk.red("403 Forbidden: failed get user chat."));
    } else {
      console.error(chalk.red(`Error get user  chat: ${error.message}`));
    }
  }
}

async function report(questions_random,wallet) {
  try {
    const response = await axios.post(
      "https://quests-usage-dev.prod.zettablock.com/api/report_usage",
      {
        wallet_address: wallet,
        agent_id: "deployment_HlsY5TJcguvEA2aqgPliXJjg",
        request_text: questions_random.question,
        response_text: questions_random.answer,
        request_metadata: {},
      },
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          Referer: "https://agents.testnet.gokite.ai/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
      }
    );

    console.log(chalk.yellow("Report :", response.data.message));
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error(chalk.red("failed get user Report."));
    } else if (error.response && error.response.status === 403) {
      console.error(chalk.red("403 Forbidden: failed get user Report."));
    } else {
      console.error(chalk.red(`Error get user  Report: ${error.message}`));
    }
  }
}

function printHeader() {
  const line = "=".repeat(50); // Create a line of 50 "=" characters
  const title = "Chat Daily GOKITE";
  const createdBy = "Bot created by: https://t.me/madsilver17";

  // Calculate the padding needed to center the title and createdBy
  const totalWidth = 50;

  const titlePadding = Math.floor((totalWidth - title.length) / 2); // Padding for title
  const createdByPadding = Math.floor((totalWidth - createdBy.length) / 2); // Padding for createdBy

  // Center the title and createdBy text
  const centeredTitle = title
    .padStart(titlePadding + title.length)
    .padEnd(totalWidth);
  const centeredCreatedBy = createdBy
    .padStart(createdByPadding + createdBy.length)
    .padEnd(totalWidth);

  console.log(chalk.cyan.bold(line)); // Print line in cyan and bold
  console.log(chalk.cyan.bold(centeredTitle)); // Print centered title in cyan and bold
  console.log(chalk.green(centeredCreatedBy)); // Print centered creator info in green
  console.log(chalk.cyan.bold(line)); // Print line again in cyan and bold
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNextRunTime(delayInMs) {
  const nextRunDate = new Date(Date.now() + delayInMs);
  const hours = nextRunDate.getHours().toString().padStart(2, "0");
  const minutes = nextRunDate.getMinutes().toString().padStart(2, "0");
  const seconds = nextRunDate.getSeconds().toString().padStart(2, "0");
  const date = nextRunDate.getDate().toString().padStart(2, "0");
  const month = (nextRunDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const year = nextRunDate.getFullYear();

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

async function execute() {
  try {
    printHeader();

    // Membaca file JSON dengan await
    const data = await fs.readFile("data.json", "utf8");

    // Konversi string JSON menjadi array objek
    const jsonData = JSON.parse(data);

    for (const item of jsonData) {
      while (true) {
        let questions_random = questions[getRandomInt(0, questions.length - 1)];

        console.log("Question:", questions_random.question);
        console.log("Answer:", questions_random.answer);

        let dailyAgentActionsXp =  await status(item.x_token);

       let interactions= await user(item.wallet);
        if (dailyAgentActionsXp == 200 || interactions == 200) {
            console.log( chalk.green(`Daily Complete untuk agent_id: ${item.agent_id}`));
          break;
        }
        await chat(questions_random, item.agent_id,item.wallet);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the script and repeat every 6 hours
setInterval(async () => {
  console.log(
    chalk.cyan.bold(`Running the process at ${new Date().toLocaleString()}`)
  );
  await execute();
  const delayInMs = 24 * 60 * 60 * 1000;
  const nextRunTime = getNextRunTime(delayInMs);
  console.log(
    chalk.green(`Process complete. Next run will be at ${nextRunTime}`)
  );
  // Calculate and print out the next run time (6 hours later)
}, 24 * 60 * 60 * 1000);

// Run immediately on start
(async () => {
  console.log(
    chalk.cyan.bold(`Running the process at ${new Date().toLocaleString()}`)
  );
  await execute();

  // Calculate and print out the next run time (6 hours later)
  const delayInMs = 24 * 60 * 60 * 1000;
  const nextRunTime = getNextRunTime(delayInMs);
  console.log(
    chalk.green(`Process complete. Next run will be at ${nextRunTime}`)
  );
})();
