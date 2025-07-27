import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './../App/AppContext';

const ConsoleContainer = styled.div`
  background: rgba(0, 0, 0, 0.90);
  border: 2px solid ${({ theme }) => theme.primaryTextColor};
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 18px;
  line-height: 1.4;
  height: 80%;
  width: 80%;
  overflow-y: auto;
  position: relative;
  z-index: 10;
  box-shadow: 0 0 20px ${({ theme }) => theme.primaryTextColor}20;
  text-align: left;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%);
    pointer-events: none;
    z-index: 1;
  }
`;

const ConsoleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #333;
  color: #888;
  font-size: 18px;
`;

const ConsoleDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const ConsoleLine = styled.div`
  margin: 4px 0;
  color: ${({ color }) => color || '#fff'};
  word-wrap: break-word;
  white-space: pre-wrap;
  pointer-events: auto;
  
  a {
    color: #00ff00;
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.3s ease;
    pointer-events: auto;
    position: relative;
    z-index: 10;
    
    &:hover {
      color: #ffff00;
      text-decoration: none;
    }
  }
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;
`;

const Prompt = styled.span`
  color: #00ff00;
  margin-right: 8px;
  white-space: nowrap;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  font-family: 'Courier New', monospace;
  font-size: 18px;
  outline: none;
  flex: 1;
  
  &::placeholder {
    color: #666;
  }
`;

const Cursor = styled.span`
  color: #00ff00;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

const ConsoleProgressBar = styled.div`
  font-family: 'Courier New', monospace;
  margin: 10px 0;
  color: #00ff00;
`;

const welcomeMessage = `Welcome to Daniel Darritchon's Terminal! 🚀

I'm a passionate developer who loves creating amazing digital experiences.
This is my interactive terminal where you can explore my skills, experience, and projects.

Available sections:
  📁 <a href="#" data-tab="profile">[PROFILE]</a> - Learn about me and my background
  📁 <a href="#" data-tab="projects">[PROJECTS]</a> - Explore my portfolio and work
  📁 [TERMINAL] - You're here! Interactive terminal experience

Ready to explore? Type 'help' to get started!`;

const Console = ({ active, tabId, setActiveTab }) => {
  const { theme } = useContext(AppContext);
  const [history, setHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isHacking, setIsHacking] = useState(false);
  const [hackProgress, setHackProgress] = useState(0);
  const [hackStep, setHackStep] = useState(0);
  const [hackCompleted, setHackCompleted] = useState(false);
  const [welcomeShown, setWelcomeShown] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOutputTyping, setIsOutputTyping] = useState(false);
  const [outputTypingText, setOutputTypingText] = useState('');
  const [isOutputTypingHtml, setIsOutputTypingHtml] = useState(false);
  const [currentPath, setCurrentPath] = useState('/Users/daniel');
  const consoleRef = useRef(null);
  const inputRef = useRef(null);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef(null);
  const outputIntervalRef = useRef(null);

  // Simulated file system structure
  const fileSystem = {
    '/': {
      type: 'directory',
      contents: {
        'Users': { type: 'directory', contents: {} },
        'System': { type: 'directory', contents: {} },
        'Applications': { type: 'directory', contents: {} },
        'Library': { type: 'directory', contents: {} },
        'bin': { type: 'directory', contents: {} },
        'sbin': { type: 'directory', contents: {} },
        'etc': { type: 'directory', contents: {} },
        'var': { type: 'directory', contents: {} },
        'tmp': { type: 'directory', contents: {} }
      }
    },
    '/Users': {
      type: 'directory',
      contents: {
        'daniel': { type: 'directory', contents: {} },
        'Shared': { type: 'directory', contents: {} }
      }
    },
    '/Users/daniel': {
      type: 'directory',
      contents: {
        'Desktop': { type: 'directory', contents: {} },
        'Documents': { type: 'directory', contents: {} },
        'Downloads': { type: 'directory', contents: {} },
        'Pictures': { type: 'directory', contents: {} },
        'Music': { type: 'directory', contents: {} },
        'Movies': { type: 'directory', contents: {} },
        'Applications': { type: 'directory', contents: {} },
        'Library': { type: 'directory', contents: {} },
        'Public': { type: 'directory', contents: {} },
        '.bash_profile': { type: 'file', content: 'export PATH="/usr/local/bin:$PATH"\n# Custom aliases\nalias ll="ls -la"\nalias ..="cd .."\n# Welcome message\necho "Welcome to Daniel\'s terminal!"' },
        '.zshrc': { type: 'file', content: 'source ~/.bash_profile\n# Oh My Zsh configuration\nexport ZSH="/Users/daniel/.oh-my-zsh"\nZSH_THEME="robbyrussell"\nplugins=(git docker node npm)\nsource $ZSH/oh-my-zsh.sh' },
        'resume.pdf': { type: 'file', content: 'Daniel Darritchon - Senior Developer\n\nExperience:\n- 5+ years in web development\n- React, Node.js, Python expert\n- Team leadership experience\n\nEducation:\n- Computer Science Degree\n- Various certifications' },
        'portfolio': { type: 'file', content: 'Portfolio Website\n\nProjects:\n- E-commerce platform\n- Real-time chat application\n- Data visualization dashboard\n- Mobile app development' }
      }
    },
    '/Users/daniel/Desktop': {
      type: 'directory',
      contents: {
        'project1': { type: 'directory', contents: {} },
        'project2': { type: 'directory', contents: {} },
        'screenshot.png': { type: 'file', content: 'Screenshot of my latest project' },
        'notes.txt': { type: 'file', content: 'Meeting notes:\n- Discuss new feature requirements\n- Plan sprint for next week\n- Review code with team' }
      }
    },
    '/Users/daniel/Documents': {
      type: 'directory',
      contents: {
        'work': { type: 'directory', contents: {} },
        'personal': { type: 'directory', contents: {} },
        'certificates': { type: 'directory', contents: {} },
        'report.pdf': { type: 'file', content: 'Quarterly Development Report\n\nAchievements:\n- Launched 3 new features\n- Improved performance by 40%\n- Mentored 2 junior developers' },
        'ideas.md': { type: 'file', content: '# Project Ideas\n\n1. AI-powered code review tool\n2. Real-time collaboration platform\n3. Developer productivity dashboard\n4. Open source contribution tracker' }
      }
    },
    '/Users/daniel/Downloads': {
      type: 'directory',
      contents: {
        'react-tutorial.pdf': { type: 'file', content: 'Advanced React Patterns Tutorial' },
        'docker-guide.md': { type: 'file', content: '# Docker Best Practices\n\n- Use multi-stage builds\n- Minimize layer count\n- Use .dockerignore\n- Security scanning' },
        'node_modules': { type: 'directory', contents: {} }
      }
    },
    '/Users/daniel/Pictures': {
      type: 'directory',
      contents: {
        'vacation': { type: 'directory', contents: {} },
        'work': { type: 'directory', contents: {} },
        'profile.jpg': { type: 'file', content: 'Professional headshot' },
        'team-photo.jpg': { type: 'file', content: 'Team building event photo' }
      }
    },
    '/Users/daniel/Music': {
      type: 'directory',
      contents: {
        'playlists': { type: 'directory', contents: {} },
        'albums': { type: 'directory', contents: {} },
        'coding-mix.mp3': { type: 'file', content: 'Focus music for coding sessions' }
      }
    },
    '/Users/daniel/Movies': {
      type: 'directory',
      contents: {
        'documentaries': { type: 'directory', contents: {} },
        'tutorials': { type: 'directory', contents: {} }
      }
    },
    '/Users/daniel/Applications': {
      type: 'directory',
      contents: {
        'Visual Studio Code.app': { type: 'directory', contents: {} },
        'Safari.app': { type: 'directory', contents: {} },
        'Terminal.app': { type: 'directory', contents: {} },
        'Spotify.app': { type: 'directory', contents: {} },
        'Docker.app': { type: 'directory', contents: {} }
      }
    },
    '/Users/daniel/Library': {
      type: 'directory',
      contents: {
        'Application Support': { type: 'directory', contents: {} },
        'Preferences': { type: 'directory', contents: {} },
        'Caches': { type: 'directory', contents: {} }
      }
    },
    '/Users/daniel/Public': {
      type: 'directory',
      contents: {
        'Drop Box': { type: 'directory', contents: {} }
      }
    }
  };

  // Helper function to get current directory contents
  const getCurrentDirectory = () => {
    return fileSystem[currentPath] || { type: 'directory', contents: {} };
  };

  // Helper function to resolve path
  const resolvePath = (path) => {
    if (path.startsWith('/')) {
      return path;
    }

    const currentParts = currentPath.split('/').filter(Boolean);
    const newParts = path.split('/').filter(Boolean);

    for (const part of newParts) {
      if (part === '..') {
        if (currentParts.length > 0) {
          currentParts.pop();
        }
      } else if (part !== '.') {
        currentParts.push(part);
      }
    }

    // Ensure we always return a valid path starting with /
    return currentParts.length > 0 ? '/' + currentParts.join('/') : '/';
  };

  // Helper function to check if path exists
  const pathExists = (path) => {
    return fileSystem.hasOwnProperty(path);
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const tab = e.target.getAttribute('data-tab');
    const href = e.target.getAttribute('href');

    if (tab && setActiveTab) {
      setActiveTab(tab);
    } else if (href && href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (href && href.startsWith('mailto:')) {
      window.location.href = href;
    }
  };

  const renderHtmlContent = (content) => {
    return { __html: content };
  };

  const startWelcomeAnimation = () => {
    // Prevent multiple animations from running
    if (isTyping || (intervalRef.current !== null)) {
      return;
    }

    setWelcomeShown(true);
    setIsTyping(true);
    setTypingText('');
    setHistory([]);
    currentIndexRef.current = 0;

    intervalRef.current = setInterval(() => {
      if (currentIndexRef.current < welcomeMessage.length) {
        const newText = welcomeMessage.substring(0, currentIndexRef.current + 1);
        setTypingText(newText);
        currentIndexRef.current++;
      } else {
        if (intervalRef.current) {clearInterval(intervalRef.current);}
        intervalRef.current = null;
        setIsTyping(false);
        setHistory([{ type: 'output', content: welcomeMessage, isHtml: true }]);
      }
    }, 20);
  };

  const typeOutput = (text, isHtml = false, speed = 10) => {
    if (outputIntervalRef.current) {
      clearInterval(outputIntervalRef.current);
    }

    let currentIndex = 0;
    setOutputTypingText('');
    setIsOutputTyping(true);
    setIsOutputTypingHtml(isHtml);

    outputIntervalRef.current = setInterval(() => {
      if (currentIndex < text.length) {
        setOutputTypingText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(outputIntervalRef.current);
        outputIntervalRef.current = null;
        setIsOutputTyping(false);
        setIsOutputTypingHtml(false);
        setHistory((prev) => [...prev, { type: 'output', content: text, isHtml }]);
        setOutputTypingText('');
      }
    }, speed);
  };

  const commands = {
    help: () => `Available commands:
  - help: Show this help message
  - about: Learn about me
  - skills: View my technical skills
  - experience: Check my work experience
  - education: See my educational background
  - contact: Get my contact information (with clickable links)
  - clear: Clear the console
  - welcome: Display the welcome message again
  - ls: List available projects
  - whoami: Find out who I am
  - date: Show the current date and time
  - echo [text]: Print back the provided text
  - ascii [text]: Convert text to ASCII art
  - matrix: Enter the matrix...
  - ip: Show your current IP address
  - hack: Simulate a hacking sequence


💡 Tip: Click on the [PROFILE] and [PROJECTS] links in the welcome message to navigate between sections!`,

    about: () => `Hi! I'm Daniel Darritchon, a passionate developer who loves creating amazing digital experiences.
I specialize in modern web technologies and enjoy building things that make a difference.`,

    skills: () => `Technical Skills:
  • Frontend: React, Vue.js, TypeScript, JavaScript, HTML5, CSS3, SASS
  • Backend: Node.js, Python, Express, Django, REST APIs
  • Database: MongoDB, PostgreSQL, MySQL
  • DevOps: Docker, AWS, CI/CD, Git
  • Tools: VS Code, Figma, Postman, Jira`,

    experience: () => `Work Experience:
  • Senior Frontend Developer (2022-Present)
    - Building scalable React applications
    - Leading frontend architecture decisions
  • Full Stack Developer (2020-2022)
    - Developed full-stack web applications
    - Collaborated with cross-functional teams
  • Junior Developer (2018-2020)
    - Started my journey in web development`,

    education: () => `Education:
  • Bachelor's in Computer Science
  • Various online courses and certifications
  • Always learning and growing!`,

    contact: () => `Contact Information:
  • Email: <a href="mailto:dedarritchon@uc.cl">dedarritchon@uc.cl</a>
  • LinkedIn: <a href="https://www.linkedin.com/in/dedarritchon/" target="_blank">linkedin.com/in/dedarritchon</a>
  • GitHub: <a href="https://github.com/dedarritchon" target="_blank">github.com/dedarritchon</a>
  • Portfolio: <a href="https://dedarritchon.github.io" target="_blank">dedarritchon.github.io</a>`,

    clear: () => {
      setHistory([]);
      return null;
    },

    welcome: () => {
      setWelcomeShown(false); // Reset the flag
      // The effect will pick this up and restart the animation
      return null;
    },

    ls: () => `Projects:
  📁 portfolio-website/     - This website
  📁 react-app/            - React application
  📁 node-api/             - REST API backend
  📁 python-script/        - Data processing script
  📁 docker-project/       - Containerized application`,

    whoami: () => `daniel.darritchon`,

    date: () => new Date().toString(),

    echo: (args) => args.join(' '),

    matrix: () => `Welcome to the Matrix...
  You have taken the red pill.
  The rabbit hole goes deeper than you think.
  
  Wake up, Neo...`,

    ip: async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return `Your current IP address: ${data.ip}`;
      } catch (error) {
        return 'Unable to fetch IP address. Please check your internet connection.';
      }
    },

    hack: () => {
      if (isHacking) {
        return 'Hack already in progress...';
      }

      setIsHacking(true);
      setHackProgress(0);
      setHackStep(0);
      setHackCompleted(false);

      const hackCommands = [
        'sudo nmap -sS -p- 192.168.1.1',
        'hydra -l admin -P wordlist.txt ssh://target.com',
        'sqlmap -u "http://target.com/login" --dbs',
        'john --wordlist=rockyou.txt hash.txt',
        'metasploit-framework -q -x "use exploit/multi/handler"',
        'wireshark -i eth0 -k',
        'aircrack-ng -w wordlist.txt capture.cap',
        'hashcat -m 0 -a 0 hash.txt wordlist.txt'
      ];

      const hackSteps = [
        'Initializing hack sequence...',
        'Scanning network vulnerabilities...',
        'Attempting brute force attack...',
        'SQL injection in progress...',
        'Cracking password hashes...',
        'Exploiting system vulnerabilities...',
        'Intercepting network traffic...',
        'Bypassing wireless security...',
        'Finalizing attack...',
        'Hack completed successfully!'
      ];

      let currentStep = 0;
      let currentCommand = 0;
      let commandChar = 0;
      let hackOutput = 'Starting hack sequence...\n';

      const updateHackOutput = (newContent) => {
        hackOutput += newContent + '\n';
        setHistory((prev) => {
          const newHistory = [...prev];
          // Find the last hack output entry or create a new one
          const lastIndex = newHistory.length - 1;
          if (lastIndex >= 0 && newHistory[lastIndex].type === 'hack-output') {
            newHistory[lastIndex] = { type: 'hack-output', content: hackOutput };
          } else {
            newHistory.push({ type: 'hack-output', content: hackOutput });
          }
          return newHistory;
        });
      };

      const progressInterval = setInterval(() => {
        setHackProgress((prev) => {
          if (prev >= 100 && !hackCompleted) {
            setHackCompleted(true);
            clearInterval(progressInterval);
            clearInterval(stepInterval);
            clearInterval(commandInterval);
            setTimeout(() => {
              alert('🎉 CONGRATULATIONS! You have successfully hacked the site! 🎉');
              setIsHacking(false);
            }, 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      const stepInterval = setInterval(() => {
        if (currentStep < hackSteps.length) {
          updateHackOutput(hackSteps[currentStep]);
          currentStep++;
          setHackStep(currentStep);
        } else {
          clearInterval(stepInterval);
        }
      }, 800);

      const commandInterval = setInterval(() => {
        if (currentCommand < hackCommands.length) {
          const command = hackCommands[currentCommand];
          if (commandChar < command.length) {
            const typedCommand = command.substring(0, commandChar + 1);
            updateHackOutput(`$ ${typedCommand}`);
            commandChar++;
          } else {
            // Command fully typed, show execution
            setTimeout(() => {
              updateHackOutput(`[+] Command executed successfully`);
              updateHackOutput(`[+] Access granted to system ${currentCommand + 1}`);
            }, 200);

            currentCommand++;
            commandChar = 0;
          }
        } else {
          clearInterval(commandInterval);
          setTimeout(() => {
            updateHackOutput('');
            updateHackOutput('=== SYSTEM COMPROMISED ===');
            updateHackOutput('• User data: EXTRACTED');
            updateHackOutput('• Security logs: DELETED');
            updateHackOutput('• Backdoor: INSTALLED');
            updateHackOutput('• Access granted: ROOT');
            updateHackOutput('');
            updateHackOutput('Welcome to the system, hacker.');
            setIsHacking(false);
          }, 1000);
        }
      }, 100);

      return null;
    },

    pwd: () => currentPath,

    cd: (args) => {
      if (args.length === 0) {
        setCurrentPath('/Users/daniel');
        return 'Changed to home directory';
      }

      const targetPath = args[0];
      const newPath = resolvePath(targetPath);

      if (pathExists(newPath)) {
        const target = fileSystem[newPath];
        if (target.type === 'directory') {
          setCurrentPath(newPath);
        } else {
          return `Error: ${newPath} is not a directory`;
        }
      } else {
        return `Error: Directory ${newPath} does not exist`;
      }
    },

    ls: (args) => {
      let targetPath = currentPath;

      if (args.length > 0) {
        targetPath = resolvePath(args[0]);
      }

      if (!pathExists(targetPath)) {
        return `Error: Directory ${targetPath} does not exist`;
      }

      const directory = fileSystem[targetPath];
      if (directory.type !== 'directory') {
        return `Error: ${targetPath} is not a directory`;
      }

      const contents = directory.contents;
      const items = Object.keys(contents).sort();

      if (items.length === 0) {
        return 'Directory is empty';
      }

      // Calculate columns based on terminal width (simulate ~80 chars)
      const terminalWidth = 80;
      const maxItemLength = Math.max(...items.map((item) => item.length)) + 2;
      const columns = Math.max(1, Math.floor(terminalWidth / maxItemLength));
      const rows = Math.ceil(items.length / columns);

      let output = '';
      for (let row = 0; row < rows; row++) {
        const rowItems = [];
        for (let col = 0; col < columns; col++) {
          const index = row + col * rows;
          if (index < items.length) {
            const item = items[index];
            const itemData = contents[item];
            const icon = itemData.type === 'directory' ? '📁' : '📄';
            const color = itemData.type === 'directory' ? '#00ff00' : '#ffffff';
            const paddedItem = `${icon} <span style="color: ${color}">${item}</span>`.padEnd(maxItemLength);
            rowItems.push(paddedItem);
          }
        }
        output += rowItems.join('') + '\n';
      }

      return { content: output.trim(), isHtml: true };
    },

    cat: (args) => {
      if (args.length === 0) {
        return 'Usage: cat [filename]';
      }

      const fileName = args[0];
      const filePath = resolvePath(fileName);

      if (!pathExists(filePath)) {
        return `Error: File ${filePath} does not exist`;
      }

      const file = fileSystem[filePath];
      if (file.type !== 'file') {
        return `Error: ${filePath} is not a file`;
      }

      return file.content;
    },

    mkdir: (args) => {
      if (args.length === 0) {
        return 'Usage: mkdir [directory_name]';
      }

      const dirName = args[0];
      const newPath = currentPath === '/' ? `/${dirName}` : `${currentPath}/${dirName}`;

      if (pathExists(newPath)) {
        return `Error: Directory ${newPath} already exists`;
      }

      fileSystem[newPath] = { type: 'directory', contents: {} };
      return `Created directory ${newPath}`;
    },

    touch: (args) => {
      if (args.length === 0) {
        return 'Usage: touch [filename]';
      }

      const fileName = args[0];
      const newPath = currentPath === '/' ? `/${fileName}` : `${currentPath}/${fileName}`;

      if (pathExists(newPath)) {
        return `Error: File ${newPath} already exists`;
      }

      fileSystem[newPath] = { type: 'file', content: '' };
      return `Created file ${newPath}`;
    },

    rm: (args) => {
      if (args.length === 0) {
        return 'Usage: rm [filename_or_directory]';
      }

      const itemName = args[0];
      const itemPath = currentPath === '/' ? `/${itemName}` : `${currentPath}/${itemName}`;

      if (!pathExists(itemPath)) {
        return `Error: ${itemPath} does not exist`;
      }

      delete fileSystem[itemPath];
      return `Removed ${itemPath}`;
    },

    find: (args) => {
      if (args.length === 0) {
        return 'Usage: find [search_term]';
      }

      const searchTerm = args[0].toLowerCase();
      const results = [];

      const searchInDirectory = (path, depth = 0) => {
        if (depth > 10) {
          return; // Prevent infinite recursion
        }

        const directory = fileSystem[path];
        if (!directory || directory.type !== 'directory') {
          return;
        }

        Object.keys(directory.contents).forEach((item) => {
          const itemPath = path === '/' ? `/${item}` : `${path}/${item}`;
          const itemData = directory.contents[item];

          if (item.toLowerCase().includes(searchTerm)) {
            const icon = itemData.type === 'directory' ? '📁' : '📄';
            results.push(`${icon} ${itemPath}`);
          }

          if (itemData.type === 'directory') {
            searchInDirectory(itemPath, depth + 1);
          }
        });
      };

      searchInDirectory('/Users/daniel');

      if (results.length === 0) {
        return `No files or directories found matching "${searchTerm}"`;
      }

      return `Found ${results.length} result(s):\n${results.join('\n')}`;
    },
  };

  const executeCommand = async (input) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) {return null;}

    const [command, ...args] = trimmedInput.split(' ');
    const cmd = command.toLowerCase();

    if (commands[cmd]) {
      const result = commands[cmd](args);
      return result;
    } else {
      return `Command not found: ${command}. Type 'help' for available commands.`;
    }
  };

  const isHtmlContent = (text) => {
    return text && text.includes('<a href=');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isHacking) { return; }

    // Always add the input to history, even if empty
    setHistory((prev) => [...prev, { type: 'input', content: currentInput, path: currentPath }]);

    // Only add to command history and execute if input is not empty
    if (currentInput.trim()) {
      setCommandHistory((prev) => [...prev, currentInput]);

      const result = await executeCommand(currentInput);

      if (result) {
        let isHtml = false;
        let content = result;

        // Handle the new return format from ls command
        if (typeof result === 'object' && result.isHtml) {
          content = result.content;
          isHtml = true;
        } else {
          isHtml = isHtmlContent(result);
        }

        // Check if this is a file system command that should appear instantly
        const fileSystemCommands = ['ls', 'pwd', 'cd', 'cat', 'mkdir', 'touch', 'rm', 'find'];
        const isFileSystemCommand = fileSystemCommands.includes(currentInput);

        if (isFileSystemCommand) {
          // Add directly to history without typing animation
          setHistory((prev) => [...prev, { type: 'output', content, isHtml }]);
        } else {
          // Use typing animation for other commands
          typeOutput(content, isHtml, 15);
        }
      }
    }

    setCurrentInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  useEffect(() => {
    if (active && inputRef.current) {
      inputRef.current.focus();
    }
  }, [active]);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [history]);

  // Welcome message effect with typing animation
  useEffect(() => {
    if (active && !welcomeShown) {
      startWelcomeAnimation();
    }
  }, [active, welcomeShown]);

  // Cleanup effect to clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (outputIntervalRef.current) {
        clearInterval(outputIntervalRef.current);
      }
    };
  }, []);

  if (!active) {return null;}

  return (
    <ConsoleContainer theme={theme} ref={consoleRef}>
      <ConsoleHeader>
        <ConsoleDot color='#ff5f56' />
        <ConsoleDot color='#ffbd2e' />
        <ConsoleDot color='#27ca3f' />
        <span>Terminal — daniel.darritchon</span>
      </ConsoleHeader>

      {isTyping && (
        <div style={{ pointerEvents: 'auto' }}>
          <ConsoleLine
            dangerouslySetInnerHTML={renderHtmlContent(typingText)}
            onClick={handleLinkClick}
          />
          <Cursor>|</Cursor>
        </div>
      )}

      {history.map((entry, index) => (
        <div key={index}>
          {entry.type === 'input' && (
            <InputLine>
              <Prompt>daniel@macbook-pro {entry.path || currentPath} $</Prompt>
              <span>{entry.content}</span>
            </InputLine>
          )}
          {entry.type === 'output' && (
            entry.isHtml ? (
              <ConsoleLine
                dangerouslySetInnerHTML={renderHtmlContent(entry.content)}
                onClick={handleLinkClick}
              />
            ) : (
              <ConsoleLine>{entry.content}</ConsoleLine>
            )
          )}
          {entry.type === 'hack-output' && (
            <ConsoleLine style={{ whiteSpace: 'pre-line' }}>{entry.content}</ConsoleLine>
          )}
        </div>
      ))}

      {isOutputTyping && (
        <div style={{ pointerEvents: 'auto' }}>
          {isOutputTypingHtml ? (
            <ConsoleLine
              dangerouslySetInnerHTML={renderHtmlContent(outputTypingText)}
              onClick={handleLinkClick}
            />
          ) : (
            <ConsoleLine>
              {outputTypingText}
            </ConsoleLine>
          )}
        </div>
      )}
      {isOutputTyping && <Cursor>|</Cursor>}

      {isHacking && (
        <div>
          <ConsoleProgressBar>
            <div>HACKING IN PROGRESS: {Math.round(hackProgress)}%</div>
            <div>[{Array(Math.max(0, Math.floor(hackProgress / 5))).fill('#').join('')}{Array(Math.max(0, 20 - Math.floor(hackProgress / 5))).fill(' ').join('')}]</div>
          </ConsoleProgressBar>
          <ConsoleLine color='#ff6600'>Step {hackStep}/10: Executing attack sequence...</ConsoleLine>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <InputLine>
          <Prompt>daniel@macbook-pro {currentPath} $</Prompt>
          <Input
            ref={inputRef}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' for available commands..."
            autoFocus
            disabled={isHacking}
          />
          <Cursor>|</Cursor>
        </InputLine>
      </form>
    </ConsoleContainer>
  );
};

export default Console;
