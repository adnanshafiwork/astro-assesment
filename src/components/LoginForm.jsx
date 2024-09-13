import { createSignal } from 'solid-js';

function LoginForm() {
  const [alertMessage, setAlertMessage] = createSignal('');
  const [alertType, setAlertType] = createSignal('');

  const handleLoginSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log('Login form submitted');

    const formData = new FormData(event.target);
    const data = {
      identifier: formData.get('identifier'), // Username or email field
      password: formData.get('password'),
    };
    console.log('Login data:', data);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setAlertType('success');
        setAlertMessage('Login successful!');
        window.location.href = '/'; // Redirect to home or dashboard
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        setAlertType('error');
        setAlertMessage(errorData.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setAlertType('error');
      setAlertMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <div>
      {alertMessage() && (
        <div
          class={`mb-4 p-4 rounded ${
            alertType() === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {alertMessage()}
        </div>
      )}

      <form onSubmit={handleLoginSubmit} class="max-w-md">
        <label class="block mb-2">
          Username or Email:
          <input type="text" name="identifier" required class="w-full p-2 border rounded mt-1" />
        </label>
        <label class="block mb-4">
          Password:
          <input type="password" name="password" required class="w-full p-2 border rounded mt-1" />
        </label>
        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
