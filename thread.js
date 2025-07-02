const urlParams = new URLSearchParams(window.location.search);
const threadId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
  loadThreadDetails();
  document.getElementById('commentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('commentContent').value;
    const name = document.getElementById('commentName').value;
    const { data, error } = await supabase.from('comments').insert([{ thread_id: threadId, content, name }]);
    if (!error) loadComments();
  });
});

async function loadThreadDetails() {
  const { data: thread, error } = await supabase.from('threads').select('*').eq('id', threadId).single();
  if (!error) {
    document.getElementById('threadDetails').innerHTML = `
      <h3>${thread.title}</h3>
      <p>${thread.content}</p>
      <p>投稿者: ${thread.name}</p>`;
    loadComments();
  }
}

async function loadComments() {
  const { data: comments, error } = await supabase.from('comments').select('*').eq('thread_id', threadId).order('created_at');
  if (!error) {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    comments.forEach(comment => {
      const div = document.createElement('div');
      div.classList.add('comment');
      div.innerHTML = `<p><strong>${comment.name}</strong>: ${comment.content}</p>`;
      commentList.appendChild(div);
    });
  }
}