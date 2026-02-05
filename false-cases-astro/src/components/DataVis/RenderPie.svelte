<script lang="ts">
    import { type ProperTitleKey } from "../../data/constants-and-types";
    import { getLatestCrimeData } from "../../data/get-data";
    import { pctToDeg, arcPath } from "./render-helpers";

    const { crime, tabIndiaMetro }: {
        crime: ProperTitleKey,
        tabIndiaMetro: 0 | 1
    } = $props();


    // GEOMETRY CONSTANTS (PIE)----
    const cx = 100; // pie center x
    const cy = 100; // pie center y
    const R = 100; // main radius
    const SUBSET_RADIUS_RATIO = 0.9; // ratio for sub-arc radius
    const subR = R * SUBSET_RADIUS_RATIO; // sub-arc radius

    // GEOMETRY CONSTANTS (LABEL & LEADER)----
    // label / tail constants (fixed relative to cx, cy, R)
    const LABEL_MARGIN = 28; // gap from outer radius to label X
    const LABEL_X = cx + R + LABEL_MARGIN; // fixed label x on right
    const LABEL_Y = cy - 50; // fixed label y
    const TAIL_GAP = 12; // horizontal gap between tail end and label X
    const TAIL_END_X = LABEL_X - TAIL_GAP; // x where horizontal leader ends
    // additional constants for leader construction
    const LEADER_OUTWARD = 20; // radial offset from sub-arc for leader start
    const LEADER_START_INSET = 28; // how far inside the sub-arc the leader starts
    const LABEL_PADDING_Y = 4; // small vertical offset for label placement


    // INITIALIZE STATE VARIABLES----
    // case numbers and percentages
    let fakeNum = $state(0);
    let convictedNum = $state(0);
    let fakePercent = $state(0);
    let convictedPercent = $state(0);
    // angles (degrees)
    let aEnd = $state(0);
    let subEnd = $state(0);
    // title
    let properTitle = $state("");
    // leader / label reactive state (changes with `subEnd` angle)
    let leaderStartX = $state(0);
    let leaderStartY = $state(0);
    let leaderMidX = $state(0);
    let leaderMidY = $state(0);
    let labelY = $state(LABEL_Y);


    // CALCULATIONS FROM PROPS----
    $effect(() => {
        const isMetro = (tabIndiaMetro === 1) ? true : false;
        const { data, title } = getLatestCrimeData(crime, isMetro);
        
        // set title
        properTitle = title;

        // numbers extraction (quashed cases excluded)
        fakeNum = data.slice(1, 4).reduce((a, b) => a + b, 0);
        const maliciousFalseNum = fakeNum - data[3];
        convictedNum = data[6];

        // avoid division by zero
        const total = fakeNum + convictedNum;
        if (!total) {
            aEnd = 0;
            subEnd = 0;
            return;
        }

        // percentages calculation
        const maliciousFalsePercent = (maliciousFalseNum / total) * 100;
        fakePercent = (fakeNum / total) * 100;
        convictedPercent = 100 - (fakePercent);

        // angles from percentages
        aEnd = pctToDeg(fakePercent);// Fake cases slice
        subEnd = pctToDeg(maliciousFalsePercent);// Subsegment: confirmed malicious

        // compute leader coordinates that depend on `subEnd`
        if (subEnd > 0) {
            const midAngle = subEnd / 2; // degrees, subsegment starts at 0
            const rad = (midAngle - 90) * Math.PI / 180; // convert to radians for SVG coords

            // point slightly inside the sub-arc (start of leader)
            const startR = Math.max(4, subR - LEADER_START_INSET);
            const arcX = cx + startR * Math.cos(rad);
            const arcY = cy + startR * Math.sin(rad);

            // outward point a little beyond the sub-arc
            const outR = subR + LEADER_OUTWARD;
            const midX = cx + outR * Math.cos(rad);
            const midY = cy + outR * Math.sin(rad);

            // horizontal tail ends at TAIL_END_X and label remains at LABEL_X
            const endY = midY;

            leaderStartX = arcX;
            leaderStartY = arcY;
            leaderMidX = midX;
            leaderMidY = midY;

            // labelX and anchor are constants; only vertical position changes
            labelY = endY + LABEL_PADDING_Y;
        } else {
            // default / hidden positions when segment is zero
            leaderStartX = cx;
            leaderStartY = cy;
            leaderMidX = cx;
            leaderMidY = cy;
            labelY = LABEL_Y;
        }
    });
</script>

<div class="flex flex-col w-full gap-2 items-center">
    <h4 class="text-lg font-semibold w-full text-center p-2 bg-gray-200">{properTitle.toUpperCase()}</h4>

    <div class="grid grid-cols-1 w-full gap-8 items-center bg-gray-100 p-8">
        <!-- Pie Chart SVG -->
        <svg viewBox="0 0 300 200">
            <!-- Fake Cases -->
            <path d={arcPath(cx, cy, R, 0, aEnd)} fill="red" />

            <!-- Confirmed Malicious -->
            <path d={arcPath(cx, cy, subR, 0, subEnd)} fill="darkred" />

            <!-- Convicted -->
            <path d={arcPath(cx, cy, R, aEnd, 360)} fill="blue" />

            <!-- leader: radial segment from inside sub-arc to mid, then horizontal to fixed tail x -->
            <line x1={leaderStartX} y1={leaderStartY} x2={leaderMidX} y2={leaderMidY}
                stroke="black" stroke-width="1.5" stroke-linecap="round" />
            <line x1={leaderMidX} y1={leaderMidY} x2={TAIL_END_X} y2={leaderMidY}
                stroke="black" stroke-width="1.5" stroke-linecap="round" />

            <!-- label at fixed right-side X — two-line using tspans -->
            <text x={LABEL_X} y={labelY} font-weight="600" font-size="14" text-anchor="start">
                <tspan x={LABEL_X} dy="0">Confirmed</tspan>
                <tspan x={LABEL_X} dy="1.2em">Malicious</tspan>
            </text>
        </svg>

        <!-- In Numbers -->
        <div class="grid grid-cols-2 w-full gap-4">
            <div class="flex flex-col w-full border-t-3 border-blue-500">
                <p class="text-md font-medium text-blue-500 mt-2 mb-2">Convicted</p>
                <p class="font-bold">{convictedNum.toLocaleString()} cases</p>
                <p class="text-lg text-blue-500 font-bold">{convictedPercent.toFixed(1)}%</p>
            </div>

            <div class="flex flex-col w-full border-t-3 border-red-500">
                <p class="text-md font-medium text-red-500 mt-2 mb-2">Fake Cases</p>
                <p class="font-bold">{fakeNum.toLocaleString()} cases</p>
                <p class="text-lg text-red-500 font-bold">{fakePercent.toFixed(1)}%</p>
            </div>
        </div>
    </div>
</div>