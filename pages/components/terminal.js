class Terminal {
    constructor() {
        this.terminalBody = document.getElementById('terminalBody');
        this.commandInput = null;
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentInput = '';
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.createWelcomeMessage();
        this.createInputLine();
        this.setupEventListeners();
    }
    
    createWelcomeMessage() {
        const welcomeMsg = `
            <div class="terminal-line">
                <span class="prompt-user">visitor</span>
                <span class="prompt-symbol">@</span>
                <span class="prompt-user">ekisa-joseph</span>
                <span class="prompt-symbol">:~$</span> welcome
            </div>
            <div class="cmd-output">
                <p>Welcome to Ekisa Joseph's portfolio terminal!</p>
                <p>Type 'help' to see available commands.</p>
                <br>
                <p>Try commands like:</p>
                <p>- <span style="color: var(--secondary)">about</span> - Learn about me</p>
                <p>- <span style="color: var(--secondary)">projects</span> - View my projects</p>
                <p>- <span style="color: var(--secondary)">skills</span> - See technical skills</p>
                <p>- <span style="color: var(--secondary)">contact</span> - Get contact info</p>
            </div>
        `;
        this.terminalBody.innerHTML = welcomeMsg;
    }
    
    createInputLine() {
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-input-line';
        inputLine.innerHTML = `
            <span class="prompt-user">visitor</span>
            <span class="prompt-symbol">@</span>
            <span class="prompt-user">ekisa-joseph</span>
            <span class="prompt-symbol">:~$</span>
            <input type="text" class="terminal-input" autocomplete="off" spellcheck="false">
        `;
        this.terminalBody.appendChild(inputLine);
        
        this.commandInput = inputLine.querySelector('.terminal-input');
        this.commandInput.focus();
        
        // Scroll to bottom
        this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            
            if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                this.clearTerminal();
            }
            
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            }
        });
    }
    
    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        if (direction === -1) { // Up arrow
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
            }
        } else { // Down arrow
            if (this.historyIndex > 0) {
                this.historyIndex--;
            } else if (this.historyIndex === 0) {
                this.historyIndex = -1;
                this.commandInput.value = this.currentInput;
                return;
            }
        }
        
        if (this.historyIndex >= 0) {
            this.commandInput.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
        }
    }
    
    executeCommand(command) {
        // Add to history
        this.commandHistory.push(command);
        this.historyIndex = -1;
        this.currentInput = '';
        
        // Parse command
        const parts = command.trim().split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        // Create command line display
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line';
        commandLine.innerHTML = `
            <span class="prompt-user">visitor</span>
            <span class="prompt-symbol">@</span>
            <span class="prompt-user">ekisa-joseph</span>
            <span class="prompt-symbol">:~$</span> ${command}
        `;
        this.terminalBody.appendChild(commandLine);
        
        // Execute command
        let result = '';
        if (terminalData.commands[cmd]) {
            result = terminalData.commands[cmd].execute(args);
        } else {
            result = `<div class="cmd-output"><p>Command '${cmd}' not found. Type 'help' for available commands.</p></div>`;
        }
        
        // Display result
        const resultDiv = document.createElement('div');
        resultDiv.innerHTML = result;
        this.terminalBody.appendChild(resultDiv);
        
        // Remove current input line and create new one
        this.commandInput.parentElement.remove();
        this.createInputLine();
        
        // Scroll to bottom
        this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
    }
    
    clearTerminal() {
        this.terminalBody.innerHTML = '';
        this.createInputLine();
    }
    
    open() {
        this.isOpen = true;
        document.getElementById('terminalModal').style.display = 'flex';
        setTimeout(() => {
            if (this.commandInput) {
                this.commandInput.focus();
            }
        }, 100);
    }
    
    close() {
        this.isOpen = false;
        document.getElementById('terminalModal').style.display = 'none';
    }
    
    minimize() {
        this.isOpen = false;
        document.getElementById('terminalModal').style.display = 'none';
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.terminal = new Terminal();
    
    // Set up terminal input handling
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('terminal-input')) {
            e.target.focus();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        const input = document.querySelector('.terminal-input');
        if (input && document.activeElement === input) {
            if (e.key === 'Enter') {
                const command = input.value.trim();
                if (command) {
                    window.terminal.executeCommand(command);
                }
                e.preventDefault();
            }
        }
    });
});

// Global functions for terminal control
function openTerminal() {
    window.terminal.open();
}

function closeTerminal() {
    window.terminal.close();
}

function minimizeTerminal() {
    window.terminal.minimize();
}