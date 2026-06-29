#!/usr/bin/env node
import { runCli } from './lib/rheo-cli.mjs';

process.exitCode = await runCli('audit', process.argv.slice(2));
