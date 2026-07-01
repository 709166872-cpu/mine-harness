import { readFileSync } from 'fs';
import { Command } from 'commander';
// 快速路径：先拦截 --version，避免走 commander 完整流程
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
if (process.argv.includes('--version') || process.argv.includes('-V')) {
    console.log(pkg.version);
    process.exit(0);
}
// commander 兜底
const program = new Command();
program
    .name('mini-harness')
    .version(pkg.version)
    .description('A minimal CLI harness (learning version of Claude Code)');
program.parse(process.argv);
// 如果没有传任何子命令
if (process.argv.length <= 2) {
    program.help();
}
