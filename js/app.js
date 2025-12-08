/**
 * AI Lesson Generator - Frontend JavaScript
 * 
 * Handles form submission, API calls, and UI updates
 */

// Get DOM elements
const lessonForm = document.getElementById('lessonForm');
const generateBtn = document.getElementById('generateBtn');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');
const errorMessage = document.getElementById('errorMessage');
const lessonPlanContainer = document.getElementById('lessonPlanContainer');
const lessonPlan = document.getElementById('lessonPlan');
const copyBtn = document.getElementById('copyBtn');

/**
 * Show error message to user
 */
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  lessonPlanContainer.style.display = 'none';
  
  // Scroll to error
  errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Hide error message
 */
function hideError() {
  errorMessage.style.display = 'none';
}

/**
 * Show loading state
 */
function setLoading(isLoading) {
  if (isLoading) {
    generateBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    generateBtn.textContent = 'Generating...';
  } else {
    generateBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
    generateBtn.innerHTML = '<span class="btn-text">Generate Lesson Plan</span><span class="btn-loader" style="display: none;">⏳</span>';
  }
}

/**
 * Format lesson plan text for display
 */
function formatLessonPlan(text) {
  // Convert markdown-style formatting to HTML
  let formatted = text
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Lists
    .replace(/^\d+\.\s+(.*$)/gim, '<li>$1</li>')
    .replace(/^[-*]\s+(.*$)/gim, '<li>$1</li>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  // Wrap in paragraphs
  formatted = '<p>' + formatted + '</p>';

  // Wrap list items in ul tags
  formatted = formatted.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');

  return formatted;
}

/**
 * Display the generated lesson plan
 */
function displayLessonPlan(lessonPlanData) {
  const formattedPlan = formatLessonPlan(lessonPlanData.lessonPlan);
  lessonPlan.innerHTML = formattedPlan;
  lessonPlanContainer.style.display = 'block';
  hideError();
  
  // Scroll to lesson plan
  lessonPlanContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Copy lesson plan to clipboard
 */
async function copyToClipboard() {
  const text = lessonPlan.innerText || lessonPlan.textContent;
  
  try {
    await navigator.clipboard.writeText(text);
    
    // Show feedback
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✓ Copied!';
    copyBtn.style.backgroundColor = '#28a745';
    
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.backgroundColor = '';
    }, 2000);
  } catch (err) {
    showError('Failed to copy to clipboard. Please select and copy manually.');
  }
}

/**
 * Handle form submission
 */
lessonForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideError();
  setLoading(true);

  // Get form data
  const formData = {
    topic: document.getElementById('topic').value.trim(),
    grade: document.getElementById('grade').value,
    subject: document.getElementById('subject').value.trim(),
    duration: document.getElementById('duration').value,
    learningObjectives: document.getElementById('learningObjectives').value.trim()
  };

  // Validate topic (required)
  if (!formData.topic) {
    showError('Please enter a lesson topic.');
    setLoading(false);
    return;
  }

  try {
    // Determine API endpoint
    // In production, this would be your deployed URL
    // For local development with Vercel, use the local server
    const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? '/api/generate-lesson'
      : '/api/generate-lesson';

    // Make API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle API errors
      const errorMsg = data.error || `Server error: ${response.status}`;
      showError(errorMsg);
      setLoading(false);
      return;
    }

    // Success - display lesson plan
    if (data.success && data.lessonPlan) {
      displayLessonPlan(data);
    } else {
      showError('Received invalid response from server.');
    }

  } catch (error) {
    // Handle network errors
    console.error('Error:', error);
    
    if (error.message.includes('Failed to fetch')) {
      showError('Unable to connect to the server. Please check your internet connection and ensure the server is running.');
    } else {
      showError(`An error occurred: ${error.message}`);
    }
  } finally {
    setLoading(false);
  }
});

// Copy button handler
copyBtn.addEventListener('click', copyToClipboard);

// Allow Enter key in textarea (but submit on form)
document.getElementById('learningObjectives').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    lessonForm.dispatchEvent(new Event('submit'));
  }
});

