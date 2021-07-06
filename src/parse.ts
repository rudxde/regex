import { concat, epsilon, letter, or, star } from './regex-builder';
import { RegexTree } from './regex-tree/regex-tree';

const EPSILON = '€';

export function parse(regexString: string): RegexTree {
    const regexResult = parseRegex(regexString, 0);
    if (regexString.length !== regexResult.index) {
        throw new ParserError('Expected input to end', regexString, regexResult.index);
    }
    regexResult.result.setNext([]);
    return regexResult.result;
}

function parseRegex(regexString: string, index: number): { result: RegexTree; index: number } {
    const concatResult = parseConcat(regexString, index);
    return parseA1(regexString, concatResult.index, concatResult.result);
}

function parseA1(regexString: string, index: number, regexResult: RegexTree): { result: RegexTree; index: number } {
    if (regexString.charAt(index) === '|') {
        const regex2Result = parseRegex(regexString, index + 1);
        return { result: or(regexResult, regex2Result.result), index: regex2Result.index };
    } else {
        return { result: regexResult, index };
    }
}

function first_Concat(regexString: string, index: number): boolean {
    const charCode = regexString.charCodeAt(index);
    if (
        charCode >= 97 && charCode <= 122
        || regexString.charAt(index) === EPSILON
        || regexString.charAt(index) === '(') {
        return true;
    }
    return false;
}

function parseConcat(regexString: string, index: number): { result: RegexTree; index: number } {
    const repResult = parseRep(regexString, index);
    const a2Result = parseA2(regexString, repResult.index);
    return { result: concat(repResult.result, a2Result.result), index: a2Result.index };
}

function parseA2(regexString: string, index: number): { result: RegexTree; index: number } {
    if (first_Concat(regexString, index)) {
        return parseConcat(regexString, index);
    } else {
        return { result: epsilon(), index };
    }
}

function parseRep(regexString: string, index: number): { result: RegexTree; index: number } {
    const atomResult = parseAtom(regexString, index);
    return parseA3(regexString, atomResult.index, atomResult.result);
}

function parseA3(regexString: string, index: number, repResult: RegexTree): { result: RegexTree; index: number } {
    if (regexString.charAt(index) === '*') {
        return { result: star(repResult), index: index + 1 };
    }
    return { result: repResult, index };
}

function parseAtom(regexString: string, index: number): { result: RegexTree; index: number } {
    if (regexString.charAt(index) === '(') {
        const parseRegexResult = parseRegex(regexString, index + 1);
        if (regexString.charAt(parseRegexResult.index) !== ')') {
            throw new ParserError(`Expected ')'`, regexString, parseRegexResult.index);
        }
        return { result: parseRegexResult.result, index: parseRegexResult.index + 1 };
    }
    const charCode = regexString.charCodeAt(index);
    if (charCode >= 97 && charCode <= 122) { // [a...z]
        return { result: letter(regexString.charAt(index)), index: index + 1 };
    }
    if (regexString.charAt(index) === EPSILON) {
        return { result: epsilon(), index: index + 1 };
    }
    throw new ParserError(`Expected ['a',...,'z','€'] or '('`, regexString, index);
}

export class ParserError extends Error {
    constructor(
        message: string,
        regexString: string,
        index: number,
    ) {
        super(`${message}\n${regexString}\n${' '.repeat(index)}^`);
    }
}
