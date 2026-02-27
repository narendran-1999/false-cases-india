
/* ----------- Pie Chart Rendering Helpers ----------- */

// --- Angle / Geometry Utilities ---

const DEG = Math.PI / 180;

// % (0–100) → sweep angle in degrees
export const pctToDeg = (pct: number) => pct * 3.6;

// rotate so 0° starts at top (SVG starts at 3 o’clock)
const toSvgDeg = (deg: number) => deg - 90;

// polar → cartesian using degrees
export function polarToCartesian(
    cx: number,
    cy: number,
    r: number,
    deg: number
): { x: number; y: number } {
    const a = toSvgDeg(deg) * DEG;

    return {
        x: cx + r * Math.cos(a),
        y: cy + r * Math.sin(a)
    };
}

// filled pie-slice path
export function arcPath(
    cx: number,
    cy: number,
    r: number,
    startDeg: number,
    endDeg: number
): string {
    const s = polarToCartesian(cx, cy, r, startDeg);
    const e = polarToCartesian(cx, cy, r, endDeg);
    const large = endDeg - startDeg > 180 ? 1 : 0;

    return `
        M ${cx} ${cy}
        L ${s.x} ${s.y}
        A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}
        Z
    `;
}

// --- Leader Geometry ---

export function leaderGeometry(
    cx: number,
    cy: number,
    subR: number,
    subEnd: number,
    cfg: {
        leaderStartInset: number
        leaderOutward: number
        labelBaseY: number
        labelPaddingY: number
        labelTopLimit: number
        labelBottomLimit: number
    }
) {
    if (subEnd <= 0) {
        return {
            leaderStartX: cx,
            leaderStartY: cy,
            leaderMidX: cx,
            leaderMidY: cy,
            labelY: cfg.labelBaseY
        }
    }

    const midAngle = subEnd / 2

    const startR = Math.max(4, subR - cfg.leaderStartInset)
    const start = polarToCartesian(cx, cy, startR, midAngle)

    const mid = polarToCartesian(
        cx,
        cy,
        subR + cfg.leaderOutward,
        midAngle
    )

    const rawY = mid.y + cfg.labelPaddingY

    const clampedY = Math.min(
        Math.max(rawY, cfg.labelTopLimit),
        cfg.labelBottomLimit
    )

    const isClamped = clampedY !== rawY

    return {
        leaderStartX: start.x,
        leaderStartY: start.y,
        leaderMidX: mid.x,
        leaderMidY: isClamped ? clampedY : mid.y,
        labelY: clampedY
    }
}


/* ----------- Trend Chart Rendering Helpers ----------- */
import * as d3 from "d3";

// SVG DIMENSIONS CONSTANT
export const SVG_DIMENSIONS = {
    WIDTH: 400,
    HEIGHT: 300
};

// Types
export type TrendPoint = {
    year: number;
    maliciousFalse: number;
    fake: number;
};

// Data Transform Function
export function transformTrendData(
    data: number[][],
    trendType: "cases" | "prevalence"
): TrendPoint[] {
    if (trendType === "cases") {
        return data.map((yearData) => {
            const fake = yearData.slice(1, 6).reduce((a, b) => a + b, 0);
            const maliciousFalse = fake - yearData[3];

            return {
                year: yearData[0],
                maliciousFalse,
                fake
            };
        });
    }

    return data.map((yearData) => {
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

// Chart Draw Function
export function drawTrendChart(
    svgEl: SVGSVGElement,
    trendData: TrendPoint[],
    trendType: "cases" | "prevalence"
) {
    if (!svgEl || !trendData.length) return;

    const { WIDTH, HEIGHT } = SVG_DIMENSIONS;

    const margin = { top: 24, right: 24, bottom: 50, left: 40 };

    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.bottom;

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales

    const x = d3.scalePoint<string>()
        .domain(trendData.map(d => String(d.year)))
        .range([0, innerWidth]);

    const yMax = d3.max(trendData, d => d.fake) ?? 0;

    const y = d3.scaleLinear()
        .domain([0, yMax])
        .nice()
        .range([innerHeight, 0]);

    // Areas

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

    // Fake Case Data Points

    const formatValue = d3.format(",");

    const points = g.selectAll(".fake-point")
        .data(trendData)
        .enter();

    points.append("circle")
        .attr("class", "fake-point")
        .attr("cx", d => x(String(d.year))!)
        .attr("cy", d => y(d.fake))
        .attr("r", 3.5)
        .attr("fill", "#dc2626"); // red dot

    points.append("text")
        .attr("x", d => x(String(d.year))!)
        .attr("y", d => y(d.fake) - 6) // slightly above dot
        .attr("text-anchor", "middle")
        .style("font-size", "0.8rem")
        .style("fill", "#000000") // black text
        .text(d => 
            trendType === "prevalence"
            ? `${formatValue(Math.round(d.fake))}%`
            : formatValue(d.fake)
        );

    // Axes

    const xAxis = d3.axisBottom(x);

    const yMaxNice = y.domain()[1];

    const yAxis = trendType === "prevalence"
        ? d3.axisLeft(y)
            .tickValues([0, yMaxNice])
            .tickFormat(d => `${d}%`)
        : d3.axisLeft(y)
            .tickValues([0, yMaxNice])
            .tickFormat(d3.format(","));

    g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(xAxis);

    g.append("g")
        .call(yAxis);

    g.selectAll(".tick text")
        .style("font-size", "0.75rem"); // preserved exactly

    // Labels

    g.append("text")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 45)
        .attr("text-anchor", "middle")
        .style("font-size", "1rem") // preserved exactly
        .text("Year");

    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .style("font-size", "1rem") // preserved exactly
        .text(
            trendType === "cases"
                ? "Cases"
                : "Prevalence (%)"
        );
}