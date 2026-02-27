<script lang="ts">
    import * as d3 from "d3";
    import { type ProperTitleKey } from "../../data/constants-and-types";
    import { getCrimeData } from "../../data/get-data";

    /* ---------------- Props ---------------- */

    const { crime, tabIndiaMetro, trendType }: {
        crime: ProperTitleKey;
        tabIndiaMetro: 0 | 1;
        trendType: "cases" | "prevalence";
    } = $props();

    /* ---------------- Unified Data Type ---------------- */

    type TrendPoint = {
        year: number;
        maliciousFalse: number;
        fake: number;
    };

    /* ---------------- State ---------------- */

    let svgEl: SVGSVGElement;
    let trendData: TrendPoint[] = [];
    let properTitle = $state("");

    /* ---------------- Data Processing ---------------- */

    $effect(() => {
        const isMetro = tabIndiaMetro === 1;
        const { data, title } = getCrimeData(crime, isMetro);

        properTitle = title;

        if (trendType === "cases") {
            trendData = data.map((yearData) => {
                const fake = yearData.slice(1, 6).reduce((a, b) => a + b, 0);
                const maliciousFalse = fake - yearData[3];

                return {
                    year: yearData[0],
                    maliciousFalse,
                    fake
                };
            });
        } else {
            trendData = data.map((yearData) => {
                const fake = yearData.slice(1, 4).reduce((a, b) => a + b, 0);
                const maliciousFalse = fake - yearData[3];
                const convicted = yearData[6];

                const denominator = fake + convicted || 1;

                return {
                    year: yearData[0],
                    maliciousFalse: (maliciousFalse / denominator) * 100,
                    fake: (fake / denominator) * 100
                };
            });
        }
    });

    /* ---------------- Chart Drawing ---------------- */

    //SVG Dimensions constant for consistent scaling
    const WIDTH = 400;
    const HEIGHT = 300;

    function drawChart() {
        if (!svgEl || !trendData.length) return;

        const width = WIDTH;
        const height = HEIGHT;

        const margin = { top: 24, right: 24, bottom: 50, left: 65 };

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(svgEl);

        svg.selectAll("*").remove();

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        /* ---------- Scales ---------- */

        const x = d3.scalePoint<string>()
            .domain(trendData.map(d => String(d.year)))
            .range([0, innerWidth]);

        const yMax = d3.max(trendData, d => d.fake) ?? 0;

        const y = d3.scaleLinear()
            .domain([0, yMax])
            .nice()
            .range([innerHeight, 0]);

        /* ---------- Areas ---------- */

        const fakeArea = d3.area<TrendPoint>()
            .x(d => x(String(d.year))!)
            .y0(innerHeight)
            .y1(d => y(d.fake));

        const maliciousArea = d3.area<TrendPoint>()
            .x(d => x(String(d.year))!)
            .y0(innerHeight)
            .y1(d => y(d.maliciousFalse));

        g.append("path")
            .datum(trendData)
            .attr("fill", "#fca5a5")
            .attr("stroke", "#dc2626")
            .attr("d", fakeArea);

        g.append("path")
            .datum(trendData)
            .attr("fill", "#dc2626")
            .attr("d", maliciousArea);

        /* ---------- Axes ---------- */

        const xAxis = d3.axisBottom(x);

        const yAxis = trendType === "prevalence"
            ? d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`)
            : d3.axisLeft(y).ticks(5);

        g.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(xAxis);

        g.append("g")
            .call(yAxis);

        g.selectAll(".tick text")
            .style("font-size", "0.7rem");

        /* ---------- Labels ---------- */

        g.append("text")
            .attr("x", innerWidth / 2)
            .attr("y", innerHeight + 45)
            .attr("text-anchor", "middle")
            .style("font-size", "1rem")
            .text("Year");

        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -50)
            .attr("text-anchor", "middle")
            .style("font-size", "1rem")
            .text(
                trendType === "cases"
                    ? "Cases"
                    : "Prevalence (%)"
            );
    }

    /* ---------------- Reactive Redraw ---------------- */

    $effect(() => {
        if (trendData.length) drawChart();
    });
</script>

<div class="flex flex-col w-full gap-2 items-center">
    <h4 class="text-lg font-semibold w-full text-center p-2 bg-gray-200">
        {properTitle.toUpperCase()}
    </h4>

    <div class="w-full bg-gray-100 p-2">
        <div class="w-full aspect-4/3 md:aspect-video">
            <svg
                bind:this={svgEl}
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                preserveAspectRatio="xMidYMid meet"
                class="w-full h-full"
            ></svg>
        </div>
    </div>
</div>