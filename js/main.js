// get mock data
fetch('data.json')
.then(function(response) {
    return response.json()
}).then(function(json) {
    buildCharts(json)
})

function buildCharts(data){
    // loop thru sites
    data.map((site, i=0) => {
        console.log(`Site Name: ${site.name}`)
        
        const vals = [];
        const labels = [];

        // loop thru equip for each site
        // fill array w/ site's equipment
        for(let e in site.eq){
            console.log(`${e} : ${site.eq[e]}%`)
            
            vals.push(site.eq[e])
            labels.push(e)
        }

        // add site name to each chart
        var parentEl = document.querySelector(`#gauge${site.id}`)
        const el = `<small>Job Site:</small><h4>${site.name}</h4>`
        parentEl.insertAdjacentHTML('afterend', el)

        // get ratios to fill gauge graphs all the way
        const sum = vals.reduce(function(acc, val) { return acc + val })
        const diff = (100 - (sum / vals.length))
        const valRatios = vals.map((val) => { return ((val + diff) / vals.length) })
        
        // guage charts
        const pieData = { 
            labels: labels,
            series: valRatios 
        }

        const pieOpts = { 
            donut: true,
            donutWidth: 40,
            startAngle: 210,
            total: 120,
            showLabel: true
        }

        new Chartist.Pie(`#gauge${site.id}`, pieData, pieOpts);
    });
}

