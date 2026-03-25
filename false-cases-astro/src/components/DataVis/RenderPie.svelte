<script lang="ts">
    import { type ProperTitleKey } from "../../data/constants-and-types"
    import { getLatestCrimeData } from "../../data/get-data"
    import { pctToDeg, arcPath, leaderGeometry } from "./pie-render-helpers"

    const { crime, tabIndiaMetro }: {
        crime: ProperTitleKey
        tabIndiaMetro: 0 | 1
    } = $props()

    // --- Geometry Constants ---
    const SVG_HEIGHT = 200
    const LABEL_TOP_LIMIT = (SVG_HEIGHT * 0.1)
    const LABEL_BOTTOM_LIMIT = (SVG_HEIGHT * 0.9)

    const cx = 100
    const cy = 100
    const R = 100
    const SUBSET_RADIUS_RATIO = 0.93
    const subR = R * SUBSET_RADIUS_RATIO

    const LABEL_MARGIN = 28
    const LABEL_X = cx + R + LABEL_MARGIN
    const LABEL_Y = cy - 50
    const TAIL_GAP = 12
    const TAIL_END_X = LABEL_X - TAIL_GAP

    const LEADER_OUTWARD = 20
    const LEADER_START_INSET = 28
    const LABEL_PADDING_Y = 4

    // --- State ---
    let fakeNum = $state(0)
    let convictedNum = $state(0)
    let fakePercent = $state(0)
    let convictedPercent = $state(0)

    let aEnd = $state(0)
    let subEnd = $state(0)

    let properTitle = $state("")

    let leaderStartX = $state(0)
    let leaderStartY = $state(0)
    let leaderMidX = $state(0)
    let leaderMidY = $state(0)
    let labelY = $state(LABEL_Y)

    // --- Effect ---
    $effect(() => {
        const isMetro = tabIndiaMetro === 1
        const { data, title } = getLatestCrimeData(crime, isMetro)

        properTitle = title

        fakeNum = data.slice(1, 4).reduce((a, b) => a + b, 0)
        const maliciousFalseNum = fakeNum - data[3]
        convictedNum = data[6]

        const total = fakeNum + convictedNum

        if (!total) {
            aEnd = 0
            subEnd = 0
            return
        }

        const maliciousFalsePercent = (maliciousFalseNum / total) * 100

        fakePercent = (fakeNum / total) * 100
        convictedPercent = 100 - fakePercent

        aEnd = pctToDeg(fakePercent)
        subEnd = pctToDeg(maliciousFalsePercent)

        const leader = leaderGeometry(
            cx,
            cy,
            subR,
            subEnd,
            {
                leaderStartInset: LEADER_START_INSET,
                leaderOutward: LEADER_OUTWARD,
                labelBaseY: LABEL_Y,
                labelPaddingY: LABEL_PADDING_Y,
                labelTopLimit: LABEL_TOP_LIMIT,
                labelBottomLimit: LABEL_BOTTOM_LIMIT
            }
        )

        leaderStartX = leader.leaderStartX
        leaderStartY = leader.leaderStartY
        leaderMidX = leader.leaderMidX
        leaderMidY = leader.leaderMidY
        labelY = leader.labelY
    })
</script>

<div class="flex flex-col w-full gap-2 items-center">
    <h4 class="text-lg font-semibold w-full text-center p-2 bg-gray-200">{properTitle.toUpperCase()}</h4>

    <div class="flex flex-col w-full gap-8 items-center bg-gray-100 p-8">
        <!-- Pie Chart SVG -->
        <svg viewBox={`0 0 300 ${SVG_HEIGHT}`}>
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