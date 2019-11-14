export interface Validated{
    
    validate: () => boolean;

}

export class Validator {
    public static isStringValid(str: string): boolean {
        if (str == null || str.trim.length < 1)
            return false
        return true
    }

    /**
     * Checks if email matches a basic regex.
     * @param email email to validate
     * @returns true if email matches general _@_._ and contains no whitespace & exactly one '@'
     */
    public static isEmailValid(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
}