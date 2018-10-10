const dataset = [];
for (let i = 0; i < 49; i++) {
    dataset.push([i, Math.floor(Math.random() * 300)+5]);
}
console.log(d3);
const padding = 40;
const h = 350;
const w = 1200;
const xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function (d) { return d[0]; }) + 2])
    .range([w - padding, padding]);
const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function (d) { return d[1]; }) + padding / 2])
    .range([h - padding, padding]);
const xAxis = d3.axisBottom().scale(xScale).ticks(10);
const yAxis = d3.axisLeft().scale(yScale).ticks(10);
//Create SVG element
const svg = d3.select("#historical-data")
    .append("svg")
    .attr("width", "100%")
    .attr("height", h);
// Instead of creating rects, however, we’ll make a circle for each data point:

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    // Also, instead of specifying the rect attributes of x, y, width, and height, our circles need cx, cy, and r:
    .attr("cx", function (d) {
        return xScale(d[0]);
    })
    .attr("cy", function (d) {
        return yScale(d[1]);
    })
    .attr("r", 5);

//axes
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);
// text label for the x axis
svg.append("text")
    .attr("transform",
        "translate(" + (w / 2) + " ," +
        (h - 5) + ")")
    .style("text-anchor", "middle")
    .text("Hours Ago");
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);
// text label for the y axis
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - 5)
    .attr("x", 0 - (h / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Air Quality Index (AQI)");  