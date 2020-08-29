//get the job data
import { jobs } from './data.js';
let jobList = document.querySelector('.jobList');
let filterDisplay = document.querySelector('.filter');
let filterText;
let existingFilterArray = [];

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

// check if all objects in filterArray are in the languages or tools array from the jobs object
function isTrue(testArr, objArrLang, objArrTool){
  return testArr.every(i => objArrLang.includes(i) || objArrTool.includes(i));
}

function updateDisplay() {
  // Update the filter object
  let filtered = jobs.filter(function(job, index, jobs) {
    return isTrue(existingFilterArray, jobs[index].languages, jobs[index].tools);
  });
  // Display filter object
  displayItems(filtered);
}

function addToFilter(filter) {
  existingFilterArray.push(filter);
  if(filterDisplay.classList.contains('hidden')) {
    filterDisplay.classList.remove('hidden');
  }
  if(existingFilterArray.length) {
    existingFilterArray.forEach(function(langOrTool) {
      filterText = document.createElement("div");
      filterText.classList.add('filterTag');
      filterText.classList.add(langOrTool);
      filterText.innerHTML = 
      `<p>${langOrTool}</p><button><img src="./images/icon-remove.svg"></button>`;
    });
    filterDisplay.appendChild(filterText);
  } 
  updateDisplay();
}

function removeFromFilter(e) {
  // Get the name of the element that is being removed
  let filterEl = e.target.closest('.filterTag').firstElementChild.innerText;
  let childToRemove = filterDisplay.querySelector(`.${filterEl}`);
  // Find the index of that element in the filterArray
  if (e.target.matches('.filter button') || e.target.matches('.filter button img') ) {
    let indexToRemove = existingFilterArray.indexOf(filterEl);
    // Remove it from the filterArray
    existingFilterArray.splice(indexToRemove, 1);
    // Remove from filterDisplay
    filterDisplay.removeChild(childToRemove);
    if(existingFilterArray.length === 0) {
      filterDisplay.classList.add('hidden');
    }
    updateDisplay();
  }
}

// display unfiltered array on page load
displayItems(jobs);
// Event Delegation: listen for the click on the job div but then delegate the click over to the button if that is what was clicked
jobList.addEventListener('click', function(e) {
  const filter = e.target.getAttribute('data-info');
  if (e.target.matches('.jobList button')) {
    addToFilter(filter);
  }
});
filterDisplay.addEventListener('click', removeFromFilter);