import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './../App/AppContext';

const ConsoleContainer = styled.div`
  background: #0a0a0a;
  border: 2px solid ${({ theme }) => theme.primaryTextColor};
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  line-height: 1.4;
  height: 500px;
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
  font-size: 12px;
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
  
  a {
    color: #00ff00;
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.3s ease;
    
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
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  font-family: 'Courier New', monospace;
  font-size: 14px;
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

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #ff0000, #ff6600, #ffff00, #00ff00);
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
  z-index: 1;
`;

const welcomeMessage = `Welcome to Daniel Darritchon's Terminal! 🚀

I'm a passionate developer who loves creating amazing digital experiences.
This is my interactive console where you can explore my skills, experience, and projects.

Available sections:
  📁 <a href="#" data-tab="profile">[PROFILE]</a> - Learn about me and my background
  📁 <a href="#" data-tab="projects">[PROJECTS]</a> - Explore my portfolio and work
  📁 [CONSOLE] - You're here! Interactive terminal experience

Type 'help' to see all available commands, or use the navigation tabs above to explore different sections.

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
  const consoleRef = useRef(null);
  const inputRef = useRef(null);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef(null);
  const outputIntervalRef = useRef(null);

  const handleLinkClick = (e) => {
    e.preventDefault();
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

  const typeOutput = (text, isHtml = false) => {
    if (outputIntervalRef.current) {
      clearInterval(outputIntervalRef.current);
    }

    let currentIndex = 0;
    setOutputTypingText('');
    setIsOutputTyping(true);

    outputIntervalRef.current = setInterval(() => {
      if (currentIndex < text.length) {
        setOutputTypingText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(outputIntervalRef.current);
        outputIntervalRef.current = null;
        setIsOutputTyping(false);
        setHistory((prev) => [...prev, { type: 'output', content: text, isHtml }]);
        setOutputTypingText('');
      }
    }, 15);
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
  - matrix: Enter the matrix...
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

      const addToHistory = (content, type = 'output') => {
        setHistory((prev) => [...prev, { type, content }]);
      };

      // Start the hacking sequence
      addToHistory('Starting hack sequence...', 'output');

      const progressInterval = setInterval(() => {
        setHackProgress((prev) => {
          if (prev >= 100 && !hackCompleted) {
            setHackCompleted(true);
            clearInterval(progressInterval);
            clearInterval(stepInterval);
            clearInterval(commandInterval);
            setTimeout(() => {
              alert('🎉 CONGRATULATIONS! You have successfully hacked the site! 🎉');
              setHistory([]);
              setIsHacking(false);
            }, 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      const stepInterval = setInterval(() => {
        if (currentStep < hackSteps.length) {
          addToHistory(hackSteps[currentStep], 'output');
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
            addToHistory(`$ ${typedCommand}`, 'input');
            commandChar++;
          } else {
            // Command fully typed, show execution
            setTimeout(() => {
              addToHistory(`[+] Command executed successfully`, 'output');
              addToHistory(`[+] Access granted to system ${currentCommand + 1}`, 'output');
            }, 200);

            currentCommand++;
            commandChar = 0;
          }
        } else {
          clearInterval(commandInterval);
          setTimeout(() => {
            addToHistory('', 'output');
            addToHistory('=== SYSTEM COMPROMISED ===', 'output');
            addToHistory('• User data: EXTRACTED', 'output');
            addToHistory('• Security logs: DELETED', 'output');
            addToHistory('• Backdoor: INSTALLED', 'output');
            addToHistory('• Access granted: ROOT', 'output');
            addToHistory('', 'output');
            addToHistory('Welcome to the system, hacker.', 'output');
            setIsHacking(false);
          }, 1000);
        }
      }, 100);

      return null;
    },
  };

  const executeCommand = (input) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentInput.trim() || isOutputTyping || isTyping || isHacking) { return; }

    setHistory((prev) => [...prev, { type: 'input', content: currentInput }]);
    setCommandHistory((prev) => [...prev, currentInput]);

    const result = executeCommand(currentInput);

    if (result) {
      const isHtml = isHtmlContent(result);
      typeOutput(result, isHtml);
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
        <div>
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
              <Prompt>$</Prompt>
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
        </div>
      ))}

      {isOutputTyping && (
        <ConsoleLine>
          {outputTypingText}
          <Cursor>|</Cursor>
        </ConsoleLine>
      )}

      {isHacking && (
        <div>
          <ProgressBar>
            <ProgressFill progress={hackProgress} />
            <ProgressText>HACKING IN PROGRESS: {Math.round(hackProgress)}%</ProgressText>
          </ProgressBar>
          <ConsoleLine color='#ff6600'>Step {hackStep}/10: Executing attack sequence...</ConsoleLine>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <InputLine>
          <Prompt>$</Prompt>
          <Input
            ref={inputRef}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' for available commands..."
            autoFocus
            disabled={isTyping || isOutputTyping || isHacking}
          />
          <Cursor>|</Cursor>
        </InputLine>
      </form>
    </ConsoleContainer>
  );
};

export default Console;
