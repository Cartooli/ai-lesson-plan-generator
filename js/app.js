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

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true
});

// Request timeout in milliseconds
const FETCH_TIMEOUT_MS = 60000;

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
  generateBtn.disabled = isLoading;
  btnText.style.display = isLoading ? 'none' : 'inline';
  btnLoader.style.display = isLoading ? 'inline' : 'none';
}

/**
 * Display the generated lesson plan
 */
function displayLessonPlan(lessonPlanData) {
  // Convert markdown to HTML with marked, then sanitize with DOMPurify
  const rawHtml = marked.parse(lessonPlanData.lessonPlan);
  const safeHtml = DOMPurify.sanitize(rawHtml);
  lessonPlan.innerHTML = safeHtml;
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

  // Set up request timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch('/api/generate-lesson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
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
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      showError('Request timed out. The server took too long to respond. Please try again.');
    } else if (error.message.includes('Failed to fetch')) {
      showError('Unable to connect to the server. Please check your internet connection and try again.');
    } else {
      showError('Something went wrong while generating your lesson plan. Please try again.');
    }
  } finally {
    setLoading(false);
  }
});

// Copy button handler
copyBtn.addEventListener('click', copyToClipboard);

// Allow Ctrl+Enter in textarea to submit
document.getElementById('learningObjectives').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    lessonForm.dispatchEvent(new Event('submit'));
  }
});
