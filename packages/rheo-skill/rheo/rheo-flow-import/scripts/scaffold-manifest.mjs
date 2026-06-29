#!/usr/bin/env node
import { runCli } from './lib/rheo-cli.mjs';

process.exitCode = await runCli('scaffold', process.argv.slice(2));
