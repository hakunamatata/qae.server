// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportConsole from '../../../app/controller/console';
import ExportScreen from '../../../app/controller/screen';
import ExportTerminal from '../../../app/controller/terminal';

declare module 'egg' {
  interface IController {
    console: ExportConsole;
    screen: ExportScreen;
    terminal: ExportTerminal;
  }
}
