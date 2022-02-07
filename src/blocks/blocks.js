import React from 'react'
import { ValueInspector } from '../ui/value'
import { EditableCode, highlightNothing } from '../ui/code-editor'
import { classed, LoadFileButton } from '../ui/utils'
import stdLibrary from '../utils/std-library'
import { computeExpr } from '../logic/compute'
import { createBlock, SimpleJSON } from '../logic/components'
import { FCO } from '../logic/fc-object'
import { SheetBlock } from './sheet'
import { CommandBlock } from './command'
import { JSExprBlock } from './jsexpr'

export const Sheet = SheetBlock
export const Command = CommandBlock
export const JSExpr = JSExprBlock

export const Input = FCO
    .addState({ text: "" })
    .addMethods({
        view({ block, setBlock }) {
            const onChange = event => {
                setBlock(block => block.update({ text: event.target.value }))
            }
            return <input type="text" value={block.text} onChange={onChange} />
        },
        getResult() {
            return this.text
        },
    })
    .combine(SimpleJSON('text'))
    .pipe(createBlock)

export const LoadFileButtonStyled = classed(LoadFileButton)`
    cursor-pointer
    p-1
    rounded
    font-gray-700
    bg-gray-100
    hover:bg-gray-200
`

export const LoadFile = FCO
    .addState({ loaded: null })
    .addMethods({
        view({ setBlock }) {
            const setData = data =>
                setBlock(block => block.update({ loaded: data }))

            return (
                <LoadFileButtonStyled
                    onLoad={file => file.text().then(setData)}
                >
                    Load File
                </LoadFileButtonStyled>
            )
        },
        getResult() {
            return this.loaded
        }
    })
    .combine(SimpleJSON('loaded'))
    .pipe(createBlock)

export const Text = (container = 'div') => FCO
    .addState({ code: '', result: null })
    .addMethods({
        view({ block, setBlock }) {
            const runText = code =>
                computeExpr(
                    `<$TextBlockContainer>${code}</$TextBlockContainer>`,
                    { ...stdLibrary, $TextBlockContainer: container },
                )
            const setCode = code => {
                setBlock(block => block.update({ code, result: runText(code) }))
            }
            return (
                <React.Fragment>
                <EditableCode
                    code={block.code}
                    onUpdate={setCode}
                    highlight={highlightNothing}
                />
                <ValueInspector value={block.result} />
                </React.Fragment>
            )
        },
        getResult() {
            return this.result
        },
    })
    .combine(SimpleJSON('code'))
    .pipe(createBlock)