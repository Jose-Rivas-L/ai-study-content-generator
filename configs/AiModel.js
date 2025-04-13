const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export const courseOutlineAIModel = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a study material for Pyhon for exam and level of difficulty will be EASY with summary of course, List of chapters along with summary for each chapter, Topic list in each chapter, all result in JSON format"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"course_title\": \"Python Fundamentals for Beginners\",\n  \"difficulty\": \"Easy\",\n  \"course_summary\": \"This course provides a gentle introduction to Python programming. It covers the basic concepts and syntax necessary to write simple Python programs. No prior programming experience is required. The course focuses on practical examples and hands-on exercises to build a solid foundation in Python.\",\n  \"chapters\": [\n    {\n      \"chapter_number\": 1,\n      \"chapter_title\": \"Introduction to Python\",\n      \"chapter_summary\": \"This chapter introduces Python, its history, features, and advantages. It also covers how to set up a Python development environment and run your first program.\",\n      \"topics\": [\n        \"What is Python?\",\n        \"History of Python\",\n        \"Features of Python (easy to learn, versatile, open-source)\",\n        \"Advantages of using Python\",\n        \"Setting up Python Development Environment (Installing Python, choosing an IDE like IDLE or VS Code)\",\n        \"Running your first Python program (Hello, World!)\"\n      ]\n    },\n    {\n      \"chapter_number\": 2,\n      \"chapter_title\": \"Basic Data Types and Operators\",\n      \"chapter_summary\": \"This chapter covers the fundamental data types in Python (integers, floats, strings, booleans) and how to perform basic arithmetic and string operations.\",\n      \"topics\": [\n        \"Data Types (Integers, Floats, Strings, Booleans)\",\n        \"Variables (Assigning values, variable names)\",\n        \"Arithmetic Operators (+, -, *, /, %, **)\",\n        \"String Operations (Concatenation, slicing)\",\n        \"Type Conversion (int(), float(), str())\",\n        \"Comments in Python (Single-line and multi-line)\"\n      ]\n    },\n    {\n      \"chapter_number\": 3,\n      \"chapter_title\": \"Control Flow: Conditional Statements\",\n      \"chapter_summary\": \"This chapter introduces conditional statements (if, elif, else) to control the flow of execution in your program based on certain conditions.\",\n      \"topics\": [\n        \"Boolean Expressions (True, False)\",\n        \"Comparison Operators (==, !=, >, <, >=, <=)\",\n        \"Logical Operators (and, or, not)\",\n        \"If statement\",\n        \"If-else statement\",\n        \"If-elif-else statement\",\n        \"Nested if statements\"\n      ]\n    },\n    {\n      \"chapter_number\": 4,\n      \"chapter_title\": \"Control Flow: Loops\",\n      \"chapter_summary\": \"This chapter covers loops (for and while) to repeat a block of code multiple times.\",\n      \"topics\": [\n        \"For loop (Iterating over a sequence)\",\n        \"While loop (Executing code while a condition is true)\",\n        \"Break statement (Exiting a loop)\",\n        \"Continue statement (Skipping to the next iteration)\",\n        \"Range function (Generating a sequence of numbers)\",\n        \"Nested loops\"\n      ]\n    },\n    {\n      \"chapter_number\": 5,\n      \"chapter_title\": \"Data Structures: Lists\",\n      \"chapter_summary\": \"This chapter introduces lists, a versatile data structure for storing collections of items.  It covers creating, accessing, modifying, and manipulating lists.\",\n      \"topics\": [\n        \"What are Lists?\",\n        \"Creating Lists\",\n        \"Accessing List Elements (Indexing)\",\n        \"List Slicing\",\n        \"Modifying Lists (Adding, removing, changing elements)\",\n        \"List Methods (append(), insert(), remove(), pop(), len(), sort())\",\n        \"Iterating through a list using a for loop\"\n      ]\n    },\n    {\n      \"chapter_number\": 6,\n      \"chapter_title\": \"Functions\",\n      \"chapter_summary\": \"This chapter introduces functions, reusable blocks of code that perform specific tasks. It covers defining, calling, and passing arguments to functions.\",\n      \"topics\": [\n        \"What are Functions?\",\n        \"Defining Functions (def keyword)\",\n        \"Calling Functions\",\n        \"Function Arguments (Positional arguments)\",\n        \"Return Values\",\n        \"Docstrings (Documenting your functions)\",\n        \"Scope of Variables (Local vs. Global)\"\n      ]\n    }\n  ]\n}\n```"},
        ],
      },
    ],
  });

  export const generateNotesAiModel =  model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate exam material detail content for each chapter. Make sure to include all topic point in the content, make sure to give content in HTML(do not add HTMLKL, Head, Body, title tag), The chapters:\n{\n      \"chapter_number\": 1,\n      \"chapter_title\": \"Getting Started with Python\",\n      \"chapter_summary\": \"This chapter introduces Python and its features, explains how to set up a Python development environment, and demonstrates running your first Python program.\",\n      \"topics\": [\n        \"What is Python?\",\n        \"Why Python?\",\n        \"Installing Python\",\n        \"Setting up a Development Environment (e.g., IDLE, VS Code, Jupyter Notebook)\",\n        \"Running Your First Program (Hello, World!)\",\n        \"Basic Syntax and Structure\"\n      ]\n    }"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Here's my thinking process for generating the HTML exam material for Chapter 1:\n\n1.  **Understand the Goal:** The user wants HTML content suitable for exam preparation, covering *all* specified topics within Chapter 1 of a Python course. The output should be *only* the HTML content, excluding the `<html>`, `<head>`, `<body>`, and `<title>` tags.\n\n2.  **Input Analysis:**\n    *   **Chapter:** 1\n    *   **Title:** \"Getting Started with Python\"\n    *   **Summary:** Introduces Python, its features, environment setup, and first program execution. (This summary gives context but isn't a specific topic to cover in detail for the exam material itself, though the *concepts* within it are).\n    *   **Topics:** This is the crucial list. I need to create detailed content for *each* of these:\n        *   \"What is Python?\"\n        *   \"Why Python?\"\n        *   \"Installing Python\"\n        *   \"Setting up a Development Environment (e.g., IDLE, VS Code, Jupyter Notebook)\"\n        *   \"Running Your First Program (Hello, World!)\"\n        *   \"Basic Syntax and Structure\"\n\n3.  **Content Generation Strategy (Topic by Topic):**\n\n    *   **\"What is Python?\"**\n        *   **Key Concepts:** High-level, interpreted, interactive, object-oriented, dynamic typing, general-purpose, created by Guido van Rossum.\n        *   **Exam Focus:** Definition, key characteristics.\n        *   **HTML Structure:** Use a heading (`<h3>`), maybe a paragraph (`<p>`) for definition, and a list (`<ul>`/`<li>`) for key characteristics.\n\n    *   **\"Why Python?\"**\n        *   **Key Concepts:** Readability, large standard library, extensive ecosystem (third-party packages), cross-platform, large community, versatility (web dev, data science, scripting, AI/ML, etc.), beginner-friendly.\n        *   **Exam Focus:** Advantages, reasons for its popularity, common use cases.\n        *   **HTML Structure:** Heading (`<h3>`), paragraph (`<p>`) for introduction, list (`<ul>`/`<li>`) for benefits/reasons. Mention key application areas.\n\n    *   **\"Installing Python\"**\n        *   **Key Concepts:** Official website (python.org), downloading the installer (Windows, macOS, Linux), adding Python to PATH (important!), verifying installation (`python --version` or `python3 --version`). Package managers (apt, yum, brew) for Linux/macOS. Anaconda distribution as an alternative (includes Python + packages).\n        *   **Exam Focus:** Where to get Python, importance of PATH, how to check installation. Awareness of different methods/distributions.\n        *   **HTML Structure:** Heading (`<h3>`), paragraph (`<p>`) about the source, list (`<ul>`/`<li>`) covering steps/methods, maybe a code block (`<code>`) for the verification command. Emphasize PATH.\n\n    *   **\"Setting up a Development Environment\"**\n        *   **Key Concepts:** What is an IDE/Code Editor? Purpose (writing, running, debugging code).\n        *   **Examples:**\n            *   **IDLE:** Bundled with Python, simple, good for beginners.\n            *   **VS Code:** Popular, feature-rich, extensions, integrated terminal, debugger.\n            *   **Jupyter Notebook:** Web-based, interactive, good for data science/exploration, cell-based execution.\n            *   (Could also mention PyCharm, Sublime Text, etc., but stick to the user's examples).\n        *   **Exam Focus:** Understanding the *purpose* of a development environment, recognizing common options and their general characteristics/use cases.\n        *   **HTML Structure:** Heading (`<h3>`), paragraph (`<p>`) explaining the concept, sub-headings (`<h4>`) or list items (`<li>`) for each example (IDLE, VS Code, Jupyter) with brief descriptions.\n\n    *   **\"Running Your First Program (Hello, World!)\"**\n        *   **Key Concepts:** The `print()` function. String literals (using quotes). Executing a `.py` file from the terminal (`python your_script.py` or `python3 your_script.py`). Running code interactively (Python interpreter/IDLE shell).\n        *   **Exam Focus:** The `print()` function syntax, how to execute a simple script, the concept of output.\n        *   **HTML Structure:** Heading (`<h3>`), paragraph (`<p>`) explaining the tradition, code block (`<pre><code>`) for the `print(\"Hello, World!\")` code, explanation of the `print()` function, instructions on how to run (interactive vs. script file).\n\n    *   **\"Basic Syntax and Structure\"**\n        *   **Key Concepts:**\n            *   **Statements:** Instructions executed by the interpreter. Typically one per line.\n            *   **Indentation:** Crucial! Defines code blocks (loops, functions, classes, conditionals). Uses spaces (typically 4) not tabs (conventionally).\n            *   **Comments:** Ignored by the interpreter. Single-line (`#`), multi-line (docstrings `\"\"\"Docstring\"\"\"` or multiple `#`). Purpose: explanation, disabling code.\n            *   **Variables:** Naming conventions (snake_case), assignment (`=`). (Maybe just a brief mention here, as variables will be covered later).\n            *   **Case Sensitivity:** Python distinguishes between uppercase and lowercase.\n            *   **Keywords:** Reserved words with special meaning (e.g., `if`, `else`, `for`, `while`, `def`, `class`). Cannot be used as variable names.\n        *   **Exam Focus:** Importance of indentation, how to write comments, case sensitivity, definition of keywords, basic statement structure.\n        *   **HTML Structure:** Heading (`<h3>`), paragraphs (`<p>`) and lists (`<ul>`/`<li>`) explaining each concept (Indentation, Comments, Case Sensitivity, Keywords, Statements). Use `<code>` for inline code examples (like variable names or keywords) and `<pre><code>` for multi-line code examples (like indentation).\n\n4.  **HTML Formatting and Structure:**\n    *   Use semantic HTML where appropriate (headings `<h2>`, `<h3>`, `<h4>`, paragraphs `<p>`, lists `<ul>`/`<li>`, code formatting `<code>`, `<pre>`).\n    *   Start with a main heading for the chapter (`<h2>`).\n    *   Use sub-headings (`<h3>`) for each topic.\n    *   Use bold (`<strong>`) or italics (`<em>`) for emphasis on key terms (like PATH, indentation, `print()`).\n    *   Ensure clean indentation within the HTML for readability (though not strictly required by the browser).\n    *   Crucially, *omit* `<html>`, `<head>`, `<body>`, `<title>`.\n\n5.  **Review and Refine:** Read through the generated HTML content.\n    *   Does it cover *all* the specified topics? Yes.\n    *   Is the information accurate and relevant for an introductory exam? Yes.\n    *   Is the HTML structure logical and readable? Yes.\n    *   Are key concepts highlighted? Yes.\n    *   Are there any missing tags or syntax errors in the HTML? Check closing tags, code block formatting.\n    *   Does it adhere to the \"no `html`, `head`, `body`, `title` tags\" constraint? Yes.\n\nThis systematic approach ensures all requirements are met, the content is relevant and accurate, and the output format is correct."},
          {text: "```html\n<h2>Chapter 1: Getting Started with Python - Exam Material</h2>\n\n<hr>\n\n<h3>1. What is Python?</h3>\n<div>\n  <p><strong>Definition:</strong> Python is a <strong>high-level</strong>, <strong>interpreted</strong>, <strong>interactive</strong>, and <strong>object-oriented</strong> scripting language. It is designed to be highly readable, using English keywords frequently where other languages use punctuation, and it has fewer syntactical constructions than other languages.</p>\n  <p><strong>Key Characteristics:</strong></p>\n  <ul>\n    <li><strong>High-Level:</strong> Abstracts away complex hardware details, allowing focus on problem-solving.</li>\n    <li><strong>Interpreted:</strong> Code is executed line by line by an interpreter, simplifying debugging and portability (no separate compilation step needed for typical use).</li>\n    <li><strong>Interactive:</strong> You can directly interact with the interpreter to execute commands one by one (e.g., via the Python shell or IDLE).</li>\n    <li><strong>Object-Oriented:</strong> Supports object-oriented programming principles (encapsulation, inheritance, polymorphism).</li>\n    <li><strong>Dynamically Typed:</strong> Variable types are inferred at runtime, not explicitly declared beforehand.</li>\n    <li><strong>General-Purpose:</strong> Can be used for a wide variety of applications.</li>\n    <li><strong>Created By:</strong> Guido van Rossum, first released in 1991.</li>\n  </ul>\n  <p><em>Exam Focus: Be able to define Python and list/explain its core characteristics (interpreted, high-level, dynamic typing, etc.).</em></p>\n</div>\n\n<hr>\n\n<h3>2. Why Python?</h3>\n<div>\n  <p>Python's popularity stems from several advantages:</p>\n  <ul>\n    <li><strong>Readability & Simplicity:</strong> Clean syntax resembles plain English, making it easier to learn, read, and maintain code.</li>\n    <li><strong>Large Standard Library:</strong> Offers built-in modules for many common tasks (e.g., working with strings, files, networking, web services).</li>\n    <li><strong>Extensive Ecosystem:</strong> Huge collection of third-party libraries and frameworks (e.g., NumPy, Pandas for data science; Django, Flask for web development; TensorFlow, PyTorch for AI/ML).</li>\n    <li><strong>Cross-Platform:</strong> Python code runs on various operating systems (Windows, macOS, Linux) without modification (usually).</li>\n    <li><strong>Large & Active Community:</strong> Abundant resources, tutorials, forums, and support available online.</li>\n    <li><strong>Versatility:</strong> Suitable for diverse domains like web development, data science, machine learning, artificial intelligence, scripting, automation, scientific computing, game development, and more.</li>\n    <li><strong>Beginner-Friendly:</strong> Often recommended as a first programming language due to its gentle learning curve.</li>\n    <li><strong>Productivity:</strong> Less code is often required compared to other languages like Java or C++, leading to faster development.</li>\n  </ul>\n  <p><em>Exam Focus: Understand the key reasons for Python's popularity and its main application areas. Be able to list several advantages.</em></p>\n</div>\n\n<hr>\n\n<h3>3. Installing Python</h3>\n<div>\n  <p><strong>Primary Source:</strong> The official Python website: <code>python.org</code>.</p>\n  <p><strong>Installation Steps (General):</strong></p>\n  <ul>\n    <li>Go to <code>python.org/downloads/</code>.</li>\n    <li>Download the appropriate installer for your operating system (Windows, macOS, Linux).</li>\n    <li>Run the installer.\n      <ul>\n        <li><strong>Crucial Step (Windows):</strong> Ensure you check the box that says \"<strong>Add Python X.Y to PATH</strong>\" during installation. This allows you to run Python from the command line/terminal easily.</li>\n        <li><strong>macOS:</strong> Python 2 might be pre-installed, but you should install Python 3. The installer usually handles PATH setup. Homebrew (`brew install python3`) is another common method.</li>\n        <li><strong>Linux:</strong> Python 3 is often pre-installed. You can usually install/update it using the system's package manager (e.g., <code>sudo apt update && sudo apt install python3</code> on Debian/Ubuntu, <code>sudo yum install python3</code> on Fedora/CentOS).</li>\n      </ul>\n    </li>\n    <li><strong>Verification:</strong> Open a terminal or command prompt and type <code>python --version</code> or <code>python3 --version</code>. It should display the installed Python version. You can also type <code>python</code> or <code>python3</code> to start the interactive interpreter.</li>\n  </ul>\n  <p><strong>Alternative: Anaconda Distribution:</strong> Popular especially for data science. It includes Python, many scientific packages (NumPy, Pandas, etc.), and the Conda package/environment manager.</p>\n  <p><em>Exam Focus: Know the official source for Python, the importance of adding Python to PATH (especially on Windows), and how to verify the installation using the command line. Be aware of Anaconda as an alternative distribution.</em></p>\n</div>\n\n<hr>\n\n<h3>4. Setting up a Development Environment</h3>\n<div>\n  <p>A development environment is where you write, run, and debug your Python code. Common options include:</p>\n  <ul>\n    <li>\n      <strong>IDLE (Integrated Development and Learning Environment):</strong>\n      <ul>\n        <li>Bundled with the standard Python installation.</li>\n        <li>Simple, lightweight, and beginner-friendly.</li>\n        <li>Includes an interactive shell (REPL - Read-Eval-Print Loop) and a basic text editor with syntax highlighting.</li>\n        <li>Good for learning and small scripts.</li>\n      </ul>\n    </li>\n    <li>\n      <strong>Text Editors with Python Support (e.g., VS Code, Sublime Text, Atom):</strong>\n      <ul>\n        <li><strong>Visual Studio Code (VS Code):</strong> Very popular, free, feature-rich code editor from Microsoft. Highly extensible with extensions for Python (syntax highlighting, IntelliSense/autocompletion, debugging, linting, integrated terminal).</li>\n        <li>General-purpose editors that can be configured for Python development through plugins/extensions.</li>\n        <li>Offer more features than IDLE (e.g., better code navigation, project management, Git integration).</li>\n      </ul>\n    </li>\n    <li>\n      <strong>Integrated Development Environments (IDEs) (e.g., PyCharm):</strong>\n      <ul>\n        <li>Specialized software providing comprehensive facilities for software development.</li>\n        <li><strong>PyCharm:</strong> A powerful IDE specifically for Python (Community edition is free, Professional edition is paid). Offers advanced features like in-depth debugging, code analysis, refactoring tools, database integration, web framework support.</li>\n        <li>Can be more resource-intensive than text editors.</li>\n      </ul>\n    </li>\n    <li>\n      <strong>Jupyter Notebook / JupyterLab:</strong>\n      <ul>\n        <li>Web-based interactive environment.</li>\n        <li>Organizes code, text, equations, and visualizations into \"cells\".</li>\n        <li>Allows executing code in small chunks and seeing immediate output.</li>\n        <li>Very popular in data science, scientific computing, and educational settings for exploration and presentation.</li>\n        <li>Often included with the Anaconda distribution.</li>\n      </ul>\n    </li>\n  </ul>\n  <p><em>Exam Focus: Understand the purpose of a development environment. Recognize the names and basic characteristics/use cases of common tools like IDLE, VS Code, and Jupyter Notebook.</em></p>\n</div>\n\n<hr>\n\n<h3>5. Running Your First Program (Hello, World!)</h3>\n<div>\n  <p>The traditional first program displays the text \"Hello, World!\". In Python, this is done using the built-in <code>print()</code> function.</p>\n  <p><strong>The Code:</strong></p>\n  <pre><code class=\"language-python\">\nprint(\"Hello, World!\")\n  </code></pre>\n  <p><strong>Explanation:</strong></p>\n  <ul>\n    <li><code>print()</code>: A built-in Python function that outputs data to the standard output (usually the console/terminal).</li>\n    <li><code>\"Hello, World!\"</code>: A <strong>string literal</strong> – a sequence of characters enclosed in quotes (single <code>'</code> or double <code>\"</code> quotes work). This is the data passed as an argument to the <code>print</code> function.</li>\n  </ul>\n  <p><strong>Ways to Run the Code:</strong></p>\n  <ol>\n    <li>\n      <strong>Interactive Mode (Python Interpreter/Shell):</strong>\n      <ul>\n        <li>Open your terminal or command prompt.</li>\n        <li>Type <code>python</code> or <code>python3</code> and press Enter.</li>\n        <li>You'll see the Python prompt (<code>&gt;&gt;&gt;</code>).</li>\n        <li>Type <code>print(\"Hello, World!\")</code> and press Enter.</li>\n        <li>The output \"Hello, World!\" will appear immediately below.</li>\n        <li>(IDLE's shell works similarly).</li>\n      </ul>\n    </li>\n    <li>\n      <strong>Script Mode (Saving to a File):</strong>\n      <ul>\n        <li>Open a text editor (like IDLE's editor, VS Code, Notepad).</li>\n        <li>Type the code: <code>print(\"Hello, World!\")</code></li>\n        <li>Save the file with a <code>.py</code> extension (e.g., <code>hello.py</code>).</li>\n        <li>Open your terminal or command prompt.</li>\n        <li>Navigate (using commands like <code>cd</code>) to the directory where you saved the file.</li>\n        <li>Run the script by typing: <code>python hello.py</code> or <code>python3 hello.py</code> and press Enter.</li>\n        <li>The output \"Hello, World!\" will appear in the terminal.</li>\n      </ul>\n    </li>\n  </ol>\n  <p><em>Exam Focus: Know the syntax for the basic `print()` function to output a string. Understand the difference between running code interactively versus running it from a saved `.py` script file. Recognize `\"Hello, World!\"` as a string literal.</em></p>\n</div>\n\n<hr>\n\n<h3>6. Basic Syntax and Structure</h3>\n<div>\n  <p>Understanding Python's fundamental syntax rules is essential.</p>\n  <ul>\n    <li>\n      <strong>Statements:</strong> A statement is an instruction that the Python interpreter can execute (e.g., <code>print(\"Hello\")</code>, <code>x = 5</code>). Usually, each statement is on its own line.\n    </li>\n    <li>\n      <strong>Indentation:</strong>\n      <ul>\n        <li>Unlike many languages that use braces <code>{}</code>, Python uses <strong>whitespace indentation</strong> (spaces or tabs) to define code blocks (e.g., code inside loops, functions, classes, if-statements).</li>\n        <li>The standard convention is to use <strong>4 spaces</strong> per indentation level. Mixing tabs and spaces is discouraged and can cause errors.</li>\n        <li><strong>Consistency is crucial.</strong> Incorrect indentation will lead to <code>IndentationError</code>.</li>\n        <li>Example:\n          <pre><code class=\"language-python\">\nif True:\n    print(\"This is inside the if block\") # Indented\nprint(\"This is outside the if block\")    # Not indented\n          </code></pre>\n        </li>\n      </ul>\n    </li>\n    <li>\n      <strong>Comments:</strong>\n      <ul>\n        <li>Used to explain code or prevent execution of certain lines. Ignored by the interpreter.</li>\n        <li><strong>Single-line comments:</strong> Start with a hash symbol (<code>#</code>). Everything from the <code>#</code> to the end of the line is ignored.\n          <pre><code class=\"language-python\"># This is a single-line comment\nx = 10 # This comment explains the variable assignment</code></pre>\n        </li>\n        <li><strong>Multi-line comments (Docstrings):</strong> While not technically comments, triple-quoted strings (<code>\"\"\"Docstring\"\"\"</code> or <code>'''Docstring'''</code>) are often used for multi-line explanations, especially at the beginning of functions, modules, or classes. They are accessible at runtime.\n          <pre><code class=\"language-python\">\n\"\"\"\nThis is a multi-line\ndocstring often used for documentation.\n\"\"\"\ndef my_function():\n    '''This docstring explains the function.'''\n    pass # pass is a null statement\n          </code></pre>\n        </li>\n      </ul>\n    </li>\n    <li>\n      <strong>Case Sensitivity:</strong> Python is case-sensitive. <code>myVariable</code>, <code>myvariable</code>, and <code>MYVARIABLE</code> are treated as three different identifiers (e.g., variable names).\n    </li>\n    <li>\n      <strong>Keywords:</strong> Reserved words that have special meaning in Python (e.g., <code>if</code>, <code>else</code>, <code>elif</code>, <code>for</code>, <code>while</code>, <code>def</code>, <code>class</code>, <code>import</code>, <code>return</code>, <code>True</code>, <code>False</code>, <code>None</code>). You cannot use keywords as variable names, function names, or other identifiers.\n    </li>\n    <li>\n      <strong>Identifiers (Names):</strong> Names given to variables, functions, classes, etc. Must start with a letter (a-z, A-Z) or an underscore (<code>_</code>), followed by letters, underscores, or digits (0-9). The convention for variable and function names is <code>snake_case</code> (e.g., <code>my_variable</code>, <code>calculate_sum</code>).\n    </li>\n  </ul>\n  <p><em>Exam Focus: Understand the critical role of indentation in defining code blocks. Know how to write single-line comments (`#`). Recognize that Python is case-sensitive. Understand what keywords are and that they cannot be used as identifiers. Know the basic rules for naming identifiers.</em></p>\n</div>\n```"},
        ],
      },
    ],
  });


//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());