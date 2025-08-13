
  const width = 1000;
  const radius = width/2 ;
  const svg = d3.select("svg").attr("viewBox", [0, 0, width, width]);
  const tooltip = d3.select(".tooltip");

  function toHierarchy(json) {
    return {
      name: "Root",
      children: Object.values(json).map(topic => ({
        name: topic.name,
        children: topic.subtopics.map(sub => ({
          name: sub.name,
          children: sub.files.map(file => ({
            name: file.name,
            link: file.path
          }))
        }))
      }))
    };
  }

fetch('topics.json')
    .then(res => res.json())
    .catch(() => sampleData)
    .then(json => {
      const data = toHierarchy(json);
      const root = d3.hierarchy(data)
        .sum(d => d.children ? 0 : 1)
        .sort((a, b) => b.value - a.value);

      d3.partition().size([2 * Math.PI, radius])(root);

      const arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .innerRadius(d => d.y0)
        .outerRadius(d => d.y1);

      // Depth aware coloring of pie chart layers
      const color = d => {
        if (d.depth === 1) return "#4a9a8a10"; // Topics - Deep teal
        if (d.depth === 2) return "#6ba09a09"; // Subtopics - Muted teal-green
        if (d.depth === 3) return "#8bc3b802"; // Files - Soft seafoam teal
        return "#555dd"; // Fallbacks
      };
      
      const g = svg.append("g")
        .attr("transform", `translate(${radius},${radius})`)
        .attr("class", "arc");

      const path = g.selectAll("path")
        .data(root.descendants())
        .join("path")
        .attr("display", d => d.depth ? null : "none")
        .attr("d", arc)
        .attr("fill", d => color(d))
        .on("click", (event, clickedNode) => {
          if (!clickedNode.children) {
            if (clickedNode.data.link) window.open(clickedNode.data.link, "_blank");
            return;
          }
          const selectedPath = clickedNode.ancestors();
        
        // Highlight clicked path
        path.attr("fill-opacity", d => selectedPath.includes(d) || d.parent === clickedNode ? 1 : 0.1);
        
        text.attr("fill-opacity", d => selectedPath.includes(d) || d.parent === clickedNode ? 1 : 0.1);

        tooltip
            .style("opacity", 1)
            .html(selectedPath.map(n => n.data.name).join(" → "))
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px");
        })
        .on("mouseover", (event, d) => {
          const sequence = d.ancestors().reverse();
          path.attr("opacity", node => sequence.includes(node) ? 1 : 0.2);
          tooltip
            .style("opacity", 0)
            .html(sequence.map(n => n.data.name).join(" → "))
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px");
        })
        .on("mouseout", () => {
          path.attr("fill-opacity",1);
          text.attr("fill-opacity", 1);
          tooltip.style("opacity", 0);
        });

      // Add text labels - MOVED INSIDE THE FETCH PROMISE
      const text = g.selectAll("text")
        .data(root.descendants())
        .join("text")
        .attr("display", d => d.depth ? null : "none") // Show for all depths except root
        .attr("transform", d => {
          const angle = (d.x0 + d.x1) / 2;
          const radius = (d.y0 + d.y1) / 2;
          const x = Math.cos(angle - Math.PI / 2) * radius;
          const y = Math.sin(angle - Math.PI / 2) * radius;
          const rotation = (angle * 180 / Math.PI) - 90;
          
          // Adjust rotation to keep text readable (not upside down)
          const adjustedRotation = rotation > 90 ? rotation - 180 : rotation;
          
          return `translate(${x},${y}) rotate(${adjustedRotation})`;
        })
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("font-size", d => d.depth === 1 ? "14px" : d.depth === 2 ? "11px" : "9px")
        .attr("fill", "white")
        .attr("font-weight", "bold")
        .text(d => d.data.name);
    });