import { createSignal } from 'solid-js';

function RegisterForm() {
  const [alertMessage, setAlertMessage] = createSignal('');
  const [alertType, setAlertType] = createSignal('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log('handleSubmit called'); // Debugging log

    const formData = new FormData(event.target);
    const data = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
    console.log('Form data:', data); // Debugging log

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setAlertType('success');
        setAlertMessage('Registration successful!');
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        setAlertType('error');
        setAlertMessage(errorData.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setAlertType('error');
      setAlertMessage('An error occurred. Please try again.');
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

      <form onSubmit={handleSubmit} class="max-w-md">
        <label class="block mb-2">
          Username:
          <input type="text" name="username" required class="w-full p-2 border rounded mt-1" />
        </label>
        <label class="block mb-2">
          Email:
          <input type="email" name="email" required class="w-full p-2 border rounded mt-1" />
        </label>
        <label class="block mb-4">
          Password:
          <input type="password" name="password" required class="w-full p-2 border rounded mt-1" />
        </label>
        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
