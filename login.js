document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const password = document.getElementById('password').value;
  const correctPassword = 'wakakusa';
  if (password === correctPassword) {
    window.location.href = 'index.html';
  } else {
    document.getElementById('error-message').textContent = 'パスワードが間違っています';
  }
});