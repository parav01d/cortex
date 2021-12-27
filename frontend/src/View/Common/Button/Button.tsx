import React from 'react';
import { Subject } from "rxjs"

type ButtonProps = { subject$: Subject<string | undefined>, text: string, value?: string };

export const Button = ({ subject$, text, value }: ButtonProps) => {
    return <button onClick={() => subject$.next(value)}>{text}</button>
}