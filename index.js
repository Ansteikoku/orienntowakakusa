const createThreadForm = document.getElementById('createThreadForm');
createThreadForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  const title = document.getElementById('threadTitle').value;
  const content = document.getElementById('threadContent').value;
  const name = document.getElementById('threadName').value;
  const { data, error } = await supabase.from('threads').insert([{ title, content, name }]);
  if (!error) loadThreads();
});

async function loadThreads() {
  const { data: threads, error } = await supabase.from('threads').select('*').order('created_at', { ascending: false });
  if (!error) {
    const threadList = document.getElementById('threadList');
    threadList.innerHTML = '';
    threads.forEach(thread => {
      const div = document.createElement('div');
      div.classList.add('thread');
      div.innerHTML = `
        <h3><a href="thread.html?id=${thread.id}">${thread.title}</a></h3>
        <p>${thread.content}</p>
        <p>投稿者: ${thread.name}</p>
        <p>コメント数: 0</p>`;
      threadList.appendChild(div);
    });
  }
}
loadThreads();