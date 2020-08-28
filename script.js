//get the job data
import { jobs } from './data.js';
//get the div the jobs will sit in
let jobList = document.querySelector('.jobList');
// let jobsBackup = [... jobs];
let filterDisplay = document.querySelector('.filter');

function displayItems(object) {
  const html = object.map(job =>

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
// jobList.dispatchEvent(new CustomEvent('jobsUpdated'));
}
displayItems(jobs);
// jobList.addEventListener('itemsUpdated', displayItems);

let existingFilterArray = [];
function addToFilter(filter) {
  existingFilterArray.push(filter);
  // if(existingFilter.length !== 0) {
  //   existingFilter.push(filter);
  //   console.log(`new is ${existingFilter}`);
  // }
  // TODO: check for existing filter and if it exists filter for both 
  filterDisplay.classList.remove('hidden');
// console.log(filter);
//add to filter
let filterText = document.createElement("div");
filterText.classList.add(filter);
filterText.innerHTML = `<p>${filter}</p><button><img src="./images/icon-remove.svg"></button>`;
filterDisplay.appendChild(filterText);

const filtered = jobs.filter(job => job.languages.includes(filter) || job.tools.includes(filter));
console.log(filtered);
displayItems(filtered);
}
// Event Delegation: We listen for the click on the job div but then delegate the click over to the button if that is what was clicked
jobList.addEventListener('click', function(e) {
  const filter = e.target.getAttribute('data-info');
  if (e.target.matches('.jobList button')) {
    addToFilter(filter);
  }
});