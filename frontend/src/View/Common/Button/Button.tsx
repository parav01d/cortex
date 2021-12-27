import React from 'react';
import { BehaviorSubject, Subject } from "rxjs"

type ButtonProps = {
    subject$: Subject<string | undefined> | BehaviorSubject<string | undefined>,
    text: string,
    value?: string,
    className?: string
};

export const Button = ({ subject$, text, value, className }: ButtonProps) => {
    return <button className={className} onClick={() => subject$.next(value)}>{text}</button>
}