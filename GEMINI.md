# GEMINI.md
This file provides guidance to GEMINI when working with code in this repository.

## High-level Code Architecture

This repository contains an Electron application that implements a Reversi game.

*   **Core Application:** The main application logic, UI (HTML, CSS), and JavaScript game implementation are located within the `docs/` directory. This directory serves as the source for the Electron application.
*   **Build Process:** Platform-specific executable builds for the Electron application are generated using `electron-packager`.
*   **Installer Creation:** A Gulp task is configured to create a Windows installer for the built Electron application.

## Commands

### Building the Electron Application

The Electron application can be built for different platforms using the following scripts:

*   **Windows:**
    ```bash
    ./win-build.bat
    ```
*   **Linux:**
    ```bash
    ./linux-build.bat
    ```
*   **macOS:**
    ```bash
    ./mac-build.bat
    ```

These commands will generate platform-specific executable files in the project root directory.

### Creating Windows Installer

After building the Windows Electron application (using `win-build.bat`), a Windows installer can be created using Gulp:

```bash
gulp create_windows_installer
```

This command requires Gulp to be installed globally or locally. The installer will be generated in the `./windows_installer` directory.

### Development Notes

*   There are no explicit linting or testing commands defined in the project's `package.json` or other configuration files. Development relies on the build process and manual verification.
*   The `docs/` directory contains the web assets that form the Electron application. Changes to the game logic or UI should be made within this directory.
