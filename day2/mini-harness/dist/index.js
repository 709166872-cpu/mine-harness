import { readFileSync } from 'fs';
import { Command } from 'commander';
import readline from 'node:readline';
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
if (process.argv.includes('--version') || process.argv.includes('-V')) {
    console.log(pkg.version);
    process.exit(0);
}
async function askAI(question) {
    return `echo: ${question}`;
}
let isExiting = false;
function exitGracefully(rl) {
    if (isExiting) {
        process.exit(0);
    }
    isExiting = true;
    console.log('\n再见');
    rl?.close();
    process.exit(0);
}
async function startREPL() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    process.once('SIGINT', () => {
        exitGracefully(rl);
    });
    rl.once('SIGINT', () => {
        exitGracefully(rl);
    });
    rl.setPrompt('> ');
    rl.prompt();
    rl.on('line', async (line) => {
        const question = line.trim();
        if (question.toLowerCase() === 'exit') {
            exitGracefully(rl);
        }
        if (question.length > 0) {
            const answer = await askAI(question);
            console.log(`AI: ${answer}`);
        }
        rl.prompt();
    });
}
async function main() {
    const program = new Command();
    program
        .name('mini-harness')
        .version(pkg.version)
        .description('A minimal CLI harness (learning version of Claude Code)')
        .option('-p, --print <question>', 'ask one question and exit');
    program.parse(process.argv);
    const options = program.opts();
    if (options.print) {
        const answer = await askAI(options.print);
        console.log(answer);
        process.exit(0);
    }
    await startREPL();
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
