import * as block from '../../logic/block'
import { BlockDesc } from '../../logic/block'

export type SheetBlockState<InnerBlockState> =
    SheetBlockLine<InnerBlockState>[]

export interface SheetBlockLine<InnerBlockState> {
    readonly id: number
    readonly name: string
    readonly isCollapsed: boolean
    readonly state: InnerBlockState
    readonly result: unknown
}


export function init<InnerBlockState>(innerBlockInit: InnerBlockState): SheetBlockState<InnerBlockState> {
    return [{
        id: 0,
        name: '',
        isCollapsed: false,
        state: innerBlockInit, 
        result: null
    }]
}


export const lineDefaultName = (line: SheetBlockLine<unknown>) => '$' + line.id
export const lineName = (line: SheetBlockLine<unknown>) => line.name.length > 0 ? line.name : lineDefaultName(line)

export function lineToEnv<State>(
    line: SheetBlockLine<State>,
) {
    return {
        [lineName(line)]: line.result
    }
}

export function nextFreeId(state: SheetBlockState<unknown>) {
    const highestId = state
        .map(line => line.id)
        .reduce((a, b) => Math.max(a, b), -1)

    return 1 + highestId
}

export function updateLineWithId<Inner extends unknown>(
    lines: SheetBlockLine<Inner>[],
    id: number,
    update: (line: SheetBlockLine<Inner>) => SheetBlockLine<Inner>,
) {
    return lines.map(
        line =>
            line.id === id ?
                update(line)
            :
                line
    )
}

export function insertLineBefore<Inner extends unknown>(
    lines: SheetBlockLine<Inner>[],
    id: number,
    newLine: SheetBlockLine<Inner>,
) {
    return lines.flatMap(line =>
        line.id === id ?
            [newLine, line]
        :
            [line]
    )
}

export function insertLineAfter<Inner extends unknown>(
    lines: SheetBlockLine<Inner>[],
    id: number,
    newLine: SheetBlockLine<Inner>,
) {
    return lines.flatMap(line =>
        line.id === id ?
            [line, newLine]
        :
            [line]
    )
}

export function recomputeSheetResults<State>(
    lines: SheetBlockState<State>,
    innerBlock: BlockDesc<State>,
    env: block.Environment,
    startFromId?: number,
) {
    const startIndex = lines.findIndex(line => line.id === startFromId) ?? 0
    const linesBefore = lines.slice(0, startIndex)
    const linesAfter = lines.slice(startIndex)

    const envBefore = Object.assign(
        {},
        env,
        ...linesBefore.map(lineToEnv),
    )

    const recomputedLines = block.mapWithEnv(
        linesAfter,
        (line, localEnv) => {
            const result = innerBlock.getResult(line.state, localEnv)
            return {
                out: { ...line, result },
                env: { [lineName(line)]: result },
            }
        },
        envBefore,
    )
    return [ ...linesBefore, ...recomputedLines ]
}

export function getResult<State>(lines: SheetBlockState<State>) {
    return lines[lines.length - 1].result
}