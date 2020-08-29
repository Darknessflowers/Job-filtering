//get the job data
import { jobs } from './data.js';
let jobList = document.querySelector('.jobList');
let filterDisplay = document.querySelector('.filter');
let tagsDisplay = document.querySelector('.tags');
let filterText;
let existingFilterArray = [];
let resetBtn = filterDisplay.querySelector('.clear a');

function displayItems(object = jobs) {
  const html = object.map(job =>

    `    
    <div class="job ${job.featured ? `featured` : ``}">
    <div class="jobinfo">
      <div class="logo">
        <img src="${job.logo}" alt="${job.company} logo">
      </div>
      <div class="info">
        <h3>${job.company}</h3>
        ${job.new ? `<p class="labels newlabel">New!</p>` : ``}
        ${job.featured ? `<p class="labels featuredlabel">Featured</p>` : ``}
        <h2>${job.position}</h2>
        <ul>
          <li>${job.postedAt}</li>
          <li>${job.contract}</li>
          <li>${job.location}</li>
        </ul>
      </div>
    </div>
    <div class="jobroles">
    <button data-info="${job.role}">${job.role}</button>
    <button data-info="${job.level}">${job.level}</button>
    ${job.languages.map(language => `<button data-info="${language}">${language}</button>`).join('')}
    ${job.tools.map(tool => `<button data-info="${tool}">${tool}</button>`).join('')}
    </div>
 </div>`).join('');
 jobList.innerHTML = html;
// jobList.dispatchEvent(new CustomEvent('jobsUpdated'));
}

// check if all objects in filterArray are in the languages or tools array from the jobs object
function isTrue(testArr, objArrLang, objArrTool, objRole, objLevel){
  return testArr.every(i => objArrLang.includes(i) || objArrTool.includes(i) || objRole.includes(i) || objLevel.includes(i));
}

function updateDisplay() {
  // Update the filter object
  let filtered = jobs.filter(function(job, index, jobs) {
    return isTrue(existingFilterArray, jobs[index].languages, jobs[index].tools, jobs[index].role, jobs[index].level);
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
    tagsDisplay.appendChild(filterText);
  } 
  updateDisplay();
}

function removeItemFromFilter(filterEl) {
  let indexToRemove = existingFilterArray.indexOf(filterEl);
  let childToRemove = tagsDisplay.querySelector(`.${filterEl}`);
    // Remove it from the filterArray
    existingFilterArray.splice(indexToRemove, 1);
    // Remove from filterDisplay
    tagsDisplay.removeChild(childToRemove);
    if(existingFilterArray.length === 0) {
      filterDisplay.classList.add('hidden');
    }
    updateDisplay();
}

function findFilterItem(e) {
  // let childToRemove = filterDisplay.querySelector(`.${filterEl}`);
  // Find the index of that element in the filterArray
  if (e.target.matches('.filter button') || e.target.matches('.filter button img') ) {
    // Get the name of the element that is being removed
    let filterEl = e.target.closest('.filterTag').firstElementChild.innerText;
    removeItemFromFilter(filterEl);
  }
}
function resetDisplay() {
  //select all children
  let filterTags = tagsDisplay.querySelectorAll('.filterTag');
  console.log(filterTags);
  //remove
  filterTags.forEach((tag) => {
    tagsDisplay.removeChild(tag);
  });
  //reset array
  existingFilterArray = [];
  if(existingFilterArray.length === 0) {
    filterDisplay.classList.add('hidden');
  }
  displayItems(jobs);
}

// display unfiltered array on page load
displayItems(jobs);

// Event Delegation: listen for the click on the job div but then delegate the click over to the button if that is what was clicked
jobList.addEventListener('click', function(e) {
  const filter = e.target.getAttribute('data-info');
  if (e.target.matches('.jobList button')) {
    //if element doesn't exist inside array already add it
    if(!existingFilterArray.includes(filter)){
      addToFilter(filter);
    } else {
      removeItemFromFilter(filter);
    }
    // otherwise remove it
    // TODO: if element clicked on exists in filter array then remove rather than add
  }
});


// listen on filter display for click on removal button
tagsDisplay.addEventListener('click', findFilterItem);

resetBtn.addEventListener('click', resetDisplay);