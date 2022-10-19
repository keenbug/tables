import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled, { css } from 'styled-components'

import { interpolate } from '../utils'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'


type ClassedElemType<P> = React.FunctionComponent<P> | React.ComponentClass<P> | string

export const classed = <P extends { className?: string }>(
    elem: ClassedElemType<P>
) => (strings: TemplateStringsArray, ...interpolations: Array<any>) =>
    React.forwardRef<unknown, P>((props, ref) =>
        React.createElement(
            elem,
            {
                ...props,
                ref,
                className: `${interpolate(strings, interpolations, props)} ${props.className ?? ""}`,
            }
        )
    )




const TextInputHTML = styled.span`
    ${({ placeholder }) =>
        placeholder ?
            css`
                &:empty:after {
                    content: "${placeholder}";
                    color: #aaa;
                }
            `
        :
            ''
    }
`

const space = String.fromCharCode(32)
const fixedWidth = String.fromCharCode(160)
const fixedWidthToSpace = str => str.replaceAll(fixedWidth, space)

export const TextInput: React.FC<any> = ({ value, onUpdate, ...props }) => {
    const ref = React.useRef(null)
    React.useLayoutEffect(() => {
        if (fixedWidthToSpace(ref.current.textContent) !== fixedWidthToSpace(value)) {
            ref.current.textContent = fixedWidthToSpace(value)
        }
    })
    const onInput = event => {
        const { textContent } = event.target
        const text = fixedWidthToSpace(textContent.replaceAll('\n', ''))
        onUpdate(text)
    }
    return (
        <TextInputHTML
            contentEditable="plaintext-only"
            ref={ref}
            onInput={onInput}
            {...props}
        />
    )
}



export const ErrorView = ({ title, error, children }) => (
    <div>
        <h3>{title}</h3>
        <h4>{error.name}</h4>
        <p>{error.message}</p>
        <pre>{error.stack}</pre>
        {children}
    </div>
)


export const Button = classed<any>('button')`
    text-left
    text-slate-800

    hover:bg-gray-200
    focus:bg-gray-300

    transition-colors

    outline-none
    h-7 px-1 space-x-1
`

export const IconToggleButton: React.FC<any> = ({ className, isActive, icon, iconDisabled, onUpdate, label="", ...props }) => (
    <Button
        className={(className ?? "") + (isActive ? "" : " text-slate-400")}
        onClick={onUpdate}
        {...props}
    >
        <IconForButton icon={isActive ? icon : (iconDisabled || icon)} />
        {label && <span>{label}</span>}
    </Button>
)

export const IconForButton: React.FC<{ icon: IconDefinition }> = ({ icon }) => (
    <div className="inline-block w-5 text-center">
        <FontAwesomeIcon size="xs" icon={icon} />
    </div>
)



export const LoadFileButton: React.FC<any> = ({ onLoad, children, ...props }) => {
    const loadFile = event => {
        onLoad(event.target.files[0])
    }

    return (
        <label {...props}>
            {children}
            <input className="hidden" type="file" onChange={loadFile} />
        </label>
    )
}


export const SaveFileButton: React.FC<any> = ({ mimeType, textContent, filename, children, ...props }) => {
    const dataStr = `data:${mimeType};charset=utf-8,${encodeURIComponent(textContent)}`

    return (
        <a href={dataStr} download={filename} {...props}>
            {children}
        </a>
    )
}