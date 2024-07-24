document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const userList = document.getElementById('user-list');
    const repoList = document.getElementById('repo-list');
  
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = searchInput.value;
      searchUsers(query);
    });
  
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`)
        .then(response => response.json())
        .then(data => displayUsers(data.items))
        .catch(error => console.error('Error:', error));
    }
  
    function displayUsers(users) {
      userList.innerHTML = ''; // Clear previous results
      repoList.innerHTML = ''; // Clear previous repo list
  
      users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        userDiv.addEventListener('click', () => fetchUserRepos(user.login));
        userList.appendChild(userDiv);
      });
    }
  
    function fetchUserRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => displayRepos(data))
        .catch(error => console.error('Error:', error));
    }
  
    function displayRepos(repos) {
      repoList.innerHTML = ''; // Clear previous results
  
      repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.classList.add('repo');
        repoDiv.innerHTML = `
          <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
          <p>${repo.description || 'No description available'}</p>
        `;
        repoList.appendChild(repoDiv);
      });
    }
  });
  