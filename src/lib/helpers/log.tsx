import fs from 'fs';
import path from 'path';

const logDirectory = path.join(__dirname, 'src', 'log');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

export default function logToFile(message: string) {
  const filePath = path.join(logDirectory, 'log.txt');
  const formattedMessage = `${new Date().toISOString()}: ${message}\n`;
  // const formattedMessage = `${filePath}`;

  fs.appendFile(filePath, formattedMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
}
