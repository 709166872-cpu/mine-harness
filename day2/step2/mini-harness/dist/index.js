import { readFileSync } from 'fs';
import { Command } from 'commander';
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
if (process.argv.includes('--version') || process.argv.includes('-V')) {
    console.log(pkg.version);
    process.exit(0);
}
async function askAI(question) {
    return `echo: ${question}`;
}
async function startREPL() {
    console.log('REPL mode placeholder');
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
