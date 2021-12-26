import React from 'react';
import { Subject } from "rxjs"

type ButtonProps = { subject$: Subject<void>, text: string };

export const Button = ({ subject$, text }: ButtonProps) => {
    return <button onClick={() => subject$.next()}>{text}</button>
}