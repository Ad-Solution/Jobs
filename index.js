
// Dummy job data
const jobData = [
    
   
    {
        id: 1,
        category: 'healthcare',
        jobType: 'Contract',
        location: 'Colombo',
        salary: 'Rs. 15000/month',
        company: 'HealthPlus',
        description: 'We are seeking a healthcare consultant with experience in public health and clinical practices. The ideal candidate will have a strong background in healthcare management.',
        image: 'img8.jpg',
        postedTime: '2023-03-01'
    },
    
];

let filteredJobs = [...jobData];

function handleSearch() {
    const category = document.getElementById('category').value;
    const jobType = document.getElementById('jobType').value;
    const minSalary = document.getElementById('minSalary').value;
    const maxSalary = document.getElementById('maxSalary').value;
    const location = document.getElementById('location').value;

    filteredJobs = jobData.filter(job => {
        return (!category || job.category === category) &&
            (!jobType || job.jobType === jobType) &&
            (!minSalary || job.salary >= parseInt(minSalary)) &&
            (!maxSalary || job.salary <= parseInt(maxSalary)) &&
            (!location || job.location.toLowerCase().includes(location.toLowerCase()));
    });

    displayJobs();
}

function displayJobs() {
    const jobContainer = document.getElementById('jobContainer');
    jobContainer.innerHTML = '';

    filteredJobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4 job-card">
                <img class="card-img-top" src="${job.image}" alt="Job image">
                <div class="card-body">
                    <h5 class="card-title">${job.company}</h5>
                    <p class="card-text">${job.location}</p>
                    <p class="card-text">Category: ${formatCategory(job.category)}</p>
                    <p class="card-text">Salary: ${job.salary}</p>
                    <p class="card-text">Job Type: ${job.jobType}</p>
                    <p class="card-text">Posted: ${new Date(job.postedTime).toLocaleDateString()}</p>
                    <p class="card-text">${job.description.substring(0, 100)}...</p>
                    <button class="btn btn-primary" onclick="handleViewDetails(${job.id})">View More</button>
                </div>
            </div>`;
        jobContainer.appendChild(card);
    });
}

function handleViewDetails(id) {
    const job = filteredJobs.find(p => p.id === id);
    const modal = new bootstrap.Modal(document.getElementById('jobModal'));

    document.getElementById('jobModalLabel').innerText = job.company;
    document.getElementById('modalImage').src = job.image;
    document.getElementById('modalCompany').innerText = `Company: ${job.company}`;
    document.getElementById('modalLocation').innerText = `Location: ${job.location}`;
    document.getElementById('modalSalary').innerText = `Salary: ${job.salary}`;
    document.getElementById('modalCategory').innerText = `Category: ${formatCategory(job.category)}`;
    document.getElementById('modalPostedDate').innerText = `Posted: ${new Date(job.postedTime).toLocaleDateString()}`;
    document.getElementById('modalJobType').innerText = `Job Type: ${job.jobType}`;
    document.getElementById('modalDescription').innerText = `Description: ${job.description}`;

    modal.show();
}

function formatCategory(category) {
    switch (category) {
        case 'it': return 'IT';
        case 'finance': return 'Finance';
        case 'healthcare': return 'Healthcare';
        case 'education': return 'Education';
        case 'engineering': return 'Engineering';
        case 'marketing': return 'Marketing';
        case 'others': return 'Others';
        default: return 'Unknown';
    }
}

// Back to Top button functionality
const backToTopBtn = document.getElementById('backToTopBtn');

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
            backToTopBtn.style.display = "none";
        }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

document.addEventListener('DOMContentLoaded', () => {
    displayJobs();
});

