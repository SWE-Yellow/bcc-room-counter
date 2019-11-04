export interface Validated{
    
    validate: () => boolean;

}

export abstract class Validator {
    public static isStringValid(str: string): boolean {
        //TODO: how do we reject sql commands?
        if (str == null || str.trim.length < 1)
            return false
        return true
    }

    public static isIntValid(num: number): boolean {
        return !isNaN(num)
    }
}