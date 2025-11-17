import fs from "node:fs";

function logNetworkCall(data, ignoreStatus) {
  if (ignoreStatus) return;
  console.log(data);
  try {
    fs.appendFileSync(
      "./src/logging/networkCalls/networkCallLogs.jsonl",
      "\n" + JSON.stringify(data)
    );
  } catch (err) {
    console.error(err);
  }
}

export { logNetworkCall };
