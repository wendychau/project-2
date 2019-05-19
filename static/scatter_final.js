    d3.csv('scatterplot_coordinates.csv', function (data) {
        // Variables
        var body = d3.select('#scatterplot')
          var margin = { top: 50, right: 50, bottom: 50, left: 50 }
          var h = 200 - margin.top - margin.bottom
          var w = 600 - margin.left - margin.right


          // Scales
        var xScale = d3.scale.linear()
            .domain(d3.extent(data, d => d.latitude))
            .range([0,w])


        var yScale = d3.scale.linear()
            .domain(d3.extent(data, d => d.longitude))
            .range([h,0])


          // SVG
          var svg = body.append('svg')
              .attr('height',h + margin.top + margin.bottom)
              .attr('width',w + margin.left + margin.right)
              .append('g')
              .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
                

        // Circles
        var circles = svg.selectAll('circle')
            .data(data)
            .enter()
          .append('circle')
            .attr('cx',function (d) { return xScale(d.latitude) })
            .attr('cy',function (d) { return yScale(d.longitude) })
            .attr('r','10')
            .attr('stroke','darkgray')
            .attr('stroke-width',0.5)
            .attr('fill',function (d) { return d.hex_color })
            .on('mouseover', function () {
              d3.select(this)
                .transition()
                .duration(500)
                .attr('r',20)
                .attr('stroke-width',0.5)
            })
            .on('mouseout', function () {
              d3.select(this)
                .transition()
                .duration(500)
                .attr('r',10)
                .attr('stroke-width',0.5)
            })
          .append('title') // Tooltip
            .text(function (d) { return d.pet_name +
                                 '\nLatitude: ' + d.latitude +
                                 '\nLongitude: ' + d.longitude })
        // X-axis
        svg.append('g')
            .attr('class','axis')
            .attr('transform', 'translate(0,' + h + ')')
            .call(xAxis)
          .append('text') // X-axis Label
            .attr('class','label')
            .attr('y',-10)
            .attr('x',w)
            .attr('dy','.71em')
            .style('text-anchor','end')

        // Y-axis
        svg.append('g')
            .attr('class', 'axis')
            .call(yAxis)
          .append('text') // y-axis Label
            .attr('class','label')
            .attr('transform','rotate(-90)')
            .attr('x',0)
            .attr('y',5)
            .attr('dy','.71em')
            .style('text-anchor','end')

      })

