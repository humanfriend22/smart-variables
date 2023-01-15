/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';

import { createStorageVariable, createElementVariable, refresh } from '../src/index';

// Required for the test too
const parseJSON = (str: string | null) => {
    if (!str) return false;

    try {
        return JSON.parse(str!);
    } catch (err) {
        return false;
    };
};

beforeAll(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    document.body.innerHTML = '';
});

describe('local storage variable', () => {
    const person = createStorageVariable<{ first: string | null, age: number }>('person', null, 'local');

    it('is nullable', () => {
        expect(person.first).toBeNull();
    });

    it('name equality', () => {
        person.first = 'Jill';
        expect(person.first).toBe('Jill');
    });

    it('age equality', () => {
        person.age = 20;
        expect(person.age).toBeGreaterThan(10);
    });

    it('is stored properly', () => {
        const stored = parseJSON(window.localStorage.getItem('person'));
        expect(stored.first).toEqual('Jill');
    });
});

describe('session storage variable', () => {
    const person = createStorageVariable<{ first: string | null, age: number }>('person', null, 'session');

    it('is nullable', () => {
        expect(person.first).toBeNull();
    });

    it('name equality', () => {
        person.first = 'Jill';
        expect(person.first).toBe('Jill');
    });

    it('age equality', () => {
        person.age = 20;
        expect(person.age).toBeGreaterThan(10);
    });

    it('is stored properly', () => {
        const stored = parseJSON(window.sessionStorage.getItem('person'));
        expect(stored.first).toEqual('Jill');
    });
});

describe('element variable', () => {
    const person = createElementVariable<HTMLParagraphElement>('p');

    it('return undefined', () => {
        expect(person.innerText).toBe(undefined);
    });

    it('should refresh', () => {
        // Add Element
        const paragraph = document.createElement('p');
        paragraph.innerText = 'Hello World!';
        document.body.appendChild(paragraph);

        expect(person.innerText).toEqual('Hello World!');
    });

    it('should change', () => {
        person.innerText = '';
        expect(person.innerText).toBe('');
    });
});