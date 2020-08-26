import { jobs } from './data.js';

let jobList = document.querySelector('.jobList');
//import json object

// let jobs;
// let requestURL = './data.json';
// let request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();
// request.onload = function() {
//   jobs = request.response;
// }
// let jobs = JSON.parse('./data.json');
//use shopping list fron beginner js as guideline
function displayItems() {
  console.log(jobs.languages);
  // let languageDisplay = jobs.languages.map(language => `<button>${language}</button>`);
  const html = jobs.map(job =>

    `    
    <div class="job ${job.featured ? `featured` : ``}">
    <div class="jobinfo">
      <div class="logo">
        <img src="${job.logo}" alt="${job.company} logo">
      </div>
      <div class="info">
        <h3>${job.company}</h3>
        ${job.new ? `<p class="labels newlabel">New!</span>` : ``}
        ${job.featured ? `<p class="labels featuredlabel">Featured</span>` : ``}
        <h2>${job.position}</h2>
        <ul>
          <li>${job.postedAt}</li>
          <li>${job.contract}</li>
          <li>${job.location}</li>
        </ul>
      </div>
    </div>
    <div class="jobroles">
    ${job.languages.map(language => `<button data-info="${language}">${language}</button>`).join('')}
    ${job.tools.map(tool => `<button data-info="${tool}">${tool}</button>`).join('')}
    </div>
 </div>`).join('');
 jobList.innerHTML = html;
console.log(html);
jobList.dispatchEvent(new CustomEvent('jobsUpdated'));
}
displayItems();
jobList.addEventListener('itemsUpdated', displayItems);

//listen for click on button

jobList.addEventListener('click', function(e) {
  if (e.target.matches('.jobList button')) {
  console.log(e.target.getAttribute('data-info'));
  }
});