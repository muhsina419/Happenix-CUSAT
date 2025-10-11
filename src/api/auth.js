// This is a mock API file. In a real application, these functions would
// make network requests to your backend server (e.g., using fetch or axios).

/**
 * Simulates a network request delay.
 * @param {number} ms - The number of milliseconds to wait.
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// We create an object to hold all our authentication-related API functions.
const authAPI = {
  /**
   * Simulates a user login.
   * @param {object} credentials - The user's credentials ({ email, password }).
   * @returns {Promise<object>} - A promise that resolves to a success or error object.
   */
  login: async ({ email, password }) => {
    console.log(`Attempting to log in with ${email}...`);
    await sleep(1000); // Simulate 1 second network delay

    // In a real API, you would check if the email and password are valid.
    if (password === 'fail') {
        return { success: false, error: 'Invalid password. Please try again.' };
    }
    
    // On success, return a success flag and maybe some user data/token.
    return { success: true, data: { token: 'mock-auth-token-12345' } };
  },

  /**
   * Simulates a user registration.
   * @param {object} formData - The user's registration data.
   * @returns {Promise<object>} - A promise that resolves to a success or error object.
   */
  register: async (formData) => {
    console.log('Attempting to register new user:', formData.fullname);
    await sleep(1500); // Simulate 1.5 second network delay

    // You could add mock validation here if needed.
    if (formData.email.includes('fail')) {
        return { success: false, error: 'This email is already taken.' };
    }

    return { success: true, data: { message: 'Registration successful! Please sign in.' } };
  },

  // You can add other mock functions here as you build out the app
  // e.g., forgotPassword, confirmPassword, etc.
};

// This is the crucial line that fixes your error.
// We are exporting the 'authAPI' object so other files can import it.
export { authAPI };