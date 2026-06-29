#!/usr/bin/env node
import { runCli } from './lib/rheo-cli.mjs';

process.exitCode = await runCli('summary', process.argv.slice(2));
