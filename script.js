// DOM elements
const app = document.getElementById('app');

// Navigation functions
function showHome() {
    app.innerHTML = `
        <section>
            <h1>💧 Welcome to Clean Water Watch</h1>
            <p>Our mission is to empower communities to report water quality issues and learn about clean water practices.</p>
            <div style="background: #e0f2f1; padding: 1.5rem; border-radius: 15px; margin-top: 2rem;">
                <h2>📊 Quick Stats</h2>
                <p>Total issues reported: <strong>${getIssues().length}</strong></p>
                <p>Join us in making a difference for SDG 6 – Clean Water and Sanitation for all.</p>
            </div>
        </section>
    `;
}

function showReportForm() {
    app.innerHTML = `
        <section>
            <h2>📝 Report a Water Issue</h2>
            <form id="reportForm">
                <div class="form-group">
                    <label for="location">Location (city/area)</label>
                    <input type="text" id="location" required>
                </div>
                <div class="form-group">
                    <label for="type">Issue Type</label>
                    <select id="type" required>
                        <option value="">Select</option>
                        <option value="Contaminated Tap Water">Contaminated Tap Water</option>
                        <option value="Broken Hand Pump">Broken Hand Pump</option>
                        <option value="Polluted River/Lake">Polluted River/Lake</option>
                        <option value="Lack of Sanitation Facility">Lack of Sanitation Facility</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" rows="3" required></textarea>
                </div>
                <button type="submit">Submit Report</button>
            </form>
        </section>
    `;

    document.getElementById('reportForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const location = document.getElementById('location').value;
        const type = document.getElementById('type').value;
        const description = document.getElementById('description').value;
        const newIssue = {
            id: Date.now(),
            location,
            type,
            description,
            date: new Date().toLocaleString()
        };
        saveIssue(newIssue);
        alert('✅ Issue reported successfully!');
        showIssues(); // go to issues list after submission
    });
}

function showIssues() {
    const issues = getIssues();
    if (issues.length === 0) {
        app.innerHTML = `<section><h2>📋 Reported Issues</h2><p>No issues reported yet. Be the first to report!</p></section>`;
        return;
    }

    let html = `<section><h2>📋 Reported Issues</h2>`;
    issues.forEach(issue => {
        html += `
            <div class="issue-item">
                <h3>📍 ${issue.location}</h3>
                <p><strong>Type:</strong> ${issue.type}</p>
                <p><strong>Description:</strong> ${issue.description}</p>
                <p><small>Reported on: ${issue.date}</small></p>
            </div>
        `;
    });
    html += `</section>`;
    app.innerHTML = html;
}

function showTips() {
    app.innerHTML = `
        <section>
            <h2>💡 Tips for Clean Water & Sanitation</h2>
            <div class="tips-grid">
                <div class="tip-card">
                    <h3>🚰 Boil Water</h3>
                    <p>If unsure about water quality, boil it for at least 1 minute to kill harmful germs.</p>
                </div>
                <div class="tip-card">
                    <h3>🧼 Hand Hygiene</h3>
                    <p>Wash hands with soap and clean water, especially before eating and after using the toilet.</p>
                </div>
                <div class="tip-card">
                    <h3>🚯 No Littering</h3>
                    <p>Never throw garbage into rivers or lakes. It contaminates water sources.</p>
                </div>
                <div class="tip-card">
                    <h3>🔧 Fix Leaks</h3>
                    <p>Report leaking taps or pipes to save water and prevent contamination.</p>
                </div>
                <div class="tip-card">
                    <h3>🌱 Rainwater Harvesting</h3>
                    <p>Collect rainwater for gardening and other non-drinking uses.</p>
                </div>
                <div class="tip-card">
                    <h3>📢 Speak Up</h3>
                    <p>Use this platform to report water issues and encourage authorities to act.</p>
                </div>
            </div>
        </section>
    `;
}

// Helper functions for localStorage
function getIssues() {
    const stored = localStorage.getItem('waterIssues');
    return stored ? JSON.parse(stored) : [];
}

function saveIssue(issue) {
    const issues = getIssues();
    issues.push(issue);
    localStorage.setItem('waterIssues', JSON.stringify(issues));
}

// Navigation event listeners
function init() {
    showHome();

    document.getElementById('homeLink').addEventListener('click', (e) => {
        e.preventDefault();
        showHome();
    });
    document.getElementById('reportLink').addEventListener('click', (e) => {
        e.preventDefault();
        showReportForm();
    });
    document.getElementById('issuesLink').addEventListener('click', (e) => {
        e.preventDefault();
        showIssues();
    });
    document.getElementById('tipsLink').addEventListener('click', (e) => {
        e.preventDefault();
        showTips();
    });
}

// Start the app
init();