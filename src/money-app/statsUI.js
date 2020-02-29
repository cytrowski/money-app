class Stats {
    constructor(stats, circle, budget){
        this.stats = stats;
        this.circle = circle;
        this.budget = budget;
    }
    addStatsUI(data, budget){
        if(data) {
        const outcome = Math.round(data * 100) / 100;
        const sumAll = Math.round((budget - outcome) * 100) / 100;
        
        this.stats.innerHTML += `
        <div><span class="budget-name">Budget: </span>  <span class="stat-value">${budget}$</span></div>
        <div><span class="budget-name">Outcome: </span> <span class="stat-value outcome-value">${outcome}$</span></div>
        <div><span class="budget-name">All: </span> <span class="stat-value last-value">${sumAll}$</span></div>
        `;
        const circle = Math.round(((outcome * 100) / budget) * 100) / 100;
        this.circle.innerHTML += `${circle}%`;

        } else {
        this.stats.innerHTML = '';
        this.circle.innerHTML = '';
    }};
};

export { Stats as default };