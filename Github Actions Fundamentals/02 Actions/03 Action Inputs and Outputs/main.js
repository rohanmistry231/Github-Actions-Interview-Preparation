const core = require('@actions/core');

try {
    // Get the input
    const name = core.getInput('name');
    
    // Generate the greeting
    const greeting = `Hello, ${name}!`;
    
    // Set the output
    core.setOutput('greeting', greeting);
    
    console.log(greeting);
} catch (error) {
    core.setFailed(error.message);
}

// Place this file in the same directory as action.yml (e.g., .github/actions/greeting-io/main.js)