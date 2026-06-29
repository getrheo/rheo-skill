#!/usr/bin/env node
import { runCli } from './lib/rheo-cli.mjs';

process.exitCode = await runCli('audit-publish', process.argv.slice(2));
